import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const isWip = (slug: string) => slug === 'rememberme' || slug === 'scei';
const isIos = (slug: string) => slug === 'briefy';

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const Icon = product.icon;
  const wip = isWip(product.slug);
  const ios = isIos(product.slug);

  if (compact) {
    return (
      <Link
        to={`/produtos/${product.slug}`}
        className="surface surface-hover relative flex items-center gap-4 p-3 pr-5 group"
      >
        {wip && (
          <span className="badge badge--yellow absolute top-2 right-2">🚧 Em Construção</span>
        )}
        {ios && (
          <span className="badge badge--cyan absolute top-2 right-2">📱 iOS</span>
        )}
        {product.image ? (
          <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 rounded-md overflow-hidden bg-[var(--surface2)] border border-[var(--border)]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
        ) : (
          <div className="h-24 w-24 flex-shrink-0 rounded-md bg-[var(--cyan-dim)] border border-[var(--border-strong)] flex items-center justify-center">
            <Icon className="h-10 w-10 text-si-cyan" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-base text-si-text mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-si-muted leading-snug line-clamp-2">{product.tagline}</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-si-cyan font-semibold text-sm whitespace-nowrap group-hover:gap-2 transition-all">
          Saiba mais →
        </span>
      </Link>
    );
  }

  return (
    <div className="surface surface-hover relative overflow-hidden flex flex-col group">
      {wip && (
        <span className="badge badge--yellow absolute top-4 right-4 z-20">🚧 Em Construção</span>
      )}
      {ios && (
        <span className="badge badge--cyan absolute top-4 right-4 z-20">📱 iOS</span>
      )}
      {/* card glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 w-40 h-40 rounded-full opacity-60 blur-3xl"
        style={{ background: 'var(--cyan-dim)' }}
      />
      {product.image ? (
        <div className="relative bg-[var(--surface2)] flex items-center justify-center p-3 border-b border-[var(--border)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-72 object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="relative h-44 flex items-center justify-center bg-[var(--surface2)] border-b border-[var(--border)]">
          <Icon className="h-16 w-16 text-si-cyan" />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col relative">
        <h3 className="font-display font-bold text-xl text-si-text mb-2">{product.name}</h3>
        <p className="text-si-muted text-sm leading-relaxed mb-5 flex-grow">{product.tagline}</p>
        <Link
          to={`/produtos/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-si-cyan font-semibold text-sm group-hover:gap-2.5 transition-all"
        >
          Saiba mais <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
