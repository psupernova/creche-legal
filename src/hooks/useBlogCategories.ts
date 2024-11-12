import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { BlogCategory } from '../types/blog';

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoriesRef = ref(db, 'blog_categories');
        const snapshot = await get(categoriesRef);

        if (!mounted) return;

        const fetchedCategories: BlogCategory[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.entries(data).forEach(([id, value]: [string, any]) => {
            fetchedCategories.push({
              id,
              name: value.name,
              slug: value.slug || id,
              description: value.description
            });
          });
        }

        setCategories(fetchedCategories.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error('Error fetching blog categories:', err);
        if (mounted) {
          setError('Erro ao carregar as categorias. Por favor, tente novamente.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading, error };
};