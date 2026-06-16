import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="surface surface-hover overflow-hidden flex flex-col group">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden border-b border-[var(--border)]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        <span className="section-label" style={{ marginBottom: 10 }}>
          {post.category}
        </span>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-display text-xl font-bold text-si-text leading-snug group-hover:text-si-cyan transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 text-si-muted text-sm leading-relaxed flex-grow">{post.excerpt}</p>
        <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-si-dim font-mono">
          <span>{post.date}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-si-cyan font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
