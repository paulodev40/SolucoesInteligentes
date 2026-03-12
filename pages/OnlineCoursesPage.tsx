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
    title: 'Aprenda programacao com I.A. e tire seu primeiro projeto do papel',
    subtitle:
      'Um curso objetivo para iniciantes que querem sair da teoria e construir solucoes reais com apoio da inteligencia artificial, de forma pratica e guiada.',
    primaryCta: 'Comprar curso agora',
    secondaryCta: 'Garantir minha vaga',
    mobileCta: 'Quero comecar agora',
  },
  B: {
    title: 'Do zero ao seu primeiro software com I.A., passo a passo',
    subtitle:
      'Aprenda com um metodo direto ao ponto para iniciar em programacao, acelerar com IA e publicar seu primeiro projeto com mais confianca.',
    primaryCta: 'Comecar agora',
    secondaryCta: 'Quero entrar na turma',
    mobileCta: 'Entrar agora',
  },
};

const OnlineCoursesPage: React.FC = () => {
  const [variant, setVariant] = React.useState<'A' | 'B'>('A');

  React.useEffect(() => {
    const savedVariant = window.localStorage.getItem('onlineCourseCopyVariant');
    if (savedVariant === 'A' || savedVariant === 'B') {
      setVariant(savedVariant);
      return;
    }

    const selectedVariant: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
    window.localStorage.setItem('onlineCourseCopyVariant', selectedVariant);
    setVariant(selectedVariant);
  }, []);

  const selectedCopy = copyVariants[variant];

  return (
    <div className="bg-gray-900 py-14 pb-28 sm:py-20 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-gray-800/90 via-gray-900 to-gray-800/80 p-8 sm:p-12 shadow-xl">
          <div className="pointer-events-none absolute -top-20 -left-12 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-4 py-1.5 text-sm font-semibold text-yellow-300">
              <span>✅</span>
              <span>Curso disponível agora</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {selectedCopy.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 leading-relaxed">
              {selectedCopy.subtitle}
            </p>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 rounded-xl border border-cyan-400/25 bg-gray-800/70 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Formação</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                  Programação Turbo com I.A.
                </h2>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Aprender a programar não precisa ser um processo lento e solitário. No curso Programando
                  com I.A. para Iniciantes, você aprenderá a utilizar as ferramentas de Inteligência
                  Artificial mais avançadas do mercado como seu mentor pessoal. Do zero ao seu primeiro
                  projeto real, com linguagem simples e prática imediata.
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-cyan-400/25 bg-gray-950">
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

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Nível: Iniciante</span>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Formato: Online</span>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Plataforma: Kiwify</span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:min-h-[340px] xl:min-h-[380px] rounded-xl border border-cyan-400/25 bg-gray-900/75 p-6 sm:p-7 flex flex-col justify-center gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Inscrições abertas</h3>
                  <p className="mt-3 text-gray-300">
                    O curso Programando com I.A. para Iniciantes já está pronto. Garanta seu acesso agora
                    e comece a aprender com aulas práticas para acelerar sua evolução desde o zero.
                  </p>
                </div>

                <div className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                  <p>Acesso online imediato</p>
                  <p className="mt-2">Pagamento seguro via Kiwify</p>
                  <p className="mt-2">Conteúdo pensado para iniciantes</p>
                </div>

                <div>
                  <a
                    href="https://pay.kiwify.com.br/JPfyumd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-gray-900 transition-colors hover:bg-cyan-400"
                  >
                    {selectedCopy.primaryCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-cyan-400/25 bg-gray-800/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">O que voce vai aprender</h2>
            <p className="mt-3 text-gray-300">
              Conteudo focado em aplicacao pratica para voce ganhar confianca e comecar a programar.
            </p>
            <ul className="mt-6 space-y-3">
              {learningPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-cyan-400/25 bg-gray-800/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">Para quem este curso e ideal</h2>
            <p className="mt-3 text-gray-300">
              Se voce quer aprender com clareza e evitar frustracao, este formato foi desenhado para voce.
            </p>
            <ul className="mt-6 space-y-3">
              {audiencePoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-cyan-200 text-sm font-semibold uppercase tracking-wide">Comece hoje</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Pronto para acelerar sua jornada na programacao?</h2>
              <p className="mt-3 text-gray-200 max-w-2xl">
                Entre agora para o curso Programando com I.A. para Iniciantes e aprenda com um plano claro, do primeiro passo ao seu primeiro projeto pratico.
              </p>
            </div>
            <a
              href="https://pay.kiwify.com.br/JPfyumd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-cyan-400"
            >
              {selectedCopy.secondaryCta}
            </a>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <a
          href="https://pay.kiwify.com.br/JPfyumd"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex max-w-md items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-base font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-colors hover:bg-cyan-400"
        >
          {selectedCopy.mobileCta}
        </a>
      </div>
    </div>
  );
};

export default OnlineCoursesPage;
