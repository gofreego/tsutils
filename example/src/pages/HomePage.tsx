import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTheme, ThemeToggle } from '@gofreego/tsutils'
import { Palette, SmartButton, Menu as MenuIcon } from '@mui/icons-material'

export default function HomePage() {
  const navigate = useNavigate()
  const { resolvedThemeMode } = useTheme()

  const components = [
    {
      name: 'Theme System',
      description: 'Light, Dark, and System theme modes with CSS variables',
      icon: <Palette sx={{ fontSize: 48 }} />,
      path: '/theme',
      color: '#8b5cf6'
    },
    {
      name: 'Sidebar Layout',
      description: 'Material UI sidebar with nested menus and router integration',
      icon: <MenuIcon sx={{ fontSize: 48 }} />,
      path: '/sidebar',
      color: '#3b82f6'
    },
    {
      name: 'Button',
      description: 'Customizable button component with variants and sizes',
      icon: <SmartButton sx={{ fontSize: 48 }} />,
      path: '/button',
      color: '#10b981'
    }
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            TSUtils Component Library
          </Typography>
          <Typography variant="body1" color="text.secondary">
            React + TypeScript utilities and components. Current theme: <strong>{resolvedThemeMode}</strong>
          </Typography>
        </Box>
        <ThemeToggle showTooltip={true} />
      </Box>

      <Typography variant="h5" fontWeight="medium" sx={{ mb: 3, mt: 5 }}>
        Component Demos
      </Typography>

      <Grid container spacing={3}>
        {components.map((component) => (
          <Grid item xs={12} md={6} lg={4} key={component.name}>
            <Card 
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardActionArea 
                onClick={() => navigate(component.path)}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      margin: '0 auto',
                      borderRadius: 2,
                      backgroundColor: `${component.color}20`,
                      color: component.color,
                      mb: 2
                    }}
                  >
                    {component.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {component.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {component.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          📦 About TSUtils
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          A comprehensive React + TypeScript library with:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <Typography variant="body2" color="text.secondary">
              <strong>Theme System:</strong> Light/Dark/System modes with WCAG compliant colors and CSS variables
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              <strong>SidebarLayout:</strong> Flexible sidebar with nested menus and router integration
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              <strong>Components:</strong> Reusable UI components built with Material UI
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              <strong>Utilities:</strong> Helper functions like debounce, throttle, formatDate, localStorage wrapper, and more
            </Typography>
          </li>
        </ul>
      </Box>
    </Box>
  )
}
