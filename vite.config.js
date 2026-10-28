import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aeoVitePlugin } from 'aeo.js/vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [
    react(),
    aeoVitePlugin({
      title: 'Youssef Elsaid - Software Engineer & AI Architect | pplo.dev',
      url: 'https://pplo.dev',
      description:
        'Youssef Elsaid (pplo) — Software Engineer & AI Architect from Alexandria, Egypt. 10+ years specializing in Python, Machine Learning, and scalable full-stack web applications.',
      schema: {
        enabled: true,
        organization: {
          name: 'Youssef Elsaid',
          url: 'https://pplo.dev',
          logo: 'https://s6.imgcdn.dev/YBxHLg.png',
          sameAs: [
            'https://github.com/youssef-pplo',
            'https://instagram.com/pplo.dev',
          ],
        },
        defaultType: 'WebPage',
      },
      widget: {
        enabled: false,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Ensure we resolve .tsx and .ts files
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
