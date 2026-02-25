import React from 'react';

const ConsultingPage: React.FC = () => {
  const steps = [
    {
      title: '1. Diagnóstico',
      subtitle: 'Entendimento do seu cenário',
      description: 'Coletamos contexto, objetivos e limitações para mapear a real necessidade do negócio.',
    },
    {
      title: '2. Proposta',
      subtitle: 'Plano de solução com I.A.',
      description: 'Estruturamos a abordagem técnica ideal para construir um software sob medida para sua demanda.',
    },
    {
      title: '3. Próximos passos',
      subtitle: 'Contato e direcionamento',
      description: 'Entramos em contato para alinhar escopo, prazos e o caminho mais eficiente para execução.',
    },
  ];

  return (
    <div className="consulting-modern relative overflow-hidden bg-gray-900 py-14 sm:py-20">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(26px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatGentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.2);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(6, 182, 212, 0);
          }
        }

        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .consulting-modern .fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .consulting-modern .delay-1 {
          animation-delay: 0.12s;
        }

        .consulting-modern .delay-2 {
          animation-delay: 0.24s;
        }

        .consulting-modern .delay-3 {
          animation-delay: 0.36s;
        }

        .consulting-modern .delay-4 {
          animation-delay: 0.48s;
        }

        .consulting-modern .float-gentle {
          animation: floatGentle 5s ease-in-out infinite;
        }

        .consulting-modern .pulse-glow {
          animation: pulseGlow 2.8s ease-out infinite;
        }

        .consulting-modern .animated-gradient {
          background-size: 200% 200%;
          animation: moveGradient 10s ease infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .consulting-modern .fade-in-up,
          .consulting-modern .float-gentle,
          .consulting-modern .pulse-glow,
          .consulting-modern .animated-gradient {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-900/95 p-8 sm:p-10 lg:p-12 shadow-2xl shadow-cyan-950/30">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(34,211,238,0.18) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 fade-in-up">
              <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300 pulse-glow">
                Consultoria em I.A.
              </span>
              <h1 className="mt-4 text-4xl sm:text-[3rem] font-extrabold text-white leading-tight">
                Solução personalizada para o seu desafio
              </h1>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed">
                Se você precisa de um software específico para sua demanda, nossa consultoria em Inteligência
                Artificial foi feita para isso. Entendemos o seu cenário, desenhamos a melhor estratégia e
                conduzimos os próximos passos para transformar sua necessidade em uma solução prática.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end fade-in-up delay-1">
              <div className="relative float-gentle">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-lg animated-gradient" />
                <img
                  src="/assets/images/logotipo2.png"
                  alt="Logotipo da consultoria"
                  className="relative w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-full border border-cyan-400/30 p-2 shadow-lg shadow-cyan-900/30 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`fade-in-up rounded-xl border border-cyan-400/20 bg-gray-800/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/45 hover:shadow-xl hover:shadow-cyan-950/30 ${index === 0 ? 'delay-2' : index === 1 ? 'delay-3' : 'delay-4'}`}
            >
              <p className="text-cyan-300 font-semibold">{step.title}</p>
              <h2 className="mt-2 text-xl font-bold text-white">{step.subtitle}</h2>
              <p className="mt-3 text-gray-300">{step.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-purple-900/20 p-8 sm:p-10 text-center fade-in-up delay-3 shadow-2xl shadow-cyan-950/20">
          <h3 className="text-3xl font-extrabold text-white">Fale com a equipe de consultoria</h3>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-300">
            Preencha o formulário com sua demanda. Quanto mais detalhes você compartilhar, mais precisa será
            nossa análise inicial.
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdI-78eeSOU7-w_0k8qTXecbUsCgb_hs5we031QWFVyFsaEvw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-cyan-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-900/40"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Acessar formulário de consultoria</span>
          </a>
        </section>
      </div>
    </div>
  );
};

export default ConsultingPage;
