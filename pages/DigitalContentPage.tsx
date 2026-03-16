import React from 'react';

const DIGITAL_VIDEOS = [
  {
    id: 'O5nABJGU6QA',
    title: 'Origem da I.A. • Episódio 1',
    description: 'Primeiro vídeo da série sobre a origem da Inteligência Artificial.',
  },
  {
    id: 'lnFb7tTus0E',
    title: 'Supabase',
    description: 'Vídeo sobre Supabase e aplicações práticas no desenvolvimento.',
  },
  {
    id: '_R_YBMvNQV0',
    title: 'Programando com IA',
    description: 'Conteúdo sobre programação com apoio de Inteligência Artificial.',
  },
  {
    id: 'hZ_ZZH_EwPo',
    title: 'GitHub tutorial',
    description: 'Tutorial prático de GitHub para organizar e versionar projetos.',
  },
  {
    id: 'ePwFe4cfIWo',
    title: 'Seu Capi, o técnico de TI',
    description: 'Apresentação do Seu Capi e sua atuação como técnico de TI.',
  },
];

const DigitalContentPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 sm:p-10 lg:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
              Conteúdo Digital
            </span>
            <h1 className="mt-4 text-4xl sm:text-[3rem] font-extrabold text-white leading-tight">
              Vídeos do nosso canal no YouTube
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed">
              Acompanhe demonstrações, dicas práticas e novidades sobre Inteligência Artificial para aplicar no seu negócio.
            </p>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {DIGITAL_VIDEOS.map((video) => (
            <article
              key={video.id}
              className="rounded-xl border border-cyan-400/20 bg-gray-800/70 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-xl hover:shadow-cyan-950/30"
            >
              <div className="relative w-full overflow-hidden rounded-lg border border-cyan-400/20" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-white">{video.title}</h2>
              <p className="mt-2 text-gray-300">{video.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-8 sm:p-10 text-center">
          <h3 className="text-3xl font-extrabold text-white">Quer acompanhar os próximos conteúdos?</h3>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-300">
            Inscreva-se no canal para receber novos vídeos com demonstrações e estratégias práticas de I.A.
          </p>

          <a
            href="https://www.youtube.com/@solucoesinteligentes83"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center px-8 py-4 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Ir para o canal no YouTube
          </a>
        </section>
      </div>
    </div>
  );
};

export default DigitalContentPage;
