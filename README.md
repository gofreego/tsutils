# @gofreego/tsutils

A comprehensive React + TypeScript library providing common utilities, components, theme system, and HTTP client for your projects.

## Installation

```bash
npm install @gofreego/tsutils
```

or

```bash
yarn add @gofreego/tsutils
```

### Optional: Material UI (for ThemeToggle component)

If you want to use the `ThemeToggle` component, install Material UI:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Features

- 🎨 **Theme System** - Customizable theme provider with light/dark mode and localStorage persistence
- 🔘 **Theme Toggle** - Material UI round button for theme switching
- 💾 **LocalStorage Utility** - Type-safe localStorage wrapper with error handling
- 🔧 **Utilities** - Common utility functions (debounce, throttle, formatDate, etc.)
- 🌐 **HTTP Client** - Type-safe HTTP client with timeout and error handling
- 🧩 **Components** - Pre-built React components
- 📦 **Tree-shakeable** - Only import what you need
- 🎯 **TypeScript** - Full type safety out of the box

## Usage

### Theme System

```tsx
import { ThemeProvider, useTheme, ThemeToggle, lightTheme, darkTheme } from '@gofreego/tsutils'

function App() {
  return (
    <ThemeProvider initialMode="light">
      <YourApp />
    </ThemeProvider>
  )
}

function YourComponent() {
  const { theme, themeMode, setThemeMode, toggleTheme } = useTheme()
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.text 
    }}>
      <p>Current theme: {themeMode}</p>
      
      {/* Material UI Theme Toggle Button */}
      <ThemeToggle />
      
      {/* Toggle between light and dark */}
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      
      {/* Set specific theme */}
      <button onClick={() => setThemeMode('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setThemeMode('light')}>
        Light Mode
      </button>
    </div>
  )
}

// Theme persists automatically in localStorage
// Works across different apps on the same domain
function CustomThemedApp() {
  return (
    <ThemeProvider initialMode="dark" storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  )
}
```

### HTTP Client

```tsx
import { HttpClient } from '@gofreego/tsutils'

const client = new HttpClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token'
  }
})

// GET request
const response = await client.get('/users')

// POST request
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
```

### Utilities

```tsx
import { debounce, throttle, formatDate, cn, LocalStorage } from '@gofreego/tsutils'

// Debounce function
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query)
}, 300)

// Throttle function
const throttledScroll = throttle(() => {
  console.log('Scrolling...')
}, 100)

// Format date
const formatted = formatDate(new Date(), {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})

// Combine class names
const className = cn('base-class', condition && 'conditional-class', 'another-class')

// LocalStorage utility
// Save data
LocalStorage.setItem('user', { name: 'John', id: 123 })
LocalStorage.setItem('theme', 'dark')

// Get data
const user = LocalStorage.getItem<{ name: string; id: number }>('user')
const theme = LocalStorage.getItem<string>('theme')

// Check if key exists
if (LocalStorage.hasItem('user')) {
  console.log('User data exists')
}

// Remove item
LocalStorage.removeItem('theme')

// Get all keys
const keys = LocalStorage.keys()

// Clear all
LocalStorage.clear()
```

### Components

```tsx
import { Button } from '@gofreego/tsutils'

function Example() {
  return (
    <>
      <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
        Primary Button
      </Button>
      
      <Button variant="outline" size="lg">
        Outline Button
      </Button>
    </>
  )
}
```

## API Reference

### Theme

- `ThemeProvider` - Context provider for theme
  - Props: `initialMode`, `initialTheme`, `storageKey`
  - Automatically persists theme to localStorage
- `useTheme()` - Hook to access and update theme
  - `theme` - Current theme object
  - `themeMode` - Current theme mode ('light' | 'dark')
  - `setTheme(theme)` - Set custom theme
  - `setThemeMode(mode)` - Set theme mode
  - `toggleTheme()` - Toggle between light and dark
- `ThemeToggle` - Material UI round button component for theme switching
  - Props: `lightModeTooltip`, `darkModeTooltip`, `showTooltip`
  - Automatically updates localStorage
- `lightTheme` - Predefined light theme
- `darkTheme` - Predefined dark theme  
- `defaultTheme` - Default theme (alias for lightTheme)

### HTTP Client

- `HttpClient` - HTTP client class with methods: `get()`, `post()`, `put()`, `patch()`, `delete()`

### Utilities

- `debounce(func, wait)` - Debounce function calls
- `throttle(func, wait)` - Throttle function calls
- `formatDate(date, options)` - Format dates
- `cn(...classes)` - Combine class names
- `LocalStorage` - Safe localStorage wrapper with TypeScript support
  - `getItem<T>(key)` - Get item from localStorage
  - `setItem<T>(key, value)` - Set item in localStorage
  - `removeItem(key)` - Remove item from localStorage
  - `hasItem(key)` - Check if key exists
  - `keys()` - Get all keys
  - `clear()` - Clear all items

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev

# Type check
npm run typecheck
```

## Publishing

```bash
# Login to npm
npm login

# Publish to npm
npm publish --access public
```

## License

MIT

## Author

gofreego
