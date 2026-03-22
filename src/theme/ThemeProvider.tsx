import React, { createContext, useState, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { Theme, ThemeContextValue, ThemeMode, ResolvedThemeMode } from './types'
import { lightTheme } from './light'
import { darkTheme } from './dark'
import { LocalStorage } from '../utils/localStorage'
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'app-theme-mode'

export interface ThemeProviderProps {
  children: ReactNode
  /** Custom theme object (overrides default light/dark themes) */
  initialTheme?: Theme
  /** Initial theme mode */
  initialMode?: ThemeMode
  /** localStorage key for persisting theme preference */
  storageKey?: string
  /** Enable CSS variables injection */
  enableCssVariables?: boolean
}

/**
 * Detects system color scheme preference
 */
const getSystemTheme = (): ResolvedThemeMode => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Applies theme as CSS variables to document root
 */
const applyCssVariables = (theme: Theme, resolvedMode: ResolvedThemeMode): void => {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  // Set data attribute for theme mode
  root.setAttribute('data-theme', resolvedMode)

  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value)
  })

  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value)
  })

  // Apply border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })

  // Apply font size variables
  Object.entries(theme.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--text-${key}`, value)
  })

  // Apply font weight variables
  Object.entries(theme.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value)
  })

  // Apply line height variables
  Object.entries(theme.lineHeight).forEach(([key, value]) => {
    root.style.setProperty(`--leading-${key}`, value)
  })

  // Apply elevation variables
  Object.entries(theme.elevation).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })

  // Apply transition variables
  Object.entries(theme.transition).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value)
  })
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  initialMode = 'system',
  storageKey = THEME_STORAGE_KEY,
  enableCssVariables = true,
}) => {
  // Load theme mode from localStorage or use initialMode
  const getInitialMode = (): ThemeMode => {
    const savedMode = LocalStorage.getItem<ThemeMode>(storageKey)
    return savedMode || initialMode
  }

  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialMode)
  const [systemTheme, setSystemTheme] = useState<ResolvedThemeMode>(getSystemTheme)
  const [customTheme, setCustomTheme] = useState<Theme | undefined>(initialTheme)

  // Calculate resolved theme mode
  const resolvedThemeMode: ResolvedThemeMode = useMemo(() => {
    if (themeMode === 'system') return systemTheme
    return themeMode as ResolvedThemeMode
  }, [themeMode, systemTheme])

  // Get current theme
  const theme: Theme = useMemo(() => {
    if (customTheme) return customTheme
    return resolvedThemeMode === 'light' ? lightTheme : darkTheme
  }, [customTheme, resolvedThemeMode])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (enableCssVariables) {
      applyCssVariables(theme, resolvedThemeMode)
    }
  }, [theme, resolvedThemeMode, enableCssVariables])

  // Save theme mode to localStorage whenever it changes
  useEffect(() => {
    LocalStorage.setItem(storageKey, themeMode)
  }, [themeMode, storageKey])

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setCustomTheme(newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeModeState((prevMode) => {
      if (prevMode === 'light') return 'dark'
      if (prevMode === 'dark') return 'system'
      return 'light'
    })
  }, [])

  const contextValue: ThemeContextValue = useMemo(() => ({
    theme,
    themeMode,
    resolvedThemeMode,
    setTheme,
    setThemeMode,
    toggleTheme,
  }), [theme, themeMode, resolvedThemeMode, setTheme, setThemeMode, toggleTheme])

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: resolvedThemeMode,
      primary: {
        main: theme.colors.primary,
      },
      secondary: {
        main: theme.colors.secondary,
      },
      error: {
        main: theme.colors.error,
      },
      success: {
        main: theme.colors.success,
      },
      background: {
        default: theme.colors.background,
        paper: theme.colors.backgroundSecondary,
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary,
      }
    },
  }), [resolvedThemeMode, theme])

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
