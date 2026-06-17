import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ResumirClient from './ResumirClient';

export const metadata: Metadata = {
  title: 'Resumidor de Texto com IA — Resumir Artigos e Documentos Online',
  description:
    'Resuma textos longos com inteligência artificial em segundos. Cole artigos, relatórios, contratos ou e-mails e receba um resumo claro e objetivo. Grátis.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/resumidor-de-texto' },
  openGraph: {
    title: 'Resumidor de Texto com IA | Soluções Inteligentes 83',
    description: 'Resuma artigos, relatórios e documentos com IA. Gratuito.',
    url: 'https://solucoesinteligentes83.com/ferramentas/resumidor-de-texto',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Resumidor de Texto com IA',
      url: 'https://solucoesinteligentes83.com/ferramentas/resumidor-de-texto',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Ferramenta gratuita que usa inteligência artificial para resumir textos longos em português. Cole artigos, relatórios, contratos, atas ou e-mails e receba um resumo claro em segundos.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como funciona o resumidor de texto com IA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Você cola o texto que deseja resumir (até 2.000 caracteres) e clica em "Resumir com IA". O sistema usa um modelo de linguagem avançado para identificar os pontos mais importantes e gerar um resumo em até 3 parágrafos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Que tipos de texto posso resumir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Artigos de blog, notícias, relatórios executivos, contratos, atas de reunião, e-mails longos, textos acadêmicos e qualquer conteúdo em prosa. O resultado é um resumo claro, objetivo e em português.',
          },
        },
        {
          '@type': 'Question',
          name: 'O texto que eu envio é armazenado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O texto é processado apenas para gerar o resumo e não é salvo em nenhum banco de dados.',
          },
        },
      ],
    },
  ],
};

export default function ResumidorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Inteligência Artificial</div>
            <h1 className="section-title">Resumidor de Texto com IA</h1>
            <p className="section-desc">
              Cole qualquer texto — artigo, relatório, contrato, e-mail — e receba um resumo
              claro e objetivo em segundos, gerado por inteligência artificial.
            </p>
          </div>

          <div className="mt-10">
            <ResumirClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Para que serve um resumidor de texto com IA?
              </h2>
              <p>
                Lemos cada vez mais e temos cada vez menos tempo. Um resumidor inteligente
                resolve isso: identifica os pontos-chave de qualquer texto e entrega uma
                versão condensada que você consegue absorver em segundos — sem perder o
                essencial.
              </p>
              <p className="mt-3">
                Ideal para profissionais que precisam processar muitos documentos, estudantes
                que querem revisar conteúdo rapidamente, ou qualquer pessoa que precisa
                entender o contexto de um artigo longo antes de decidir se vale a leitura
                completa.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Casos de uso mais comuns
              </h2>
              <ul className="space-y-3 text-sm">
                {[
                  { t: 'Relatórios executivos', d: 'Extraia as conclusões e indicadores principais sem ler todas as páginas.' },
                  { t: 'Artigos e notícias', d: 'Entenda o conteúdo de uma matéria em 3 parágrafos antes de compartilhar ou aprofundar.' },
                  { t: 'Contratos e documentos jurídicos', d: 'Identifique cláusulas e pontos principais antes de uma revisão detalhada com especialista.' },
                  { t: 'Atas de reunião', d: 'Transforme transcrições longas em registros concisos com decisões e próximos passos.' },
                  { t: 'E-mails corporativos', d: 'Resuma threads ou mensagens extensas para repassar informações à equipe com clareza.' },
                ].map(({ t, d }) => (
                  <li key={t} className="flex gap-3">
                    <strong className="text-si-text whitespace-nowrap">{t}:</strong>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'O resumo substitui a leitura do texto original?',
                    a: 'Para decisões importantes — contratos, documentos legais, trabalhos acadêmicos —, o resumo serve como uma primeira leitura de triagem, não como substituto. Use-o para identificar se o conteúdo é relevante e quais pontos merecem atenção na leitura completa.',
                  },
                  {
                    q: 'Funciona com textos técnicos e acadêmicos?',
                    a: 'Sim. O modelo de IA usado tem bom desempenho com textos técnicos em português. Para textos muito especializados (medicina, direito), o resumo captura bem a estrutura geral, mas alguns termos técnicos podem ser simplificados.',
                  },
                  {
                    q: 'Qual o limite de texto?',
                    a: 'Até 2.000 caracteres por uso. Para textos maiores, divida em partes e resuma cada seção separadamente.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-l-2 border-si-cyan pl-5">
                    <p className="font-semibold text-si-text mb-1">{q}</p>
                    <p className="text-sm">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <AdSlot label="Anúncio" className="mt-16" />
        </div>
      </section>
    </>
  );
}
