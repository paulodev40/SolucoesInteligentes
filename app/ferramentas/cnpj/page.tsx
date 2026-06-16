import type { Metadata } from 'next';
import CNPJPage from '../../../views/CNPJPage';

export const metadata: Metadata = {
  title: 'Consultar CNPJ Grátis — Dados da Receita Federal',
  description:
    'Consulte dados de qualquer empresa pelo CNPJ: razão social, situação cadastral, endereço e quadro de sócios. Dados diretos da Receita Federal, gratuito.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/cnpj' },
  openGraph: {
    title: 'Consultar CNPJ Grátis | Soluções Inteligentes 83',
    description: 'Consulte situação cadastral, endereço e sócios pelo CNPJ. Dados da Receita Federal.',
    url: 'https://solucoesinteligentes83.com/ferramentas/cnpj',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Consultar CNPJ',
      url: 'https://solucoesinteligentes83.com/ferramentas/cnpj',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Consulte dados cadastrais de qualquer empresa pelo CNPJ: razão social, situação cadastral, CNAE, endereço, capital social e quadro de sócios — dados da Receita Federal via Brasil API.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como saber se um CNPJ é real e está ativo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Informe o CNPJ nesta ferramenta e clique em "Buscar". Os dados são consultados diretamente na Receita Federal via Brasil API. Se a situação cadastral retornar "Ativa", o CNPJ está regular. Erro na busca indica número inválido ou CNPJ inexistente.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que é CNAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CNAE é a Classificação Nacional de Atividades Econômicas — um código de 7 dígitos que define a atividade principal da empresa. Ele determina tributação, obrigações acessórias e enquadramento em regimes como o Simples Nacional.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre razão social e nome fantasia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A razão social é o nome jurídico oficial registrado na Receita Federal. O nome fantasia é como a empresa se apresenta ao mercado — o nome da marca ou loja. Uma mesma razão social pode ter vários nomes fantasia.',
          },
        },
      ],
    },
  ],
};

export default function CNPJ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CNPJPage />
    </>
  );
}
