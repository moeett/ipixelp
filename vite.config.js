import { defineConfig } from 'vite'

export default defineConfig({
  // Build optimizations
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['lucide'],
          // Separate performance monitoring
          performance: ['./src/performance.js']
        }
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    cssCodeSplit: true, // Split CSS into separate files
    
    // Source maps for debugging (disable in production)
    sourcemap: false,
    
    // Target modern browsers for better optimization
    target: 'es2020'
  },
  
  // Development server optimizations
  server: {
    // Enable HTTP/2
    https: false,
    // Preload modules
    preTransformRequests: true
  },
  
  // CSS optimizations
  css: {
    // Enable CSS modules if needed
    modules: false,
    // PostCSS optimizations
    postcss: {
      plugins: [
        // Add autoprefixer and other PostCSS plugins here if needed
      ]
    }
  },
  
  // Dependency optimization
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: ['lucide'],
    // Exclude large dependencies from pre-bundling
    exclude: []
  },
  
  // Asset handling
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  
  // Plugin configurations
  plugins: [
    // Add plugins for further optimization
  ],
  
  // Preview server configuration
  preview: {
    port: 3000,
    strictPort: true
  }
})
