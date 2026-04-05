import { spacing, borderRadius, fontSize, fontWeight, lineHeight, elevation, transition, zIndex } from './tokens'
import { Theme } from './types'

/**
 * Dark theme configuration
 * Colors are WCAG AA compliant with minimum contrast ratio of 4.5:1 for normal text
 * and 3:1 for large text on dark backgrounds
 */
export const darkTheme: Theme = {
  colors: {
    // Primary - Vibrant Indigo (Striking on VSCode Black)
    primary: '#a5b4fc',        // Indigo 300 (lighter for better dark mode visibility)
    primaryHover: '#818cf8',   // Indigo 400
    primaryActive: '#6366f1',  // Indigo 500

    // Secondary - VSCode Gray
    secondary: '#858585',
    secondaryHover: '#a6a6a6',
    secondaryActive: '#cccccc',

    // Background colors
    background: '#1e1e1e',      // Main editor/workspace background
    backgroundSecondary: '#252526', // Sidebar, panels
    backgroundTertiary: '#2d2d2d',  // Highlights, smaller surfaces

    // Surface colors (for cards, modals, etc.)
    surface: '#252526',
    surfaceHover: '#2a2d2e',

    // Text colors
    text: '#cccccc',           // Primary text
    textSecondary: '#999999',  // Secondary text, comments
    textTertiary: '#6b6b6b',   // Disabled/tertiary
    textDisabled: '#4d4d4d',   // Disabled

    // Semantic colors
    error: '#f48771',
    errorHover: '#fca5a5',
    errorBackground: '#5a1d1d',

    success: '#89d185',
    successHover: '#86efac',
    successBackground: '#1e401e',

    warning: '#cca700',
    warningHover: '#d7ba7d',
    warningBackground: '#5c4d00',

    info: '#75beff',
    infoHover: '#9cdcfe',
    infoBackground: '#0a3254',

    // Border colors
    border: '#3c3c3c',         // VSCode borders
    borderHover: '#444444',
    borderFocus: '#a5b4fc',    // Focus border

    // Divider
    divider: '#333333',

    // Overlay (for modals, dropdowns)
    overlay: 'rgba(0, 0, 0, 0.4)',
  },

  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  elevation,
  transition,
  zIndex,
}
