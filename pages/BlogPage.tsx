
import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;

    // Filter by category
    if (selectedCategory !== 'Todos') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.excerpt.toLowerCase().includes(lowercasedQuery) ||
        post.content.toLowerCase().includes(lowercasedQuery)
      );
    }

    return posts;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Nosso Blog</h1>
          <p className="mt-4 text-lg text-gray-400">
            Fique por dentro das últimas notícias, tendências e tutoriais do mundo da Inteligência Artificial.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6 max-w-2xl mx-auto">
            {/* Search Input */}
            <div>
                <label htmlFor="search-blog" className="sr-only">Pesquisar artigos</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        id="search-blog"
                        className="block w-full bg-gray-700 border border-gray-600 rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        placeholder="Pesquisar por título, conteúdo..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Pesquisar artigos"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center flex-wrap gap-2">
            {categories.map(category => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                >
                {category}
                </button>
            ))}
            </div>
        </div>

        {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-white">Nenhum resultado encontrado</h3>
                <p className="mt-2 text-gray-400">Tente ajustar sua busca ou filtros.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
