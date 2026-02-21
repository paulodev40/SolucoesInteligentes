import React from 'react';

const ConsultingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 sm:p-10 lg:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
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
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <img
                src="/assets/images/logotipo2.png"
                alt="Logotipo da consultoria"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-full border border-cyan-400/30 p-2 shadow-lg shadow-cyan-900/30"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-cyan-400/20 bg-gray-800/70 p-6">
            <p className="text-cyan-300 font-semibold">1. Diagnóstico</p>
            <h2 className="mt-2 text-xl font-bold text-white">Entendimento do seu cenário</h2>
            <p className="mt-3 text-gray-300">
              Coletamos contexto, objetivos e limitações para mapear a real necessidade do negócio.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/20 bg-gray-800/70 p-6">
            <p className="text-cyan-300 font-semibold">2. Proposta</p>
            <h2 className="mt-2 text-xl font-bold text-white">Plano de solução com I.A.</h2>
            <p className="mt-3 text-gray-300">
              Estruturamos a abordagem técnica ideal para construir um software sob medida para sua demanda.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/20 bg-gray-800/70 p-6">
            <p className="text-cyan-300 font-semibold">3. Próximos passos</p>
            <h2 className="mt-2 text-xl font-bold text-white">Contato e direcionamento</h2>
            <p className="mt-3 text-gray-300">
              Entramos em contato para alinhar escopo, prazos e o caminho mais eficiente para execução.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-8 sm:p-10 text-center">
          <h3 className="text-3xl font-extrabold text-white">Fale com a equipe de consultoria</h3>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-300">
            Preencha o formulário com sua demanda. Quanto mais detalhes você compartilhar, mais precisa será
            nossa análise inicial.
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdI-78eeSOU7-w_0k8qTXecbUsCgb_hs5we031QWFVyFsaEvw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center px-8 py-4 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Acessar formulário de consultoria
          </a>
        </section>
      </div>
    </div>
  );
};

export default ConsultingPage;
