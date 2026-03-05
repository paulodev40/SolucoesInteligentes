import React from 'react';

const OnlineCoursesPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-gray-800/90 via-gray-900 to-gray-800/80 p-8 sm:p-12 shadow-xl">
          <div className="pointer-events-none absolute -top-20 -left-12 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/10 px-4 py-1.5 text-sm font-semibold text-yellow-300">
              <span>🚧</span>
              <span>Curso em construção</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Domine a Programação na Velocidade da I.A.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-300 leading-relaxed">
              Torne-se um desenvolvedor do futuro com inteligência artificial, aprendendo com método
              prático e acompanhamento guiado para acelerar seus resultados desde o início.
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

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Nível: Iniciante</span>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Formato: Online</span>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">Plataforma: Kiwify</span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:min-h-[340px] xl:min-h-[380px] rounded-xl border border-cyan-400/25 bg-gray-900/75 p-6 sm:p-7 flex flex-col justify-center gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Oportunidade em Construção</h3>
                  <p className="mt-3 text-gray-300">
                    Estamos dando os toques finais nos módulos para garantir que você tenha a melhor
                    experiência de aprendizado. As vagas para a primeira turma serão limitadas e com
                    condições especiais para quem estiver na lista de espera.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-lg bg-gray-700 px-5 py-3 font-semibold text-gray-300 cursor-not-allowed"
                  >
                    Quero ser avisado do lançamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnlineCoursesPage;
