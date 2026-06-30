import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ComoUsar from '../../../components/ComoUsar';
import JurosCompostosClient from './JurosCompostosClient';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Compostos — Online e Gratuita',
  description:
    'Calcule juros compostos com aportes mensais: veja o valor final, total investido e rendimento ano a ano. Fórmula correta com taxa mensal equivalente. Gratuita.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/calculadora-juros-compostos' },
  openGraph: {
    title: 'Calculadora de Juros Compostos | Soluções Inteligentes 83',
    description: 'Simule investimentos com juros compostos e aportes mensais. Resultado com tabela anual. Gratuita.',
    url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-juros-compostos',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Juros Compostos',
      url: 'https://solucoesinteligentes83.com/ferramentas/calculadora-juros-compostos',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calcule o crescimento de investimentos com juros compostos, aportes mensais e taxa anual equivalente. Resultado com tabela de evolução ano a ano.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que são juros compostos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Juros compostos são aqueles que incidem não apenas sobre o capital inicial, mas também sobre os juros acumulados nos períodos anteriores — o chamado "juros sobre juros". É o mecanismo por trás do crescimento exponencial de investimentos ao longo do tempo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual é a fórmula dos juros compostos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A fórmula básica é M = C × (1 + i)^n, onde M é o montante final, C é o capital inicial, i é a taxa de juros por período e n é o número de períodos. Com aportes mensais, o cálculo é feito mês a mês: saldo = (saldo + aporte) × (1 + i), repetido por n meses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como converter taxa anual em taxa mensal equivalente?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A conversão correta usa a fórmula: taxa mensal = (1 + taxa anual)^(1/12) − 1. Por exemplo, 12% ao ano corresponde a aproximadamente 0,949% ao mês — e não 1% (que seria a divisão simples por 12, incorreta para juros compostos).',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre juros simples e compostos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nos juros simples, os juros são sempre calculados sobre o capital inicial, crescendo de forma linear. Nos juros compostos, os juros são incorporados ao saldo e passam a render juros também, criando crescimento exponencial. A diferença é pequena no curto prazo, mas enorme em prazos longos.',
          },
        },
      ],
    },
  ],
};

export default function CalculadoraJurosCompostos() {
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
            <div className="section-label">Financeiro</div>
            <h1 className="section-title">Calculadora de Juros Compostos</h1>
            <p className="section-desc">
              Simule o crescimento do seu investimento com aportes mensais e veja a evolução
              ano a ano. Taxa mensal calculada pela fórmula equivalente correta.
            </p>
          </div>

          <ComoUsar
            className="mt-8"
            steps={[
              'Informe o capital inicial e o aporte mensal (em R$).',
              'Defina a taxa de juros anual (%) e o prazo em anos.',
              'O resultado é atualizado automaticamente — abra a tabela para ver a evolução ano a ano.',
            ]}
            output="Três valores em destaque: valor final, total investido e rendimento (juros), além de uma tabela opcional com saldo, aportes e juros de cada ano."
            example="R$ 10.000 iniciais + R$ 500/mês a 12% ao ano por 10 anos."
          />

          <div className="mt-10">
            <JurosCompostosClient />
          </div>

          {/* Conteúdo SEO — necessário para aprovação AdSense e ranqueamento */}
          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                O que são juros compostos?
              </h2>
              <p>
                Juros compostos são o mecanismo em que os juros gerados em cada período são
                somados ao capital e passam a render juros também — o famoso <strong className="text-si-text">"juros sobre juros"</strong>.
                É o princípio por trás do crescimento exponencial de qualquer investimento de longo prazo,
                como CDB, Tesouro Direto, fundos de renda fixa e ações.
              </p>
              <p className="mt-3">
                Albert Einstein teria chamado os juros compostos de "a oitava maravilha do mundo" —
                verdade ou não, a lógica é irrefutável: quanto mais cedo você começa a investir,
                mais tempo os juros têm para render sobre os juros anteriores.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Fórmula dos juros compostos
              </h2>
              <p>
                A fórmula básica é <strong className="text-si-text font-mono">M = C × (1 + i)ⁿ</strong>,
                onde <strong className="text-si-text">M</strong> é o montante final,{' '}
                <strong className="text-si-text">C</strong> é o capital inicial,{' '}
                <strong className="text-si-text">i</strong> é a taxa de juros por período e{' '}
                <strong className="text-si-text">n</strong> é o número de períodos.
              </p>
              <p className="mt-3">
                Com aportes mensais, o cálculo é feito mês a mês:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                saldo = (saldo + aporte) × (1 + i), repetido por n meses
              </div>
              <p>
                Nossa calculadora usa exatamente esse método — mais preciso do que a fórmula
                fechada com aportes, que não lida bem com prazos que não são múltiplos exatos de 12 meses.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Por que não dividir a taxa anual por 12?
              </h2>
              <p>
                Dividir 12% ao ano por 12 dá 1% ao mês — mas isso é <strong className="text-si-text">taxa proporcional</strong>,
                usada em juros simples. Para juros compostos, a conversão correta é a{' '}
                <strong className="text-si-text">taxa equivalente</strong>:
              </p>
              <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
                i_mensal = (1 + i_anual)^(1/12) − 1
              </div>
              <p>
                12% ao ano equivale a <strong className="text-si-text">0,9489% ao mês</strong> — não 1%.
                A diferença parece pequena, mas em 10 anos ela distorce o resultado final em centenas de reais.
                Nossa calculadora usa sempre a fórmula correta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Juros compostos vs. juros simples
              </h2>
              <p>
                Nos <strong className="text-si-text">juros simples</strong>, os juros são sempre
                calculados sobre o capital inicial — o crescimento é linear.
                Nos <strong className="text-si-text">juros compostos</strong>, os juros são
                incorporados ao saldo e passam a render também — o crescimento é exponencial.
              </p>
              <p className="mt-3">
                Em 1 mês, a diferença é desprezível. Em 10 anos com taxa de 12% a.a. e aporte de R$ 500/mês,
                a diferença entre os dois métodos pode superar R$ 50.000 no saldo final.
                Toda aplicação financeira séria usa juros compostos.
              </p>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Qual taxa usar na calculadora?',
                    a: 'Depende do investimento. Para referência, o CDI em 2026 está em torno de 13–14% ao ano. O Tesouro Selic acompanha o CDI. CDBs podem oferecer 100%–120% do CDI. Use a taxa do seu investimento específico.',
                  },
                  {
                    q: 'A calculadora considera impostos?',
                    a: 'Não. O resultado é bruto, sem descontar IR (que em renda fixa varia de 15% a 22,5% sobre o rendimento, dependendo do prazo) nem IOF (cobrado nos primeiros 30 dias). Para resultado líquido, aplique o percentual de IR sobre o campo "Rendimento".',
                  },
                  {
                    q: 'Posso usar para simular o Tesouro Direto?',
                    a: 'Sim. Informe a taxa de juros do título (ex.: 6,5% a.a. para um Tesouro IPCA+), o valor inicial, o aporte mensal e o prazo. O resultado não considera a variação do IPCA nem o desconto do IR, mas serve como boa referência de crescimento.',
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

          {/* Slot rodapé */}
          <AdSlot label="Anúncio" className="mt-16" />
        </div>
      </section>
    </>
  );
}
