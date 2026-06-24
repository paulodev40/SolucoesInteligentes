import React from 'react';
import Link from 'next/link';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSefilKN4FAEBcBkJNLZOIzUJBqe0SHY7tW2t3ZqTN2dXXWW0g/viewform?usp=publish-editor';

const values = [
  {
    icon: '🎯',
    title: 'Simplicidade',
    desc: 'Tecnologia complexa, explicada de forma simples. Sem jargão, sem barreiras.',
    bg: 'linear-gradient(135deg,rgba(34,224,255,.25),rgba(34,224,255,.08))',
  },
  {
    icon: '🚀',
    title: 'Prática real',
    desc: 'Ferramentas que resolvem problemas concretos do dia a dia, hoje.',
    bg: 'linear-gradient(135deg,rgba(139,92,255,.25),rgba(139,92,255,.08))',
  },
  {
    icon: '🤝',
    title: 'Acessível a todos',
    desc: 'Recursos gratuitos, sem login e direto no navegador, ao alcance de qualquer pessoa.',
    bg: 'linear-gradient(135deg,rgba(43,255,154,.25),rgba(43,255,154,.08))',
  },
];

const AboutPage: React.FC = () => {
  return (
    <main className="relative max-w-[1080px] mx-auto px-6 pt-[160px]">
      {/* HERO */}
      <header className="text-center relative">
        <div
          data-parallax
          data-depth="16"
          className="absolute pointer-events-none"
          style={{
            top: -40,
            left: '18%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(34,224,255,.16),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <img
          data-parallax
          data-depth="20"
          src="/assets/images/logotipo.png"
          alt="Soluções Inteligentes 83"
          className="object-contain"
          style={{
            position: 'relative',
            width: 96,
            height: 96,
            filter: 'drop-shadow(0 12px 36px rgba(34,224,255,.45))',
            animation: 'floatY 6s ease-in-out infinite',
          }}
        />

        <div className="hero-pill" style={{ position: 'relative', marginTop: 22 }}>
          <span className="hero-pill__dot" />
          Sobre nós
        </div>

        <h1
          className="font-display font-bold"
          style={{
            position: 'relative',
            fontSize: 'clamp(34px,5vw,58px)',
            letterSpacing: '-1.5px',
            margin: '22px auto 0',
            maxWidth: '20ch',
            lineHeight: 1.08,
          }}
        >
          Inteligência artificial, <span className="grad-text">soluções reais</span>
        </h1>

        <p
          style={{
            position: 'relative',
            margin: '22px auto 0',
            maxWidth: '62ch',
            color: '#aab6d6',
            fontSize: 18,
            lineHeight: 1.65,
          }}
        >
          A Soluções Inteligentes 83 nasceu com um propósito simples: descomplicar o futuro. Criamos
          ferramentas, apps e conteúdos que colocam a inteligência artificial ao alcance de qualquer
          pessoa — sem complicação, sem barreiras técnicas e, sempre que possível, de graça.
        </p>
      </header>

      {/* MISSÃO / PARA QUEM */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-[22px]"
        style={{ marginTop: 64 }}
      >
        <div
          data-reveal
          className="glass"
          style={{ padding: '34px 32px', borderRadius: 24 }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              letterSpacing: '2px',
              color: '#22e0ff',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Missão
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 24, letterSpacing: '-.5px' }}
          >
            Tecnologia que liberta o seu tempo
          </h2>
          <p style={{ marginTop: 14, color: '#aab6d6', fontSize: 15, lineHeight: 1.7 }}>
            Acreditamos que a IA deve automatizar o repetitivo para que você foque no que realmente
            importa. Nossas soluções impulsionam vendas, otimizam rotinas e tiram ideias do papel —
            com prática imediata e linguagem que todo mundo entende.
          </p>
        </div>

        <div
          data-reveal
          className="glass"
          style={{ padding: '34px 32px', borderRadius: 24 }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              letterSpacing: '2px',
              color: '#8b5cff',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Para quem
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 24, letterSpacing: '-.5px' }}
          >
            Feito para gente real
          </h2>
          <p style={{ marginTop: 14, color: '#aab6d6', fontSize: 15, lineHeight: 1.7 }}>
            Profissionais, empreendedores e entusiastas de tecnologia que querem usar IA no dia a
            dia. De calculadoras trabalhistas a geradores de prompt, tudo é pensado para resolver
            problemas concretos — feito no Brasil, para o Brasil.
          </p>
        </div>
      </section>

      {/* NOSSOS VALORES */}
      <section style={{ marginTop: 56 }}>
        <div data-reveal className="text-center" style={{ marginBottom: 34 }}>
          <div className="mono-label" style={{ color: '#2bff9a', marginBottom: 12 }}>
            // No que acreditamos
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(26px,3.4vw,40px)', letterSpacing: '-1px' }}
          >
            Nossos valores
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
          {values.map((v) => (
            <div
              key={v.title}
              data-reveal
              className="glass-card"
              style={{ padding: '28px 24px', borderRadius: 20 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 24,
                  background: v.bg,
                  marginBottom: 16,
                }}
              >
                {v.icon}
              </div>
              <h3 className="font-display font-semibold" style={{ fontSize: 18 }}>
                {v.title}
              </h3>
              <p style={{ marginTop: 8, fontSize: 14, color: '#8a97b5', lineHeight: 1.6 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        data-reveal
        className="relative overflow-hidden text-center"
        style={{
          marginTop: 70,
          padding: '54px 32px',
          borderRadius: 28,
          background: 'linear-gradient(135deg,rgba(34,224,255,.12),rgba(139,92,255,.12))',
          border: '1px solid rgba(140,170,255,.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
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
            background: 'radial-gradient(circle,rgba(34,224,255,.22),transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative">
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(26px,3.4vw,40px)', letterSpacing: '-1px' }}
          >
            Vamos construir o futuro juntos?
          </h2>
          <p
            style={{
              margin: '16px auto 0',
              maxWidth: '50ch',
              color: '#c4cee8',
              fontSize: 16.5,
              lineHeight: 1.6,
            }}
          >
            Conte qual problema você quer resolver com IA. Suas ideias moldam as próximas soluções
            inteligentes.
          </p>
          <div
            className="flex flex-wrap justify-center gap-[14px]"
            style={{ marginTop: 28 }}
          >
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-grad"
              style={{ padding: '16px 32px', fontSize: 16 }}
            >
              💬 Enviar sugestão
            </a>
            <Link
              href="/ferramentas"
              className="cta-ghost"
              style={{ padding: '16px 32px', fontSize: 16 }}
            >
              Explorar ferramentas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
