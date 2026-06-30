import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ComoUsar from '../../../components/ComoUsar';
import ConverterClient from './ConverterClient';

export const metadata: Metadata = {
  title: 'Converter Imagem Online — JPG para PNG, PNG para WEBP e mais',
  description:
    'Converta imagens entre JPG, PNG e WEBP diretamente no navegador. Sem upload, sem cadastro, 100% privado. Fundo branco automático para JPEG.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/converter-imagem' },
  openGraph: {
    title: 'Converter Imagem Online | Soluções Inteligentes 83',
    description: 'Converta JPG, PNG e WEBP no navegador. Sem upload, 100% privado.',
    url: 'https://solucoesinteligentes83.com/ferramentas/converter-imagem',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Converter Imagem Online',
      url: 'https://solucoesinteligentes83.com/ferramentas/converter-imagem',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Converta imagens entre JPG, PNG e WEBP no navegador. Fundo branco automático ao converter para JPEG. Sem upload — tudo processado localmente.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Converter JPG para PNG melhora a qualidade da imagem?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. A conversão de JPG para PNG não recupera qualidade perdida na compressão original. PNG preservará os pixels exatamente como estão no JPG, mas sem compressão adicional — o arquivo ficará maior. A vantagem é o suporte a transparência e a ausência de artefatos em novas edições.',
          },
        },
        {
          '@type': 'Question',
          name: 'O que acontece com áreas transparentes ao converter para JPEG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'JPEG não suporta transparência (canal alpha). Esta ferramenta preenche automaticamente as áreas transparentes com fundo branco antes de exportar para JPEG. Se você precisa manter a transparência, use PNG ou WEBP como formato de saída.',
          },
        },
        {
          '@type': 'Question',
          name: 'Por que usar WEBP em vez de JPEG ou PNG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WEBP oferece o melhor dos dois mundos: compressão superior ao JPEG (25–35% menor com mesma qualidade) e suporte a transparência como o PNG. É o formato recomendado pelo Google para web. A única limitação é a compatibilidade com software mais antigo ou impressoras domésticas — para esses casos, JPEG ainda é a escolha mais segura.',
          },
        },
      ],
    },
  ],
};

export default function ConverterImagemPage() {
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
            <h1 className="section-title">Converter Imagem Online</h1>
            <p className="section-desc">
              Converta imagens entre JPG, PNG e WEBP sem instalar nada. Processado diretamente no
              seu navegador — suas imagens não são enviadas a nenhum servidor.
            </p>
          </div>

          <ComoUsar
            className="mt-8"
            steps={[
              'Carregue a imagem que deseja converter (JPG, PNG ou WEBP).',
              'Escolha o formato de saída (PNG, JPEG ou WEBP).',
              'Faça a conversão e baixe a imagem no novo formato.',
            ]}
            output="A imagem convertida no formato escolhido, pronta para baixar. Ao exportar para JPEG, as áreas transparentes são preenchidas com fundo branco automaticamente. Tudo é processado no navegador, sem upload."
            example="Converta um PNG com transparência em WEBP para usar no seu site."
          />

          <div className="mt-10">
            <ConverterClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Quando usar cada formato de imagem
              </h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <strong className="text-si-text">WEBP</strong> — Recomendado para a maioria dos
                  casos na web. Criado pelo Google, oferece melhor compressão que JPEG e suporta
                  transparência como o PNG. Suportado por todos os navegadores modernos (Chrome,
                  Firefox, Safari 14+, Edge). Ideal para imagens em sites, blogs e lojas virtuais.
                </li>
                <li>
                  <strong className="text-si-text">JPEG / JPG</strong> — O formato universal para
                  fotos. Compatível com praticamente todo software, impressora e dispositivo. Não
                  suporta transparência. Ótimo para fotos digitais, sharing por e-mail e impressão.
                </li>
                <li>
                  <strong className="text-si-text">PNG</strong> — Compressão lossless (sem perda)
                  com suporte a transparência. Ideal para logotipos, ícones, screenshots e
                  qualquer imagem com texto ou bordas nítidas. O arquivo costuma ser maior que
                  WEBP/JPEG — evite para fotos grandes.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como converter PNG para JPG (com fundo branco)
              </h2>
              <p>
                Imagens PNG frequentemente têm fundo transparente. Quando convertidas para JPEG
                (que não suporta transparência), as áreas transparentes precisam ser preenchidas
                com uma cor — normalmente branco.
              </p>
              <p className="mt-3">
                Esta ferramenta faz isso automaticamente: ao selecionar JPEG como formato de
                saída, o fundo é preenchido com branco antes da exportação. Se você precisar de
                outra cor de fundo, converta para PNG ou WEBP (que mantêm a transparência).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Converter imagens no navegador: por que é mais seguro
              </h2>
              <p>
                A maioria dos conversores online envia sua imagem a um servidor externo para
                processamento — o arquivo pode ser armazenado, analisado ou compartilhado sem
                o seu consentimento.
              </p>
              <p className="mt-3">
                Esta ferramenta usa a{' '}
                <strong className="text-si-text">Canvas API do navegador</strong>, que processa
                a imagem localmente no seu dispositivo. Nenhum byte da sua imagem deixa o
                computador. Você pode verificar isso na aba Network do DevTools (F12) — nenhuma
                requisição de rede é feita com o arquivo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Converter JPG para PNG melhora a qualidade?',
                    a: 'Não. A conversão não recupera qualidade perdida na compressão original. PNG preservará os pixels exatamente como estão no JPG. A vantagem é suporte a transparência e ausência de novos artefatos em edições futuras.',
                  },
                  {
                    q: 'O que acontece com áreas transparentes ao converter para JPEG?',
                    a: 'JPEG não suporta transparência. Esta ferramenta preenche automaticamente as áreas transparentes com fundo branco. Para manter transparência, use PNG ou WEBP.',
                  },
                  {
                    q: 'Por que usar WEBP em vez de JPEG ou PNG?',
                    a: 'WEBP é 25–35% menor que JPEG com qualidade equivalente e suporta transparência como o PNG. É o formato recomendado pelo Google para web. Use JPEG quando compatibilidade máxima com impressoras e software antigo for necessária.',
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
