import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'

export default defineConfig({
  test: {
    env: loadEnv('', process.cwd(), ''),
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
