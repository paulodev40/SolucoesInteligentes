import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[70vh] text-center px-5 py-16">
      <div className="reveal">
        <h1
          className="glitch font-display font-extrabold leading-none"
          data-text="404"
          style={{
            fontSize: 'clamp(6rem, 18vw, 12rem)',
            color: 'var(--cyan)',
            textShadow: '0 0 40px var(--cyan-glow)',
          }}
        >
          404
        </h1>
        <div className="section-label mt-4" style={{ justifyContent: 'center' }}>
          Página perdida no espaço
        </div>
        <p className="mt-4 font-display font-bold text-2xl md:text-3xl text-si-text">
          Página Não Encontrada
        </p>
        <p className="mt-3 text-lg text-si-muted max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-8">
          <Link href="/" className="btn-primary">
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
