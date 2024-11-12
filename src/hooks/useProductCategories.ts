import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { ProductCategory } from '../types/product';

export const useProductCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const categoriesRef = ref(db, 'product_categories');
        const snapshot = await get(categoriesRef);

        if (!mounted) return;

        const fetchedCategories: ProductCategory[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.entries(data).forEach(([id, value]: [string, any]) => {
            fetchedCategories.push({
              id,
              name: value.name,
              slug: value.slug || id,
              description: value.description,
              order: value.order || 0
            });
          });
        }

        // Sort by order first, then by name
        setCategories(fetchedCategories.sort((a, b) => {
          if (a.order !== b.order) {
            return (a.order || 0) - (b.order || 0);
          }
          return a.name.localeCompare(b.name);
        }));
      } catch (err) {
        console.error('Error fetching product categories:', err);
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