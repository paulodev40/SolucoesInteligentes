import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import RemoverFundoClient from './RemoverFundoClient';

export const metadata: Metadata = {
  title: 'Remover Fundo de Imagem Online com IA — Grátis e Privado',
  description:
    'Remova o fundo de imagens com IA diretamente no navegador. Resultado em PNG transparente. Sem upload, sem cadastro — suas fotos não saem do seu dispositivo.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/remover-fundo-de-imagem' },
  openGraph: {
    title: 'Remover Fundo de Imagem com IA | Soluções Inteligentes 83',
    description: 'Remoção de fundo 100% no navegador com IA. Privado, grátis, sem upload.',
    url: 'https://solucoesinteligentes83.com/ferramentas/remover-fundo-de-imagem',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Remover Fundo de Imagem com IA',
      url: 'https://solucoesinteligentes83.com/ferramentas/remover-fundo-de-imagem',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Remove o fundo de imagens usando modelo de IA executado 100% no navegador. Resultado em PNG com fundo transparente. Sem upload — as imagens não saem do dispositivo.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'A remoção de fundo é feita no meu navegador ou em um servidor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No seu navegador. O modelo de IA roda localmente usando WebAssembly — suas imagens não são enviadas a nenhum servidor. Você pode verificar isso na aba Network do DevTools (F12): nenhuma requisição com a imagem será registrada.',
          },
        },
        {
          '@type': 'Question',
          name: 'Funciona offline depois do primeiro uso?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Na primeira vez, o modelo (~30 MB) é baixado e fica em cache no navegador. Nos usos seguintes, você pode usar a ferramenta sem conexão à internet — o modelo já está no dispositivo.',
          },
        },
        {
          '@type': 'Question',
          name: 'O resultado é perfeito para cabelos e bordas complexas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Para fundos com alto contraste, o resultado é muito bom. Cabelos finos, pelo de animal e bordas semitransparentes são os casos mais desafiadores — o modelo detecta bem a maioria, mas detalhes muito finos podem ser simplificados. Para resultados profissionais em casos difíceis, use um editor como Photoshop ou GIMP com ferramentas de seleção manual.',
          },
        },
      ],
    },
  ],
};

export default function RemoverFundoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Imagem · IA</div>
            <h1 className="section-title">Remover Fundo de Imagem com IA</h1>
            <p className="section-desc">
              Remova o fundo de fotos e imagens com inteligência artificial. O modelo roda
              100% no seu navegador — suas imagens não são enviadas a nenhum servidor. Resultado
              em PNG com fundo transparente, pronto para baixar.
            </p>
          </div>

          <div className="mt-10">
            <RemoverFundoClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como funciona a remoção de fundo com IA no navegador
              </h2>
              <p>
                Ao clicar em "Remover Fundo", a ferramenta baixa um modelo de visão computacional
                (executado via WebAssembly) e o aplica localmente na imagem. O modelo identifica
                o sujeito principal (pessoa, produto, animal, objeto) e separa do fundo com
                precisão de pixel.
              </p>
              <p className="mt-3">
                O processo ocorre inteiramente no seu dispositivo. Nenhum dado da imagem é
                transmitido — você pode confirmar isso abrindo o DevTools (F12) → aba Network
                e clicando em "Remover Fundo": nenhuma requisição com a imagem aparecerá.
              </p>
              <p className="mt-3">
                Na primeira vez, o modelo (~30 MB) é baixado e mantido em cache. A partir daí,
                o processo é instantâneo e funciona mesmo offline.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Para que usar uma imagem sem fundo
              </h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong className="text-si-text">E-commerce:</strong> fotos de produtos com
                  fundo branco ou transparente são padrão em marketplaces como Mercado Livre,
                  Amazon e Shopee. A remoção de fundo profissionaliza a apresentação.
                </li>
                <li>
                  <strong className="text-si-text">Apresentações e documentos:</strong> inserir
                  uma foto sem fundo em PowerPoint, Canva ou Google Slides permite sobrepor
                  a imagem ao fundo do slide sem moldura visível.
                </li>
                <li>
                  <strong className="text-si-text">Identidade visual:</strong> logotipos e fotos
                  institucionais com fundo transparente se adaptam a qualquer cor ou padrão de
                  fundo — sites, embalagens, uniformes.
                </li>
                <li>
                  <strong className="text-si-text">Redes sociais:</strong> stickers personalizados,
                  fotos de perfil e thumbnails sem fundo se destacam em qualquer layout.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Dicas para melhores resultados
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong className="text-si-text">Use imagens nítidas:</strong> fotos borradas
                  ou de baixa resolução reduzem a precisão do modelo.
                </li>
                <li>
                  <strong className="text-si-text">Alto contraste ajuda:</strong> sujeitos com
                  cor bem diferente do fundo têm resultado melhor.
                </li>
                <li>
                  <strong className="text-si-text">Imagens menores são mais rápidas:</strong>{' '}
                  para fotos muito grandes (acima de 4 000 px), considere redimensionar antes
                  para acelerar o processamento.
                </li>
                <li>
                  <strong className="text-si-text">O resultado é PNG:</strong> o PNG suporta
                  transparência (canal alpha), por isso é o formato ideal para imagens sem fundo.
                  Se precisar de fundo branco, abra o PNG em qualquer editor e preencha.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'A remoção é feita no meu navegador ou em um servidor?',
                    a: 'No seu navegador. O modelo de IA roda localmente com WebAssembly — suas imagens não são enviadas a nenhum servidor. Verifique na aba Network do DevTools: nenhuma requisição com a imagem será registrada.',
                  },
                  {
                    q: 'Funciona offline depois do primeiro uso?',
                    a: 'Sim. Na primeira vez, o modelo (~30 MB) é baixado e fica em cache. Nos usos seguintes, a ferramenta funciona sem conexão.',
                  },
                  {
                    q: 'O resultado é perfeito para cabelos e bordas complexas?',
                    a: 'Para fundos de alto contraste, o resultado é muito bom. Cabelos finos e bordas semitransparentes são os casos mais desafiadores — o modelo detecta bem a maioria, mas detalhes muito finos podem ser simplificados. Para casos difíceis, um editor manual como Photoshop ou GIMP oferece controle total.',
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
