import React from 'react';
import Link from 'next/link';

const KIWIFY_URL = 'https://pay.kiwify.com.br/JPfyumd';

const learn = [
  'Como usar IA para aprender programação mais rápido, mesmo começando do zero.',
  'Fundamentos de lógica e estrutura de código sem linguagem complicada.',
  'Criação de prompts eficientes para gerar e melhorar código com segurança.',
  'Desenvolvimento de um projeto prático para aplicar o que foi aprendido.',
  'Boas práticas para revisar, testar e evoluir seu código com autonomia.',
  'Rotina de estudo orientada para manter consistência e progresso real.',
];

const audience = [
  'Quem quer entrar na área de tecnologia sem se sentir perdido.',
  'Profissionais de outras áreas que desejam criar soluções digitais.',
  'Iniciantes que já tentaram estudar sozinhos e travaram no caminho.',
  'Pessoas que querem aprender com prática, clareza e apoio da IA.',
];

const OnlineCoursesPage: React.FC = () => {
  return (
    <main className="relative max-w-[1100px] mx-auto px-6 pt-[160px]">
      {/* HERO HEADER */}
      <header className="text-center relative">
        <div
          data-parallax
          data-depth="16"
          className="absolute pointer-events-none"
          style={{
            top: -30,
            left: '16%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(139,92,255,.2),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          className="relative inline-flex items-center"
          style={{
            gap: 9,
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(139,92,255,.1)',
            border: '1px solid rgba(139,92,255,.3)',
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 12,
            letterSpacing: '2.5px',
            color: '#c9b4ff',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#8b5cff',
              animation: 'badgePulse 2s infinite',
            }}
          />
          Curso disponível agora
        </div>
        <h1
          className="relative"
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(32px,4.8vw,56px)',
            letterSpacing: '-1.5px',
            margin: '24px auto 0',
            maxWidth: '18ch',
            lineHeight: 1.08,
          }}
        >
          Aprenda programação com{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(100deg,#8b5cff,#22e0ff 60%,#2bff9a)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmerBg 6s linear infinite',
            }}
          >
            I.A.
          </span>{' '}
          e tire seu primeiro projeto do papel
        </h1>
        <p
          className="relative"
          style={{
            margin: '22px auto 0',
            maxWidth: '60ch',
            color: '#aab6d6',
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          Um curso objetivo para iniciantes que querem sair da teoria e construir soluções reais com
          apoio da inteligência artificial, de forma prática e guiada.
        </p>
      </header>

      {/* VIDEO + INSCRIÇÕES */}
      <section
        data-reveal
        className="grid grid-cols-1 lg:grid-cols-[1.3fr_.9fr]"
        style={{ marginTop: 56, gap: 24, animation: 'riseIn .7s cubic-bezier(.2,.7,.2,1) both' }}
      >
        <div
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            background: 'rgba(16,22,40,.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(140,170,255,.14)',
          }}
        >
          <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
            <iframe
              src="https://www.youtube.com/embed/J5SSLrWO05g"
              title="Programação Turbo com I.A."
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
          <div style={{ padding: '24px 26px' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                letterSpacing: '2px',
                color: '#8b5cff',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Formação
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: '-.5px',
              }}
            >
              Programação Turbo com I.A.
            </h2>
            <p style={{ marginTop: 12, color: '#aab6d6', fontSize: 15, lineHeight: 1.65 }}>
              Aprender a programar não precisa ser lento e solitário. No curso{' '}
              <b style={{ color: '#e8eeff' }}>Programando com I.A. para Iniciantes</b>, você usa as
              ferramentas de IA mais avançadas como seu mentor pessoal — do zero ao seu primeiro
              projeto real, com linguagem simples e prática imediata.
            </p>
            <div className="flex flex-wrap" style={{ gap: 10, marginTop: 18 }}>
              {['Nível: Iniciante', 'Formato: Online', 'Plataforma: Kiwify'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(140,170,255,.16)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col"
          style={{
            padding: '30px 28px',
            borderRadius: 24,
            background: 'linear-gradient(160deg,rgba(139,92,255,.14),rgba(34,224,255,.1))',
            border: '1px solid rgba(140,170,255,.22)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 26px 60px -28px rgba(139,92,255,.5)',
          }}
        >
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700 }}>
            Inscrições abertas
          </h3>
          <p style={{ marginTop: 10, color: '#c4cee8', fontSize: 15, lineHeight: 1.6 }}>
            O curso já está pronto. Garanta seu acesso agora e comece a aprender com aulas práticas.
          </p>
          <div className="flex flex-col" style={{ gap: 13, margin: '22px 0 26px' }}>
            {[
              'Acesso online imediato',
              'Pagamento seguro via Kiwify',
              'Conteúdo pensado para iniciantes',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center"
                style={{ gap: 11, fontSize: 14.5, color: '#dbe4f7' }}
              >
                <span style={{ color: '#2bff9a', fontWeight: 800 }}>✓</span> {item}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <a
            href={KIWIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: 16,
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 16,
              color: '#05070f',
              background: 'linear-gradient(135deg,#22e0ff,#8b5cff)',
              boxShadow: '0 14px 38px -10px rgba(34,224,255,.65)',
            }}
          >
            Comprar curso agora →
          </a>
        </div>
      </section>

      {/* APRENDER + PÚBLICO */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ marginTop: 80, gap: 24 }}>
        <div
          data-reveal
          style={{
            padding: '32px 30px',
            borderRadius: 24,
            background: 'rgba(16,22,40,.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(140,170,255,.14)',
            animation: 'riseIn .7s cubic-bezier(.2,.7,.2,1) both',
          }}
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
            Conteúdo
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-.5px',
            }}
          >
            O que você vai aprender
          </h2>
          <div className="flex flex-col" style={{ gap: 14, marginTop: 22 }}>
            {learn.map((item) => (
              <div key={item} className="flex items-start" style={{ gap: 13 }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#22e0ff',
                    background: 'rgba(34,224,255,.12)',
                    border: '1px solid rgba(34,224,255,.3)',
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 15, color: '#cdd6ec', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          style={{
            padding: '32px 30px',
            borderRadius: 24,
            background: 'rgba(16,22,40,.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(140,170,255,.14)',
            animation: 'riseIn .7s cubic-bezier(.2,.7,.2,1) both',
          }}
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
            Público
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-.5px',
            }}
          >
            Para quem é ideal
          </h2>
          <div className="flex flex-col" style={{ gap: 14, marginTop: 22 }}>
            {audience.map((item) => (
              <div key={item} className="flex items-start" style={{ gap: 13 }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 13,
                    color: '#c9b4ff',
                    background: 'rgba(139,92,255,.14)',
                    border: '1px solid rgba(139,92,255,.32)',
                  }}
                >
                  →
                </span>
                <span style={{ fontSize: 15, color: '#cdd6ec', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        data-reveal
        className="text-center relative overflow-hidden"
        style={{
          marginTop: 70,
          padding: '54px 32px',
          borderRadius: 28,
          background: 'linear-gradient(135deg,rgba(139,92,255,.14),rgba(34,224,255,.12))',
          border: '1px solid rgba(140,170,255,.2)',
          backdropFilter: 'blur(16px)',
          animation: 'riseIn .7s cubic-bezier(.2,.7,.2,1) both',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 'clamp(26px,3.4vw,40px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            maxWidth: '20ch',
            margin: '0 auto',
          }}
        >
          Pronto para acelerar sua jornada na programação?
        </h2>
        <p
          style={{
            margin: '16px auto 0',
            maxWidth: '52ch',
            color: '#c4cee8',
            fontSize: 16.5,
            lineHeight: 1.6,
          }}
        >
          Entre agora e aprenda com um plano claro, do primeiro passo ao seu primeiro projeto prático.
        </p>
        <div className="flex flex-wrap justify-center" style={{ gap: 14, marginTop: 28 }}>
          <a
            href={KIWIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '16px 32px',
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 16,
              color: '#05070f',
              background: 'linear-gradient(135deg,#22e0ff,#8b5cff)',
              boxShadow: '0 16px 40px -10px rgba(34,224,255,.7)',
            }}
          >
            Garantir minha vaga →
          </a>
        </div>
      </section>
    </main>
  );
};

export default OnlineCoursesPage;
