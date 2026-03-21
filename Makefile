.PHONY: help install build dev clean example example-dev example-install example-build test typecheck publish

# Default target
help:
	@echo "TSUtils Library - Available Commands:"
	@echo ""
	@echo "Library Commands:"
	@echo "  make install      - Install library dependencies"
	@echo "  make build        - Build the library"
	@echo "  make dev          - Watch and rebuild on changes"
	@echo "  make typecheck    - Run TypeScript type checking"
	@echo "  make clean        - Clean build files"
	@echo "  make publish      - Prepare and publish to npm"
	@echo ""
	@echo "Example Project Commands:"
	@echo "  make example          - Build lib + install + run example"
	@echo "  make example-dev      - Run example dev server (lib must be built)"
	@echo "  make example-install  - Install example dependencies"
	@echo "  make example-build    - Build example for production"
	@echo ""

# Install library dependencies
install:
	@echo "📦 Installing library dependencies..."
	npm install

# Build the library
build:
	@echo "🔨 Building library..."
	npm run build

# Watch mode for development
dev:
	@echo "👀 Watching for changes..."
	npm run dev

# Type checking
typecheck:
	@echo "🔍 Type checking..."
	npm run typecheck

# Clean build files
clean:
	@echo "🧹 Cleaning build files..."
	npm run clean
	rm -rf dist .vite

# Publish to npm
publish: clean build
	@echo "📦 Publishing to npm..."
	npm publish

# Example project commands
example-install:
	@echo "📦 Installing example dependencies..."
	cd example && npm install

example-dev:
	@echo "🚀 Starting example development server..."
	cd example && npm run dev

example-build:
	@echo "🏗️  Building example for production..."
	cd example && npm run build

# Full example setup: build library, install dependencies, run dev server
example: build example-install
	@echo "✨ Starting example project..."
	cd example && npm run dev
