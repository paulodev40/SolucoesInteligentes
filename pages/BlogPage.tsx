import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))],
    []
  );

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;
    if (selectedCategory !== 'Todos') posts = posts.filter((p) => p.category === selectedCategory);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [selectedCategory, searchQuery]);

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Blog</div>
          <h2 className="section-title">Nosso Blog</h2>
          <p className="section-desc mx-auto">
            Conteúdo exclusivo criado por nossa equipe sobre Inteligência Artificial,
            tendências, tutoriais e estudos de caso.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-12 mb-12 space-y-6 max-w-2xl mx-auto reveal">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-si-dim" />
            </div>
            <input
              type="text"
              id="search-blog"
              className="field pl-11"
              placeholder="Pesquisar por título, conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Pesquisar artigos"
            />
          </div>

          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'chip chip--cyan' : 'chip'}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 reveal">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="surface text-center py-16">
            <h3 className="font-display font-bold text-2xl text-si-text">Nenhum resultado encontrado</h3>
            <p className="mt-2 text-si-muted">Tente ajustar sua busca ou filtros.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
