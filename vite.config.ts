import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base works on both GitHub Pages (project subpath) and Vercel (domain root).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
