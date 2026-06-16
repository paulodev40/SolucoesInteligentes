import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Sobre nós</div>
          <h1 className="section-title">Soluções Inteligentes</h1>
          <p className="section-desc mx-auto">Inteligência artificial, soluções reais.</p>
        </div>

        {/* Terminal animado */}
        <div className="mt-12 max-w-3xl mx-auto reveal">
          <div className="terminal-box">
            <div className="terminal-bar">
              <span className="dot" style={{ background: '#ff5f57' }} />
              <span className="dot" style={{ background: '#febc2e' }} />
              <span className="dot" style={{ background: '#28c840' }} />
              <span className="filename">about.json</span>
            </div>
            <div className="terminal-body">
              <div><span className="t-comment">// Quem somos</span></div>
              <div>{'{'}</div>
              <div>{'  '}<span className="t-key">"empresa"</span>: <span className="t-str">"Soluções Inteligentes 83"</span>,</div>
              <div>{'  '}<span className="t-key">"missao"</span>: <span className="t-str">"Tornar a IA acessível e útil"</span>,</div>
              <div>{'  '}<span className="t-key">"foco"</span>: <span className="t-str">"Resultados reais para pessoas reais"</span>,</div>
              <div>{'  '}<span className="t-key">"produtos_ativos"</span>: <span className="t-num">5</span>,</div>
              <div>{'  '}<span className="t-key">"em_desenvolvimento"</span>: <span className="t-num">83</span>,</div>
              <div>{'  '}<span className="t-key">"status"</span>: <span className="t-str">"online"</span><span className="t-cursor">_</span></div>
              <div>{'}'}</div>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="mt-16 max-w-4xl mx-auto text-lg text-si-muted leading-relaxed space-y-6 reveal">
          <p>
            Na <strong className="text-si-text">Soluções Inteligentes</strong>, acreditamos que a tecnologia deve ser uma força para o
            bem, simplificando a complexidade e liberando o potencial humano. Nascemos da paixão por
            inovação e do desejo de tornar a Inteligência Artificial acessível e útil para todos, desde o
            empreendedor individual até grandes corporações.
          </p>
          <p>
            Nossa missão é desenvolver ferramentas intuitivas que resolvem problemas do dia a dia. Não
            criamos tecnologia pela tecnologia; criamos soluções que geram resultados tangíveis: mais
            vendas, maior produtividade, comunicação mais clara e preservação de memórias preciosas.
          </p>
          <p>
            Cada um de nossos produtos é projetado com um foco claro:{' '}
            <em className="text-si-cyan">o que isso faz por você?</em> Queremos que você passe menos tempo
            em tarefas repetitivas e mais tempo fazendo o que ama, seja criando e inovando. Junte-se a
            nós para descomplicar o futuro, hoje!
          </p>
        </div>

        {/* Equipe */}
        <div className="mt-20 reveal">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Time</div>
            <h2 className="section-title">Nossa Equipe</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Paulo N. S.', role: 'Criador & Desenvolvedor', img: '/assets/images/paulo.png' },
              { name: 'Juliana M. T.', role: 'Administração & Finanças', img: '/assets/images/juliana3.jpeg' },
            ].map((m) => (
              <div key={m.name} className="surface surface-hover p-7 text-center">
                <div className="relative mx-auto w-32 h-32 mb-5">
                  <div aria-hidden className="absolute -inset-1 rounded-full blur-lg"
                    style={{ background: 'conic-gradient(from 0deg, var(--cyan), var(--violet), var(--cyan))', opacity: 0.5 }} />
                  <img className="relative h-32 w-32 rounded-full object-cover border-2 border-[var(--border-strong)]"
                    style={{ boxShadow: '0 0 24px var(--cyan-glow)' }}
                    src={m.img} alt={m.name} />
                </div>
                <h3 className="font-display font-bold text-xl text-si-text">{m.name}</h3>
                <p className="mt-1 text-si-cyan font-mono text-sm uppercase tracking-wider">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
