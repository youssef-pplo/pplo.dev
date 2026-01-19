import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Ensure we resolve .tsx and .ts files
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
