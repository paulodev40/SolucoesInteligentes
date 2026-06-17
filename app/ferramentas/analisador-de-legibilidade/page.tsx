import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import AnalisadorClient from './AnalisadorClient';

export const metadata: Metadata = {
  title: 'Analisador de Legibilidade de Texto — Score Flesch em Português',
  description:
    'Analise a legibilidade do seu texto com score Flesch adaptado para o português. Descubra o nível de dificuldade, média de palavras por frase e dicas para melhorar. Grátis.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/analisador-de-legibilidade' },
  openGraph: {
    title: 'Analisador de Legibilidade | Soluções Inteligentes 83',
    description: 'Score de legibilidade do seu texto em português. Grátis, sem cadastro.',
    url: 'https://solucoesinteligentes83.com/ferramentas/analisador-de-legibilidade',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Analisador de Legibilidade de Texto',
      url: 'https://solucoesinteligentes83.com/ferramentas/analisador-de-legibilidade',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Analise a legibilidade de textos em português com o índice Flesch adaptado. Calcula score, média de palavras por frase, sílabas por palavra e indica o nível de escolaridade exigido.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o índice de legibilidade Flesch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O índice Flesch (Flesch Reading Ease) é uma fórmula que mede a facilidade de leitura de um texto com base no tamanho médio das frases e no número de sílabas por palavra. Quanto maior o score (0–100), mais fácil o texto. Foi adaptado para o português com constantes ajustadas ao idioma.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual score de legibilidade é ideal para blogs e redes sociais?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Para blogs e redes sociais, o ideal é entre 60 e 80 — classificado como "Médio" a "Bastante Fácil". Isso garante que a maioria dos leitores adultos entenda o conteúdo sem esforço. Para textos técnicos ou especializados, scores mais baixos são aceitáveis.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como melhorar a legibilidade do meu texto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'As principais melhorias são: reduzir o tamanho das frases (tente manter menos de 20 palavras por frase), substituir palavras longas por sinônimos mais curtos, evitar jargões desnecessários e usar listas e subtítulos para quebrar blocos de texto.',
          },
        },
      ],
    },
  ],
};

export default function AnalisadorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Conteúdo e Escrita</div>
            <h1 className="section-title">Analisador de Legibilidade</h1>
            <p className="section-desc">
              Descubra quão fácil é ler o seu texto. Cole qualquer conteúdo e veja o score,
              o nível de escolaridade exigido e dicas para tornar sua escrita mais acessível.
            </p>
          </div>

          <div className="mt-10">
            <AnalisadorClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                O que é legibilidade e por que ela importa?
              </h2>
              <p>
                Legibilidade é a facilidade com que um leitor consegue entender um texto.
                Ela depende principalmente de dois fatores: o tamanho das frases e a
                complexidade das palavras. Textos com frases curtas e palavras simples
                são mais fáceis de ler — e mantêm o leitor engajado por mais tempo.
              </p>
              <p className="mt-3">
                Para criadores de conteúdo, profissionais de marketing e comunicadores,
                entender a legibilidade do seu texto é fundamental: um e-mail muito
                complexo pode ser ignorado; um post de blog difícil de ler perde o leitor
                nos primeiros parágrafos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como funciona o cálculo
              </h2>
              <p>
                Usamos a fórmula Flesch adaptada para o português, que considera:
              </p>
              <ul className="mt-3 space-y-2 text-sm list-disc list-inside">
                <li><strong className="text-si-text">Média de palavras por frase</strong> — frases mais curtas aumentam o score.</li>
                <li><strong className="text-si-text">Média de sílabas por palavra</strong> — palavras mais simples aumentam o score.</li>
              </ul>
              <p className="mt-3">
                O score vai de 0 a 100. Acima de 60 é o ideal para a maioria das comunicações
                profissionais. Abaixo de 30 indica um texto muito técnico ou acadêmico.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Dicas para melhorar a legibilidade
              </h2>
              <ul className="space-y-3 text-sm">
                {[
                  { t: 'Quebre frases longas', d: 'Frases com mais de 25 palavras são difíceis de acompanhar. Divida em duas sempre que possível.' },
                  { t: 'Prefira o ativo ao passivo', d: '"A empresa lançou o produto" é mais fácil de ler que "O produto foi lançado pela empresa".' },
                  { t: 'Use palavras do cotidiano', d: 'Substitua "utilizar" por "usar", "comunicar" por "dizer", "adquirir" por "comprar".' },
                  { t: 'Adicione subtítulos e listas', d: 'Eles quebram blocos de texto e permitem que o leitor escaneie o conteúdo antes de ler.' },
                  { t: 'Elimine palavras desnecessárias', d: 'Cada palavra deve cumprir uma função. Frases mais enxutas são mais fáceis de ler e mais impactantes.' },
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
                    q: 'Score alto significa texto melhor?',
                    a: 'Depende do público. Para comunicação geral e marketing, sim — score alto significa mais acessível. Para artigos científicos, relatórios técnicos ou documentos jurídicos, um score mais baixo é esperado e aceitável, pois o público é especializado.',
                  },
                  {
                    q: 'A análise funciona para qualquer tipo de texto?',
                    a: 'Funciona melhor com textos em prosa corrida (parágrafos). Para listas com bullet points, código ou textos muito curtos (menos de 50 palavras), o score pode não ser representativo.',
                  },
                  {
                    q: 'O texto fica salvo em algum lugar?',
                    a: 'Não. Todo o processamento acontece no seu navegador — nenhum dado é enviado a servidores.',
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
