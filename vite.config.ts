import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  ssgOptions: {
    /* Emit projects/index.html rather than projects.html, so the live URLs
       stay exactly /projects/ and /rosa-riad/ as they are today. */
    dirStyle: 'nested',
    formatting: 'none',
  },
});
