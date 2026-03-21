# SidebarLayout - Submenu Examples

## Nested Submenu Support

The `SidebarLayout` component now supports nested submenus with expand/collapse functionality using Material UI's Collapse component.

---

## Basic Submenu Example

```tsx
import { SidebarLayout } from '@gofreego/tsutils/components'
import {
  Dashboard,
  ShoppingCart,
  Settings,
  Category,
  Inventory
} from '@mui/icons-material'

function App() {
  return (
    <SidebarLayout
      menuItems={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          path: '/dashboard',
          icon: <Dashboard />
        },
        {
          id: 'products',
          label: 'Products',
          icon: <ShoppingCart />,
          children: [
            {
              id: 'all-products',
              label: 'All Products',
              path: '/products/all',
              icon: <Inventory />
            },
            {
              id: 'categories',
              label: 'Categories',
              path: '/products/categories',
              icon: <Category />
            }
          ]
        },
        {
          id: 'settings',
          label: 'Settings',
          path: '/settings',
          icon: <Settings />
        }
      ]}
      defaultExpanded={['products']}
    />
  )
}
```

---

## Multi-Level Nested Submenus

```tsx
import { SidebarLayout } from '@gofreego/tsutils/components'
import {
  Dashboard,
  Settings,
  Business,
  People,
  Assessment
} from '@mui/icons-material'

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: <Business />,
    children: [
      {
        id: 'users',
        label: 'Users',
        icon: <People />,
        children: [
          {
            id: 'all-users',
            label: 'All Users',
            path: '/admin/users/all'
          },
          {
            id: 'roles',
            label: 'Roles & Permissions',
            path: '/admin/users/roles'
          }
        ]
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <Assessment />,
        children: [
          {
            id: 'sales-reports',
            label: 'Sales Reports',
            path: '/admin/reports/sales'
          },
          {
            id: 'user-reports',
            label: 'User Reports',
            path: '/admin/reports/users'
          }
        ]
      }
    ]
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
      defaultExpanded={['admin', 'users']}
      sidebarWidth={280}
    />
  )
}
```

---

## With React Router (Nested Routes)

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SidebarLayout } from '@gofreego/tsutils/components'

// Page components
const Dashboard = () => <div>Dashboard</div>
const AllProducts = () => <div>All Products</div>
const Categories = () => <div>Categories</div>
const NewProduct = () => <div>New Product</div>

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
                  id: 'products',
                  label: 'Products',
                  icon: <ShoppingCart />,
                  children: [
                    {
                      id: 'all-products',
                      label: 'All Products',
                      path: '/products/all'
                    },
                    {
                      id: 'categories',
                      label: 'Categories',
                      path: '/products/categories'
                    },
                    {
                      id: 'new-product',
                      label: 'New Product',
                      path: '/products/new'
                    }
                  ]
                }
              ]}
              defaultExpanded={['products']}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/all" element={<AllProducts />} />
          <Route path="products/categories" element={<Categories />} />
          <Route path="products/new" element={<NewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

---

## State-Based with Submenus (No Router)

```tsx
import { SidebarLayout } from '@gofreego/tsutils/components'

function App() {
  return (
    <SidebarLayout
      menuItems={[
        {
          id: 'home',
          label: 'Home',
          component: <HomePage />
        },
        {
          id: 'tools',
          label: 'Tools',
          icon: <BuildIcon />,
          children: [
            {
              id: 'calculator',
              label: 'Calculator',
              component: <Calculator />
            },
            {
              id: 'converter',
              label: 'Unit Converter',
              component: <Converter />
            }
          ]
        }
      ]}
      defaultSelected="home"
      defaultExpanded={['tools']}
    />
  )
}
```

---

## Controlling Expand/Collapse State

The component manages expand/collapse state internally, but you can control the default state:

```tsx
<SidebarLayout
  menuItems={menuItems}
  // These menu item IDs will be expanded by default
  defaultExpanded={['products', 'admin', 'users']}
/>
```

---

## Features

### ✅ **Automatic Indentation**
- Submenus are automatically indented based on nesting depth
- Each level adds 16px of left padding (`depth * 2`)

### ✅ **Expand/Collapse Icons**
- Uses Material UI's `ExpandMore` and `ExpandLess` icons
- Icon automatically changes based on expand state

### ✅ **Smooth Animations**
- Uses Material UI's `Collapse` component
- Automatic smooth transition with `timeout="auto"`

### ✅ **Recursive Support**
- Supports unlimited nesting levels
- Each submenu can have its own submenus

### ✅ **Parent Items**
- Parent items (items with children) are not clickable
- Only leaf items (items without children) are navigable

### ✅ **Active State Tracking**
- Works with nested items in both router and state modes
- Automatically finds and highlights active item in nested structure

---

## Props

### `SidebarLayoutProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `menuItems` | `MenuItem[]` | required | Array of menu items with optional children |
| `defaultExpanded` | `string[]` | `[]` | Array of menu item IDs to expand by default |
| `sidebarWidth` | `string \| number` | `250` | Width of the sidebar |
| `defaultSelected` | `string` | First item | Default selected item (state mode) |
| `onMenuChange` | `(id: string) => void` | - | Callback when menu changes |

### `MenuItem` (Updated)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier |
| `label` | `string` | ✅ | Display label |
| `icon` | `ReactNode` | ❌ | Optional icon element |
| `path` | `string` | ❌ | Route path (for router mode) |
| `component` | `ReactNode` | ❌ | Component to render (state mode) |
| `children` | `MenuItem[]` | ❌ | **NEW**: Optional submenu items |

---

## Styling

### Custom Submenu Styles

You can customize submenu appearance using MUI's `sx` prop or CSS:

```tsx
<SidebarLayout
  menuItems={menuItems}
  sidebarStyle={{
    '& .MuiCollapse-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.02)', // Light background for submenus
    }
  }}
/>
```

### Indentation Customization

The indentation is calculated as `pl: 2 + depth * 2` (in theme spacing units). To customize:

```css
/* Increase indentation */
.sidebar .MuiListItemButton-root[style*="padding-left"] {
  /* Custom styling */
}
```

---

## Best Practices

1. **Limit Nesting Depth**: Keep nesting to 2-3 levels maximum for better UX
2. **Use Icons**: Icons help users identify menu sections quickly
3. **Default Expansion**: Expand active sections by default
4. **Clear Labels**: Use descriptive labels for nested items
5. **Consistent Structure**: Keep similar items at the same nesting level

---

## Migration from Flat Menus

If you have existing flat menu items:

**Before:**
```tsx
menuItems={[
  { id: 'products-all', label: 'All Products', path: '/products/all' },
  { id: 'products-categories', label: 'Categories', path: '/products/categories' }
]}
```

**After:**
```tsx
menuItems={[
  {
    id: 'products',
    label: 'Products',
    icon: <ShoppingCart />,
    children: [
      { id: 'products-all', label: 'All Products', path: '/products/all' },
      { id: 'products-categories', label: 'Categories', path: '/products/categories' }
    ]
  }
]}
```

---

## Troubleshooting

### Submenus Not Expanding

- Ensure `defaultExpanded` contains the parent menu item ID
- Check that menu items have the `children` property
- Verify the `id` in `defaultExpanded` matches the parent item's `id`

### Active State Not Working with Submenus

- In router mode: Ensure nested routes are properly configured
- In state mode: Ensure leaf items (not parents) have the `component` property
- Parent items with `children` are not selectable by design

### Icons Not Showing

- Import `ExpandMore` and `ExpandLess` from `@mui/icons-material`
- These are automatically added by the component
- Custom icons go in the `icon` property of `MenuItem`
