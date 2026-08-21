import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const resolveFromRoot = (p) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolveFromRoot('index.html'),
        privacy: resolveFromRoot('privacy.html'),
        terms: resolveFromRoot('terms.html'),
        resources: resolveFromRoot('resources.html'),
      },
    },
  },
})
