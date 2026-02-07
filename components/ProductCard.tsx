
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const Icon = product.icon;
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      {product.image && (
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center p-2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-72 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          {!product.image && <Icon className="h-10 w-10 text-cyan-400 mr-4" />}
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{product.tagline}</p>
      </div>
      <div className="p-6 bg-gray-700/50">
        <Link
          to={`/produtos/${product.slug}`}
          className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-200 flex items-center"
        >
          Saiba Mais <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
