import React, { useState, useEffect, ReactNode, CSSProperties } from 'react'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box,
  Typography,
  Collapse,
  IconButton
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

/**
 * Menu item configuration
 */
export interface MenuItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional icon element */
  icon?: ReactNode
  /** Route path (for router mode) */
  path?: string
  /** Component to render (for non-router mode) */
  component?: ReactNode
  /** Optional submenu items */
  children?: MenuItem[]
}

export interface SidebarLayoutProps {
  /** Array of menu items */
  menuItems: MenuItem[]
  /** Width of the sidebar */
  sidebarWidth?: string | number
  /** Additional CSS class for container */
  className?: string
  /** Default selected menu item ID (for non-router mode) */
  defaultSelected?: string
  /** Callback when menu changes */
  onMenuChange?: (id: string) => void
  /** Custom styles for container */
  style?: CSSProperties
  /** Custom styles for sidebar */
  sidebarStyle?: CSSProperties
  /** Custom styles for body */
  bodyStyle?: CSSProperties
  /** Default expanded submenu IDs */
  defaultExpanded?: string[]
}

/**
 * Detect if react-router-dom is available
 */
const detectRouter = () => {
  try {
    // Try to require react-router-dom
    const router = require('react-router-dom')
    return {
      available: true,
      NavLink: router.NavLink,
      Outlet: router.Outlet,
      useLocation: router.useLocation,
      Routes: router.Routes,
      Route: router.Route,
    }
  } catch {
    return { available: false }
  }
}

/**
 * Recursive menu item renderer for router mode
 */
const RouterMenuItem: React.FC<{
  item: MenuItem
  router: any
  depth?: number
  expanded: Set<string>
  onToggle: (id: string) => void
}> = ({ item, router, depth = 0, expanded, onToggle }) => {
  const { NavLink } = router
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expanded.has(item.id)

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component={hasChildren ? 'div' : NavLink}
          to={!hasChildren ? (item.path || `/${item.id}`) : undefined}
          onClick={hasChildren ? () => onToggle(item.id) : undefined}
          sx={{
            pl: 2 + depth * 2,
            '&.active': {
              backgroundColor: 'action.selected',
              color: 'primary.main',
              borderLeft: 3,
              borderColor: 'primary.main',
              fontWeight: 'medium',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            transition: 'all 0.15s',
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
            }}
          />
          {hasChildren && (
            <IconButton size="small" sx={{ p: 0 }}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <RouterMenuItem
                key={child.id}
                item={child}
                router={router}
                depth={depth + 1}
                expanded={expanded}
                onToggle={onToggle}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

/**
 * Helper to flatten menu items into routes
 */
const flattenMenuRoutes = (items: MenuItem[]): Array<{ path: string; component: ReactNode }> => {
  const routes: Array<{ path: string; component: ReactNode }> = []
  
  const flatten = (menuItems: MenuItem[]) => {
    for (const item of menuItems) {
      if (item.path && item.component) {
        routes.push({ path: item.path, component: item.component })
      }
      if (item.children) {
        flatten(item.children)
      }
    }
  }
  
  flatten(items)
  return routes
}

/**
 * Router-based Sidebar Layout Component
 */
const SidebarLayoutWithRouter: React.FC<SidebarLayoutProps & { router: any }> = ({
  menuItems,
  sidebarWidth = 250,
  className = '',
  onMenuChange,
  style,
  sidebarStyle,
  bodyStyle,
  defaultExpanded = [],
  router,
}) => {
  const { Outlet, useLocation, Routes, Route } = router
  const location = useLocation()
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded))

  const handleToggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    if (onMenuChange) {
      const findActiveItem = (items: MenuItem[]): MenuItem | undefined => {
        for (const item of items) {
          if (item.path && location.pathname === item.path) {
            return item
          }
          if (item.children) {
            const found = findActiveItem(item.children)
            if (found) return found
          }
        }
        return undefined
      }
      
      const activeItem = findActiveItem(menuItems)
      if (activeItem) {
        onMenuChange(activeItem.id)
      }
    }
  }, [location.pathname, menuItems, onMenuChange])

  // Check if menu items have components - if so, render routes internally
  const hasComponents = menuItems.some(item => 
    item.component || (item.children?.some(child => child.component))
  )

  const routes = hasComponents ? flattenMenuRoutes(menuItems) : []

  return (
    <Box 
      className={className}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        ...style,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            position: 'relative',
            borderRight: '1px solid',
            borderColor: 'divider',
            ...sidebarStyle,
          },
        }}
      >
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <RouterMenuItem
              key={item.id}
              item={item}
              router={router}
              expanded={expanded}
              onToggle={handleToggle}
            />
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          ...bodyStyle,
        }}
      >
        {hasComponents ? (
          <Routes>
            {routes.map(({ path, component }) => (
              <Route 
                key={path} 
                path={path} 
                element={component} 
              />
            ))}
          </Routes>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  )
}

/**
 * Recursive menu item renderer for state mode
 */
const StateMenuItem: React.FC<{
  item: MenuItem
  selectedId: string
  depth?: number
  expanded: Set<string>
  onToggle: (id: string) => void
  onClick: (id: string) => void
}> = ({ item, selectedId, depth = 0, expanded, onToggle, onClick }) => {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expanded.has(item.id)
  const isActive = item.id === selectedId

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id)
    } else {
      onClick(item.id)
    }
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          selected={isActive}
          onClick={handleClick}
          sx={{
            pl: 2 + depth * 2,
            '&.Mui-selected': {
              backgroundColor: 'action.selected',
              color: 'primary.main',
              borderLeft: 3,
              borderColor: 'primary.main',
              fontWeight: 'medium',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            transition: 'all 0.15s',
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText 
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
            }}
          />
          {hasChildren && (
            <IconButton size="small" sx={{ p: 0 }}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <StateMenuItem
                key={child.id}
                item={child}
                selectedId={selectedId}
                depth={depth + 1}
                expanded={expanded}
                onToggle={onToggle}
                onClick={onClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

/**
 * State-based Sidebar Layout Component (Fallback)
 */
const SidebarLayoutWithState: React.FC<SidebarLayoutProps> = ({
  menuItems,
  sidebarWidth = 250,
  className = '',
  defaultSelected,
  onMenuChange,
  style,
  sidebarStyle,
  bodyStyle,
  defaultExpanded = [],
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    defaultSelected || menuItems[0]?.id
  )
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded))

  const handleToggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleMenuClick = (id: string) => {
    setSelectedId(id)
    if (onMenuChange) {
      onMenuChange(id)
    }
  }

  const findActiveItem = (items: MenuItem[], id: string): MenuItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = findActiveItem(item.children, id)
        if (found) return found
      }
    }
    return undefined
  }

  const activeItem = findActiveItem(menuItems, selectedId)

  return (
    <Box 
      className={className}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        ...style,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            boxSizing: 'border-box',
            position: 'relative',
            borderRight: '1px solid',
            borderColor: 'divider',
            ...sidebarStyle,
          },
        }}
      >
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <StateMenuItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              expanded={expanded}
              onToggle={handleToggle}
              onClick={handleMenuClick}
            />
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 3,
          ...bodyStyle,
        }}
      >
        {activeItem?.component || (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            No content available for this menu item
          </Typography>
        )}
      </Box>
    </Box>
  )
}

/**
 * SidebarLayout Component
 * 
 * A flexible sidebar-body layout component built with Material UI that supports 
 * both router-based and state-based navigation with nested submenu support.
 * 
 * **Uses Material UI Components:**
 * - Drawer (permanent variant)
 * - List, ListItem, ListItemButton
 * - ListItemIcon, ListItemText
 * - Collapse (for submenus)
 * - Box for layout
 * 
 * **Features:**
 * - Nested submenu support with expand/collapse
 * - Material UI icons (ExpandMore/ExpandLess)
 * - Recursive rendering for deep nesting
 * - Automatic indentation based on depth
 * 
 * **Router Mode** (when react-router-dom is available):
 * - Uses NavLink for navigation
 * - Renders child routes via Outlet
 * - Supports URL-based navigation
 * - Browser back/forward works
 * 
 * **State Mode** (fallback):
 * - Uses internal state
 * - Renders components from menuItems
 * - Simple navigation without routing
 * 
 * @example
 * // With nested submenus
 * <SidebarLayout
 *   menuItems={[
 *     {
 *       id: 'products',
 *       label: 'Products',
 *       icon: <ShoppingCartIcon />,
 *       children: [
 *         { id: 'all-products', label: 'All Products', path: '/products/all' },
 *         { id: 'categories', label: 'Categories', path: '/products/categories' }
 *       ]
 *     },
 *     { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> }
 *   ]}
 *   defaultExpanded={['products']}
 * />
 * 
 * @example
 * // With React Router
 * <Routes>
 *   <Route path="/" element={
 *     <SidebarLayout menuItems={[
 *       { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
 *       { id: 'settings', label: 'Settings', path: '/settings', icon: <SettingsIcon /> }
 *     ]} />
 *   }>
 *     <Route path="dashboard" element={<Dashboard />} />
 *     <Route path="settings" element={<Settings />} />
 *   </Route>
 * </Routes>
 * 
 * @example
 * // Without React Router (State-based)
 * <SidebarLayout
 *   menuItems={[
 *     { id: 'dashboard', label: 'Dashboard', component: <Dashboard /> },
 *     { id: 'settings', label: 'Settings', component: <Settings /> }
 *   ]}
 *   defaultSelected="dashboard"
 * />
 */
export const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const router = detectRouter()

  // Use router mode if available and menuItems have paths
  const useRouterMode = router.available && props.menuItems.some(item => item.path)

  if (useRouterMode) {
    return <SidebarLayoutWithRouter {...props} router={router} />
  }

  return <SidebarLayoutWithState {...props} />
}
