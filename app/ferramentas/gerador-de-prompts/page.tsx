import type { Metadata } from 'next';
import PromptPage from '../../../views/PromptPage';

export const metadata: Metadata = {
  title: 'Gerador de Prompts para IA — ChatGPT, Claude e Gemini',
  description:
    'Crie prompts otimizados para ChatGPT, Claude e Gemini em segundos. Gerador gratuito de prompts para e-mail, redes sociais, marketing, relatórios e muito mais.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-prompts' },
  openGraph: {
    title: 'Gerador de Prompts para IA | Soluções Inteligentes 83',
    description: 'Prompts otimizados para ChatGPT, Claude e Gemini. Gratuito.',
    url: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-prompts',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Gerador de Prompts para IA',
      url: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-prompts',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Gerador de prompts estruturados para ChatGPT, Claude e Gemini. Selecione o tipo de tarefa, informe contexto e público, e gere um prompt otimizado em segundos.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é um prompt de IA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Um prompt é a instrução que você envia para uma inteligência artificial. A qualidade do prompt define diretamente a qualidade da resposta — quanto mais contexto, objetivo e restrições você informar, mais preciso e útil será o resultado.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como criar um bom prompt para ChatGPT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Um bom prompt tem quatro elementos: papel (diga quem a IA é), tarefa clara (o que fazer e em qual formato), público-alvo (para quem o conteúdo é destinado) e restrições (o que evitar). Este gerador monta essa estrutura automaticamente para você.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre ChatGPT, Claude e Gemini?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ChatGPT (OpenAI) é versátil e ótimo para criação de texto. Claude (Anthropic) se destaca em análise de documentos longos e instrução detalhada. Gemini (Google) integra dados de busca em tempo real. Os prompts gerados aqui funcionam nos três.',
          },
        },
      ],
    },
  ],
};

export default function GeradorDePrompts() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PromptPage />
    </>
  );
}
