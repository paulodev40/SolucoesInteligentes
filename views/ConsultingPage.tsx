import React from 'react';
import AdSlot from '../components/AdSlot';

const ConsultingPage: React.FC = () => {
  const steps = [
    {
      title: '1. Diagnóstico',
      subtitle: 'Entendimento do seu cenário',
      description: 'Coletamos contexto, objetivos e limitações para mapear a real necessidade do negócio.',
      icon: 'fas fa-search',
    },
    {
      title: '2. Proposta',
      subtitle: 'Plano de solução com I.A.',
      description: 'Estruturamos a abordagem técnica ideal para construir um software sob medida para sua demanda.',
      icon: 'fas fa-drafting-compass',
    },
    {
      title: '3. Próximos passos',
      subtitle: 'Contato e direcionamento',
      description: 'Entramos em contato para alinhar escopo, prazos e o caminho mais eficiente para execução.',
      icon: 'fas fa-rocket',
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 px-5 overflow-hidden">
      {/* Hero card */}
      <div className="max-w-7xl mx-auto">
        <div className="surface p-8 sm:p-10 lg:p-12 relative overflow-hidden reveal">
          <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--cyan-glow), transparent 70%)' }} />
          <div aria-hidden className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)' }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="section-label">Consultoria em I.A.</div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-si-text leading-tight">
                Solução <span className="text-si-cyan">personalizada</span> para o seu desafio
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-si-muted leading-relaxed">
                Se você precisa de um software específico para sua demanda, nossa consultoria em
                Inteligência Artificial foi feita para isso. Entendemos o seu cenário, desenhamos a
                melhor estratégia e conduzimos os próximos passos para transformar sua necessidade em
                uma solução prática.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                <div aria-hidden className="absolute -inset-3 rounded-full blur-2xl"
                  style={{ background: 'conic-gradient(from 0deg, var(--cyan), var(--violet), var(--cyan))', opacity: 0.4 }} />
                <img
                  src="/assets/images/logotipo2.png"
                  alt="Logotipo da consultoria"
                  className="relative w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-full border-2 border-[var(--border-strong)] p-2 bg-[var(--bg)]"
                  style={{ boxShadow: '0 0 40px var(--cyan-glow)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-12 reveal">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Como funciona</div>
            <h2 className="section-title">3 passos para começar</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <article key={step.title} className="surface surface-hover p-7">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                  style={{ background: 'var(--cyan-dim)', border: '1px solid var(--border-strong)' }}>
                  <i className={`${step.icon} text-si-cyan text-xl`} />
                </div>
                <p className="text-si-cyan font-mono text-xs uppercase tracking-wider">{step.title}</p>
                <h3 className="mt-2 font-display font-bold text-xl text-si-text">{step.subtitle}</h3>
                <p className="mt-3 text-si-muted leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <AdSlot className="mt-12" label="Anúncio" />

        {/* Final CTA */}
        <div className="mt-12 surface p-8 sm:p-10 text-center reveal" style={{
          background: 'linear-gradient(135deg, var(--cyan-dim), rgba(124,58,237,0.08))',
        }}>
          <h3 className="font-display font-extrabold text-3xl text-si-text">
            Fale com a equipe de consultoria
          </h3>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-si-muted">
            Preencha o formulário com sua demanda. Quanto mais detalhes você compartilhar,
            mais precisa será nossa análise inicial.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdI-78eeSOU7-w_0k8qTXecbUsCgb_hs5we031QWFVyFsaEvw/viewform?usp=dialog"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary mt-7"
          >
            Acessar formulário de consultoria →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConsultingPage;
