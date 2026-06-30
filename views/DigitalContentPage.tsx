import React from 'react';

const DIGITAL_VIDEOS = [
  {
    id: 'O5nABJGU6QA',
    title: 'Origem da I.A. • Episódio 1',
    description:
      'Episódio de abertura da nossa série sobre Inteligência Artificial. Voltamos às origens do conceito para entender como ele nasceu, quais foram os marcos históricos que levaram aos modelos de hoje e por que a IA deixou de ser ficção científica para se tornar parte do dia a dia. Ideal para quem quer construir uma base sólida antes de mergulhar nas ferramentas práticas.',
  },
  {
    id: 'lnFb7tTus0E',
    title: 'Supabase na prática',
    description:
      'Uma apresentação do Supabase, a plataforma open-source que oferece banco de dados, autenticação e APIs prontas para suas aplicações. Mostramos para que ele serve, como se compara a outras soluções de backend e em que tipo de projeto ele acelera o desenvolvimento — útil tanto para quem está começando quanto para quem quer evitar montar infraestrutura do zero.',
  },
  {
    id: '_R_YBMvNQV0',
    title: 'Programando com IA',
    description:
      'Como usar a Inteligência Artificial como parceira de programação no dia a dia. Demonstramos na prática como a IA ajuda a escrever, revisar e explicar código, acelerando tarefas repetitivas e reduzindo o tempo gasto na resolução de problemas — sem substituir o entendimento de quem programa.',
  },
  {
    id: 'hZ_ZZH_EwPo',
    title: 'GitHub: tutorial para iniciantes',
    description:
      'Tutorial prático de GitHub para quem precisa organizar e versionar projetos com segurança. Explicamos os conceitos essenciais — repositórios, commits e histórico de versões — e mostramos o fluxo básico para guardar seu trabalho, acompanhar mudanças e colaborar com outras pessoas sem perder nada pelo caminho.',
  },
  {
    id: 'ePwFe4cfIWo',
    title: 'Seu Capi, o técnico de TI',
    description:
      'Conheça o Seu Capi, nosso personagem que descomplica a tecnologia. Neste vídeo ele atua como técnico de TI, traduzindo problemas comuns do dia a dia em explicações simples e bem-humoradas — uma forma leve de aprender boas práticas e entender melhor as ferramentas que usamos.',
  },
];

const DigitalContentPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Conteúdo Digital</div>
          <h2 className="section-title">Vídeos do nosso canal no YouTube</h2>
          <p className="section-desc mx-auto">
            Reunimos aqui uma seleção de vídeos do nosso canal para você aprender Inteligência
            Artificial e tecnologia de forma prática e descomplicada. São conteúdos que vão da
            história da IA às ferramentas que usamos no dia a dia — programação assistida por IA,
            banco de dados, versionamento de código e muito mais. Cada vídeo foi pensado para ser
            direto ao ponto e aplicável, seja você iniciante ou alguém que já trabalha com tecnologia
            e quer se atualizar.
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
