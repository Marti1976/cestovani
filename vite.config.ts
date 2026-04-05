import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // This setting is crucial for deploying to a sub-path on GitHub Pages.
  // It tells Vite to prefix all asset paths with '/cestovani/' only when building on GitHub.
  // Otherwise, it uses the root path '/' for local development and AI Studio previews.
  base: process.env.GITHUB_ACTIONS ? '/cestovani/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    }
  }
});
