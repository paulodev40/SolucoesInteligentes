
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Nossos Produtos</h1>
          <p className="mt-4 text-lg text-gray-400">
            Ferramentas de IA projetadas para resolver problemas reais e otimizar seu fluxo de trabalho.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
