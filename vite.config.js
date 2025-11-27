import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Для JavaScript файлов
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        
        // Для остальных ресурсов (изображения, шрифты, CSS)
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          
          if (/png|jpe?g|jfif|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'images/[name]-[hash][extname]';
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return 'fonts/[name]-[hash][extname]';
          }
          
          if (/css/i.test(extType)) {
            return 'css/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})