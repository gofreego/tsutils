# Theme System - CSS Variables Usage Guide

## Overview

The theme system now follows industry best practices:
- ✅ Uses Material Design 3 principles
- ✅ Supports system theme preference (`prefers-color-scheme`)
- ✅ WCAG AA/AAA compliant color contrast
- ✅ Never hardcodes colors in components
- ✅ Uses CSS variables for dynamic theming

## Folder Structure

```
theme/
 ├── tokens.ts          # Design tokens (spacing, typography, etc.)
 ├── light.ts           # Light theme configuration
 ├── dark.ts            # Dark theme configuration
 ├── types.ts           # TypeScript types
 ├── ThemeProvider.tsx  # Theme context provider
 ├── useTheme.ts        # Theme hook
 ├── ThemeToggle.tsx    # Toggle button component
 └── index.ts           # Public exports
```

## Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
import { ThemeProvider } from 'tsutils/theme'

function App() {
  return (
    <ThemeProvider 
      initialMode="system"        // 'light' | 'dark' | 'system'
      enableCssVariables={true}   // Enable CSS variables injection
      storageKey="my-app-theme"   // localStorage key
    >
      <YourApp />
    </ThemeProvider>
  )
}
```

### 2. Use CSS Variables in Your Styles

CSS variables are automatically injected into the document root:

```css
/* Use theme colors */
.my-component {
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.my-button {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  font-weight: var(--font-medium);
  transition: all var(--transition-normal);
}

.my-button:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
}

/* Use semantic colors */
.error-message {
  color: var(--color-error);
  background-color: var(--color-error-background);
}

.success-badge {
  color: var(--color-success);
  background-color: var(--color-success-background);
}
```

### 3. Use the useTheme Hook in Components

```tsx
import { useTheme } from 'tsutils/theme'

function MyComponent() {
  const { theme, themeMode, resolvedThemeMode, setThemeMode, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Current mode: {themeMode}</p>
      <p>Resolved mode: {resolvedThemeMode}</p>
      
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      
      <button onClick={() => setThemeMode('system')}>
        Use System Theme
      </button>
      
      {/* Access theme values directly */}
      <div style={{ 
        color: theme.colors.primary,
        padding: theme.spacing.md 
      }}>
        Themed content
      </div>
    </div>
  )
}
```

### 4. Use the ThemeToggle Component

```tsx
import { ThemeToggle } from 'tsutils/theme'

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle 
        showTooltip={true}
        lightModeTooltip="Switch to dark mode"
        darkModeTooltip="Switch to light mode"
      />
    </header>
  )
}
```

## Available CSS Variables

### Colors

```css
/* Primary */
--color-primary
--color-primary-hover
--color-primary-active

/* Secondary */
--color-secondary
--color-secondary-hover
--color-secondary-active

/* Backgrounds */
--color-background
--color-background-secondary
--color-background-tertiary

/* Surfaces */
--color-surface
--color-surface-hover

/* Text */
--color-text
--color-text-secondary
--color-text-tertiary
--color-text-disabled

/* Semantic (Error) */
--color-error
--color-error-hover
--color-error-background

/* Semantic (Success) */
--color-success
--color-success-hover
--color-success-background

/* Semantic (Warning) */
--color-warning
--color-warning-hover
--color-warning-background

/* Semantic (Info) */
--color-info
--color-info-hover
--color-info-background

/* Borders */
--color-border
--color-border-hover
--color-border-focus

/* Other */
--color-divider
--color-overlay
```

### Spacing

```css
--spacing-xs    /* 4px */
--spacing-sm    /* 8px */
--spacing-md    /* 16px */
--spacing-lg    /* 24px */
--spacing-xl    /* 32px */
--spacing-2xl   /* 48px */
--spacing-3xl   /* 64px */
```

### Border Radius

```css
--radius-none
--radius-sm     /* 4px */
--radius-md     /* 6px */
--radius-lg     /* 8px */
--radius-xl     /* 12px */
--radius-2xl    /* 16px */
--radius-full   /* 9999px */
```

### Typography

```css
/* Font sizes */
--text-xs       /* 12px */
--text-sm       /* 14px */
--text-md       /* 16px */
--text-lg       /* 18px */
--text-xl       /* 20px */
--text-2xl      /* 24px */
--text-3xl      /* 30px */
--text-4xl      /* 36px */

/* Font weights */
--font-light    /* 300 */
--font-normal   /* 400 */
--font-medium   /* 500 */
--font-semibold /* 600 */
--font-bold     /* 700 */

/* Line heights */
--leading-tight     /* 1.25 */
--leading-normal    /* 1.5 */
--leading-relaxed   /* 1.75 */
```

### Shadows (Elevation)

```css
--shadow-none
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
```

### Transitions

```css
--transition-fast    /* 150ms */
--transition-normal  /* 250ms */
--transition-slow    /* 350ms */
```

## Data Attribute

The theme mode is also set as a data attribute on the root element:

```css
/* Target specific theme */
[data-theme="light"] .my-component {
  /* Light theme specific styles */
}

[data-theme="dark"] .my-component {
  /* Dark theme specific styles */
}
```

## Best Practices

### ✅ DO

1. **Use CSS variables for all colors:**
   ```css
   .button {
     background: var(--color-primary);
     color: var(--color-text);
   }
   ```

2. **Use design tokens from the theme:**
   ```tsx
   import { spacing, borderRadius } from 'tsutils/theme'
   
   const styles = {
     padding: spacing.md,
     borderRadius: borderRadius.lg
   }
   ```

3. **Support system theme by default:**
   ```tsx
   <ThemeProvider initialMode="system" />
   ```

4. **Use semantic color names:**
   ```jsx
   <div style={{ color: theme.colors.error }}>Error message</div>
   ```

### ❌ DON'T

1. **Never hardcode colors:**
   ```css
   /* BAD */
   .button {
     background: #3b82f6;
     color: #ffffff;
   }
   
   /* GOOD */
   .button {
     background: var(--color-primary);
     color: var(--color-text);
   }
   ```

2. **Don't use inline hex colors:**
   ```tsx
   /* BAD */
   <div style={{ color: '#ff0000' }}>Error</div>
   
   /* GOOD */
   <div style={{ color: theme.colors.error }}>Error</div>
   ```

3. **Don't ignore contrast requirements:**
   ```tsx
   // All theme colors are WCAG AA/AAA compliant
   // Use them as intended
   ```

## Advanced Usage

### Custom Theme Configuration

```tsx
import { ThemeProvider, Theme } from 'tsutils/theme'

const customTheme: Theme = {
  // ... custom theme configuration
}

<ThemeProvider initialTheme={customTheme}>
  <App />
</ThemeProvider>
```

### Programmatic Theme Control

```tsx
function ThemeController() {
  const { themeMode, setThemeMode } = useTheme()
  
  return (
    <select 
      value={themeMode} 
      onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  )
}
```

### Accessing Design Tokens

```tsx
import { tokens, spacing, fontSize } from 'tsutils/theme'

// Use individual exports
const mySpacing = spacing.lg

// Or use the tokens namespace
const myFontSize = tokens.fontSize.xl
```

## Migration Guide

If you're migrating from the old theme system:

1. Update `ThemeProvider` props:
   - `initialMode` now defaults to `'system'`
   - Add `enableCssVariables={true}` for CSS variables support

2. Replace hardcoded colors with CSS variables

3. Update theme mode checks:
   ```tsx
   // Old
   const { themeMode } = useTheme()
   const isLight = themeMode === 'light'
   
   // New (handles 'system' mode)
   const { resolvedThemeMode } = useTheme()
   const isLight = resolvedThemeMode === 'light'
   ```

4. Update custom theme definitions to match the new `Theme` interface

## Color Contrast Compliance

All theme colors meet WCAG standards:

- **Light Theme**: Minimum 4.5:1 contrast ratio (AA), most are AAA (7:1)
- **Dark Theme**: Minimum 4.5:1 contrast ratio (AA) on dark backgrounds

Colors are designed using Material Design 3 principles for optimal readability and accessibility.
