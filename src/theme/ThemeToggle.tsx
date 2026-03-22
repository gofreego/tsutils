import React from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import { DarkMode, LightMode, BrightnessAuto } from '@mui/icons-material'
import { useTheme } from './useTheme'

export interface ThemeToggleProps extends Omit<IconButtonProps, 'onClick'> {
  /**
   * Tooltip text for light mode
   * @default "Switch to dark mode"
   */
  lightModeTooltip?: string

  /**
   * Tooltip text for dark mode
   * @default "Switch to system mode"
   */
  darkModeTooltip?: string

  /**
   * Tooltip text for system mode
   * @default "Switch to light mode"
   */
  systemModeTooltip?: string

  /**
   * Whether to show tooltip
   * @default true
   */
  showTooltip?: boolean
}

/**
 * A round button component for toggling between light, dark, and system themes
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  lightModeTooltip = 'Switch to dark mode',
  darkModeTooltip = 'Switch to system theme',
  systemModeTooltip = 'Switch to light theme',
  showTooltip = true,
  sx,
  ...props
}) => {
  const { themeMode, toggleTheme } = useTheme()

  const getIcon = () => {
    switch (themeMode) {
      case 'light':
        return <LightMode />
      case 'dark':
        return <DarkMode />
      case 'system':
        return <BrightnessAuto />
      default:
        return <BrightnessAuto />
    }
  }

  const getTooltip = () => {
    switch (themeMode) {
      case 'light':
        return lightModeTooltip
      case 'dark':
        return darkModeTooltip
      case 'system':
        return systemModeTooltip
      default:
        return lightModeTooltip
    }
  }

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
      {getIcon()}
    </IconButton>
  )

  if (!showTooltip) {
    return button
  }

  return (
    <Tooltip title={getTooltip()} arrow>
      {button}
    </Tooltip>
  )
}
