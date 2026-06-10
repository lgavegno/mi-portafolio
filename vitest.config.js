import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    // Test framework
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js'],

    // Coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      lines: 70,        // Phase 2 target: 70% coverage
      functions: 70,
      branches: 65,
      statements: 70,
      exclude: [
        'node_modules/',
        'dist/',
        'src/__tests__/',
        '**/*.test.js',
        '**/*.spec.js',
        '**/index.js',    // Entry files
        'src/main.jsx',
        'src/App.jsx',
      ],
    },

    // Include/exclude patterns
    include: ['src/**/*.test.{js,jsx}', 'src/**/*.spec.{js,jsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // Test timeout
    testTimeout: 10000,

    // CSS handling
    css: true,

    // Module resolution
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@config': resolve(__dirname, './src/config'),
      '@data': resolve(__dirname, './src/data'),
      '@pages': resolve(__dirname, './src/pages'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@config': resolve(__dirname, './src/config'),
      '@data': resolve(__dirname, './src/data'),
      '@pages': resolve(__dirname, './src/pages'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
})
