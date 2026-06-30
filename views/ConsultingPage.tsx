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

        {/* O que está incluso */}
        <div className="mt-16 reveal">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>O que está incluso</div>
            <h2 className="section-title">Da ideia ao software funcionando</h2>
            <p className="section-desc mx-auto">
              Nossa consultoria acompanha você em todas as etapas — não entregamos apenas um relatório,
              e sim um caminho prático para colocar a Inteligência Artificial para trabalhar no seu negócio.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Análise da sua necessidade',
                desc: 'Mergulhamos no seu processo atual para entender onde a IA pode gerar mais impacto e o que realmente vale automatizar.',
              },
              {
                title: 'Proposta de solução sob medida',
                desc: 'Definimos a arquitetura técnica, as ferramentas e o escopo ideal para resolver o seu problema específico — sem soluções genéricas.',
              },
              {
                title: 'Estimativa de prazos e custos',
                desc: 'Você recebe uma visão clara de tempo e investimento antes de qualquer desenvolvimento, para decidir com segurança.',
              },
              {
                title: 'Acompanhamento próximo',
                desc: 'Mantemos comunicação direta durante a execução, ajustando o rumo conforme o projeto evolui e novas necessidades aparecem.',
              },
            ].map((item) => (
              <div key={item.title} className="surface p-6 flex items-start gap-4">
                <i className="fas fa-check-circle text-si-cyan mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg text-si-text">{item.title}</h3>
                  <p className="mt-2 text-si-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exemplos de projetos */}
        <div className="mt-16 reveal">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Exemplos de projetos</div>
            <h2 className="section-title">O que dá para construir com IA</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'fas fa-robot',
                title: 'Automação de tarefas',
                desc: 'Fluxos que eliminam trabalho manual repetitivo — leitura de documentos, geração de relatórios, respostas automáticas e integração entre sistemas.',
              },
              {
                icon: 'fas fa-comments',
                title: 'Assistentes e chatbots',
                desc: 'Assistentes virtuais treinados com o conhecimento do seu negócio para atender clientes, qualificar leads ou apoiar a sua equipe interna.',
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Análise de dados',
                desc: 'Soluções que transformam dados dispersos em insights úteis: previsões, classificações e painéis que apoiam decisões melhores.',
              },
            ].map((item) => (
              <article key={item.title} className="surface surface-hover p-7">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                  style={{ background: 'var(--cyan-dim)', border: '1px solid var(--border-strong)' }}>
                  <i className={`${item.icon} text-si-cyan text-xl`} />
                </div>
                <h3 className="font-display font-bold text-xl text-si-text">{item.title}</h3>
                <p className="mt-3 text-si-muted leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 reveal">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Perguntas frequentes</div>
            <h2 className="section-title">Dúvidas comuns sobre a consultoria</h2>
          </div>
          <div className="mt-8 space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: 'Preciso entender de tecnologia para contratar?',
                a: 'Não. Nosso papel é justamente traduzir a sua necessidade de negócio em uma solução técnica. Você descreve o problema com suas palavras e nós cuidamos do resto.',
              },
              {
                q: 'Como começa o processo?',
                a: 'Você preenche o formulário com o máximo de detalhes sobre a sua demanda. A partir disso, fazemos uma análise inicial e entramos em contato para alinhar os próximos passos.',
              },
              {
                q: 'Vocês atendem pequenos negócios?',
                a: 'Sim. Trabalhamos com empreendedores e empresas de diferentes portes, dimensionando a solução ao tamanho e ao orçamento de cada projeto.',
              },
              {
                q: 'Quanto custa?',
                a: 'O investimento depende do escopo. Após entender a sua necessidade, apresentamos uma estimativa clara de prazo e custo antes de iniciar qualquer desenvolvimento.',
              },
            ].map((item) => (
              <div key={item.q} className="surface p-6">
                <h3 className="font-display font-bold text-lg text-si-text flex items-start gap-3">
                  <i className="fas fa-circle-question text-si-cyan mt-1 flex-shrink-0" />
                  {item.q}
                </h3>
                <p className="mt-3 text-si-muted leading-relaxed pl-8">{item.a}</p>
              </div>
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
