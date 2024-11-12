import express from 'express';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { generateSitemap } from '../utils/sitemap';
import { BlogPost } from '../types/blog';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    // Fetch all blog posts
    const postsRef = ref(db, 'blog_posts');
    const snapshot = await get(postsRef);
    const posts: BlogPost[] = [];

    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.entries(data).forEach(([id, rawPost]: [string, any]) => {
        const postData = rawPost.post1 || rawPost.post2 || rawPost;
        posts.push({
          id,
          slug: postData.slug || id,
          title: postData.title,
          excerpt: postData.excerpt || '',
          image: postData.image || '',
          date: postData.date || new Date().toISOString().split('T')[0],
          author: postData.author || '',
          readTime: postData.readTime || 5,
          keywords: Array.isArray(postData.keywords) ? postData.keywords : [],
          content: postData.content || '',
          categoryId: postData.categoryId
        });
      });
    }

    // Generate sitemap
    const sitemap = generateSitemap(posts);

    // Set headers
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    
    // Send response
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;