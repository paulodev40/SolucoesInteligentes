import React from 'react';
import Link from 'next/link';

const AI_BUILT_IN = [
  {
    slug: 'resumidor-de-texto',
    name: 'Resumidor de Texto com IA',
    category: 'Inteligência Artificial',
    desc: 'Cole qualquer texto — artigo, relatório, contrato, e-mail — e receba um resumo claro em segundos.',
    emoji: '🤖',
  },
  {
    slug: 'analisador-de-legibilidade',
    name: 'Analisador de Legibilidade',
    category: 'Conteúdo e Escrita',
    desc: 'Score Flesch adaptado para português. Veja o nível de dificuldade do seu texto e dicas de melhoria.',
    emoji: '📊',
  },
  {
    slug: 'gerador-de-bio',
    name: 'Gerador de Bio Profissional',
    category: 'Perfil Profissional',
    desc: 'Bio para LinkedIn, Instagram, Twitter/X e WhatsApp em segundos. Preencha e gere.',
    emoji: '✍️',
  },
];

const AIToolsPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Ferramentas de IA</div>
          <h2 className="section-title">Recursos para acelerar seu trabalho</h2>
          <p className="section-desc mx-auto">
            Ferramentas de inteligência artificial para facilitar tarefas do dia a dia.
            Gratuitas e prontas para usar — sem cadastro.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {AI_BUILT_IN.map((tool) => (
            <Link
              key={tool.slug}
              href={`/ferramentas/${tool.slug}`}
              className="surface surface-hover p-7 sm:p-8 group flex flex-col"
              style={{ textDecoration: 'none' }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="chip chip--cyan">{tool.category}</span>
                <span className="badge badge--green">Gratuito</span>
              </div>
              <div className="text-4xl mb-3">{tool.emoji}</div>
              <h3 className="font-display font-extrabold text-xl text-si-text">{tool.name}</h3>
              <p className="mt-3 text-si-muted leading-relaxed flex-1 text-sm">{tool.desc}</p>
              <span className="btn-primary mt-6 w-fit text-sm">Acessar →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsPage;
