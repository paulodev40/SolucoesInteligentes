import React from 'react';
import type { NewsArticle } from '../services/newsApi';
import { formatNewsDate } from '../services/newsApi';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col group"
    >
      <div className="relative overflow-hidden bg-gray-700">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/1f2937/60a5fa?text=Sem+Imagem';
          }}
        />
        <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          <span>🌐</span>
          <span className="ml-1">Externa</span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-xs text-gray-400 mb-3">
          <span className="font-semibold text-purple-400">{article.source.name}</span>
          <span className="mx-2">&bull;</span>
          <span>{formatNewsDate(article.publishedAt)}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow">
          {article.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <span className="text-purple-400 font-semibold text-sm group-hover:text-purple-300 transition-colors flex items-center">
            Ler notícia completa 
            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
