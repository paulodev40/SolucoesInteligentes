'use client';

import { useState, useMemo } from 'react';
import AdSlot from '../../../components/AdSlot';

interface AnnualRow {
  year: number;
  openingBalance: number;
  contributions: number;
  interest: number;
  closingBalance: number;
}

interface Result {
  finalAmount: number;
  totalContributed: number;
  totalInterest: number;
  annualRows: AnnualRow[];
}

function calcular(
  principal: number,
  aporteMensal: number,
  taxaAnual: number,
  anos: number,
): Result {
  const meses = anos * 12;
  // Conversão correta: taxa mensal equivalente à anual
  const r = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

  let saldo = principal;
  const annualRows: AnnualRow[] = [];

  let saldoInicioAno = principal;
  let aportesNoAno = 0;
  let jurosNoAno = 0;

  for (let m = 1; m <= meses; m++) {
    saldo += aporteMensal;
    aportesNoAno += aporteMensal;
    const juros = saldo * r;
    saldo += juros;
    jurosNoAno += juros;

    if (m % 12 === 0 || m === meses) {
      annualRows.push({
        year: Math.ceil(m / 12),
        openingBalance: saldoInicioAno,
        contributions: aportesNoAno,
        interest: jurosNoAno,
        closingBalance: saldo,
      });
      saldoInicioAno = saldo;
      aportesNoAno = 0;
      jurosNoAno = 0;
    }
  }

  const totalContributed = principal + aporteMensal * meses;
  const totalInterest = saldo - totalContributed;

  return { finalAmount: saldo, totalContributed, totalInterest, annualRows };
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });

const pct = (v: number) => v.toFixed(1).replace('.', ',') + '%';

export default function JurosCompostosClient() {
  const [principal, setPrincipal] = useState(10000);
  const [aporte, setAporte] = useState(500);
  const [taxa, setTaxa] = useState(12);
  const [anos, setAnos] = useState(10);
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const result = useMemo(
    () => calcular(Math.max(0, principal), Math.max(0, aporte), Math.max(0, taxa), Math.max(1, Math.min(50, anos))),
    [principal, aporte, taxa, anos],
  );

  const pctRendimento = result.totalContributed > 0
    ? ((result.totalInterest / result.totalContributed) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Slot topo */}
      <AdSlot label="Anúncio" className="my-2" />

      {/* Formulário */}
      <div className="surface p-7 sm:p-8 reveal">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">Capital inicial (R$)</span>
            <input
              type="number"
              min={0}
              step={100}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="form-field"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">Aporte mensal (R$)</span>
            <input
              type="number"
              min={0}
              step={50}
              value={aporte}
              onChange={(e) => setAporte(Number(e.target.value))}
              className="form-field"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">Taxa de juros anual (%)</span>
            <input
              type="number"
              min={0}
              max={200}
              step={0.1}
              value={taxa}
              onChange={(e) => setTaxa(Number(e.target.value))}
              className="form-field"
            />
            <span className="text-xs text-si-dim">
              Taxa mensal equivalente: {pct(Math.pow(1 + taxa / 100, 1 / 12) - 1)}
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">Prazo (anos)</span>
            <input
              type="number"
              min={1}
              max={50}
              step={1}
              value={anos}
              onChange={(e) => setAnos(Number(e.target.value))}
              className="form-field"
            />
          </label>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal">
        <div className="surface p-6 text-center">
          <p className="text-xs text-si-muted uppercase tracking-wider mb-1">Valor final</p>
          <p className="text-2xl font-display font-extrabold text-si-cyan">
            {fmt(result.finalAmount)}
          </p>
        </div>
        <div className="surface p-6 text-center">
          <p className="text-xs text-si-muted uppercase tracking-wider mb-1">Total investido</p>
          <p className="text-2xl font-display font-extrabold text-si-text">
            {fmt(result.totalContributed)}
          </p>
        </div>
        <div className="surface p-6 text-center">
          <p className="text-xs text-si-muted uppercase tracking-wider mb-1">Rendimento</p>
          <p className="text-2xl font-display font-extrabold text-si-green">
            {fmt(result.totalInterest)}
          </p>
          <p className="text-xs text-si-dim mt-1">+{pct(pctRendimento)} sobre o investido</p>
        </div>
      </div>

      {/* Slot após resultado */}
      <AdSlot label="Anúncio" className="my-2" />

      {/* Tabela anual */}
      <div className="surface reveal">
        <button
          onClick={() => setMostrarTabela((v) => !v)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-si-text">
            Evolução ano a ano ({result.annualRows.length} períodos)
          </span>
          <span className="text-si-cyan text-sm">{mostrarTabela ? '▲ Fechar' : '▼ Ver tabela'}</span>
        </button>

        {mostrarTabela && (
          <div className="overflow-x-auto border-t border-si-dim/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-si-muted text-xs uppercase tracking-wide border-b border-si-dim/30">
                  <th className="p-4 text-left">Ano</th>
                  <th className="p-4 text-right">Saldo inicial</th>
                  <th className="p-4 text-right">Aportes</th>
                  <th className="p-4 text-right">Juros</th>
                  <th className="p-4 text-right">Saldo final</th>
                </tr>
              </thead>
              <tbody>
                {result.annualRows.map((row) => (
                  <tr
                    key={row.year}
                    className="border-b border-si-dim/20 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-semibold text-si-text">{row.year}º</td>
                    <td className="p-4 text-right text-si-muted">{fmt(row.openingBalance)}</td>
                    <td className="p-4 text-right text-si-muted">{fmt(row.contributions)}</td>
                    <td className="p-4 text-right text-si-green">{fmt(row.interest)}</td>
                    <td className="p-4 text-right font-semibold text-si-cyan">{fmt(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
