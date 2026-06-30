import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ComoUsar from '../../../components/ComoUsar';
import ComprimirClient from './ComprimirClient';

export const metadata: Metadata = {
  title: 'Comprimir Imagem Online Grátis — Reduzir Tamanho sem Perder Qualidade',
  description:
    'Comprima imagens JPG, PNG e WEBP diretamente no navegador. Reduza o tamanho do arquivo com controle de qualidade. Grátis, sem upload, 100% privado.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/comprimir-imagem' },
  openGraph: {
    title: 'Comprimir Imagem Online | Soluções Inteligentes 83',
    description: 'Reduza o tamanho de imagens JPG, PNG e WEBP no navegador. Sem upload, 100% privado.',
    url: 'https://solucoesinteligentes83.com/ferramentas/comprimir-imagem',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Comprimir Imagem Online',
      url: 'https://solucoesinteligentes83.com/ferramentas/comprimir-imagem',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Compressão de imagens JPG, PNG e WEBP 100% no navegador. Ajuste a qualidade com um slider, compare antes/depois e baixe o resultado sem enviar nada a servidores.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Posso comprimir uma imagem sem perder qualidade visível?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Com WEBP em torno de 80–85% de qualidade, a redução de tamanho é significativa (50–70% menor) com perda visual imperceptível para olhos comuns. Abaixo de 60% a degradação começa a aparecer. Recomendamos testar com o slider e comparar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual formato comprime mais: WEBP, JPEG ou PNG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WEBP oferece a melhor compressão em geral — costuma ser 25–35% menor que JPEG com qualidade equivalente. JPEG é eficiente para fotos. PNG é lossless (sem perda), por isso raramente reduz o tamanho — use-o quando a transparência ou qualidade máxima for obrigatória.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comprimir imagem reduz a resolução (dimensões)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. Esta ferramenta comprime apenas os dados da imagem (qualidade/codificação), mantendo as dimensões originais em pixels. Se você quiser reduzir as dimensões, use a ferramenta Redimensionar Imagem.',
          },
        },
      ],
    },
  ],
};

export default function ComprimirImagemPage() {
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
            <h1 className="section-title">Comprimir Imagem Online</h1>
            <p className="section-desc">
              Reduza o tamanho de imagens JPG, PNG e WEBP com controle total de qualidade. Sem
              upload — tudo processado no seu navegador, com privacidade total.
            </p>
          </div>

          <ComoUsar
            className="mt-8"
            steps={[
              'Selecione ou arraste a imagem (JPG, PNG ou WEBP) para a área de upload.',
              'Escolha o formato de saída e ajuste o slider de qualidade (80–85% é o ponto ideal).',
              'Clique em "Comprimir Imagem" e baixe o arquivo reduzido.',
            ]}
            output="A imagem comprimida pronta para baixar, com tamanho de arquivo menor e as dimensões originais preservadas. Tudo é processado no seu navegador, sem upload — suas imagens não saem do dispositivo."
            example="Uma foto de 4 MB pode cair para menos de 500 KB com qualidade praticamente idêntica."
          />

          <div className="mt-10">
            <ComprimirClient />
          </div>

          {/* SEO */}
          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como comprimir uma imagem sem perder qualidade
              </h2>
              <p>
                A compressão de imagens funciona eliminando dados redundantes que o olho humano
                dificilmente percebe. O segredo está no equilíbrio entre tamanho do arquivo e
                qualidade visual:
              </p>
              <ol className="mt-3 space-y-2 text-sm list-decimal list-inside">
                <li>Selecione ou arraste a imagem na área de upload.</li>
                <li>
                  Escolha o formato de saída — <strong className="text-si-text">WEBP</strong> é
                  recomendado para web.
                </li>
                <li>
                  Ajuste o slider de qualidade —{' '}
                  <strong className="text-si-text">80–85%</strong> é o ponto ideal para a maioria
                  das imagens.
                </li>
                <li>Clique em "Comprimir Imagem" e veja a redução de tamanho em tempo real.</li>
                <li>Baixe o arquivo comprimido com um clique.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                WEBP, JPEG ou PNG — qual escolher?
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <strong className="text-si-text">WEBP</strong> — Formato moderno do Google com
                  a melhor taxa de compressão. Gera arquivos ~30% menores que JPEG com qualidade
                  equivalente. Suportado por todos os navegadores modernos. Ideal para sites,
                  blogs e redes sociais.
                </li>
                <li>
                  <strong className="text-si-text">JPEG</strong> — Padrão universal para fotos.
                  Alta compatibilidade com softwares, impressoras e dispositivos. Não suporta
                  transparência. Boa opção quando o destinatário pode não suportar WEBP.
                </li>
                <li>
                  <strong className="text-si-text">PNG</strong> — Compressão sem perdas (lossless)
                  que preserva cada pixel. Suporta transparência. O arquivo costuma ser maior que
                  JPEG/WEBP — use apenas quando a qualidade máxima ou o fundo transparente for
                  imprescindível (logotipos, ícones, screenshots).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Por que comprimir imagens?
              </h2>
              <p>
                Imagens menores tornam sites mais rápidos, melhoram o Core Web Vitals e o
                ranqueamento no Google. Em smartphones, economizam dados móveis. Para e-mail e
                WhatsApp, evitam rejeição por limite de tamanho. Para redes sociais, aceleram o
                carregamento do feed.
              </p>
              <p className="mt-3">
                Uma imagem de 4 MB pode ser comprimida para menos de 500 KB com qualidade
                praticamente idêntica — isso representa menos de 13% do tamanho original com
                WEBP a 82%.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Posso comprimir uma imagem sem perder qualidade visível?',
                    a: 'Sim. Com WEBP em torno de 80–85% de qualidade, a redução de tamanho é significativa — geralmente 50–70% menor — com perda visual imperceptível. Abaixo de 60%, a degradação começa a aparecer. Recomendamos testar com o slider.',
                  },
                  {
                    q: 'Qual formato comprime mais?',
                    a: 'WEBP, em geral. Costuma ser 25–35% menor que JPEG com qualidade visual equivalente. PNG não reduz muito o tamanho porque é lossless — ideal para logos e capturas de tela, não para fotos.',
                  },
                  {
                    q: 'Comprimir imagem reduz a resolução?',
                    a: 'Não. Esta ferramenta mantém as dimensões originais em pixels. Apenas os dados de codificação são alterados. Para mudar o tamanho em pixels, use a ferramenta Redimensionar Imagem.',
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
