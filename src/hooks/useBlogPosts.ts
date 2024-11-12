import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { BlogPost, BlogCategory } from '../types/blog';

const normalizePost = (id: string, rawPost: any, categories: BlogCategory[]): BlogPost | null => {
  try {
    // Get the actual post data, handling potential nesting
    const postData = rawPost.post1 || rawPost.post2 || rawPost.post3 || rawPost;

    // Basic validation
    if (!postData.title || !postData.content) {
      console.warn(`Post ${id} missing required fields`);
      return null;
    }

    // Handle keywords that might be objects or arrays
    let keywords: string[] = [];
    if (postData.keywords) {
      if (Array.isArray(postData.keywords)) {
        keywords = postData.keywords;
      } else if (typeof postData.keywords === 'object') {
        keywords = Object.values(postData.keywords);
      }
    }

    // Find category if categoryId exists
    const category = postData.categoryId ? 
      categories.find(c => c.id === postData.categoryId) : 
      undefined;

    // Ensure date is in correct format
    const date = postData.date ? new Date(postData.date).toISOString().split('T')[0] : 
                                new Date().toISOString().split('T')[0];

    return {
      id,
      slug: postData.slug || id,
      title: postData.title,
      excerpt: postData.excerpt || postData.content.substring(0, 150) + '...',
      image: postData.image || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
      date,
      author: postData.author || 'Autor',
      readTime: postData.readTime || 5,
      keywords,
      content: postData.content,
      categoryId: postData.categoryId,
      category
    };
  } catch (error) {
    console.error(`Error normalizing post ${id}:`, error);
    return null;
  }
};

export const useBlogPosts = (categorySlug?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, fetch categories
        const categoriesRef = ref(db, 'blog_categories');
        const categoriesSnapshot = await get(categoriesRef);
        const categories: BlogCategory[] = [];

        if (categoriesSnapshot.exists()) {
          const data = categoriesSnapshot.val();
          Object.entries(data).forEach(([id, value]: [string, any]) => {
            if (value && value.name) { // Only add valid categories
              categories.push({
                id,
                name: value.name,
                slug: value.slug || id,
                description: value.description
              });
            }
          });
        }

        // Then fetch posts
        const postsRef = ref(db, 'blog_posts');
        const snapshot = await get(postsRef);

        if (!mounted) return;

        const fetchedPosts: BlogPost[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Handle posts directly under blog_posts
          Object.entries(data).forEach(([key, value]: [string, any]) => {
            const normalizedPost = normalizePost(key, value, categories);
            if (normalizedPost) {
              fetchedPosts.push(normalizedPost);
            }
          });
        }

        // Filter by category if specified
        const filteredPosts = categorySlug
          ? fetchedPosts.filter(post => post.category?.slug === categorySlug)
          : fetchedPosts;

        if (filteredPosts.length === 0 && categorySlug) {
          console.warn('No posts found for category:', categorySlug);
        }

        // Sort posts by date in descending order (newest first)
        setPosts(filteredPosts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        }));
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        if (mounted) {
          setError('Erro ao carregar os posts do blog. Por favor, tente novamente.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, [categorySlug]);

  return { posts, loading, error };
};