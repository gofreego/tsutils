import React from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { useTheme } from './useTheme'

export interface ThemeToggleProps extends Omit<IconButtonProps, 'onClick'> {
  /**
   * Tooltip text for light mode
   * @default "Switch to dark mode"
   */
  lightModeTooltip?: string

  /**
   * Tooltip text for dark mode
   * @default "Switch to light mode"
   */
  darkModeTooltip?: string

  /**
   * Whether to show tooltip
   * @default true
   */
  showTooltip?: boolean
}

/**
 * A round button component for toggling between light and dark themes
 * Note: Toggling skips 'system' mode and switches directly between light and dark
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  lightModeTooltip = 'Switch to dark mode',
  darkModeTooltip = 'Switch to light mode',
  showTooltip = true,
  sx,
  ...props
}) => {
  const { resolvedThemeMode, toggleTheme } = useTheme()

  const button = (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      sx={{
        borderRadius: '50%',
        ...sx
      }}
      {...props}
    >
      {resolvedThemeMode === 'light' ? <LightMode /> : <DarkMode />}
    </IconButton>
  )

  if (!showTooltip) {
    return button
  }

  return (
    <Tooltip
      title={resolvedThemeMode === 'light' ? lightModeTooltip : darkModeTooltip}
      arrow
    >
      {button}
    </Tooltip>
  )
}
