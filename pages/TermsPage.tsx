import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Termos de Serviço</h1>
          <p className="mt-4 text-lg text-gray-400">Última atualização: 12 de fevereiro de 2026</p>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">1. Aceitacao dos termos</h2>
            <p>
              Ao acessar e utilizar este site, voce concorda com estes termos. Se nao concordar, nao utilize o servico.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">2. Uso do site</h2>
            <p>
              Voce concorda em utilizar o site de forma licita, sem violar direitos de terceiros ou comprometer a
              seguranca da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">3. Privacidade e LGPD</h2>
            <p>
              O tratamento de dados pessoais segue a nossa Politica de Privacidade. Ao utilizar o site, voce reconhece e
              concorda com esse tratamento nos termos da LGPD, conforme aplicavel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">4. Propriedade intelectual</h2>
            <p>
              Todo o conteudo do site (textos, marcas, imagens e layouts) e de propriedade da Solucoes Inteligentes ou de
              seus licenciadores, sendo protegido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">5. Limitacao de responsabilidade</h2>
            <p>
              Nao nos responsabilizamos por danos indiretos, perda de dados ou interrupcoes decorrentes do uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">6. Alteracoes nos termos</h2>
            <p>
              Podemos atualizar estes termos a qualquer momento. A versao vigente estara sempre disponivel nesta pagina.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">7. Contato</h2>
            <p>
              Em caso de duvidas, entre em contato pelo email
              <span className="text-cyan-400"> solucoesinteligentes83@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
