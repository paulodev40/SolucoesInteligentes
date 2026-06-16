import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Tabela INSS progressiva 2025
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

// Tabela IRRF 2025 — recebe a base já deduzida do INSS
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
        <Link to="/ferramentas" className="btn-ghost mb-8 inline-flex">← Voltar às ferramentas</Link>

        <div className="reveal">
          <div className="section-label">Trabalhista</div>
          <h1 className="section-title">Calculadora de Férias e 13º</h1>
          <p className="section-desc">
            Estime o valor das férias com terço constitucional e do 13º salário proporcional,
            com desconto de INSS e IRRF conforme tabelas 2025.
          </p>
        </div>

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
              * Cálculo estimado com base nas tabelas de INSS e IRRF 2025 (sem dependentes).
              O 1/3 constitucional é isento de IRRF conforme STF RE 895.759.
              Consulte um contador para valores exatos.
            </p>
          </div>
        )}
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
