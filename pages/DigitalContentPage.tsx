import React from 'react';

const DIGITAL_VIDEOS = [
  { id: 'O5nABJGU6QA', title: 'Origem da I.A. • Episódio 1', description: 'Primeiro vídeo da série sobre a origem da Inteligência Artificial.' },
  { id: 'lnFb7tTus0E', title: 'Supabase', description: 'Vídeo sobre Supabase e aplicações práticas no desenvolvimento.' },
  { id: '_R_YBMvNQV0', title: 'Programando com IA', description: 'Conteúdo sobre programação com apoio de Inteligência Artificial.' },
  { id: 'hZ_ZZH_EwPo', title: 'GitHub tutorial', description: 'Tutorial prático de GitHub para organizar e versionar projetos.' },
  { id: 'ePwFe4cfIWo', title: 'Seu Capi, o técnico de TI', description: 'Apresentação do Seu Capi e sua atuação como técnico de TI.' },
];

const DigitalContentPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Conteúdo Digital</div>
          <h2 className="section-title">Vídeos do nosso canal no YouTube</h2>
          <p className="section-desc mx-auto">
            Acompanhe demonstrações, dicas práticas e novidades sobre Inteligência Artificial para aplicar no seu negócio.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 reveal">
          {DIGITAL_VIDEOS.map((video) => (
            <article key={video.id} className="surface surface-hover p-5 sm:p-6">
              <div className="relative w-full overflow-hidden rounded-lg border border-[var(--border-strong)]" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="mt-4 font-display font-bold text-xl text-si-text">{video.title}</h3>
              <p className="mt-2 text-si-muted">{video.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 surface p-8 sm:p-10 text-center reveal" style={{
          background: 'linear-gradient(135deg, var(--cyan-dim), rgba(124,58,237,0.08))',
          border: '1px solid var(--border-strong)',
        }}>
          <h3 className="font-display font-extrabold text-3xl text-si-text">
            Quer acompanhar os próximos conteúdos?
          </h3>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-si-muted">
            Inscreva-se no canal para receber novos vídeos com demonstrações e estratégias práticas de I.A.
          </p>
          <a href="https://www.youtube.com/@solucoesinteligentes83"
            target="_blank" rel="noopener noreferrer"
            className="btn-primary mt-7">
            <i className="fab fa-youtube mr-2" /> Ir para o canal no YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default DigitalContentPage;
