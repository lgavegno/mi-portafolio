import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { imagetools } from 'vite-imagetools'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],

  // Alias para imports más limpios
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@config': resolve(__dirname, './src/config'),
      '@data': resolve(__dirname, './src/data'),
    },
  },

  // Optimizaciones de build
  build: {
    // Output directory
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',

    // Configuración de Rollup para chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'react-router-dom', 'react-helmet-async'],
          ui: ['react-icons'],
        }
      }
    },

    // Minificación con esbuild (más rápido que terser)
    minify: 'esbuild',

    // Target moderno para mejor tree-shaking
    target: 'esnext',

    // Reportar tamaño de chunks
    reportCompressedSize: true,

    // Límite de advertencia de chunk (500kb)
    chunkSizeWarningLimit: 500,

    // CSS code splitting
    cssCodeSplit: true,
  },

  // Optimizaciones de desarrollo
  server: {
    // Hot Module Replacement
    hmr: true,

    // Puerto por defecto
    port: 5173,

    // Abrir navegador automáticamente
    open: true,
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-icons/fi',
      'react-icons/fa',
    ],
    // Excluir dependencias que no necesitan pre-bundling
    exclude: [],
  },

  // Configuración de esbuild
  esbuild: {
    // Eliminar console.log en producción
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
