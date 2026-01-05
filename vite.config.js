import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
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
    // Minificación con esbuild (más rápido que terser)
    minify: 'esbuild',
    
    // Target moderno para mejor tree-shaking
    target: 'esnext',
    
    // Code splitting optimizado
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks separados
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-router': ['react-router-dom'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
    
    // Output directory
    outDir: 'build_output',
    
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
