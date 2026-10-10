import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  const api = new URL(env.VITE_API_URL || 'http://localhost:5000/api');
  const proxy = Object.fromEntries(['sitemap.xml', 'robots.txt', 'llms.txt'].map(document => [`/${document}`, {
    target: api.origin, changeOrigin: true,
    rewrite: () => `${api.pathname.replace(/\/$/, '')}/public/${document}`,
  }]));
  return { plugins: [react()], server: { proxy } };
});
