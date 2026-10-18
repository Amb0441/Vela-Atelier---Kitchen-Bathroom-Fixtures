import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

function pagesBase() {
  if (process.env.GITHUB_PAGES !== 'true') return '/';
  const repo = (process.env.GITHUB_REPOSITORY ?? '').split('/')[1] ?? '';
  if (!repo || repo.endsWith('.github.io')) return '/';
  return `/${repo}/`;
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
