import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import NotFoundPage from './NotFoundPage';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return <NotFoundPage />;

  const relatedProduct = post.relatedProductSlug
    ? PRODUCTS.find((p) => p.slug === post.relatedProductSlug)
    : null;

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/blog" className="text-si-cyan font-mono text-sm uppercase tracking-wider hover:text-si-text transition-colors">
            <i className="fas fa-arrow-left mr-2" /> Voltar para o blog
          </Link>
        </div>

        <article>
          <header className="mb-8 reveal">
            <div className="section-label">{post.category}</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-si-text leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 text-sm text-si-muted font-mono flex items-center gap-3">
              <span>Por {post.author}</span>
              <span className="text-si-dim">•</span>
              <span>{post.date}</span>
            </div>
          </header>

          <img
            className="w-full h-auto rounded-xl border border-[var(--border-strong)] mb-10 reveal"
            style={{ boxShadow: '0 0 32px var(--cyan-dim)' }}
            src={post.imageUrl}
            alt={post.title}
          />

          <div
            className="prose prose-invert prose-lg max-w-none text-si-muted reveal"
            style={{
              ['--tw-prose-headings' as never]: 'var(--text)',
              ['--tw-prose-bold' as never]: 'var(--text)',
              ['--tw-prose-links' as never]: 'var(--cyan)',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedProduct && (
          <div className="mt-14 surface p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 reveal">
            <div className="flex-shrink-0">
              <relatedProduct.icon className="h-14 w-14 text-si-cyan" />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h4 className="font-display font-bold text-xl text-si-text">Gostou do que leu?</h4>
              <p className="text-si-muted">
                Leve sua produtividade ao próximo nível com o {relatedProduct.name}.
              </p>
            </div>
            <Link to={`/produtos/${relatedProduct.slug}`} className="btn-primary flex-shrink-0">
              Saiba Mais →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostPage;
