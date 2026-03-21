# SidebarLayout Component - Usage Examples

## Overview

The `SidebarLayout` component provides a flexible sidebar-body layout that automatically detects and uses React Router if available, with a fallback to state-based navigation.

## Features

✅ **Router-First**: Automatically uses `react-router-dom` when available  
✅ **Fallback Mode**: Works without router using internal state  
✅ **Theme-Aware**: Uses CSS variables from the theme system  
✅ **TypeScript**: Full type safety with comprehensive interfaces  
✅ **Accessible**: Semantic HTML and keyboard navigation  
✅ **Customizable**: Flexible styling options

---

## Installation

The component requires `react-router-dom` as an optional peer dependency:

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

---

## Usage with React Router (Recommended)

### Basic Setup

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SidebarLayout } from '@gofreego/tsutils/components'
import { DashboardIcon, SettingsIcon, ProfileIcon } from '@mui/icons-material'

// Your page components
const Dashboard = () => <div>Dashboard Content</div>
const Settings = () => <div>Settings Content</div>
const Profile = () => <div>Profile Content</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SidebarLayout
              menuItems={[
                {
                  id: 'dashboard',
                  label: 'Dashboard',
                  path: '/dashboard',
                  icon: <DashboardIcon />
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  path: '/settings',
                  icon: <SettingsIcon />
                },
                {
                  id: 'profile',
                  label: 'Profile',
                  path: '/profile',
                  icon: <ProfileIcon />
                }
              ]}
              sidebarWidth="280px"
            />
          }
        >
          {/* Child routes rendered via <Outlet /> */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### Nested Routes

```tsx
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/app"
          element={
            <SidebarLayout
              menuItems={[
                { id: 'home', label: 'Home', path: '/app/home' },
                { id: 'users', label: 'Users', path: '/app/users' },
                { id: 'reports', label: 'Reports', path: '/app/reports' }
              ]}
            />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="users/*" element={<UserSection />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### With Menu Change Callback

```tsx
function App() {
  const handleMenuChange = (menuId: string) => {
    console.log('Active menu:', menuId)
    // Track analytics, update app state, etc.
  }

  return (
    <SidebarLayout
      menuItems={menuItems}
      onMenuChange={handleMenuChange}
    />
  )
}
```

---

## Usage Without React Router (State-Based)

When `react-router-dom` is not available or menuItems don't have `path` properties, the component automatically uses state-based navigation:

```tsx
import { SidebarLayout } from '@gofreego/tsutils/components'
import { Dashboard, Settings, Profile } from './components'

function App() {
  return (
    <SidebarLayout
      menuItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <DashboardIcon />,
          component: <Dashboard />
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: <SettingsIcon />,
          component: <Settings />
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: <ProfileIcon />,
          component: <Profile />
        }
      ]}
      defaultSelected="dashboard"
      sidebarWidth="250px"
      onMenuChange={(id) => console.log('Selected:', id)}
    />
  )
}
```

---

## Custom Styling

### Using Style Props

```tsx
<SidebarLayout
  menuItems={menuItems}
  sidebarWidth="300px"
  style={{
    height: '100vh',
    backgroundColor: '#f5f5f5'
  }}
  sidebarStyle={{
    backgroundColor: '#1e293b',
    borderRight: '2px solid #334155'
  }}
  bodyStyle={{
    padding: '2rem',
    backgroundColor: '#ffffff'
  }}
/>
```

### Using CSS Classes

```tsx
<SidebarLayout
  className="my-custom-layout"
  menuItems={menuItems}
/>
```

```css
/* styles.css */
.my-custom-layout .sidebar-menu-item {
  border-radius: 8px;
  margin: 4px 8px;
}

.my-custom-layout .sidebar-menu-item.active {
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
}

.my-custom-layout .sidebar-menu-item:hover {
  transform: translateX(4px);
}
```

---

## Advanced Examples

### With Theme Context

```tsx
import { SidebarLayout } from '@gofreego/tsutils/components'
import { useTheme, ThemeToggle } from '@gofreego/tsutils/theme'

function AppLayout() {
  const { theme } = useTheme()

  return (
    <SidebarLayout
      menuItems={[
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
        { id: 'settings', label: 'Settings', path: '/settings' }
      ]}
      sidebarStyle={{
        backgroundColor: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`
      }}
      bodyStyle={{
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl
      }}
    />
  )
}
```

### With Icons and Custom Widths

```tsx
import {
  Dashboard,
  Settings,
  AccountCircle,
  Assessment,
  Notifications
} from '@mui/icons-material'

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: <Assessment />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: <Notifications />
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: <AccountCircle />
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <Settings />
  }
]

function App() {
  return (
    <SidebarLayout
      menuItems={menuItems}
      sidebarWidth={320}
    />
  )
}
```

### Responsive Sidebar

```tsx
import { useState, useEffect } from 'react'

function ResponsiveSidebarLayout() {
  const [sidebarWidth, setSidebarWidth] = useState('280px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarWidth('60px') // Compact mode
      } else {
        setSidebarWidth('280px')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarLayout
      menuItems={menuItems}
      sidebarWidth={sidebarWidth}
    />
  )
}
```

---

## Props Reference

### `SidebarLayoutProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `menuItems` | `MenuItem[]` | required | Array of menu items to display |
| `sidebarWidth` | `string \| number` | `'250px'` | Width of the sidebar |
| `className` | `string` | `''` | Additional CSS class for container |
| `defaultSelected` | `string` | First item ID | Default selected menu item (state mode) |
| `onMenuChange` | `(id: string) => void` | - | Callback when menu changes |
| `style` | `CSSProperties` | - | Custom styles for container |
| `sidebarStyle` | `CSSProperties` | - | Custom styles for sidebar |
| `bodyStyle` | `CSSProperties` | - | Custom styles for body |

### `MenuItem`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier |
| `label` | `string` | ✅ | Display label |
| `icon` | `ReactNode` | ❌ | Optional icon element |
| `path` | `string` | ❌* | Route path (for router mode) |
| `component` | `ReactNode` | ❌* | Component to render (for state mode) |

\* Either `path` (router mode) or `component` (state mode) should be provided

---

## CSS Variables Used

The component uses these CSS variables from the theme system:

```css
--color-primary          /* Active menu item color */
--color-text             /* Default text color */
--color-surface          /* Sidebar background */
--color-background       /* Body background */
--color-surface-hover    /* Hover background */
--color-border           /* Sidebar border */
--color-background-secondary  /* Active item background */
--spacing-sm             /* Icon gap */
--spacing-md             /* Menu item padding */
--spacing-lg             /* Body padding (state mode) */
--spacing-xl             /* Empty state margin */
--font-normal            /* Default font weight */
--font-medium            /* Active font weight */
--transition-fast        /* Transition speed */
```

---

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- React 18+: ✅
- React Router v6+: ✅

---

## Tips & Best Practices

1. **Use meaningful IDs**: Ensure menu item IDs are unique and descriptive
2. **Include icons**: Icons improve visual hierarchy and UX
3. **Use router mode**: Provides better UX with URL navigation and browser history
4. **Match paths carefully**: Ensure route paths match menu item paths
5. **Handle empty states**: Provide meaningful content when no route matches
6. **Consider accessibility**: Icons should have aria-labels if used alone
7. **Responsive design**: Adjust sidebar width for mobile devices

---

## Troubleshooting

### Router not detected

If you have `react-router-dom` installed but the component uses state mode:
- Ensure menu items have `path` properties
- Check that `react-router-dom` is properly installed
- Verify the component is wrapped by `<BrowserRouter>` or similar

### Active state not updating

In router mode, ensure:
- Routes are properly configured as children
- Path properties match route paths
- The component is within the router context

### Styles not applying

- Ensure ThemeProvider wraps your app
- Check that CSS variables are being injected (`enableCssVariables={true}`)
- Use browser DevTools to inspect computed styles
