import React from 'react';

const FREE_AI_TOOLS = [
  {
    slug: 'dashgenius',
    name: 'DashGenius',
    category: 'Dados e Visualização',
    url: 'https://dash-genius.vercel.app/',
    description:
      'Envie sua planilha e transforme automaticamente os dados em um dashboard visual e fácil de entender, com gráficos e indicadores prontos para análise.',
    bestFor: 'Empreendedores, equipes comerciais, financeiro e operações.',
    highlight: 'Converte planilhas em dashboard em poucos minutos.',
  },
];

const AIToolsPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Ferramentas de IA</div>
          <h2 className="section-title">Recursos gratuitos para acelerar seu trabalho</h2>
          <p className="section-desc mx-auto">
            Aqui você encontra ferramentas e sistemas de IA para facilitar tarefas do dia a dia.
            Esta seção será atualizada com novas opções gratuitas para os usuários.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
          {FREE_AI_TOOLS.map((tool) => (
            <article key={tool.slug} className="surface surface-hover p-7 sm:p-8 group">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="chip chip--cyan">{tool.category}</span>
                <span className="badge badge--green">Gratuito</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-si-text">{tool.name}</h3>
              <p className="mt-3 text-si-muted leading-relaxed">{tool.description}</p>

              <div className="mt-5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] p-4">
                <p className="section-label" style={{ marginBottom: 4 }}>Destaque</p>
                <p className="text-si-text">{tool.highlight}</p>
              </div>

              <p className="mt-4 text-sm text-si-muted">
                <span className="text-si-text font-semibold">Ideal para:</span> {tool.bestFor}
              </p>

              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="btn-primary mt-6">
                Acessar ferramenta →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsPage;
