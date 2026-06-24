'use client';

import React from 'react';
import Link from 'next/link';
import FirewallGame from '../components/FirewallGame';

const pillars = [
  {
    title: 'Produtos',
    desc: 'Soluções de IA prontas para automatizar tarefas e impulsionar vendas.',
    cta: 'Explorar produtos →',
    href: '/produtos',
    iconBg: 'linear-gradient(135deg,rgba(34,224,255,.25),rgba(34,224,255,.08))',
    icon: '⚡',
  },
  {
    title: 'Cursos Online',
    desc: 'Aprenda a usar IA no seu dia a dia, do básico ao avançado.',
    cta: 'Ver cursos →',
    href: '/cursos-online',
    iconBg: 'linear-gradient(135deg,rgba(139,92,255,.25),rgba(139,92,255,.08))',
    icon: '🎓',
  },
  {
    title: 'Ferramentas',
    desc: 'Calculadoras, verificadores e geradores gratuitos, sem login.',
    cta: 'Abrir ferramentas →',
    href: '/ferramentas',
    iconBg: 'linear-gradient(135deg,rgba(43,255,154,.25),rgba(43,255,154,.08))',
    icon: '🛠️',
  },
  {
    title: 'Conteúdo Digital',
    desc: 'Materiais, templates e recursos para acelerar seus projetos.',
    cta: 'Ver conteúdo →',
    href: '/conteudo-digital',
    iconBg: 'linear-gradient(135deg,rgba(255,93,177,.25),rgba(255,93,177,.08))',
    icon: '✨',
  },
];

const posts = [
  {
    tag: 'Tendências',
    title:
      'Agentes de IA: Como os Assistentes Autônomos Estão Revolucionando o Trabalho em 2026',
    excerpt:
      'Os agentes de IA deixaram de ser ficção científica e fazem parte do dia a dia de empresas e profissionais. Descubra como começar a usar hoje.',
    date: '18 de maio de 2026',
    img: 'https://www.solucoesinteligentes83.com/artigo_image1.png',
    href: '/blog/agentes-de-ia-assistentes-autonomos-2026',
  },
  {
    tag: 'Marketing com IA',
    title: 'Como Usar IA para Criar Campanhas de Marketing que Realmente Convertem',
    excerpt:
      'Esqueça templates genéricos. Com as ferramentas certas, qualquer profissional cria estratégias personalizadas e com alto potencial de conversão.',
    date: '18 de maio de 2026',
    img: 'https://www.solucoesinteligentes83.com/artigo_image2.png',
    href: '/blog/ia-para-campanhas-de-marketing-que-convertem',
  },
];

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSefilKN4FAEBcBkJNLZOIzUJBqe0SHY7tW2t3ZqTN2dXXWW0g/viewform?usp=publish-editor';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <header className="relative max-w-[1180px] mx-auto px-6 pt-[160px] pb-[70px] flex flex-col items-center text-center">
        <div
          data-parallax
          data-depth="14"
          className="absolute pointer-events-none"
          style={{
            top: 120,
            left: '8%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(34,224,255,.22),transparent 68%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          data-parallax
          data-depth="-20"
          className="absolute pointer-events-none"
          style={{
            top: 200,
            right: '6%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(139,92,255,.2),transparent 68%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="hero-pill">
          <span className="hero-pill__dot" />
          IA · Automação · Inovação
        </div>

        <img
          data-parallax
          data-depth="22"
          src="/assets/images/logotipo.png"
          alt="Soluções Inteligentes 83"
          className="object-contain"
          style={{
            width: 130,
            height: 130,
            margin: '34px 0 22px',
            filter: 'drop-shadow(0 12px 40px rgba(34,224,255,.45))',
            animation: 'floatY 6s ease-in-out infinite',
          }}
        />

        <h1
          className="font-display font-bold m-0"
          style={{
            fontSize: 'clamp(40px,6.6vw,82px)',
            lineHeight: 1.02,
            letterSpacing: '-1.5px',
            maxWidth: '14ch',
            animation: 'glitchHero 7s infinite',
          }}
        >
          Inteligência Artificial,
          <span className="grad-text" style={{ display: 'block' }}>
            Soluções Reais.
          </span>
        </h1>

        <p
          className="text-si-muted"
          style={{ margin: '26px auto 0', maxWidth: '62ch', fontSize: 'clamp(16px,1.6vw,19px)', lineHeight: 1.6 }}
        >
          Descomplicando o futuro com IA. Nossas ferramentas automatizam tarefas, impulsionam suas
          vendas e otimizam seu tempo — para você focar no que realmente importa.
        </p>

        <div className="flex flex-wrap gap-[14px] justify-center" style={{ marginTop: 38 }}>
          <Link href="/produtos" className="cta-grad">
            Ver Produtos →
          </Link>
          <Link href="/ferramentas" className="cta-ghost">
            Ver Ferramentas
          </Link>
        </div>

        <div
          className="flex flex-col items-center gap-2 font-mono uppercase"
          style={{ marginTop: 60, fontSize: 11, letterSpacing: '2px', color: '#6b78a0' }}
        >
          <span>scroll</span>
          <span
            style={{
              display: 'block',
              width: 24,
              height: 38,
              border: '1.5px solid rgba(140,170,255,.3)',
              borderRadius: 13,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 7,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 7,
                borderRadius: 2,
                background: '#22e0ff',
                animation: 'scrollDot 1.8s infinite',
              }}
            />
          </span>
        </div>
      </header>

      {/* VALUE STRIP */}
      <section className="relative max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 glass" style={{ padding: 6, borderRadius: 18 }}>
          {[
            { val: '100% Gratuito', color: '#22e0ff', sub: 'Ferramentas sem login' },
            { val: 'Tempo Real', color: '#8b5cff', sub: 'Notícias de IA atualizadas' },
            { val: 'Feito no Brasil 🇧🇷', color: '#2bff9a', sub: 'Powered by AI · Desde Fev 26' },
          ].map((c, i) => (
            <div
              key={c.val}
              className="text-center"
              style={{
                padding: '18px 22px',
                borderRight: i < 2 ? '1px solid rgba(140,170,255,.1)' : undefined,
              }}
            >
              <div className="font-display font-bold" style={{ fontSize: 22, color: c.color }}>
                {c.val}
              </div>
              <div style={{ fontSize: 13, color: '#8a97b5', marginTop: 3 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative max-w-[1180px] mx-auto px-6 pt-24">
        <div data-reveal className="text-center mb-[46px]">
          <div className="mono-label text-si-cyan mb-[14px]">// A plataforma</div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(28px,3.6vw,44px)', letterSpacing: '-1px' }}>
            Um ecossistema inteligente
          </h2>
          <p className="text-si-muted" style={{ margin: '14px auto 0', maxWidth: '54ch', fontSize: 16, lineHeight: 1.6 }}>
            Tudo o que você precisa para colocar a IA para trabalhar por você, num só lugar.
          </p>
        </div>
        <div className="grid gap-[18px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Link key={p.title} href={p.href} data-reveal className="glass-card" style={{ padding: '26px 22px 24px' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 22,
                  background: p.iconBg,
                  marginBottom: 18,
                }}
              >
                {p.icon}
              </div>
              <h3 className="font-display font-semibold" style={{ fontSize: 19, marginBottom: 8 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, color: '#8a97b5', lineHeight: 1.55 }}>{p.desc}</p>
              <div className="text-si-cyan" style={{ marginTop: 16, fontSize: 13, fontWeight: 700 }}>
                {p.cta}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* GAME */}
      <section className="relative max-w-[1180px] mx-auto px-6 pt-[104px]">
        <div data-reveal className="text-center mb-[34px]">
          <div className="mono-label mb-[14px]" style={{ color: '#ff5db1' }}>
            // Pausa para diversão
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(28px,3.6vw,44px)', letterSpacing: '-1px' }}>
            Firewall Neural <span style={{ color: '#ff5db1' }}>— Caça ao Bug</span>
          </h2>
          <p className="text-si-muted" style={{ margin: '14px auto 0', maxWidth: '58ch', fontSize: 16, lineHeight: 1.6 }}>
            Zap os <b style={{ color: '#ff6b6b' }}>bugs 🐛</b> antes que corrompam a rede. Mas cuidado:{' '}
            <b style={{ color: '#2bff9a' }}>não toque nos núcleos de dados ◆</b>. Mantenha o combo!
          </p>
        </div>
        <FirewallGame />
      </section>

      {/* BLOG */}
      <section className="relative max-w-[1180px] mx-auto px-6 pt-[104px]">
        <div data-reveal className="flex justify-between items-end gap-5 mb-[34px] flex-wrap">
          <div>
            <div className="mono-label mb-[14px]" style={{ color: '#8b5cff' }}>
              // Do nosso blog
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(28px,3.6vw,44px)', letterSpacing: '-1px' }}>
              Tendências de IA
            </h2>
          </div>
          <Link href="/blog" className="cta-ghost" style={{ padding: '11px 20px', borderRadius: 12, fontSize: 14 }}>
            Ver todos os posts →
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              data-reveal
              className="glass-card glass-card--violet flex flex-col overflow-hidden"
              style={{ borderRadius: 22 }}
            >
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <img src={post.img} alt={post.title} className="w-full h-full object-cover block" />
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
              <div className="flex flex-col flex-1" style={{ padding: '22px 22px 24px' }}>
                <h3 className="font-display font-semibold" style={{ fontSize: 20, lineHeight: 1.25, letterSpacing: '-.3px' }}>
                  {post.title}
                </h3>
                <p className="flex-1" style={{ marginTop: 12, fontSize: 14, color: '#8a97b5', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center" style={{ marginTop: 18, fontSize: 13 }}>
                  <span className="font-mono" style={{ color: '#6b78a0', fontSize: 12 }}>
                    {post.date}
                  </span>
                  <span style={{ fontWeight: 700, color: '#22e0ff' }}>Ler mais →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SUGGESTION CTA */}
      <section className="relative max-w-[1180px] mx-auto px-6 pt-[104px]">
        <div
          data-reveal
          className="relative overflow-hidden text-center"
          style={{
            borderRadius: 28,
            padding: '54px 40px',
            background: 'linear-gradient(135deg,rgba(34,224,255,.12),rgba(139,92,255,.12))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(140,170,255,.2)',
            boxShadow: '0 30px 80px -30px rgba(0,0,0,.7)',
          }}
        >
          <div
            className="absolute"
            style={{
              top: -80,
              left: -40,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(34,224,255,.25),transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: -90,
              right: -30,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(139,92,255,.25),transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <div className="relative">
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(26px,3.4vw,40px)', letterSpacing: '-1px' }}>
              Tem uma ideia? Compartilhe.
            </h2>
            <p style={{ margin: '16px auto 0', maxWidth: '56ch', color: '#c4cee8', fontSize: 16.5, lineHeight: 1.6 }}>
              Qual problema você gostaria de resolver com IA? Suas sugestões moldam as próximas
              soluções inteligentes.
            </p>
            <div className="flex flex-wrap justify-center gap-[14px]" style={{ margin: '30px 0 32px' }}>
              {['💡 Sugira ferramentas', '🎯 Proponha recursos', '🚀 Molde o futuro'].map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-[10px]"
                  style={{
                    padding: '12px 18px',
                    borderRadius: 14,
                    background: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(140,170,255,.16)',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="cta-grad" style={{ padding: '16px 34px', fontSize: 16 }}>
              💬 Envie sua sugestão agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
