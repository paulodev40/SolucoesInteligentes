import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import JuntarPdfClient from './JuntarPdfClient';

export const metadata: Metadata = {
  title: 'Juntar PDF Online — Unir Vários PDFs em Um Grátis',
  description:
    'Junte vários arquivos PDF em um só, na ordem que quiser, direto no navegador. Grátis, sem marca d\'água e sem enviar seus arquivos para servidores.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/juntar-pdf' },
  openGraph: {
    title: 'Juntar PDF Online | Soluções Inteligentes 83',
    description: 'Una vários PDFs em um só arquivo, na ordem que quiser. 100% no navegador, sem upload.',
    url: 'https://solucoesinteligentes83.com/ferramentas/juntar-pdf',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Juntar PDF Online',
      url: 'https://solucoesinteligentes83.com/ferramentas/juntar-pdf',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Una vários arquivos PDF em um único documento, na ordem definida pelo usuário. Processado 100% no navegador com pdf-lib — nenhum arquivo é enviado a servidores.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Há limite de arquivos ou páginas para juntar PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não há limite definido pelo software. O limite prático é a memória RAM do seu dispositivo. Para dezenas de PDFs grandes, recomendamos usar um computador. Em celulares com pouca memória, prefira juntar arquivos menores.',
          },
        },
        {
          '@type': 'Question',
          name: 'É seguro juntar PDFs online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Com esta ferramenta, sim. O processamento ocorre inteiramente no seu navegador usando a biblioteca pdf-lib. Nenhum arquivo é enviado a servidores externos. Você pode confirmar isso abrindo o DevTools (F12) → aba Network e verificando que nenhuma requisição com seus PDFs é feita.',
          },
        },
        {
          '@type': 'Question',
          name: 'Posso juntar PDFs protegidos por senha?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PDFs com senha de abertura não podem ser processados — a ferramenta exibirá uma mensagem de erro clara. PDFs com restrições de edição (mas sem senha de abertura) geralmente funcionam normalmente.',
          },
        },
      ],
    },
  ],
};

export default function JuntarPdfPage() {
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
            <h1 className="section-title">Juntar PDF Online</h1>
            <p className="section-desc">
              Una vários arquivos PDF em um único documento, na ordem que você definir. Grátis,
              sem marca d&apos;água e sem enviar seus arquivos para nenhum servidor — tudo
              processado diretamente no seu navegador.
            </p>
          </div>

          <div className="mt-10">
            <JuntarPdfClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como juntar PDFs em um só arquivo
              </h2>
              <p>
                Unir PDFs com esta ferramenta é simples e leva poucos segundos:
              </p>
              <ol className="mt-3 space-y-2 text-sm list-decimal list-inside">
                <li>Clique na área de upload ou arraste os arquivos PDF diretamente.</li>
                <li>
                  Reordene os arquivos arrastando os itens da lista ou usando as setas ↑↓.
                  A ordem da lista é a ordem das páginas no PDF final.
                </li>
                <li>Clique em &quot;Juntar PDFs e Baixar&quot;.</li>
                <li>O arquivo unificado será baixado automaticamente.</li>
              </ol>
              <p className="mt-3">
                Você pode adicionar quantos PDFs quiser de uma vez. O resultado é um único PDF
                contendo todas as páginas de todos os arquivos, na sequência escolhida.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Por que a ordem importa ao juntar PDFs
              </h2>
              <p>
                Ao contrário de imagens ou texto, a ordem das páginas de um PDF não pode ser
                alterada depois sem reprocessar o arquivo. Por isso, definir a sequência certa
                antes de juntar é fundamental.
              </p>
              <p className="mt-3">
                Casos comuns onde a ordem é crítica:
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li><strong className="text-si-text">Contrato + anexos:</strong> o contrato principal deve vir antes dos documentos anexados.</li>
                <li><strong className="text-si-text">Relatório mensal:</strong> capas, sumário, seções e apêndices em sequência lógica.</li>
                <li><strong className="text-si-text">Portfólio:</strong> trabalhos em ordem cronológica ou por relevância.</li>
              </ul>
              <p className="mt-3">
                Use as setas ↑↓ ou arraste os itens para ajustar a ordem antes de clicar em
                &quot;Juntar&quot;.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                É seguro juntar PDFs online com esta ferramenta?
              </h2>
              <p>
                Sim. A maioria dos serviços de juntar PDF online (como iLovePDF e Smallpdf)
                envia seus arquivos para servidores externos, onde são processados e
                potencialmente armazenados. Isso é um risco para documentos confidenciais:
                contratos, laudos médicos, documentos pessoais.
              </p>
              <p className="mt-3">
                Esta ferramenta funciona de forma diferente:{' '}
                <strong className="text-si-text">todo o processamento ocorre no seu navegador</strong>{' '}
                usando a biblioteca de código aberto{' '}
                <strong className="text-si-text">pdf-lib</strong>. Nenhum byte dos seus arquivos
                sai do dispositivo. Você pode verificar abrindo o DevTools (F12) → aba Network
                e clicando em &quot;Juntar&quot; — nenhuma requisição com seus PDFs será
                registrada.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Há limite de arquivos para juntar?',
                    a: 'Não há limite definido pelo software. O limite prático é a memória RAM do seu dispositivo. Para muitos PDFs grandes, prefira usar um computador com mais memória.',
                  },
                  {
                    q: 'Posso juntar PDFs protegidos por senha?',
                    a: 'PDFs com senha de abertura não podem ser processados — a ferramenta exibirá uma mensagem clara. PDFs com restrições de edição (sem senha de abertura) geralmente funcionam normalmente.',
                  },
                  {
                    q: 'O PDF final terá marca d\'água?',
                    a: 'Não. A ferramenta usa a biblioteca open-source pdf-lib, que não adiciona marcas d\'água, rodapés ou qualquer alteração ao conteúdo dos seus PDFs — apenas os une na ordem definida.',
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
