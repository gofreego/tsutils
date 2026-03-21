/**
 * Theme mode options
 * - 'light': Always use light theme
 * - 'dark': Always use dark theme
 * - 'system': Follow system preference (prefers-color-scheme)
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Resolved theme mode (actual theme being displayed)
 */
export type ResolvedThemeMode = 'light' | 'dark'

/**
 * Theme interface with comprehensive design tokens
 */
export interface Theme {
  colors: {
    // Primary colors
    primary: string
    primaryHover: string
    primaryActive: string
    
    // Secondary colors
    secondary: string
    secondaryHover: string
    secondaryActive: string
    
    // Background colors
    background: string
    backgroundSecondary: string
    backgroundTertiary: string
    
    // Surface colors
    surface: string
    surfaceHover: string
    
    // Text colors
    text: string
    textSecondary: string
    textTertiary: string
    textDisabled: string
    
    // Semantic colors
    error: string
    errorHover: string
    errorBackground: string
    
    success: string
    successHover: string
    successBackground: string
    
    warning: string
    warningHover: string
    warningBackground: string
    
    info: string
    infoHover: string
    infoBackground: string
    
    // Border colors
    border: string
    borderHover: string
    borderFocus: string
    
    // Divider
    divider: string
    
    // Overlay
    overlay: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    full: string
  }
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  fontWeight: {
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
  }
  lineHeight: {
    tight: string
    normal: string
    relaxed: string
  }
  elevation: {
    none: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  transition: {
    fast: string
    normal: string
    slow: string
  }
  zIndex: {
    dropdown: number
    sticky: number
    fixed: number
    modalBackdrop: number
    modal: number
    popover: number
    tooltip: number
  }
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme object */
  theme: Theme
  /** Selected theme mode (can be 'system') */
  themeMode: ThemeMode
  /** Resolved theme mode (actual theme being displayed: 'light' or 'dark') */
  resolvedThemeMode: ResolvedThemeMode
  /** Set custom theme object */
  setTheme: (theme: Theme) => void
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => void
  /** Toggle between light and dark (skips system) */
  toggleTheme: () => void
}
