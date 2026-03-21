# 🚀 Quick Start Guide - Running the Example

This guide will help you quickly test and visualize the TSUtils components before publishing.

## One-Command Quick Start

From the root directory, run:

```bash
# Using npm
npm run example

# OR using Make (recommended)
make example
```

This will:
1. ✅ Build the library
2. ✅ Install example dependencies
3. ✅ Start the development server
4. 🌐 Open the demo at http://localhost:3000

---

## Step-by-Step Instructions

### Option 1: Quick Start (Recommended)

```bash
# From the root directory
npm run example
```

Wait for the browser to open, then explore the demo!

### Option 2: Manual Steps

If you prefer to run steps individually:

```bash
# 1. Build the library
npm run build

# 2. Install example dependencies
npm run example:install

# 3. Run the example
npm run example:dev
```

### Option 3: Develop Library and Example Together

For active library development with live updates:

```bash
# Terminal 1: Watch library changes
npm run dev

# Terminal 2: Run example
npm run example:dev
```

The example will automatically reload when library files change!

---

## What You'll See

### 🏠 Dashboard (Home Page)
- Welcome screen with statistics cards
- Theme toggle button in top-right
- Overview of library features

### 📦 Products (Nested Menu)
Expand to see:
- **All Products** - Table with product inventory
- **Categories** - Grid of product categories

### 👥 Administration (Nested Menu)
Expand to see:
- **Users** - User management page
- **Reports** - Analytics and metrics

### 🎨 Component Demos (Nested Menu)
Expand to see:
- **Theme Demo** - Test light/dark/system modes, view color palette
- **Button Demo** - Explore button variants, sizes, and styling

### ⚙️ Settings
- Configuration page with toggle switches

---

## Testing the Components

### Test SidebarLayout
1. ✅ Click menu items to navigate
2. ✅ Expand/collapse submenu sections
3. ✅ Notice active state highlighting
4. ✅ Try browser back/forward buttons
5. ✅ Check URL changes with navigation

### Test Theme System
1. ✅ Go to "Component Demos → Theme Demo"
2. ✅ Click theme toggle (top-right moon/sun icon)
3. ✅ Switch between Light/Dark/System modes
4. ✅ See all colors update automatically
5. ✅ View CSS variables in DevTools

### Test Nested Menus
1. ✅ Click "Products" to expand submenu
2. ✅ Click "Administration" to see nested items
3. ✅ Notice indentation for nested levels
4. ✅ See expand/collapse icons

---

### Using Make (Recommended)

| Command | Description |
|---------|-------------|
| `make example` | Build library + install + run example |
| `make example-dev` | Run example only (library must be built) |
| `make example-install` | Install example dependencies |
| `make example-build` | Build example for production |
| `make build` | Build the library |
| `make dev` | Watch library changes |
| `make clean` | Clean build files |

### Using npm

## Available Commands
### Using Make

| Command | Description |
|---------|-------------|
| `make run` | Build library + install + start dev server |
| `make dev` | Start development server |
| `make build` | Build for production |
| `make preview` | Preview production build |
| `make clean` | Clean build files |

### Using npm


From the **root directory**:

| Command | Description |
|---------|-------------|
| `npm run example` | Build library + run example (one command!) |
| `npm run example:dev` | Run example only (library must be built first) |
| `npm run example:install` | Install example dependencies |
| `npm run example:build` | Build example for production |
| `npm run build` | Build the library |
| `npm run dev` | Watch library changes (for development) |

From the **example directory** (`cd example`):

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Troubleshooting

### ❌ "Cannot find module '@gofreego/tsutils'"

**Solution:**
```bash
# Build the library first
npm run build

# Then try again
npm run example:dev
```

### ❌ "Port 3000 is already in use"

**Solution:**
Edit `example/vite.config.ts` and change the port:
```ts
server: {
  port: 3001, // or any available port
}
```

### ❌ "npm ERR! missing script: example"

**Solution:**
You might be in the wrong directory. Make sure you're in the root `tsutils` directory, not the `example` subdirectory.

### ❌ Theme not working / CSS variables not applying

**Solution:**
Check that:
1. ThemeProvider wraps your app ✅
2. `enableCssVariables={true}` is set ✅
3. Clear browser cache and hard reload (Ctrl+Shift+R)

### ❌ Components look broken

**Solution:**
1. Ensure Material UI dependencies are installed in example:
   ```bash
   cd example
   npm install
   ```
2. Clear `node_modules` and reinstall:
   ```bash
   cd example
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Development Workflow

### Making Changes to Components

1. **Edit component** in `src/components/`
2. **Rebuild library**: `npm run build` (or use `npm run dev` to watch)
3. **Reload example**: Browser will auto-reload
4. **Test changes** in the demo

### Adding New Demo Pages

1. Create page in `example/src/pages/`
2. Import in `example/src/App.tsx`
3. Add menu item to `SidebarLayout`
4. Add route in `<Routes>`

---

## Browser DevTools Tips

### Check CSS Variables
1. Open DevTools (F12)
2. Go to Elements/Inspector tab
3. Select `<html>` element
4. Look for CSS variables in Styles panel
5. You should see `--color-primary`, `--spacing-md`, etc.

### Check Theme Data Attribute
Look for `data-theme="light"` or `data-theme="dark"` on the `<html>` element.

### Network Tab
Check that the library is loading from the local build:
- Should see `index.mjs` from `dist/` folder

---

## Next Steps

After testing:

1. ✅ **Components look good?** → Ready to publish!
2. ❌ **Found issues?** → Fix in `src/`, rebuild, test again
3. 📝 **Need more examples?** → Add pages to `example/src/pages/`
4. 🎨 **Theme adjustments?** → Edit `src/theme/light.ts` or `dark.ts`

---

## Questions?

- 📖 Read the [main README](../README.md)
- 📘 Check [component documentation](../SIDEBAR_LAYOUT_EXAMPLES.md)
- 🎨 Review [CSS Variables Guide](../CSS_VARIABLES_GUIDE.md)

Happy testing! 🎉
