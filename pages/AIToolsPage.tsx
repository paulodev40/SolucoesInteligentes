import React from 'react';

const FREE_AI_TOOLS = [
  {
    slug: 'dashgenius',
    name: 'DashGenius',
    category: 'Dados e Visualizacao',
    url: 'https://dash-genius.vercel.app/',
    description:
      'Envie sua planilha e transforme automaticamente os dados em um dashboard visual e facil de entender, com graficos e indicadores prontos para analise.',
    bestFor: 'Empreendedores, equipes comerciais, financeiro e operacoes.',
    highlight: 'Converte planilhas em dashboard em poucos minutos.',
  },
];

const AIToolsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 sm:p-10 lg:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 text-center">
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">
              Ferramentas de IA
            </span>
            <h1 className="mt-4 text-4xl sm:text-[3rem] font-extrabold text-white leading-tight">
              Recursos gratuitos para acelerar seu trabalho
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed">
              Aqui voce encontra ferramentas e sistemas de IA para facilitar tarefas do dia a dia. Esta secao sera atualizada
              com novas opcoes gratuitas para os usuarios.
            </p>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {FREE_AI_TOOLS.map((tool) => (
            <article
              key={tool.slug}
              className="rounded-xl border border-cyan-400/20 bg-gray-800/70 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-xl hover:shadow-cyan-950/30"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {tool.category}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Gratuito
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-white">{tool.name}</h2>
              <p className="mt-3 text-gray-300 leading-relaxed">{tool.description}</p>

              <div className="mt-5 rounded-lg border border-cyan-400/20 bg-gray-900/60 p-4">
                <p className="text-sm font-semibold text-cyan-300">Destaque</p>
                <p className="mt-1 text-gray-300">{tool.highlight}</p>
              </div>

              <p className="mt-4 text-sm text-gray-400">
                <span className="font-semibold text-gray-300">Ideal para:</span> {tool.bestFor}
              </p>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
              >
                Acessar ferramenta
              </a>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AIToolsPage;
