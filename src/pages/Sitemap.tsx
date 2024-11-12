import React, { useEffect } from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { generateSitemap } from '../utils/sitemap';

const Sitemap = () => {
  const { posts, loading, error } = useBlogPosts();

  useEffect(() => {
    if (!loading && !error && posts.length > 0) {
      const sitemap = generateSitemap(posts);
      
      // Set content type to XML
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Set response headers
      document.contentType = 'application/xml';
      
      // Write the XML content directly
      document.write(sitemap);
      document.close();
      
      // Clean up
      URL.revokeObjectURL(url);
    }
  }, [posts, loading, error]);

  // Return null since we're writing the XML directly
  return null;
};

export default Sitemap;