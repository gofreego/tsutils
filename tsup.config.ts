import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material', '@mui/icons-material', 'react-router-dom'],
  treeshake: true,
  minify: false,
})
