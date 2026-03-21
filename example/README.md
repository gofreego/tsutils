# TSUtils Component Demo

This is a live demonstration of the `@gofreego/tsutils` library components.

## Features Demonstrated

### 🎨 Theme System
- **ThemeProvider** with light/dark/system modes
- **ThemeToggle** button for switching themes
- **CSS Variables** auto-injection for easy styling
- WCAG compliant color schemes

### 📱 SidebarLayout Component
- Material UI Drawer-based sidebar
- Nested submenu support with expand/collapse
- React Router integration for navigation
- Automatic active state management
- Smooth animations and transitions

### 🎯 Button Component
- Button component with variants and sizes
- Integrates with the theme system

## Prerequisites

Make sure you have:
- Node.js 16+ installed
- npm or yarn package manager

## Getting Started

### 1. Build the Library

First, build the tsutils library from the parent directory:

```bash
cd ..
npm install
npm run build

# OR using Make
cd ..
make build
```

### 2. Install Example Dependencies

```bash
cd example
npm install

# OR using Make
make install
```

### 3. Run the Development Server

```bash
npm run dev

# OR using Make
make dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Quick Start (All-in-One)

```bash
# From the example directory
make run

# OR from the root directory
make example
```

## What to Explore

### Home Page
- Overview of all available components
- Click on any component card to see its demo
- Theme toggle button in the top-right corner

### Component Demos

1. **Theme System Demo**
   - Switch between Light, Dark, and System modes
   - View the color palette
   - See CSS variables in action
   - Test theme persistence

2. **Sidebar Layout Demo**
   - You're using it right now!
   - See the sidebar navigation
   - Check the code examples
   - Review available props and features

3. **Button Demo**
   - Explore different button variants (primary, secondary, outline)
   - Test various sizes (small, medium, large)
   - See buttons with icons
   - Learn about custom styling with CSS variables

## Project Structure

\`\`\`
example/
├── src/
│   ├── pages/           # Component demo pages
│   │   ├── HomePage.tsx        # Landing page with component cards
│   │   ├── ThemeDemo.tsx       # Theme system demonstration
│   │   ├── SidebarDemo.tsx     # Sidebar layout examples
│   │   └── ButtonDemo.tsx      # Button component showcase
│   ├── App.tsx          # Main app with SidebarLayout
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
└── vite.config.ts
\`\`\`

## Key Code Snippets

### Using SidebarLayout with Router

\`\`\`tsx
import { SidebarLayout } from '@gofreego/tsutils/components'

<SidebarLayout
  menuItems={[
    {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: <Home />
    },
    {
      id: 'theme',
      label: 'Theme System',
      path: '/theme',
      icon: <Palette />
    }
  ]}
  sidebarWidth={260}
/>
\`\`\`

### Using ThemeProvider

\`\`\`tsx
import { ThemeProvider } from '@gofreego/tsutils/theme'

<ThemeProvider initialMode="system" enableCssVariables={true}>
  <App />
</ThemeProvider>
\`\`\`

### Using CSS Variables

\`\`\`tsx
<button
  style={{
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
  }}
>
  Themed Button
</button>
\`\`\`

## Building for Production

```bash
npm run build

# OR using Make
make build
```

Preview the production build:

```bash
npm run preview

# OR using Make
make preview
```

## Available Commands

### Using Make (Recommended)

| Command | Description |
|---------|-------------|
| `make run` | Build library + install + start dev server |
| `make dev` | Start development server |
| `make build` | Build for production |
| `make preview` | Preview production build |
| `make install` | Install dependencies |
| `make clean` | Clean build files |
| `make build-lib` | Build parent library only |
| `make help` | Show all available commands |

### Using npm

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Troubleshooting

### Library not found
If you see module resolution errors:
1. Make sure you built the parent library: `cd .. && npm run build`
2. Delete and reinstall: `rm -rf node_modules && npm install`

### Port already in use
If port 3000 is busy, modify `vite.config.ts`:
\`\`\`ts
server: {
  port: 3001, // Change port
}
\`\`\`

### Theme not applying
- Check that ThemeProvider wraps your app
- Verify `enableCssVariables={true}` is set
- Open browser DevTools and check if CSS variables are present on the `:root` element

## Learn More

- [TSUtils Documentation](../README.md)
- [SidebarLayout Examples](../SIDEBAR_LAYOUT_EXAMPLES.md)
- [Submenu Examples](../SIDEBAR_SUBMENU_EXAMPLES.md)
- [CSS Variables Guide](../CSS_VARIABLES_GUIDE.md)
- [Theme Toggle Example](../THEME_TOGGLE_EXAMPLE.md)

## License

MIT
