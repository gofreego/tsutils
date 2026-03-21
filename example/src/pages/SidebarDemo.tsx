import { Box, Typography, Paper, Divider, Alert } from '@mui/material'
import { Code } from '@mui/icons-material'

export default function SidebarDemo() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        SidebarLayout Component
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        A flexible sidebar-body layout with Material UI components
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <strong>You're using it right now!</strong> This demo app is built with the SidebarLayout component.
      </Alert>

      {/* Features */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          ✨ Features
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li><Typography variant="body2" sx={{ mb: 1 }}>Material UI Drawer-based sidebar</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>Nested submenu support with expand/collapse</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>React Router integration (automatic NavLink detection)</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>State-based mode as fallback (without router)</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>Automatic active state highlighting</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>Theme-aware (uses MUI theme tokens)</Typography></li>
          <li><Typography variant="body2" sx={{ mb: 1 }}>Customizable sidebar width and styling</Typography></li>
        </ul>
      </Paper>

      {/* Basic Usage */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
          Basic Usage
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          component="pre"
          sx={{
            backgroundColor: 'action.hover',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem'
          }}
        >
          <code>{`import { SidebarLayout } from '@gofreego/tsutils/components'
import { Home, Settings } from '@mui/icons-material'

<SidebarLayout
  menuItems={[
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: <Home />
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings />
    }
  ]}
  sidebarWidth={260}
/>`}</code>
        </Box>
      </Paper>

      {/* Nested Menus */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <Code sx={{ mr: 1, verticalAlign: 'middle' }} />
          Nested Submenus
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          component="pre"
          sx={{
            backgroundColor: 'action.hover',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem'
          }}
        >
          <code>{`<SidebarLayout
  menuItems={[
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
        }
      ]
    }
  ]}
  defaultExpanded={['products']}
/>`}</code>
        </Box>
      </Paper>

      {/* Props */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          📋 Props
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px' }}><code>menuItems</code></td>
                <td style={{ padding: '12px' }}><code>MenuItem[]</code></td>
                <td style={{ padding: '12px' }}>Array of menu items (required)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px' }}><code>sidebarWidth</code></td>
                <td style={{ padding: '12px' }}><code>string | number</code></td>
                <td style={{ padding: '12px' }}>Width of sidebar (default: 250)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px' }}><code>defaultExpanded</code></td>
                <td style={{ padding: '12px' }}><code>string[]</code></td>
                <td style={{ padding: '12px' }}>IDs of expanded menus by default</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px' }}><code>onMenuChange</code></td>
                <td style={{ padding: '12px' }}><code>(id) =&gt; void</code></td>
                <td style={{ padding: '12px' }}>Callback when menu changes</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  )
}
