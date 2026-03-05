
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const Icon = product.icon;
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative ${
        compact ? 'flex items-center min-h-[112px]' : 'flex flex-col'
      }`}
    >
      {/* Badge "Em Construção" para produtos em andamento */}
      {(product.slug === 'rememberme' || product.slug === 'scei') && (
        <div className={`absolute z-10 bg-yellow-500 text-gray-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${compact ? 'top-2 right-2 px-2.5 py-0.5' : 'top-3 right-3 px-3 py-1'}`}>
          <span>🚧</span>
          <span>Em Construção</span>
        </div>
      )}
      {product.image && (
        <div className={`relative bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center ${compact ? 'h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 p-1.5 m-3 rounded-md' : 'p-2'}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className={`${compact ? 'w-full h-full object-cover rounded' : 'w-full h-auto max-h-72 object-contain'} hover:scale-105 transition-transform duration-300`}
          />
        </div>
      )}
      <div className={`${compact ? 'py-3 pl-1 pr-3 sm:pr-4 flex-grow flex items-center justify-between gap-4' : 'p-6 flex-grow'}`}>
        <div className={compact ? 'min-w-0' : ''}>
          <div className={`flex items-center ${compact ? 'mb-1' : 'mb-4'}`}>
            {!product.image && <Icon className={`${compact ? 'h-7 w-7 mr-2.5' : 'h-10 w-10 mr-4'} text-cyan-400`} />}
            <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-white`}>{product.name}</h3>
          </div>
          <p className={`${compact ? 'text-sm text-gray-400 leading-snug line-clamp-2' : 'text-gray-400 leading-relaxed'}`}>{product.tagline}</p>
        </div>
        {compact && (
          <Link
            to={`/produtos/${product.slug}`}
            className="whitespace-nowrap text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200"
          >
            Saiba Mais
          </Link>
        )}
      </div>
      {!compact && (
        <div className="p-6 bg-gray-700/50">
          <Link
            to={`/produtos/${product.slug}`}
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200 flex items-center"
          >
            Saiba Mais <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
