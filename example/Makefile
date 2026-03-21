.PHONY: help install dev build preview clean clean-all build-lib install-all run

# Default target
help:
	@echo "TSUtils Example - Available Commands:"
	@echo ""
	@echo "  make install      - Install example dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build example for production"
	@echo "  make preview      - Preview production build"
	@echo "  make clean        - Clean example build files"
	@echo ""
	@echo "  make build-lib    - Build the parent library"
	@echo "  make install-all  - Install library + example dependencies"
	@echo "  make run          - Build library + install + start dev server"
	@echo "  make clean-all    - Clean everything (lib + example)"
	@echo ""

# Install example dependencies only
install:
	@echo "📦 Installing example dependencies..."
	npm install

# Start development server
dev:
	@echo "🚀 Starting development server..."
	npm run dev

# Build example for production
build:
	@echo "🏗️  Building example for production..."
	npm run build

# Preview production build
preview:
	@echo "👀 Previewing production build..."
	npm run preview

# Clean example build files
clean:
	@echo "🧹 Cleaning example build files..."
	rm -rf dist node_modules/ .vite

# Build the parent library
build-lib:
	@echo "🔨 Building parent library..."
	cd .. && npm run build

# Install both library and example dependencies
install-all:
	@echo "📦 Installing library dependencies..."
	cd .. && npm install
	@echo "📦 Installing example dependencies..."
	npm install

# Full setup: build library, install dependencies, and start dev server
run: build-lib install
	@echo "✨ Everything is ready! Starting dev server..."
	npm run dev

# Clean everything
clean-all:
	@echo "🧹 Cleaning library build..."
	cd .. && rm -rf dist
	@echo "🧹 Cleaning example build..."
	rm -rf dist node_modules/.vite
