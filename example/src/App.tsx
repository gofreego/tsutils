import { ThemeProvider, SidebarLayout, NotificationProvider } from '@gofreego/tsutils'
import {
  Home,
  Palette,
  Menu as MenuIcon,
  NotificationsActive,
} from '@mui/icons-material'

// Import component demo pages
import HomePage from './pages/HomePage'
import ThemeDemo from './pages/ThemeDemo'
import SidebarDemo from './pages/SidebarDemo'
import ReadmeViewerDemo from './pages/ReadmeViewerDemo'
import NotificationDemo from './pages/NotificationDemo'

function App() {
  return (
    <ThemeProvider initialMode="system" enableCssVariables={true}>
      <NotificationProvider>
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
              id: 'notifications',
              label: 'Notifications',
              path: '/notifications',
              icon: <NotificationsActive />,
              component: <NotificationDemo />
            },
            {
              id: 'readme-viewer',
              label: 'Readme Viewer',
              path: '/readme-viewer',
              icon: <MenuIcon />,
              component: <ReadmeViewerDemo />
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
      </NotificationProvider>
    </ThemeProvider >
  )
}

export default App
