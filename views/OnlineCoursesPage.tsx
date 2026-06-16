'use client';

import React from 'react';

const learningPoints = [
  'Como usar IA para aprender programação mais rápido, mesmo começando do zero.',
  'Fundamentos de lógica e estrutura de código sem linguagem complicada.',
  'Criação de prompts eficientes para gerar e melhorar código com segurança.',
  'Desenvolvimento de um projeto prático para aplicar o que foi aprendido.',
  'Boas práticas para revisar, testar e evoluir seu código com autonomia.',
  'Rotina de estudo orientada para manter consistência e progresso real.',
];

const audiencePoints = [
  'Quem quer entrar na área de tecnologia sem se sentir perdido.',
  'Profissionais de outras áreas que desejam criar soluções digitais.',
  'Iniciantes que já tentaram estudar sozinhos e travaram no caminho.',
  'Pessoas que querem aprender com prática, clareza e apoio da IA.',
];

const copyVariants = {
  A: {
    title: 'Aprenda programação com I.A. e tire seu primeiro projeto do papel',
    subtitle:
      'Um curso objetivo para iniciantes que querem sair da teoria e construir soluções reais com apoio da inteligência artificial, de forma prática e guiada.',
    primaryCta: 'Comprar curso agora',
    secondaryCta: 'Garantir minha vaga',
    mobileCta: 'Quero começar agora',
  },
  B: {
    title: 'Do zero ao seu primeiro software com I.A., passo a passo',
    subtitle:
      'Aprenda com um método direto ao ponto para iniciar em programação, acelerar com IA e publicar seu primeiro projeto com mais confiança.',
    primaryCta: 'Começar agora',
    secondaryCta: 'Quero entrar na turma',
    mobileCta: 'Entrar agora',
  },
};

const KIWIFY_URL = 'https://pay.kiwify.com.br/JPfyumd';

const OnlineCoursesPage: React.FC = () => {
  const [variant, setVariant] = React.useState<'A' | 'B'>('A');

  React.useEffect(() => {
    const saved = window.localStorage.getItem('onlineCourseCopyVariant');
    if (saved === 'A' || saved === 'B') {
      setVariant(saved);
      return;
    }
    const selected: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
    window.localStorage.setItem('onlineCourseCopyVariant', selected);
    setVariant(selected);
  }, []);

  const copy = copyVariants[variant];

  return (
    <section className="relative py-20 pb-32 sm:py-24 sm:pb-24 px-5">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero */}
        <div className="surface p-8 sm:p-12 relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--cyan-glow), transparent 70%)' }} />
          <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)' }} />

          <div className="relative z-10">
            <span className="badge badge--green">
              <span className="dot-pulse dot-pulse--green" /> Curso disponível agora
            </span>

            <h1 className="mt-6 font-display font-extrabold text-3xl sm:text-5xl text-si-text leading-tight">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-si-muted leading-relaxed">{copy.subtitle}</p>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 surface p-6 sm:p-8" style={{ background: 'var(--surface2)' }}>
                <div className="section-label">Formação</div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text">
                  Programação Turbo com I.A.
                </h2>
                <p className="mt-4 text-si-muted leading-relaxed">
                  Aprender a programar não precisa ser um processo lento e solitário. No curso{' '}
                  <strong className="text-si-text">Programando com I.A. para Iniciantes</strong>, você aprenderá
                  a utilizar as ferramentas de Inteligência Artificial mais avançadas do mercado como seu
                  mentor pessoal. Do zero ao seu primeiro projeto real, com linguagem simples e prática imediata.
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg)]"
                  style={{ boxShadow: '0 0 32px var(--cyan-dim)' }}>
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/J5SSLrWO05g"
                      title="Programando com I.A. para Iniciantes"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="chip chip--cyan">Nível: Iniciante</span>
                  <span className="chip chip--cyan">Formato: Online</span>
                  <span className="chip chip--cyan">Plataforma: Kiwify</span>
                </div>
              </div>

              <div className="lg:col-span-4 surface p-6 sm:p-7 flex flex-col justify-center gap-6"
                style={{ background: 'var(--surface2)' }}>
                <div>
                  <h3 className="font-display font-bold text-xl text-si-text">Inscrições abertas</h3>
                  <p className="mt-3 text-si-muted">
                    O curso já está pronto. Garanta seu acesso agora e comece a aprender com aulas práticas.
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border-strong)] p-4 text-sm space-y-2"
                  style={{ background: 'var(--cyan-dim)' }}>
                  <p className="text-si-text">✓ Acesso online imediato</p>
                  <p className="text-si-text">✓ Pagamento seguro via Kiwify</p>
                  <p className="text-si-text">✓ Conteúdo pensado para iniciantes</p>
                </div>

                <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                  {copy.primaryCta} →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal">
          <article className="surface surface-hover p-7 sm:p-8">
            <div className="section-label">Conteúdo</div>
            <h2 className="font-display font-bold text-2xl text-si-text">O que você vai aprender</h2>
            <p className="mt-3 text-si-muted">
              Conteúdo focado em aplicação prática para você ganhar confiança e começar a programar.
            </p>
            <ul className="mt-6 space-y-3">
              {learningPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-si-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-si-cyan flex-shrink-0"
                    style={{ boxShadow: '0 0 8px var(--cyan)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="surface surface-hover p-7 sm:p-8">
            <div className="section-label">Público</div>
            <h2 className="font-display font-bold text-2xl text-si-text">Para quem este curso é ideal</h2>
            <p className="mt-3 text-si-muted">
              Se você quer aprender com clareza e evitar frustração, este formato foi desenhado para você.
            </p>
            <ul className="mt-6 space-y-3">
              {audiencePoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-si-muted">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-si-cyan flex-shrink-0"
                    style={{ boxShadow: '0 0 8px var(--cyan)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Final CTA */}
        <div className="surface p-7 sm:p-8 reveal" style={{
          background: 'linear-gradient(135deg, var(--cyan-dim), rgba(124,58,237,0.08))',
        }}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="section-label">Comece hoje</div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text">
                Pronto para acelerar sua jornada na programação?
              </h2>
              <p className="mt-3 text-si-muted max-w-2xl">
                Entre agora para o curso e aprenda com um plano claro, do primeiro passo ao seu primeiro projeto prático.
              </p>
            </div>
            <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary flex-shrink-0">
              {copy.secondaryCta} →
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <a href={KIWIFY_URL} target="_blank" rel="noopener noreferrer"
          className="btn-primary w-full max-w-md mx-auto block text-center">
          {copy.mobileCta} →
        </a>
      </div>
    </section>
  );
};

export default OnlineCoursesPage;
