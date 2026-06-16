import React from 'react';
import { Link } from 'react-router-dom';

const BUILT_IN_TOOLS = [
  {
    slug: 'ferias-13',
    name: 'Calculadora de Férias e 13º',
    category: 'Trabalhista',
    desc: 'Calcule férias (com terço constitucional) e 13º salário proporcional, com desconto estimado de INSS e IRRF.',
    emoji: '🏖️',
  },
  {
    slug: 'cnpj',
    name: 'Verificador de CNPJ',
    category: 'Empresarial',
    desc: 'Consulte dados de qualquer empresa pelo CNPJ: razão social, situação cadastral, endereço e sócios — dados da Receita Federal.',
    emoji: '🏢',
  },
  {
    slug: 'prompt-ia',
    name: 'Gerador de Prompts para IA',
    category: 'Inteligência Artificial',
    desc: 'Crie prompts eficientes para ChatGPT, Claude e Gemini em segundos. Escolha a tarefa e gere um prompt otimizado.',
    emoji: '✨',
  },
];

const AI_TOOLS = [
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

const ToolsPage: React.FC = () => (
  <section className="relative py-20 sm:py-24 px-5">
    <div className="max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Ferramentas Gratuitas</div>
        <h1 className="section-title">Recursos para o seu dia a dia</h1>
        <p className="section-desc mx-auto">
          Calculadoras, verificadores, geradores e ferramentas de IA — tudo gratuito para
          profissionais, empreendedores e entusiastas de tecnologia.
        </p>
      </div>

      {/* ── Ferramentas interativas ── */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
        {BUILT_IN_TOOLS.map((tool) => (
          <Link
            key={tool.slug}
            to={`/ferramentas/${tool.slug}`}
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

      {/* ── Divisor ── */}
      <div className="section-divider my-16 reveal" />

      {/* ── Ferramentas de IA externas ── */}
      <div className="reveal">
        <div className="section-label">Ferramentas de IA</div>
        <h2 className="section-title">Recursos para acelerar seu trabalho</h2>
        <p className="section-desc">
          Ferramentas e sistemas de IA para facilitar tarefas do dia a dia.
          Esta seção será atualizada com novas opções gratuitas.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
        {AI_TOOLS.map((tool) => (
          <article key={tool.slug} className="surface surface-hover p-7 sm:p-8">
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

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Acessar ferramenta →
            </a>
          </article>
        ))}
      </div>

    </div>
  </section>
);

export default ToolsPage;
