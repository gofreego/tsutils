import { ThemeProvider, SidebarLayout } from '@gofreego/tsutils'
import {
  Home,
  Palette,
  Menu as MenuIcon,
} from '@mui/icons-material'

// Import component demo pages
import HomePage from './pages/HomePage'
import ThemeDemo from './pages/ThemeDemo'
import SidebarDemo from './pages/SidebarDemo'

function App() {
  return (
    <ThemeProvider initialMode="system" enableCssVariables={true}>
      <SidebarLayout
        isRouter={true}
        menuItems={[
          {
            id: 'home',
            label: 'Home',
            path: '/',
            icon: <Home />,
            component: <HomePage />,
          },
          {
            id: 'theme',
            label: 'Theme System',
            path: '/theme',
            icon: <Palette />,
            component: <ThemeDemo />
          },
          {
            id: 'sidebar',
            label: 'Sidebar Layout',
            icon: <MenuIcon />,
            children: [
              {
                id: 'submenu',
                label: 'Submenu',
                path: '/sidebar',
                icon: <MenuIcon />,
                component: <SidebarDemo />
              }
            ]
          },
        ]}
        sidebarWidth={260}
      />
    </ThemeProvider >
  )
}

export default App
