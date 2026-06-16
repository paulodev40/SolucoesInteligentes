import React from 'react';

const sections: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: '1. Controlador e Encarregado',
    body: (
      <>
        A Soluções Inteligentes é a controladora dos dados pessoais tratados neste site. Para assuntos
        relacionados a privacidade e LGPD, entre em contato pelo email{' '}
        <span className="text-si-cyan">solucoesinteligentes83@gmail.com</span>.
      </>
    ),
  },
  {
    title: '2. Dados pessoais coletados',
    body: 'Podemos coletar informações fornecidas por você (nome, email e mensagem) quando utiliza nossos formulários, bem como dados técnicos básicos (ex: navegador, dispositivo e logs) para segurança e melhoria do site.',
  },
  {
    title: '3. Finalidades e bases legais',
    body: 'Tratamos dados para: responder contatos, prestar suporte, melhorar nossos serviços e manter a segurança do site. As bases legais incluem o consentimento do titular, a execução de procedimentos preliminares a contratos e o legítimo interesse, conforme aplicável.',
  },
  {
    title: '4. Compartilhamento de dados',
    body: 'Não vendemos seus dados. Podemos compartilhar informações apenas com fornecedores essenciais (ex: hospedagem e analytics) ou para cumprir obrigações legais.',
  },
  {
    title: '5. Cookies e tecnologias similares',
    body: 'Utilizamos cookies e tecnologias similares para melhorar a navegação, analisar tráfego e personalizar conteúdos quando aplicável. Você pode gerenciar cookies nas configurações do seu navegador.',
  },
  {
    title: '6. Retenção e segurança',
    body: 'Mantemos os dados apenas pelo tempo necessário para as finalidades descritas ou obrigações legais. Adotamos medidas técnicas e organizacionais para proteger os dados, embora nenhuma transmissão seja 100% segura.',
  },
  {
    title: '7. Direitos do titular',
    body: 'Você pode solicitar confirmação de tratamento, acesso, correção, exclusão, portabilidade, revogação do consentimento e informações sobre compartilhamento. Para exercer seus direitos, entre em contato conosco.',
  },
  {
    title: '8. Contato',
    body: (
      <>
        Em caso de dúvidas sobre esta política, fale conosco pelo email{' '}
        <span className="text-si-cyan">solucoesinteligentes83@gmail.com</span>.
      </>
    ),
  },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Legal</div>
          <h1 className="section-title">Política de Privacidade</h1>
          <p className="font-mono text-sm text-si-muted">Última atualização: 12 de fevereiro de 2026</p>
        </header>

        <div className="surface p-7 sm:p-10 reveal">
          <div className="space-y-8 text-si-muted leading-relaxed">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display font-bold text-2xl text-si-text mb-2">{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
