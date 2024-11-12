import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Loader2, Home, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { BlogPost as BlogPostType } from '../types/blog';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const postsRef = ref(db, 'blog_posts');
        const snapshot = await get(postsRef);

        if (!mounted) return;

        if (snapshot.exists()) {
          const data = snapshot.val();
          let foundPost: BlogPostType | null = null;

          Object.entries(data).forEach(([id, rawPost]: [string, any]) => {
            const postData = rawPost.post1 || rawPost.post2 || rawPost;
            if (postData.slug === slug || id === slug) {
              foundPost = {
                id,
                slug: postData.slug || id,
                title: postData.title,
                excerpt: postData.excerpt || postData.content.substring(0, 150) + '...',
                image: postData.image || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
                date: postData.date || new Date().toISOString().split('T')[0],
                author: postData.author || 'Autor',
                readTime: postData.readTime || 5,
                keywords: Array.isArray(postData.keywords) ? postData.keywords : 
                         (postData.keywords ? Object.values(postData.keywords) : []),
                content: postData.content,
                categoryId: postData.categoryId
              };
            }
          });

          if (foundPost) {
            // Fetch category if post has categoryId
            if (foundPost.categoryId) {
              const categoryRef = ref(db, `blog_categories/${foundPost.categoryId}`);
              const categorySnapshot = await get(categoryRef);
              
              if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.val();
                foundPost.category = {
                  id: foundPost.categoryId,
                  name: categoryData.name,
                  slug: categoryData.slug || foundPost.categoryId,
                  description: categoryData.description
                };
              }
            }

            setPost(foundPost);
          } else {
            setError('Post não encontrado');
          }
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        if (mounted) {
          setError('Erro ao carregar o post. Por favor, tente novamente.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Post não encontrado'}</h1>
          <Link to="/" className="text-amber-500 hover:text-amber-600">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Creche Legal de Cachorro`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Creche Legal de Cachorro`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="keywords" content={`creche legal de cachorro${post.keywords.length ? `, ${post.keywords.join(', ')}` : ''}`} />
        <link rel="canonical" href={`https://crechelegal.com.br/blog/${post.slug}`} />
      </Helmet>

      <article className="min-h-screen bg-gray-50">
        <div className="relative h-[400px] -mx-4 mb-8">
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 flex flex-col items-start justify-end pb-12">
            {post.category && (
              <span className="mb-4 px-4 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                {post.category.name}
              </span>
            )}
            <h1 className="text-4xl font-bold text-white mb-4 max-w-3xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-amber-600 hover:prose-a:text-amber-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Navigation buttons moved to the end */}
              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t">
                <Link
                  to="/blog"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  <BookOpen size={20} />
                  Todos os Posts
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition"
                >
                  <Home size={20} />
                  Ache Creche Legal de Cachorro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;