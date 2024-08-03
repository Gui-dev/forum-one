import { defineConfig } from 'vitest/config'
import vitePaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [vitePaths()],
  test: {
    globals: true
  }
})