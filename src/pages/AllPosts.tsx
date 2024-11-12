import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Home, Loader2 } from 'lucide-react';
import { useBlogCategories } from '../hooks/useBlogCategories';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { Helmet } from 'react-helmet-async';

const AllPosts = () => {
  const { categories, loading: loadingCategories } = useBlogCategories();
  const { posts, loading: loadingPosts, error } = useBlogPosts();

  const loading = loadingCategories || loadingPosts;

  const postsByCategory = posts.reduce((acc, post) => {
    const categoryId = post.categoryId || 'uncategorized';
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <>
      <Helmet>
        <title>Blog | Creche Legal de Cachorro</title>
        <meta name="description" content="Confira todos os posts do nosso blog sobre cuidados com pets" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="text-amber-500" size={32} />
                <h1 className="text-3xl font-bold">Blog</h1>
              </div>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
              >
                <Home size={20} />
                Página Inicial
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="animate-spin text-amber-500" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map(category => {
                const categoryPosts = postsByCategory[category.id] || [];
                if (categoryPosts.length === 0) return null;

                return (
                  <section key={category.id} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {category.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryPosts.map(post => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <time
                              className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium"
                              dateTime={post.date}
                            >
                              {new Date(post.date).toLocaleDateString('pt-BR')}
                            </time>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <span className="text-amber-500 font-medium group-hover:text-amber-600 transition flex items-center gap-1">
                              Ler mais
                              <ChevronRight size={16} />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* Uncategorized posts */}
              {postsByCategory['uncategorized']?.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Outros Posts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsByCategory['uncategorized'].map(post => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <time
                            className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium"
                            dateTime={post.date}
                          >
                            {new Date(post.date).toLocaleDateString('pt-BR')}
                          </time>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <span className="text-amber-500 font-medium group-hover:text-amber-600 transition flex items-center gap-1">
                            Ler mais
                            <ChevronRight size={16} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllPosts;