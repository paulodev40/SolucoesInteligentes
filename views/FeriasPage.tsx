'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import ComoUsar from '../components/ComoUsar';

// Tabela INSS progressiva 2026
function calcINSS(base: number): number {
  const faixas = [
    { limite: 1518.00,  aliquota: 0.075 },
    { limite: 2793.88,  aliquota: 0.09  },
    { limite: 4189.53,  aliquota: 0.12  },
    { limite: 8157.41,  aliquota: 0.14  },
  ];
  let inss = 0;
  let anterior = 0;
  for (const { limite, aliquota } of faixas) {
    if (base <= anterior) break;
    const teto = Math.min(base, limite);
    inss += (teto - anterior) * aliquota;
    anterior = limite;
    if (base <= limite) break;
  }
  return inss;
}

// Tabela IRRF 2026 — recebe a base já deduzida do INSS
function calcIRRF(baseAposINSS: number): number {
  if (baseAposINSS <= 2259.20) return 0;
  if (baseAposINSS <= 2826.65) return baseAposINSS * 0.075 - 169.44;
  if (baseAposINSS <= 3751.05) return baseAposINSS * 0.15  - 381.44;
  if (baseAposINSS <= 4664.68) return baseAposINSS * 0.225 - 662.77;
  return baseAposINSS * 0.275 - 896.00;
}

const brl = (v: number) =>
  Math.max(0, v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

interface Resultado {
  feriasBruto: number;
  terco: number;
  totalFeriasBruto: number;
  inssFerias: number;
  irrfFerias: number;
  feriasLiquido: number;
  decimoBruto: number;
  inssDecimo: number;
  irrfDecimo: number;
  decimoLiquido: number;
  totalLiquido: number;
}

const FeriasPage: React.FC = () => {
  const [salario, setSalario] = useState('');
  const [meses, setMeses] = useState('12');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState('');

  const calcular = () => {
    const sal = parseFloat(salario.replace(',', '.'));
    const m   = parseInt(meses, 10);

    if (!sal || sal <= 0)         { setErro('Informe um salário válido.'); return; }
    if (!m || m < 1 || m > 12)   { setErro('Os meses trabalhados devem ser entre 1 e 12.'); return; }

    setErro('');
    const proporcao = m / 12;

    // ── Férias ──
    const feriasBruto      = sal * proporcao;
    const terco            = feriasBruto / 3;
    const totalFeriasBruto = feriasBruto + terco;
    // INSS incide sobre o salário de férias (não sobre o 1/3)
    const inssFerias  = calcINSS(feriasBruto);
    // IRRF incide sobre o salário de férias − INSS (1/3 é isento per STF RE 895.759)
    const irrfFerias  = Math.max(0, calcIRRF(feriasBruto - inssFerias));
    const feriasLiquido = totalFeriasBruto - inssFerias - irrfFerias;

    // ── 13º Salário ──
    const decimoBruto  = sal * proporcao;
    const inssDecimo   = calcINSS(decimoBruto);
    const irrfDecimo   = Math.max(0, calcIRRF(decimoBruto - inssDecimo));
    const decimoLiquido = decimoBruto - inssDecimo - irrfDecimo;

    setResultado({
      feriasBruto, terco, totalFeriasBruto,
      inssFerias, irrfFerias, feriasLiquido,
      decimoBruto, inssDecimo, irrfDecimo, decimoLiquido,
      totalLiquido: feriasLiquido + decimoLiquido,
    });
  };

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">← Voltar às ferramentas</Link>

        <div className="reveal">
          <div className="section-label">Trabalhista</div>
          <h1 className="section-title">Calculadora de Férias e 13º</h1>
          <p className="section-desc">
            Estime o valor das férias com terço constitucional e do 13º salário proporcional,
            com desconto de INSS e IRRF conforme tabelas 2026.
          </p>
        </div>

        <ComoUsar
          className="mt-8"
          steps={[
            'Digite o salário bruto (R$).',
            'Informe os meses trabalhados no período (de 1 a 12).',
            'Clique em "Calcular" para ver os valores.',
          ]}
          output="Os valores líquidos das férias (com terço constitucional) e do 13º salário, já com os descontos de INSS e IRRF, mais o total líquido a receber."
          example="Salário de R$ 3.500 com 12 meses trabalhados."
        />

        <AdSlot label="Anúncio" className="my-6" />

        <div className="surface p-7 sm:p-8 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="field-label">Salário bruto (R$)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="field"
                placeholder="Ex: 3500,00"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calcular()}
              />
            </div>
            <div>
              <label className="field-label">Meses trabalhados no período (1–12)</label>
              <input
                type="number"
                min="1"
                max="12"
                className="field"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && calcular()}
              />
            </div>
          </div>

          {erro && <p className="mt-3 text-sm" style={{ color: '#f87171' }}>{erro}</p>}

          <button className="btn-primary mt-6 w-full" onClick={calcular}>
            Calcular
          </button>
        </div>

        {resultado && (
          <div className="mt-8 space-y-5 reveal">

            {/* Férias */}
            <div className="surface p-7">
              <h2 className="font-display font-extrabold text-xl text-si-cyan mb-5">🏖️ Férias</h2>
              <div className="space-y-3 text-sm">
                <Row label="Salário de férias" value={brl(resultado.feriasBruto)} />
                <Row label="+ Terço constitucional (1/3)" value={brl(resultado.terco)} />
                <Row label="= Total bruto" value={brl(resultado.totalFeriasBruto)} bold />
                <Row label="− INSS (estimado)" value={`- ${brl(resultado.inssFerias)}`} dim />
                <Row label="− IRRF (estimado)" value={`- ${brl(resultado.irrfFerias)}`} dim />
                <div className="border-t border-[var(--border-strong)] pt-3">
                  <Row label="Férias líquidas" value={brl(resultado.feriasLiquido)} bold cyan />
                </div>
              </div>
            </div>

            {/* 13º */}
            <div className="surface p-7">
              <h2 className="font-display font-extrabold text-xl text-si-cyan mb-5">🎄 13º Salário</h2>
              <div className="space-y-3 text-sm">
                <Row label="13º bruto" value={brl(resultado.decimoBruto)} bold />
                <Row label="− INSS (estimado)" value={`- ${brl(resultado.inssDecimo)}`} dim />
                <Row label="− IRRF (estimado)" value={`- ${brl(resultado.irrfDecimo)}`} dim />
                <div className="border-t border-[var(--border-strong)] pt-3">
                  <Row label="13º líquido" value={brl(resultado.decimoLiquido)} bold cyan />
                </div>
              </div>
            </div>

            {/* Total */}
            <div
              className="surface p-6"
              style={{
                background: 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))',
                border: '1px solid var(--border-strong)',
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span className="font-display font-extrabold text-lg text-si-text">
                  Total a receber (líquido)
                </span>
                <span className="font-display font-extrabold text-2xl text-si-cyan">
                  {brl(resultado.totalLiquido)}
                </span>
              </div>
            </div>

            <p className="text-xs text-si-dim text-center leading-relaxed">
              * Cálculo estimado com base nas tabelas de INSS e IRRF 2026 (sem dependentes).
              O 1/3 constitucional é isento de IRRF conforme STF RE 895.759.
              Consulte um contador para valores exatos.
            </p>
          </div>
        )}

        <AdSlot label="Anúncio" className="my-8" />

        {/* Conteúdo SEO */}
        <article className="mt-4 space-y-10 text-si-muted leading-relaxed reveal">
          <div className="section-divider" />

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              O que são férias proporcionais?
            </h2>
            <p>
              As férias proporcionais são o direito do trabalhador a receber, ao ser demitido
              ou ao término do período aquisitivo, uma fração das férias correspondente aos meses
              trabalhados. A cada mês completo trabalhado, o empregado adquire 1/12 do direito
              a férias. Quem trabalhou 6 meses tem direito a 15 dias de férias; quem trabalhou
              12 meses, a 30 dias completos.
            </p>
            <p className="mt-3">
              Além do salário de férias, a lei garante o <strong className="text-si-text">terço
              constitucional</strong> — um acréscimo de 1/3 sobre o valor bruto das férias,
              previsto no artigo 7º, XVII da Constituição Federal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              Como calcular o 13º salário proporcional
            </h2>
            <p>
              O 13º salário proporcional é calculado dividindo o salário bruto por 12 e
              multiplicando pelo número de meses trabalhados no ano. Meses com 15 dias ou
              mais de trabalho contam como mês completo.
            </p>
            <div className="my-4 p-4 rounded-lg bg-si-surface2 font-mono text-sm text-si-cyan border border-si-dim/30">
              13º proporcional = (salário ÷ 12) × meses trabalhados
            </div>
            <p>
              Exemplo: salário de R$ 3.000 com 8 meses trabalhados:
              (3.000 ÷ 12) × 8 = <strong className="text-si-text">R$ 2.000 brutos</strong>.
              Sobre esse valor incidem INSS e, se aplicável, IRRF.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              Quais descontos incidem sobre férias e 13º?
            </h2>
            <p>
              Dois descontos principais são aplicados: o <strong className="text-si-text">INSS</strong>{' '}
              (contribuição previdenciária) e o <strong className="text-si-text">IRRF</strong>{' '}
              (Imposto de Renda Retido na Fonte). Ambos usam tabelas progressivas — quanto maior
              o salário, maior a alíquota, mas apenas sobre a faixa que excede cada limite.
            </p>
            <p className="mt-3">
              O INSS em 2026 vai de 7,5% (salários até R$ 1.518) a 14% (acima de R$ 4.189,53),
              com teto de contribuição em R$ 8.157,41. O IRRF é isento para bases até R$ 2.259,20
              após a dedução do INSS, chegando a 27,5% para as faixas mais altas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              O 1/3 constitucional de férias paga IRRF?
            </h2>
            <p>
              <strong className="text-si-text">Não</strong>. O Supremo Tribunal Federal decidiu,
              no Recurso Extraordinário 895.759 (tema 808), que o terço constitucional de férias
              tem natureza indenizatória e, portanto, é isento de Imposto de Renda. Nossa calculadora
              aplica essa regra corretamente: o IRRF incide apenas sobre o salário de férias,
              sem considerar o 1/3.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-6">
              Perguntas frequentes
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Trabalhei menos de 12 meses, tenho direito a férias?',
                  a: 'Sim. Após completar 12 meses de contrato (período aquisitivo), o trabalhador tem direito a 30 dias de férias. Se for demitido antes disso, tem direito às férias proporcionais — 1/12 para cada mês completo trabalhado.',
                },
                {
                  q: 'Quando é pago o 13º salário?',
                  a: 'O 13º é pago em duas parcelas: a primeira entre fevereiro e novembro (sem desconto de IR), e a segunda até 20 de dezembro. Na demissão sem justa causa, ambas as parcelas são pagas na rescisão.',
                },
                {
                  q: 'As tabelas de INSS e IRRF mudam todo ano?',
                  a: 'Sim. O governo federal atualiza as faixas e alíquotas anualmente. Nossa calculadora usa as tabelas vigentes em 2026. Para anos anteriores ou futuros, verifique os valores no site da Receita Federal.',
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
  );
};

interface RowProps {
  label: string;
  value: string;
  bold?: boolean;
  dim?: boolean;
  cyan?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, bold, dim, cyan }) => (
  <div className="flex items-center justify-between gap-4">
    <span className={dim ? 'text-si-dim' : 'text-si-muted'}>{label}</span>
    <span
      className={`font-mono text-right ${bold ? 'font-bold' : ''} ${cyan ? 'text-si-cyan' : dim ? 'text-si-dim' : 'text-si-muted'}`}
    >
      {value}
    </span>
  </div>
);

export default FeriasPage;
