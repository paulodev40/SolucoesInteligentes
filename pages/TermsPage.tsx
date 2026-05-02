import React from 'react';

const sections: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: '1. Aceitação dos termos',
    body: 'Ao acessar e utilizar este site, você concorda com estes termos. Se não concordar, não utilize o serviço.',
  },
  {
    title: '2. Uso do site',
    body: 'Você concorda em utilizar o site de forma lícita, sem violar direitos de terceiros ou comprometer a segurança da plataforma.',
  },
  {
    title: '3. Privacidade e LGPD',
    body: 'O tratamento de dados pessoais segue a nossa Política de Privacidade. Ao utilizar o site, você reconhece e concorda com esse tratamento nos termos da LGPD, conforme aplicável.',
  },
  {
    title: '4. Propriedade intelectual',
    body: 'Todo o conteúdo do site (textos, marcas, imagens e layouts) é de propriedade da Soluções Inteligentes ou de seus licenciadores, sendo protegido por lei.',
  },
  {
    title: '5. Limitação de responsabilidade',
    body: 'Não nos responsabilizamos por danos indiretos, perda de dados ou interrupções decorrentes do uso do site.',
  },
  {
    title: '6. Alterações nos termos',
    body: 'Podemos atualizar estes termos a qualquer momento. A versão vigente estará sempre disponível nesta página.',
  },
  {
    title: '7. Contato',
    body: (
      <>
        Em caso de dúvidas, entre em contato pelo email{' '}
        <span className="text-si-cyan">solucoesinteligentes83@gmail.com</span>.
      </>
    ),
  },
];

const TermsPage: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>Legal</div>
          <h1 className="section-title">Termos de Serviço</h1>
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

export default TermsPage;
