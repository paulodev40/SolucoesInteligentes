import type { Metadata } from 'next';
import FeriasPage from '../../../views/FeriasPage';

export const metadata: Metadata = {
  title: 'Calculadora de Férias e 13º Salário 2026 — Gratuita',
  description:
    'Calcule férias com terço constitucional e 13º salário proporcional com desconto de INSS e IRRF. Calculadora trabalhista gratuita e atualizada para 2026.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/calculadora-ferias-13' },
  openGraph: {
    title: 'Calculadora de Férias e 13º Salário | Soluções Inteligentes 83',
    description: 'Calcule férias e 13º salário com descontos de INSS e IRRF. Gratuita e atualizada.',
    url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-ferias-13',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Férias e 13º Salário',
      url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-ferias-13',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calcule o valor líquido das férias com terço constitucional e do 13º salário proporcional, com desconto de INSS progressivo e IRRF conforme tabelas 2026.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Trabalhei menos de 12 meses, tenho direito a férias?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Após completar 12 meses de contrato (período aquisitivo), o trabalhador tem direito a 30 dias de férias. Se for demitido antes, tem direito às férias proporcionais — 1/12 para cada mês completo trabalhado.',
          },
        },
        {
          '@type': 'Question',
          name: 'O terço constitucional de férias desconta IRRF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O STF decidiu no RE 895.759 que o 1/3 constitucional tem natureza indenizatória e é isento de Imposto de Renda. O IRRF incide apenas sobre o salário de férias após a dedução do INSS.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quando é pago o 13º salário?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O 13º é pago em duas parcelas: a primeira entre fevereiro e novembro, e a segunda até 20 de dezembro. Em caso de demissão sem justa causa, ambas as parcelas são incluídas na rescisão.',
          },
        },
      ],
    },
  ],
};

export default function Ferias() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeriasPage />
    </>
  );
}
