import { BlogPost } from '../types/blog';
import { cities } from '../data/cities';

const SITE_URL = 'https://crechelegal.com.br';

export const generateSitemap = (posts: BlogPost[]): string => {
  const today = new Date().toISOString();
  
  const staticUrls = [
    {
      url: '/',
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: '/blog',
      changefreq: 'daily',
      priority: '0.8'
    }
  ];

  // Add city pages
  cities.forEach(city => {
    staticUrls.push({
      url: `/cidade/${city.slug}`,
      changefreq: 'weekly',
      priority: '0.7'
    });

    // Add neighborhood pages
    city.regions.forEach(region => {
      region.neighborhoods.forEach(neighborhood => {
        staticUrls.push({
          url: `/cidade/${city.slug}/${encodeURIComponent(neighborhood.toLowerCase())}`,
          changefreq: 'weekly',
          priority: '0.6'
        });
      });
    });
  });

  // Add blog posts
  const postUrls = posts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: '0.5'
  }));

  const allUrls = [...staticUrls, ...postUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};