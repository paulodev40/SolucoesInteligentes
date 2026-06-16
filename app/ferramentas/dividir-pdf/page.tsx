import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import DividirPdfClient from './DividirPdfClient';

export const metadata: Metadata = {
  title: 'Dividir PDF Online — Separar e Extrair Páginas Grátis',
  description:
    'Divida um PDF, extraia páginas específicas ou separe em arquivos individuais, direto no navegador. Grátis e sem upload dos seus arquivos.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/dividir-pdf' },
  openGraph: {
    title: 'Dividir PDF Online | Soluções Inteligentes 83',
    description: 'Separe, extraia e divida PDFs no navegador. 100% privado, sem upload.',
    url: 'https://solucoesinteligentes83.com/ferramentas/dividir-pdf',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Dividir PDF Online',
      url: 'https://solucoesinteligentes83.com/ferramentas/dividir-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Divida um PDF em partes, extraia páginas específicas por intervalo ou separe cada página em um arquivo individual. Processado 100% no navegador com pdf-lib — nenhum arquivo é enviado a servidores.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como extrair apenas algumas páginas de um PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use o modo "Extrair páginas" e informe os números ou intervalos desejados — por exemplo: "1-3, 5, 8-10". A ferramenta gerará um único PDF com exatamente essas páginas, na ordem especificada.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como separar um PDF em vários arquivos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use o modo "Uma por arquivo" para que cada página vire um PDF separado, ou o modo "A cada N páginas" para dividir em blocos. Em ambos os casos, o resultado é baixado como um arquivo .zip contendo todos os PDFs gerados.',
          },
        },
        {
          '@type': 'Question',
          name: 'É seguro dividir PDF online com esta ferramenta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. O processamento ocorre 100% no seu navegador — seus arquivos nunca são enviados a servidores. Você pode verificar isso abrindo o DevTools (F12) → aba Network e clicando em "Dividir": nenhuma requisição com o PDF será registrada.',
          },
        },
      ],
    },
  ],
};

export default function DividirPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">PDF</div>
            <h1 className="section-title">Dividir PDF Online</h1>
            <p className="section-desc">
              Extraia páginas específicas, separe cada página em um arquivo individual ou divida
              em blocos de N páginas — tudo no seu navegador, sem enviar o arquivo para
              nenhum servidor.
            </p>
          </div>

          <div className="mt-10">
            <DividirPdfClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como dividir um PDF — 3 modos disponíveis
              </h2>
              <ul className="space-y-5 text-sm">
                <li>
                  <strong className="text-si-text block mb-1">
                    1. Extrair páginas (intervalo personalizado)
                  </strong>
                  <p>
                    Informe os números de página que deseja manter — por exemplo{' '}
                    <code className="bg-si-dim/20 px-1 rounded font-mono text-xs">1-3, 5, 8-10</code>.
                    A ferramenta gera um único PDF com exatamente essas páginas, na
                    ordem especificada. Ideal para extrair um capítulo, um formulário ou
                    seções específicas de um documento longo.
                  </p>
                </li>
                <li>
                  <strong className="text-si-text block mb-1">
                    2. Uma página por arquivo
                  </strong>
                  <p>
                    Cada página do PDF vira um arquivo individual (
                    <code className="bg-si-dim/20 px-1 rounded font-mono text-xs">pagina-01.pdf</code>,
                    {' '}<code className="bg-si-dim/20 px-1 rounded font-mono text-xs">pagina-02.pdf</code>
                    {' '}…). Todos são entregues num único{' '}
                    <strong className="text-si-text">.zip</strong>. Útil para distribuir
                    páginas individualmente ou importar em ferramentas que aceitam somente
                    um PDF por vez.
                  </p>
                </li>
                <li>
                  <strong className="text-si-text block mb-1">
                    3. Dividir a cada N páginas
                  </strong>
                  <p>
                    Defina um tamanho de bloco — por exemplo, 5 páginas — e a ferramenta
                    divide o PDF em partes iguais (a última pode ter menos). Os arquivos
                    resultantes são empacotados em{' '}
                    <strong className="text-si-text">.zip</strong>. Ideal para dividir
                    relatórios longas em seções menores para envio por e-mail ou upload em
                    sistemas com limite de tamanho.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como extrair páginas de um PDF
              </h2>
              <p>
                Extrair páginas é o modo mais comum de usar um divisor de PDF: você quer
                apenas parte do documento, não o arquivo inteiro.
              </p>
              <p className="mt-3">
                Exemplos de sintaxe de intervalo aceita por esta ferramenta:
              </p>
              <ul className="mt-2 space-y-2 text-sm font-mono">
                {[
                  { input: '3', desc: 'Extrai só a página 3' },
                  { input: '1-5', desc: 'Extrai as páginas 1 a 5' },
                  { input: '1-3, 7, 10-12', desc: 'Extrai páginas 1–3, 7, e 10–12' },
                  { input: '2, 4, 6, 8', desc: 'Extrai páginas pares específicas' },
                ].map(({ input, desc }) => (
                  <li key={input} className="flex gap-3 items-start">
                    <code className="bg-si-dim/20 px-2 py-0.5 rounded text-si-cyan shrink-0">{input}</code>
                    <span className="font-sans text-si-muted">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                É seguro dividir PDF online?
              </h2>
              <p>
                A resposta depende da ferramenta. Serviços populares como iLovePDF e
                Smallpdf enviam seus arquivos para servidores na nuvem — onde podem ser
                processados, armazenados temporariamente e potencialmente acessados por
                terceiros. Para PDFs com dados sensíveis (laudos, contratos, extratos
                bancários), isso representa um risco real.
              </p>
              <p className="mt-3">
                Esta ferramenta processa tudo{' '}
                <strong className="text-si-text">localmente no seu navegador</strong>,
                usando a biblioteca open-source{' '}
                <strong className="text-si-text">pdf-lib</strong>. Seu PDF nunca sai do
                dispositivo. Abra o DevTools (F12) → aba Network e clique em &quot;Dividir&quot;
                — você verá que nenhuma chamada de rede com o arquivo é feita.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Como extrair apenas algumas páginas de um PDF?',
                    a: 'Use o modo "Extrair páginas" e informe os números ou intervalos — ex.: "1-3, 5, 8-10". A ferramenta gera um único PDF com essas páginas.',
                  },
                  {
                    q: 'Como separar um PDF em vários arquivos?',
                    a: 'Use "Uma por arquivo" para uma página por PDF, ou "A cada N páginas" para blocos. Em ambos os casos o resultado vem em .zip.',
                  },
                  {
                    q: 'É seguro dividir PDF online aqui?',
                    a: 'Sim. O processamento é 100% no navegador — seus arquivos nunca saem do dispositivo. Verifique na aba Network do DevTools: nenhuma requisição com o PDF será registrada.',
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
