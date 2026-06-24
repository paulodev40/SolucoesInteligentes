import React from 'react';
import Link from 'next/link';

const products = [
  {
    name: 'Macaquito Runner',
    platform: '📱 iOS',
    desc: 'O endless runner mais eletrizante do Brasil! Disponível na App Store.',
    img: 'https://www.solucoesinteligentes83.com/assets/images/icone_macaquito.png',
    href: '/produtos/macaquito-runner',
  },
  {
    name: 'Briefy',
    platform: '📱 iOS',
    desc: 'Suas reuniões, resumidas com IA. Direto do seu iPhone.',
    img: 'https://www.solucoesinteligentes83.com/briefy.png',
    href: '/produtos/briefy',
  },
  {
    name: 'WordClimb',
    platform: '🌐 Web',
    desc: 'Climb your way to fluent English. Pague uma vez, suba para sempre.',
    img: 'https://www.solucoesinteligentes83.com/WordClimb.png',
    href: '/produtos/wordclimb',
  },
  {
    name: 'AnaFlow Keys',
    platform: '🎹 App',
    desc: 'Aprenda piano de um jeito divertido. Com IA, sem professor presencial.',
    img: 'https://www.solucoesinteligentes83.com/anaflow%20_2.png',
    href: '/produtos/anaflow-keys',
  },
];

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSefilKN4FAEBcBkJNLZOIzUJBqe0SHY7tW2t3ZqTN2dXXWW0g/viewform?usp=publish-editor';

const ProductsPage: React.FC = () => {
  return (
    <main className="relative max-w-[1180px] mx-auto px-6 pt-[160px]">
      <header className="relative text-center">
        <div
          data-parallax
          data-depth="16"
          className="absolute pointer-events-none"
          style={{
            top: -40,
            left: '12%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(34,224,255,.18),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          data-parallax
          data-depth="-18"
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: '10%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(139,92,255,.18),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />

        <div className="hero-pill">
          <span className="hero-pill__dot" />
          Produtos
        </div>

        <h1
          className="relative font-display font-bold"
          style={{
            fontSize: 'clamp(36px,5.4vw,64px)',
            letterSpacing: '-1.5px',
            margin: '24px 0 0',
            lineHeight: 1.05,
          }}
        >
          Nossos{' '}
          <span
            style={{
              background: 'linear-gradient(100deg,#22e0ff,#8b5cff 50%,#2bff9a)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmer 6s linear infinite',
            }}
          >
            Produtos
          </span>
        </h1>
        <p
          className="relative"
          style={{
            margin: '22px auto 0',
            maxWidth: '56ch',
            color: '#aab6d6',
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          Ferramentas e apps de IA projetados para resolver problemas reais e otimizar o seu fluxo
          de trabalho.
        </p>
      </header>

      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: 20, marginTop: 60 }}
      >
        {products.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            data-reveal
            className="flex items-center"
            style={{
              gap: 22,
              padding: 26,
              borderRadius: 22,
              background: 'rgba(16,22,40,.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(140,170,255,.14)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)',
            }}
          >
            <div
              className="grid place-items-center"
              style={{
                flexShrink: 0,
                width: 86,
                height: 86,
                borderRadius: 20,
                overflow: 'hidden',
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(140,170,255,.14)',
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span
                className="inline-block"
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '.5px',
                  background: 'rgba(139,92,255,.16)',
                  border: '1px solid rgba(139,92,255,.35)',
                  color: '#c9b4ff',
                  marginBottom: 9,
                }}
              >
                {p.platform}
              </span>
              <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600 }}>
                {p.name}
              </h3>
              <p style={{ marginTop: 6, fontSize: 14, color: '#8a97b5', lineHeight: 1.55 }}>
                {p.desc}
              </p>
              <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: '#22e0ff' }}>
                Saiba mais →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        data-reveal
        className="text-center"
        style={{
          marginTop: 70,
          padding: '48px 32px',
          borderRadius: 26,
          background: 'linear-gradient(135deg,rgba(34,224,255,.1),rgba(139,92,255,.1))',
          border: '1px solid rgba(140,170,255,.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <h2
          className="font-display font-bold"
          style={{ fontSize: 'clamp(24px,3vw,34px)', letterSpacing: '-.5px' }}
        >
          Tem uma ideia de produto?
        </h2>
        <p
          style={{
            margin: '12px auto 0',
            maxWidth: '48ch',
            color: '#c4cee8',
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Conte qual problema você quer resolver com IA — pode virar o próximo produto.
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-grad"
          style={{ marginTop: 24, padding: '15px 30px', fontSize: 15 }}
        >
          💬 Enviar sugestão
        </a>
      </div>
    </main>
  );
};

export default ProductsPage;
