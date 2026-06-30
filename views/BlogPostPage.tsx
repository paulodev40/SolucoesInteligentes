'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '../constants';
import type { BlogPost } from '../types';
import AdSlot from '../components/AdSlot';

interface BlogPostPageProps {
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  relatedPosts: BlogPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, prevPost, nextPost, relatedPosts }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  const relatedProduct = post.relatedProductSlug
    ? PRODUCTS.find((p) => p.slug === post.relatedProductSlug)
    : null;

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="text-si-cyan font-mono text-sm uppercase tracking-wider hover:text-si-text transition-colors">
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

          <AdSlot className="mb-10" label="Anúncio" />

          <div
            className="prose prose-invert prose-lg max-w-none text-si-muted reveal"
            style={{
              ['--tw-prose-headings' as never]: 'var(--text)',
              ['--tw-prose-bold' as never]: 'var(--text)',
              ['--tw-prose-links' as never]: 'var(--cyan)',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <AdSlot className="mt-10" label="Anúncio" />
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
            <Link href={`/produtos/${relatedProduct.slug}`} className="btn-primary flex-shrink-0">
              Saiba Mais →
            </Link>
          </div>
        )}

        {/* Navegação entre posts (anterior / próximo) */}
        {(prevPost || nextPost) && (
          <nav className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal" aria-label="Navegação entre artigos">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="surface surface-hover p-5 flex flex-col gap-1 group"
              >
                <span className="text-si-cyan font-mono text-xs uppercase tracking-wider">
                  <i className="fas fa-arrow-left mr-2" /> Artigo anterior
                </span>
                <span className="font-display font-bold text-si-text group-hover:text-si-cyan transition-colors">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="surface surface-hover p-5 flex flex-col gap-1 group sm:text-right"
              >
                <span className="text-si-cyan font-mono text-xs uppercase tracking-wider">
                  Próximo artigo <i className="fas fa-arrow-right ml-2" />
                </span>
                <span className="font-display font-bold text-si-text group-hover:text-si-cyan transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Posts relacionados */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 reveal" aria-label="Posts relacionados">
            <div className="section-label">Continue lendo</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text mb-6">
              Posts relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="surface surface-hover flex flex-col overflow-hidden group"
                >
                  <div className="relative overflow-hidden" style={{ height: 160 }}>
                    <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover block" />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-si-cyan font-mono text-xs uppercase tracking-wider">
                      {rp.category}
                    </span>
                    <h3 className="mt-2 font-display font-bold text-lg text-si-text leading-snug group-hover:text-si-cyan transition-colors">
                      {rp.title}
                    </h3>
                    <span className="mt-3 text-sm font-bold text-si-cyan">Ler mais →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default BlogPostPage;
