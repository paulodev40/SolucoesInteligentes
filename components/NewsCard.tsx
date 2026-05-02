import React from 'react';
import type { NewsArticle } from '../services/newsApi';
import { formatNewsDate } from '../services/newsApi';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const fallbackImage = '/assets/images/noticias.png';
  const imageSrc = article.urlToImage?.trim() ? article.urlToImage : fallbackImage;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface surface-hover overflow-hidden flex flex-col group relative"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }}
      />
      <div className="relative overflow-hidden bg-[var(--surface2)] border-b border-[var(--border)]">
        <img
          src={imageSrc}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
        <span className="badge badge--violet absolute top-3 right-3">
          🌐 Externa
        </span>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="section-label" style={{ marginBottom: 10 }}>
          {article.source.name}
        </div>
        <h3 className="font-display font-bold text-base text-si-text leading-snug mb-3 line-clamp-2 group-hover:text-si-cyan transition-colors">
          {article.title}
        </h3>
        <p className="text-si-muted text-sm leading-relaxed line-clamp-3 flex-grow">
          {article.description}
        </p>
        <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-si-dim text-xs font-mono">{formatNewsDate(article.publishedAt)}</span>
          <span className="text-si-cyan font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Ler completa <i className="fas fa-external-link-alt text-[10px]" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
