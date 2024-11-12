import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      {
        name: 'generate-sitemap',
        closeBundle: async () => {
          if (mode === 'production') {
            // Ensure the dist directory exists
            const distDir = path.resolve(__dirname, 'dist');
            if (!fs.existsSync(distDir)) {
              fs.mkdirSync(distDir);
            }

            // Create a basic sitemap
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://crechelegal.com.br/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://crechelegal.com.br/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

            // Write sitemap to dist folder
            fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
          }
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'firebase': ['firebase/app', 'firebase/database']
          }
        }
      }
    },
    define: {
      'process.env': env
    }
  };
});