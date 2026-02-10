import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Política de Privacidade</h1>
          <p className="mt-4 text-lg text-gray-400">Última atualização: 12 de fevereiro de 2026</p>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-2">1. Controlador e Encarregado</h2>
            <p>
              A Solucoes Inteligentes e a controladora dos dados pessoais tratados neste site. Para assuntos relacionados a
              privacidade e LGPD, entre em contato pelo email
              <span className="text-cyan-400"> solucoesinteligentes83@gmail.com</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">2. Dados pessoais coletados</h2>
            <p>
              Podemos coletar informacoes fornecidas por voce (nome, email e mensagem) quando utiliza nossos formularios,
              bem como dados tecnicos basicos (ex: navegador, dispositivo e logs) para seguranca e melhoria do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">3. Finalidades e bases legais</h2>
            <p>
              Tratamos dados para: responder contatos, prestar suporte, melhorar nossos servicos e manter a seguranca do
              site. As bases legais incluem o consentimento do titular, a execucao de procedimentos preliminares a
              contratos e o legitimo interesse, conforme aplicavel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">4. Compartilhamento de dados</h2>
            <p>
              Nao vendemos seus dados. Podemos compartilhar informacoes apenas com fornecedores essenciais (ex: hospedagem
              e analytics) ou para cumprir obrigacoes legais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">5. Cookies e tecnologias similares</h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar a navegacao, analisar trafego e personalizar
              conteudos quando aplicavel. Voce pode gerenciar cookies nas configuracoes do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">6. Retencao e seguranca</h2>
            <p>
              Mantemos os dados apenas pelo tempo necessario para as finalidades descritas ou obrigacoes legais. Adotamos
              medidas tecnicas e organizacionais para proteger os dados, embora nenhuma transmissao seja 100% segura.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">7. Direitos do titular</h2>
            <p>
              Voce pode solicitar confirmacao de tratamento, acesso, correcao, exclusao, portabilidade, revogacao do
              consentimento e informacoes sobre compartilhamento. Para exercer seus direitos, entre em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">8. Contato</h2>
            <p>
              Em caso de duvidas sobre esta politica, fale conosco pelo email
              <span className="text-cyan-400"> solucoesinteligentes83@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
