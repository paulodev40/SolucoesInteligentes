
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Sobre Soluções Inteligentes</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Inteligência artificial, soluções reais.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-lg text-gray-300 space-y-6">
          <p>
            Na Soluções Inteligentes, acreditamos que a tecnologia deve ser uma força para o bem, simplificando a complexidade e liberando o potencial humano. Nascemos da paixão por inovação e do desejo de tornar a Inteligência Artificial acessível e útil para todos, desde o empreendedor individual até grandes corporações.
          </p>
          <p>
            Nossa missão é desenvolver ferramentas intuitivas e poderosas que resolvem problemas do dia a dia. Não criamos tecnologia pela tecnologia; criamos soluções que geram resultados tangíveis: mais vendas, maior produtividade, comunicação mais clara e preservação de memórias preciosas.
          </p>
          <p>
            Cada um de nossos produtos é projetado com um foco claro: o que isso faz por você? Queremos que você passe menos tempo em tarefas repetitivas e mais tempo fazendo o que ama, seja criando, inovando ou simplesmente aproveitando a vida. Junte-se a nós para descomplicar o futuro, hoje.
          </p>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-white">Nossa Equipe</h2>
          <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src="https://picsum.photos/seed/ceo/200" alt="CEO" />
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">João Silva</h3>
                <p className="text-cyan-400">CEO & Fundador</p>
              </div>
            </div>
             <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src="https://picsum.photos/seed/cto/200" alt="CTO" />
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">Maria Oliveira</h3>
                <p className="text-cyan-400">CTO & Arquiteta de IA</p>
              </div>
            </div>
             <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src="https://picsum.photos/seed/cmo/200" alt="CMO" />
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-white">Carlos Pereira</h3>
                <p className="text-cyan-400">CMO & Estrategista</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
