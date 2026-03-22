# Theme Toggle Example

## Quick Start

```tsx
import { ThemeProvider, ThemeToggle } from '@gofreego/tsutils'

function App() {
  return (
    <ThemeProvider initialMode="light">
      <div>
        <header>
          {/* Round Material UI button with theme icon */}
          <ThemeToggle />
        </header>
        <main>
          <YourContent />
        </main>
      </div>
    </ThemeProvider>
  )
}
```

## How It Works

1. **ThemeProvider** - Wraps your app and provides theme context
   - Automatically loads theme preference from localStorage on mount
   - Persists theme changes to localStorage key: `'app-theme-mode'`

2. **ThemeToggle** - Round button that cycles between light, dark, and system themes
   - Shows sun icon (☀️) in light mode
   - Shows moon icon (🌙) in dark mode
   - Shows auto icon (🅰️) in system mode
   - Includes tooltip explaining the toggle action
   - Automatically saves preference to localStorage

3. **Cross-Project Sync** - Theme syncs across apps on the same domain
   - `admin.zshala.com/usermanagement` sets theme to dark
   - `admin.zshala.com/catalogmanagement` automatically loads dark theme
   - Both projects share the same localStorage

## Custom Storage Key

To isolate theme per project:

```tsx
<ThemeProvider initialMode="light" storageKey="usermanagement-theme">
  <App />
</ThemeProvider>

// Different storage key for catalog management
<ThemeProvider initialMode="light" storageKey="catalogmanagement-theme">
  <App />
</ThemeProvider>
```

## Custom Styling

```tsx
<ThemeToggle 
  sx={{ 
    backgroundColor: 'primary.main',
    color: 'white',
    '&:hover': {
      backgroundColor: 'primary.dark'
    }
  }}
  lightModeTooltip="Switch to dark theme"
  darkModeTooltip="Switch to light theme"
/>
```

## Without Material UI

If you don't want to use Material UI, create your own toggle button:

```tsx
import { useTheme } from '@gofreego/tsutils'

function CustomThemeToggle() {
  const { themeMode, toggleTheme } = useTheme()
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ borderRadius: '50%', width: 40, height: 40 }}
    >
      {themeMode === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```
