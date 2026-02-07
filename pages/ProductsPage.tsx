
import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  // Criar uma versão modificada dos produtos com GIFs para a página de produtos
  const productsWithGifs = PRODUCTS.map((product) => {
    if (product.slug === 'copymaster-pro') {
      return { ...product, image: '/assets/gifs/coruja_pensando2.gif' };
    }
    if (product.slug === 'slidegenius') {
      return { ...product, image: '/assets/gifs/camaleao_ligando2.gif' };
    }
    if (product.slug === 'read-write') {
      return { ...product, image: '/assets/gifs/lobo_gravando.gif' };
    }
    if (product.slug === 'rememberme') {
      return { ...product, image: '/assets/gifs/tartaruga_colore.gif' };
    }
    return product;
  });

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
          {productsWithGifs.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
