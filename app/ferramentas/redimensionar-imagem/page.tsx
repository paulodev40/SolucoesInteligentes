import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ComoUsar from '../../../components/ComoUsar';
import RedimensionarClient from './RedimensionarClient';

export const metadata: Metadata = {
  title: 'Redimensionar Imagem Online Grátis — Alterar Tamanho em Pixels',
  description:
    'Redimensione imagens JPG, PNG e WEBP no navegador. Defina largura e altura em pixels com trava de proporção. Grátis, sem cadastro, 100% privado.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/redimensionar-imagem' },
  openGraph: {
    title: 'Redimensionar Imagem Online | Soluções Inteligentes 83',
    description: 'Altere o tamanho de imagens em pixels com trava de proporção. Sem upload, 100% privado.',
    url: 'https://solucoesinteligentes83.com/ferramentas/redimensionar-imagem',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Redimensionar Imagem Online',
      url: 'https://solucoesinteligentes83.com/ferramentas/redimensionar-imagem',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Redimensione imagens JPG, PNG e WEBP diretamente no navegador. Defina largura e altura em pixels, trave a proporção automaticamente e baixe o resultado sem enviar nada a servidores.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como manter a proporção ao redimensionar uma imagem?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ative o cadeado de proporção (🔒) antes de alterar as dimensões. Assim, ao mudar a largura, a altura é calculada automaticamente para manter o aspecto original da imagem — evitando distorções.',
          },
        },
        {
          '@type': 'Question',
          name: 'Posso aumentar a resolução de uma imagem com esta ferramenta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, é possível aumentar as dimensões em pixels, mas a qualidade não melhora — a imagem ficará pixelada (borrada). Para ampliar imagens com qualidade, são necessárias ferramentas de super-resolução com IA, que analisam e reconstroem detalhes. Esta ferramenta só redimensiona com Canvas API.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre redimensionar e comprimir uma imagem?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Redimensionar altera as dimensões em pixels (largura × altura). Comprimir reduz o tamanho do arquivo sem necessariamente mudar as dimensões — apenas ajusta a qualidade de codificação. Para o menor arquivo possível, combine as duas operações: redimensione para as dimensões necessárias e depois comprima.',
          },
        },
      ],
    },
  ],
};

export default function RedimensionarImagemPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Imagem</div>
            <h1 className="section-title">Redimensionar Imagem Online</h1>
            <p className="section-desc">
              Altere as dimensões de imagens JPG, PNG e WEBP em pixels. Trave a proporção para
              evitar distorções. Processado no navegador — nenhuma imagem sai do seu dispositivo.
            </p>
          </div>

          <ComoUsar
            className="mt-8"
            steps={[
              'Carregue a imagem (JPG, PNG ou WEBP) na área de upload.',
              'Defina a nova largura e altura em pixels — mantenha o cadeado 🔒 ativo para preservar a proporção.',
              'Escolha o formato de saída, clique em "Redimensionar Imagem" e baixe o resultado.',
            ]}
            output="A imagem redimensionada nas dimensões escolhidas, pronta para baixar. O processamento acontece no seu navegador, sem upload — nenhuma imagem sai do seu dispositivo."
            example="Ajuste uma foto para 1.080 × 1.080 px para o feed do Instagram."
          />

          <div className="mt-10">
            <RedimensionarClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como redimensionar uma imagem sem distorcer
              </h2>
              <p>
                A distorção acontece quando você altera largura e altura de forma independente,
                mudando a proporção (aspect ratio) original. Para evitar isso:
              </p>
              <ol className="mt-3 space-y-2 text-sm list-decimal list-inside">
                <li>Carregue a imagem na área de upload.</li>
                <li>Certifique-se de que o cadeado 🔒 está ativo (travado).</li>
                <li>
                  Altere apenas a largura — a altura será calculada automaticamente para manter
                  a proporção.
                </li>
                <li>Escolha o formato de saída e clique em "Redimensionar Imagem".</li>
                <li>Baixe o resultado.</li>
              </ol>
              <p className="mt-3">
                O cadeado pode ser desativado quando você precisar de dimensões exatas que não
                respeitam a proporção original — por exemplo, um banner de rede social com
                dimensões fixas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Tamanhos de imagem para redes sociais (referência)
              </h2>
              <ul className="space-y-3 text-sm">
                {[
                  { plataforma: 'Instagram Feed (quadrado)', dim: '1 080 × 1 080 px' },
                  { plataforma: 'Instagram Feed (retrato)', dim: '1 080 × 1 350 px' },
                  { plataforma: 'Instagram Stories / Reels', dim: '1 080 × 1 920 px' },
                  { plataforma: 'Facebook Post', dim: '1 200 × 630 px' },
                  { plataforma: 'Twitter / X Post', dim: '1 200 × 675 px' },
                  { plataforma: 'LinkedIn Post', dim: '1 200 × 627 px' },
                  { plataforma: 'Capa do YouTube', dim: '2 560 × 1 440 px' },
                  { plataforma: 'Thumbnail do YouTube', dim: '1 280 × 720 px' },
                ].map(({ plataforma, dim }) => (
                  <li key={plataforma} className="flex gap-3">
                    <span className="text-si-text font-semibold min-w-[220px]">{plataforma}</span>
                    <span className="font-mono text-si-cyan">{dim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Redimensionar vs. comprimir — qual usar?
              </h2>
              <p>
                São operações diferentes que se complementam:{' '}
                <strong className="text-si-text">redimensionar</strong> altera os pixels da imagem
                (tamanho físico), enquanto{' '}
                <strong className="text-si-text">comprimir</strong> reduz o tamanho do arquivo
                mantendo as mesmas dimensões.
              </p>
              <p className="mt-3">
                Para obter o menor arquivo possível com boa qualidade, combine as duas: primeiro
                redimensione para as dimensões que você realmente vai usar, depois comprima com
                WEBP a 80–85%. O resultado pode ser até 10× menor que a imagem original.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Como manter a proporção ao redimensionar?',
                    a: 'Ative o cadeado 🔒 antes de alterar as dimensões. Ao mudar a largura, a altura é calculada automaticamente para preservar o aspecto original — sem distorções.',
                  },
                  {
                    q: 'Posso aumentar a resolução de uma imagem?',
                    a: 'É possível aumentar as dimensões em pixels, mas a qualidade não melhora — a imagem ficará pixelada. Para ampliar com qualidade, são necessárias ferramentas de super-resolução com IA.',
                  },
                  {
                    q: 'Qual a diferença entre redimensionar e comprimir?',
                    a: 'Redimensionar altera as dimensões em pixels (largura × altura). Comprimir reduz o tamanho do arquivo sem mudar as dimensões — apenas ajusta a codificação. Para o menor arquivo com boa qualidade, combine as duas operações.',
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
