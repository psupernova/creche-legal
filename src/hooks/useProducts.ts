import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { Product, ProductCategory } from '../types/product';

const normalizeProduct = (id: string, rawProduct: any, categories: ProductCategory[]): Product | null => {
  try {
    if (!rawProduct.name || !rawProduct.price || !rawProduct.image || !rawProduct.link) {
      console.warn(`Product ${id} missing required fields`);
      return null;
    }

    // Find category if categoryId exists
    const category = rawProduct.categoryId ? 
      categories.find(c => c.id === rawProduct.categoryId) : 
      undefined;

    return {
      id,
      name: rawProduct.name,
      price: Number(rawProduct.price),
      originalPrice: rawProduct.originalPrice ? Number(rawProduct.originalPrice) : undefined,
      description: rawProduct.description,
      image: rawProduct.image,
      link: rawProduct.link,
      categoryId: rawProduct.categoryId,
      category,
      featured: rawProduct.featured || false,
      order: rawProduct.order || 0,
      inStock: rawProduct.inStock !== false, // true by default
      affiliateCode: rawProduct.affiliateCode
    };
  } catch (error) {
    console.error(`Error normalizing product ${id}:`, error);
    return null;
  }
};

export const useProducts = (categorySlug?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, fetch categories
        const categoriesRef = ref(db, 'product_categories');
        const categoriesSnapshot = await get(categoriesRef);
        const categories: ProductCategory[] = [];

        if (categoriesSnapshot.exists()) {
          const data = categoriesSnapshot.val();
          Object.entries(data).forEach(([id, value]: [string, any]) => {
            categories.push({
              id,
              name: value.name,
              slug: value.slug || id,
              description: value.description,
              order: value.order || 0
            });
          });
        }

        // Then fetch products
        const productsRef = ref(db, 'products');
        const snapshot = await get(productsRef);

        if (!mounted) return;

        const fetchedProducts: Product[] = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Handle products directly under the products node
          Object.entries(data).forEach(([productId, productData]: [string, any]) => {
            const normalizedProduct = normalizeProduct(productId, productData, categories);
            if (normalizedProduct) {
              fetchedProducts.push(normalizedProduct);
            }
          });
        }

        // Filter by category if specified
        const filteredProducts = categorySlug
          ? fetchedProducts.filter(product => product.category?.slug === categorySlug)
          : fetchedProducts;

        // Sort by order first, then by name
        setProducts(filteredProducts.sort((a, b) => {
          if (a.order !== b.order) {
            return (a.order || 0) - (b.order || 0);
          }
          return a.name.localeCompare(b.name);
        }));
      } catch (err) {
        console.error('Error fetching products:', err);
        if (mounted) {
          setError('Erro ao carregar os produtos. Por favor, tente novamente.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [categorySlug]);

  return { products, loading, error };
};