# Makefile Quick Reference

This project includes Makefiles for convenient command execution.

## 🚀 Quick Start

```bash
# From root directory - Run everything in one command
make example
```

---

## 📂 Root Directory Commands

From `/tsutils` directory:

### Library Management
```bash
make install      # Install library dependencies
make build        # Build the library
make dev          # Watch and rebuild on changes
make typecheck    # Run TypeScript type checking
make clean        # Clean build files
```

### Example Project
```bash
make example          # Build lib + install + run example (all-in-one)
make example-dev      # Run example dev server only
make example-install  # Install example dependencies
make example-build    # Build example for production
```

### Publishing
```bash
# patch: 0.1.19 → 0.1.20
npm version patch

# minor: 0.1.19 → 0.2.0
npm version minor

# major: 0.1.19 → 1.0.0
npm version major

make publish      # Clean + build + publish to npm
```

### Help
```bash
make help         # Show all available commands
```

---

## 📂 Example Directory Commands

From `/tsutils/example` directory:

### Development
```bash
make run          # Build parent lib + install + start dev server
make dev          # Start development server
make install      # Install dependencies
```

### Building
```bash
make build        # Build for production
make preview      # Preview production build
```

### Maintenance
```bash
make build-lib    # Build parent library only
make clean        # Clean example build files
make clean-all    # Clean everything (lib + example)
```

### Help
```bash
make help         # Show all available commands
```

---

## 📋 Common Workflows

### First Time Setup
```bash
# From root directory
make install          # Install library dependencies
make build            # Build the library
make example-install  # Install example dependencies
make example-dev      # Run the example
```

Or just:
```bash
make example          # Does all of the above!
```

### Daily Development

**Working on the library:**
```bash
# Terminal 1: Watch library changes
make dev

# Terminal 2: Run example
make example-dev
```

**Only working on example:**
```bash
cd example
make dev
```

### Testing Components
```bash
make example          # Build + run everything
```

### Before Publishing
```bash
make typecheck        # Check for type errors
make build            # Build the library
make example-build    # Ensure example builds correctly
```

### Publishing
```bash
make publish          # Publishes to npm
```

---

## 🆚 Make vs npm

Both work! Choose what you prefer:

| Task | Make | npm |
|------|------|-----|
| Run example | `make example` | `npm run example` |
| Build library | `make build` | `npm run build` |
| Dev mode | `make dev` | `npm run dev` |

**Benefits of Make:**
- Shorter commands
- Clear, consistent interface
- Works across directories
- Shows what's happening with echo messages

**Benefits of npm:**
- No additional tools required
- Standard Node.js workflow
- Cross-platform (Make needs to be installed on Windows)

---

## 🔧 Installation

### macOS/Linux
Make is usually pre-installed. Verify with:
```bash
make --version
```

### Windows
Install via:
- [Chocolatey](https://chocolatey.org/): `choco install make`
- [Scoop](https://scoop.sh/): `scoop install make`
- [Git Bash](https://gitforwindows.org/) includes Make
- WSL (Windows Subsystem for Linux)

---

## 💡 Tips

1. **See all commands:** Run `make help` or just `make` (shows help by default)

2. **Tab completion:** Most shells support tab completion for Make targets

3. **Parallel execution:** Make can run tasks in parallel (though our Makefiles run sequentially for clarity)

4. **Custom targets:** Easily add your own targets to the Makefile

5. **Documentation:** Comments in Makefile explain what each target does

---

## 📝 Examples

### Example 1: Fresh Start
```bash
# Install everything and run
make example
```

### Example 2: Rebuild Library After Changes
```bash
# From root
make build
cd example
make dev
```

### Example 3: Clean Everything and Restart
```bash
# From example directory
make clean-all
cd ..
make example
```

### Example 4: Prepare for Production
```bash
# From root
make typecheck
make build
make example-build
```

---

## 🐛 Troubleshooting

**"make: command not found"**
- Install Make (see Installation section above)
- Or use npm commands instead

**"No rule to make target"**
- You might be in the wrong directory
- Run `make help` to see available commands

**Commands not working**
- Ensure you're in the correct directory (root vs example)
- Check that dependencies are installed: `make install`

---

## 📚 Learn More

- [GNU Make Manual](https://www.gnu.org/software/make/manual/)
- [Makefile Tutorial](https://makefiletutorial.com/)
- View the Makefiles: [Root Makefile](Makefile), [Example Makefile](example/Makefile)
