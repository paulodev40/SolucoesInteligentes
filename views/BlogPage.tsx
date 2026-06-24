import React from 'react';
import Link from 'next/link';

const posts = [
  {
    tag: 'Tendências',
    title:
      'Agentes de IA: Como os Assistentes Autônomos Estão Revolucionando o Trabalho em 2026',
    excerpt:
      'Os agentes de IA deixaram de ser ficção científica e fazem parte do dia a dia de empresas e profissionais. Descubra como essa tecnologia está transformando a forma como trabalhamos — e como começar a usar hoje.',
    date: '18 de maio de 2026',
    img: 'https://www.solucoesinteligentes83.com/artigo_image1.png',
    href: '/blog/agentes-de-ia-assistentes-autonomos-2026',
  },
  {
    tag: 'Marketing com IA',
    title: 'Como Usar IA para Criar Campanhas de Marketing que Realmente Convertem',
    excerpt:
      'Esqueça os templates genéricos e as campanhas que não geram resultado. Com as ferramentas certas de IA, qualquer profissional pode criar estratégias personalizadas, criativas e com alto potencial de conversão.',
    date: '18 de maio de 2026',
    img: 'https://www.solucoesinteligentes83.com/artigo_image2.png',
    href: '/blog/ia-para-campanhas-de-marketing-que-convertem',
  },
];

const BlogPage: React.FC = () => {
  return (
    <main className="relative max-w-[1180px] mx-auto px-6 pt-[160px]">
      {/* HERO HEADER */}
      <header className="relative text-center">
        <div
          data-parallax
          data-depth="16"
          className="absolute pointer-events-none"
          style={{
            top: -40,
            left: '16%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(34,224,255,.16),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          data-parallax
          data-depth="-18"
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: '14%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(139,92,255,.18),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />

        <div className="hero-pill">
          <span className="hero-pill__dot" />
          Blog · Notícias de IA
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
          Tendências de <span className="grad-text">IA</span>
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
          Notícias, tendências e dicas práticas sobre o universo da inteligência artificial.
        </p>
      </header>

      {/* POSTS GRID */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-[22px]"
        style={{ marginTop: 56 }}
      >
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            data-reveal
            className="glass-card glass-card--violet flex flex-col overflow-hidden"
            style={{ borderRadius: 24 }}
          >
            <div className="relative overflow-hidden" style={{ height: 230 }}>
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover block"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg,transparent,rgba(12,16,30,.7))' }}
              />
              <span
                className="absolute"
                style={{
                  top: 14,
                  left: 14,
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '.5px',
                  background: 'rgba(34,224,255,.18)',
                  border: '1px solid rgba(34,224,255,.4)',
                  color: '#7fe9ff',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {post.tag}
              </span>
            </div>
            <div className="flex flex-col flex-1" style={{ padding: '24px 24px 26px' }}>
              <h2
                className="font-display font-semibold"
                style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: '-.3px' }}
              >
                {post.title}
              </h2>
              <p
                className="flex-1"
                style={{ marginTop: 13, fontSize: 14.5, color: '#8a97b5', lineHeight: 1.6 }}
              >
                {post.excerpt}
              </p>
              <div
                className="flex justify-between items-center"
                style={{ marginTop: 20, fontSize: 13 }}
              >
                <span className="font-mono" style={{ color: '#6b78a0', fontSize: 12 }}>
                  {post.date}
                </span>
                <span style={{ fontWeight: 700, color: '#22e0ff' }}>Ler mais →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA BOX */}
      <div
        data-reveal
        className="text-center"
        style={{
          marginTop: 64,
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
          Quer ver todos os artigos?
        </h2>
        <p
          style={{
            margin: '12px auto 0',
            maxWidth: '46ch',
            color: '#c4cee8',
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Acesse o blog completo com todas as novidades e tutoriais sobre IA.
        </p>
        <Link href="/blog" className="cta-grad" style={{ marginTop: 24 }}>
          Ver todos os posts →
        </Link>
      </div>
    </main>
  );
};

export default BlogPage;
