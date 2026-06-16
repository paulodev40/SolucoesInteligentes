'use client';

import { useState, useMemo } from 'react';
import AdSlot from '../../../components/AdSlot';

type Mode = 1 | 2 | 3 | 4;
type Color = 'cyan' | 'green' | 'pink' | 'muted';

function parse(raw: string): number {
  const s = raw.trim().replace(',', '.');
  if (!s) return NaN;
  return parseFloat(s);
}

function fmtN(v: number): string {
  if (!isFinite(v)) return '—';
  return v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

function fmtP(v: number): string {
  if (!isFinite(v)) return '—';
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
}

interface State {
  m1x: string; m1y: string;
  m2x: string; m2y: string;
  m3a: string; m3b: string;
  m4y: string; m4x: string;
  m4tipo: 'desconto' | 'acrescimo';
}

const INIT: State = {
  m1x: '20', m1y: '150',
  m2x: '30', m2y: '150',
  m3a: '100', m3b: '120',
  m4y: '200', m4x: '15',
  m4tipo: 'desconto',
};

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: 1, label: 'X% de Y',           desc: 'Quanto é X% de Y?' },
  { id: 2, label: 'X é % de Y',        desc: 'X é quantos % de Y?' },
  { id: 3, label: 'Variação %',         desc: 'Variação de A para B' },
  { id: 4, label: 'Desconto/Acréscimo', desc: 'Calcular acréscimo ou desconto' },
];

const COLOR: Record<Color, string> = {
  cyan:  'text-si-cyan',
  green: 'text-si-green',
  pink:  'text-si-pink',
  muted: 'text-si-muted',
};

export default function PorcentagemClient() {
  const [mode, setMode] = useState<Mode>(1);
  const [s, setS] = useState<State>(INIT);

  const upd = (k: keyof State, v: string) => setS(prev => ({ ...prev, [k]: v }));

  const result = useMemo<{ headline: string; sentence: string; color: Color }>(() => {
    if (mode === 1) {
      const x = parse(s.m1x);
      const y = parse(s.m1y);
      const r = (x / 100) * y;
      const ok = isFinite(r);
      return {
        headline: ok ? fmtN(r) : '—',
        sentence: ok
          ? `${fmtN(x)}% de ${fmtN(y)} é igual a ${fmtN(r)}`
          : 'Preencha os campos para ver o resultado.',
        color: ok ? 'cyan' : 'muted',
      };
    }

    if (mode === 2) {
      const x = parse(s.m2x);
      const y = parse(s.m2y);
      if (y === 0) return { headline: '—', sentence: 'O valor total não pode ser zero.', color: 'muted' };
      const r = (x / y) * 100;
      const ok = isFinite(r);
      return {
        headline: ok ? fmtP(r) : '—',
        sentence: ok
          ? `${fmtN(x)} é ${fmtP(r)} de ${fmtN(y)}`
          : 'Preencha os campos para ver o resultado.',
        color: ok ? 'cyan' : 'muted',
      };
    }

    if (mode === 3) {
      const a = parse(s.m3a);
      const b = parse(s.m3b);
      if (a === 0) return { headline: '—', sentence: 'O valor inicial não pode ser zero.', color: 'muted' };
      const r = ((b - a) / a) * 100;
      const ok = isFinite(r);
      const pos = r >= 0;
      return {
        headline: ok ? (pos ? '+' : '') + fmtP(r) : '—',
        sentence: ok
          ? pos
            ? `De ${fmtN(a)} para ${fmtN(b)}, houve um aumento de ${fmtP(r)}`
            : `De ${fmtN(a)} para ${fmtN(b)}, houve uma queda de ${fmtP(Math.abs(r))}`
          : 'Preencha os campos para ver o resultado.',
        color: ok ? (pos ? 'green' : 'pink') : 'muted',
      };
    }

    // mode 4
    const y = parse(s.m4y);
    const x = parse(s.m4x);
    const tipo = s.m4tipo;
    const r = tipo === 'desconto' ? y * (1 - x / 100) : y * (1 + x / 100);
    const ok = isFinite(r);
    const diff = Math.abs(r - y);
    return {
      headline: ok ? fmtN(r) : '—',
      sentence: ok
        ? tipo === 'desconto'
          ? `${fmtN(y)} com ${fmtN(x)}% de desconto = ${fmtN(r)} (economia de ${fmtN(diff)})`
          : `${fmtN(y)} com ${fmtN(x)}% de acréscimo = ${fmtN(r)} (aumento de ${fmtN(diff)})`
        : 'Preencha os campos para ver o resultado.',
      color: ok ? (tipo === 'desconto' ? 'green' : 'pink') : 'muted',
    };
  }, [mode, s]);

  const tabCls = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
      active
        ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
        : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
    }`;

  const fieldCls = 'flex flex-col gap-1';
  const labelCls = 'text-sm font-semibold text-si-muted';

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      {/* Seletor de modo */}
      <div className="flex flex-wrap gap-2">
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} className={tabCls(mode === m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Campos */}
      <div className="surface p-7 sm:p-8 reveal">
        {mode === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className={fieldCls}>
              <span className={labelCls}>Porcentagem (X %)</span>
              <input type="text" inputMode="decimal" value={s.m1x}
                onChange={e => upd('m1x', e.target.value)} className="form-field" />
            </label>
            <label className={fieldCls}>
              <span className={labelCls}>Valor (Y)</span>
              <input type="text" inputMode="decimal" value={s.m1y}
                onChange={e => upd('m1y', e.target.value)} className="form-field" />
            </label>
          </div>
        )}

        {mode === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className={fieldCls}>
              <span className={labelCls}>Parte (X)</span>
              <input type="text" inputMode="decimal" value={s.m2x}
                onChange={e => upd('m2x', e.target.value)} className="form-field" />
            </label>
            <label className={fieldCls}>
              <span className={labelCls}>Total (Y)</span>
              <input type="text" inputMode="decimal" value={s.m2y}
                onChange={e => upd('m2y', e.target.value)} className="form-field" />
            </label>
          </div>
        )}

        {mode === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className={fieldCls}>
              <span className={labelCls}>Valor inicial (A)</span>
              <input type="text" inputMode="decimal" value={s.m3a}
                onChange={e => upd('m3a', e.target.value)} className="form-field" />
            </label>
            <label className={fieldCls}>
              <span className={labelCls}>Valor final (B)</span>
              <input type="text" inputMode="decimal" value={s.m3b}
                onChange={e => upd('m3b', e.target.value)} className="form-field" />
            </label>
          </div>
        )}

        {mode === 4 && (
          <div className="space-y-6">
            <div className="flex gap-3">
              {(['desconto', 'acrescimo'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => upd('m4tipo', t)}
                  className={tabCls(s.m4tipo === t)}
                >
                  {t === 'desconto' ? '↓ Desconto' : '↑ Acréscimo'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className={fieldCls}>
                <span className={labelCls}>Valor base</span>
                <input type="text" inputMode="decimal" value={s.m4y}
                  onChange={e => upd('m4y', e.target.value)} className="form-field" />
              </label>
              <label className={fieldCls}>
                <span className={labelCls}>Porcentagem (%)</span>
                <input type="text" inputMode="decimal" value={s.m4x}
                  onChange={e => upd('m4x', e.target.value)} className="form-field" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Resultado */}
      <div className="surface p-8 reveal text-center">
        <p className={`text-4xl sm:text-5xl font-display font-extrabold ${COLOR[result.color]}`}>
          {result.headline}
        </p>
        <p className="mt-3 text-sm text-si-muted leading-relaxed">{result.sentence}</p>
      </div>

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
