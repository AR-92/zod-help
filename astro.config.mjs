import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  base: '/',
  output: 'static',
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
  outDir: 'docs',
  devToolbar: {
    enabled: false,
  },
  vite: {
    optimizeDeps: {
      include: ['lucide-astro'],
    },
  },
});
