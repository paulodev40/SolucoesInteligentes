import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import PorcentagemClient from './PorcentagemClient';

export const metadata: Metadata = {
  title: 'Calculadora de Porcentagem — Calcular Porcentagem Online',
  description:
    'Calcule porcentagem de um valor, descubra quanto um número representa em % e calcule aumento, desconto e variação percentual. Grátis e sem cadastro.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/calculadora-porcentagem' },
  openGraph: {
    title: 'Calculadora de Porcentagem | Soluções Inteligentes 83',
    description: 'Calcule porcentagem, desconto, aumento e variação percentual online. Grátis.',
    url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-porcentagem',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Porcentagem',
      url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-porcentagem',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calculadora de porcentagem com 4 modos: quanto é X% de Y, X é quantos % de Y, variação percentual entre dois valores, e cálculo de desconto ou acréscimo.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como tirar 10% de um valor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multiplique o valor por 0,10. Exemplo: 10% de R$ 250 = 250 × 0,10 = R$ 25. Na nossa calculadora, use o modo "X% de Y", informe 10 no campo de porcentagem e 250 no campo de valor.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como calcular porcentagem de desconto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multiplique o preço original por (1 − desconto/100). Exemplo: R$ 200 com 15% de desconto = 200 × (1 − 0,15) = 200 × 0,85 = R$ 170. Use o modo "Desconto/Acréscimo" da calculadora para obter o resultado instantaneamente.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como calcular variação percentual entre dois valores?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A fórmula é: variação = ((valor final − valor inicial) / valor inicial) × 100. Se o resultado for positivo, houve aumento; se negativo, houve queda. Exemplo: de R$ 100 para R$ 120 = ((120 − 100) / 100) × 100 = 20% de aumento.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraPorcentagem() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Matemática</div>
            <h1 className="section-title">Calculadora de Porcentagem</h1>
            <p className="section-desc">
              Quatro modos em uma só ferramenta: calcule quanto é X% de um valor, descubra
              que percentual um número representa, calcule variação entre dois valores e simule
              descontos ou acréscimos.
            </p>
          </div>

          <div className="mt-10">
            <PorcentagemClient />
          </div>

          {/* Conteúdo SEO */}
          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como calcular porcentagem
              </h2>
              <p>
                A regra base é simples: <strong className="text-si-text">divida a porcentagem por 100
                e multiplique pelo valor</strong>. Para saber quanto é 20% de R$ 150:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                20 ÷ 100 × 150 = 30
              </div>
              <p>
                Ou de forma direta: mova a vírgula dois lugares para a esquerda (20% → 0,20) e
                multiplique. A calculadora faz isso automaticamente para qualquer valor que você
                informar, sem precisar de papel ou celular.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como calcular desconto em porcentagem
              </h2>
              <p>
                Para encontrar o <strong className="text-si-text">preço final com desconto</strong>,
                multiplique o valor original por <strong className="text-si-text">(1 − desconto/100)</strong>.
                Exemplo prático: produto de R$ 200 com 15% de desconto:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                200 × (1 − 0,15) = 200 × 0,85 = R$ 170
              </div>
              <p>
                A economia foi de R$ 30. Use o modo <strong className="text-si-text">Desconto/Acréscimo</strong>{' '}
                da calculadora para chegar a esse resultado em segundos — ela também mostra o valor
                economizado automaticamente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como calcular aumento e variação percentual
              </h2>
              <p>
                A fórmula da variação percentual é:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                variação = ((valor final − valor inicial) / valor inicial) × 100
              </div>
              <p>
                Exemplo: salário que passou de R$ 3.000 para R$ 3.300:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-green border border-si-dim/30">
                ((3.300 − 3.000) / 3.000) × 100 = 10% de aumento
              </div>
              <p>
                Se o resultado for negativo, houve queda. Essa fórmula serve para reajustes
                salariais, variação de preços, queda de faturamento ou qualquer comparação entre
                dois momentos no tempo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como descobrir quanto um número representa em porcentagem
              </h2>
              <p>
                Divida a parte pelo total e multiplique por 100. Se você vendeu 45 produtos de
                um lote de 150:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                (45 ÷ 150) × 100 = 30%
              </div>
              <p>
                Essa operação é útil para calcular taxa de conversão, percentual de meta atingida,
                participação de um item no total e qualquer situação onde você tem a parte e
                quer saber o percentual em relação ao todo.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Dúvidas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Como tirar 10% de um valor?',
                    a: 'Multiplique o valor por 0,10. Exemplo: 10% de R$ 250 = R$ 25. Atalho mental: divida o valor por 10. Para 5%, divida por 20; para 1%, divida por 100.',
                  },
                  {
                    q: 'Como calcular porcentagem de desconto?',
                    a: 'Use a fórmula: preço final = valor × (1 − desconto/100). Para 15% de desconto em R$ 200: 200 × 0,85 = R$ 170. O modo "Desconto/Acréscimo" da calculadora calcula isso e ainda mostra quanto você economiza.',
                  },
                  {
                    q: 'Como calcular variação percentual entre dois valores?',
                    a: 'Fórmula: ((valor final − valor inicial) / valor inicial) × 100. Resultado positivo = aumento; resultado negativo = queda. Exemplo: de 80 para 100 = ((100 − 80) / 80) × 100 = 25% de aumento.',
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
