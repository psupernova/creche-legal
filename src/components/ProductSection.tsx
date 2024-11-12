import React from 'react';
import { ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useProductCategories } from '../hooks/useProductCategories';

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const ProductSection = () => {
  const { categories, loading: loadingCategories } = useProductCategories();
  const { products, loading: loadingProducts, error } = useProducts();

  const loading = loadingCategories || loadingProducts;

  const productsByCategory = products.reduce((acc, product) => {
    const categoryId = product.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  if (loading) {
    return (
      <section id="produtos" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Bom Pra Cachorro</h2>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="animate-spin text-amber-500" size={48} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="produtos" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Bom Pra Cachorro</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section id="produtos" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Bom Pra Cachorro</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhum produto encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="produtos" className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="text-amber-500" size={32} />
        <h2 className="text-3xl font-bold text-gray-800">Bom Pra Cachorro</h2>
      </div>
      
      <div className="space-y-12">
        {categories.map(category => {
          const categoryProducts = productsByCategory[category.id] || [];
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id}>
              <h3 className="text-2xl font-semibold mb-6">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <a
                    key={product.id}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                            Indisponível
                          </span>
                        </div>
                      )}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="mb-4">
                        <p className="text-amber-600 font-bold">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-gray-500 text-sm line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </div>
                      <button 
                        className={`w-full py-2 rounded-lg transition flex items-center justify-center gap-2
                          ${product.inStock 
                            ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? (
                          <>
                            Comprar na Amazon
                            <ChevronRight size={16} />
                          </>
                        ) : (
                          'Indisponível'
                        )}
                      </button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;