import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  // Project Pages need the repo prefix. Dev stays at / so %BASE_URL% is not applied twice.
  base: command === 'build' ? '/avtosvet-workshop/' : '/',
  server: { port: 5173, open: false },
}))
