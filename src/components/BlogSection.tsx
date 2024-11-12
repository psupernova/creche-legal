import React from 'react';
import { BookOpen, Loader2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useBlogCategories } from '../hooks/useBlogCategories';

const BlogSection = () => {
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

  if (loading) {
    return (
      <section id="blog" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
        </div>
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="animate-spin text-amber-500" size={48} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section id="blog" className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhum post encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen className="text-amber-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
        </div>
        <Link
          to="/blog"
          className="text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1"
        >
          Ver todos os posts
          <ChevronRight size={20} />
        </Link>
      </div>

      <div className="space-y-12">
        {categories.map(category => {
          const categoryPosts = postsByCategory[category.id] || [];
          if (categoryPosts.length === 0) return null;

          // Show only the first 3 posts per category
          const displayPosts = categoryPosts.slice(0, 3);

          return (
            <div key={category.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  {category.name}
                </h3>
                {categoryPosts.length > 3 && (
                  <Link
                    to="/blog"
                    className="text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1"
                  >
                    Ver mais
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post) => (
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
            </div>
          );
        })}

        {/* Uncategorized posts */}
        {postsByCategory['uncategorized']?.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">
                Outros Posts
              </h3>
              {postsByCategory['uncategorized'].length > 3 && (
                <Link
                  to="/blog"
                  className="text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1"
                >
                  Ver mais
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsByCategory['uncategorized'].slice(0, 3).map((post) => (
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
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;