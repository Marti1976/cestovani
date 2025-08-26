import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  // This setting is crucial for deploying to a sub-path on GitHub Pages.
  // It tells Vite to prefix all asset paths with '/cestovani/'.
  base: '/cestovani/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    }
  }
});
