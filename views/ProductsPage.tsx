import React from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import AdSlot from '../components/AdSlot';

const ProductsPage: React.FC = () => {
  const productsWithGifs = PRODUCTS
    .filter(
      (product) =>
        product.slug !== 'slidegenius' &&
        product.slug !== 'rememberme' &&
        product.slug !== 'scei' &&
        product.slug !== 'read-write'
    )
    .map((product) => {
      if (product.slug === 'copymaster-pro') {
        return { ...product, image: '/assets/gifs/coruja_pensando2.gif' };
      }
      if (product.slug === 'read-write') {
        return { ...product, image: '/assets/gifs/lobo_gravando.gif' };
      }
      return product;
    });

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 720 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Produtos</div>
          <h2 className="section-title">Nossos Produtos</h2>
          <p className="section-desc mx-auto">
            Ferramentas de IA projetadas para resolver problemas reais e otimizar seu fluxo de trabalho.
          </p>
        </div>
        <AdSlot className="mb-10" label="Anúncio" />

        <div className="grid gap-8 md:grid-cols-2 reveal">
          {productsWithGifs.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <AdSlot className="mt-10" label="Anúncio" />
      </div>
    </section>
  );
};

export default ProductsPage;
