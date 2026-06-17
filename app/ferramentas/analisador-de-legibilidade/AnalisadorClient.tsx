'use client';

import React, { useState } from 'react';
import AdSlot from '../../../components/AdSlot';

function contarSilabas(palavra: string): number {
  const w = palavra.toLowerCase().replace(/[^a-záéíóúâêîôûãõàü]/g, '');
  const grupos = w.match(/[aeiouáéíóúâêîôûãõàü]+/g);
  return Math.max(1, grupos?.length ?? 1);
}

function analisar(texto: string) {
  const textoLimpo = texto.trim();
  if (!textoLimpo) return null;

  const frases = textoLimpo
    .split(/[.!?]+/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  const palavras = textoLimpo
    .split(/\s+/)
    .map((p) => p.replace(/[^a-záéíóúâêîôûãõàü]/gi, ''))
    .filter((p) => p.length > 0);

  if (palavras.length === 0 || frases.length === 0) return null;

  const totalSilabas = palavras.reduce((acc, p) => acc + contarSilabas(p), 0);
  const totalPalavras = palavras.length;
  const totalFrases = frases.length;

  const asl = totalPalavras / totalFrases;
  const asw = totalSilabas / totalPalavras;

  const score = Math.max(0, Math.min(100, 248.835 - 1.015 * asl - 84.6 * asw));

  return { score, totalPalavras, totalFrases, asl, asw, totalSilabas };
}

type Nivel = {
  label: string;
  cor: string;
  publico: string;
  dica: string;
};

function getNivel(score: number): Nivel {
  if (score >= 90) return { label: 'Muito Fácil', cor: '#22d3ee', publico: '4º ano do Ensino Fundamental', dica: 'Texto extremamente simples. Ótimo para conteúdo infantil ou instruções básicas.' };
  if (score >= 80) return { label: 'Fácil', cor: '#34d399', publico: '5º ano do Ensino Fundamental', dica: 'Linguagem acessível. Ideal para comunicados, redes sociais e atendimento ao cliente.' };
  if (score >= 70) return { label: 'Bastante Fácil', cor: '#4ade80', publico: '6º ano do Ensino Fundamental', dica: 'Boa legibilidade. Funciona bem para blogs, e-mails e posts de marketing.' };
  if (score >= 60) return { label: 'Médio', cor: '#a3e635', publico: '7º ano do Ensino Fundamental', dica: 'Adequado para a maioria dos leitores adultos. Equilibrado para conteúdo profissional.' };
  if (score >= 50) return { label: 'Moderadamente Difícil', cor: '#facc15', publico: 'Ensino Médio', dica: 'Requer atenção. Considere reduzir o tamanho das frases ou usar palavras mais simples.' };
  if (score >= 30) return { label: 'Difícil', cor: '#fb923c', publico: 'Ensino Superior', dica: 'Texto denso. Quebre frases longas e substitua jargões por termos mais acessíveis.' };
  return { label: 'Muito Difícil', cor: '#f87171', publico: 'Pós-graduação', dica: 'Muito técnico ou acadêmico. Adequado apenas para especialistas no assunto.' };
}

export default function AnalisadorClient() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState<ReturnType<typeof analisar>>(null);
  const [analisado, setAnalisado] = useState(false);

  const executar = () => {
    setResultado(analisar(texto));
    setAnalisado(true);
  };

  const nivel = resultado ? getNivel(resultado.score) : null;

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <div className="surface p-7 sm:p-8 space-y-5 reveal">
        <div>
          <label className="field-label">Cole ou digite o texto para analisar</label>
          <textarea
            className="field"
            rows={10}
            placeholder="Cole aqui seu texto — post de blog, e-mail, relatório, roteiro, proposta comercial..."
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setAnalisado(false);
            }}
          />
          <p className="text-xs text-si-dim mt-2">
            {texto.split(/\s+/).filter(Boolean).length} palavras · {texto.length} caracteres
          </p>
        </div>

        <button
          className="btn-primary w-full"
          onClick={executar}
          disabled={texto.trim().length < 20}
        >
          📊 Analisar Legibilidade
        </button>
      </div>

      {analisado && resultado && nivel && (
        <div className="space-y-4 reveal">
          {/* Score principal */}
          <div className="surface p-7 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div
                className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 shrink-0"
                style={{ borderColor: nivel.cor }}
              >
                <span className="font-display font-black text-3xl" style={{ color: nivel.cor }}>
                  {Math.round(resultado.score)}
                </span>
                <span className="text-xs text-si-muted">/ 100</span>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl" style={{ color: nivel.cor }}>
                  {nivel.label}
                </p>
                <p className="text-si-muted text-sm mt-1">
                  Nível de escolaridade estimado: <strong className="text-si-text">{nivel.publico}</strong>
                </p>
                <p className="text-si-muted text-sm mt-3 leading-relaxed">{nivel.dica}</p>
              </div>
            </div>
          </div>

          {/* Métricas detalhadas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Palavras', valor: resultado.totalPalavras.toLocaleString('pt-BR') },
              { label: 'Frases', valor: resultado.totalFrases.toLocaleString('pt-BR') },
              { label: 'Média palavras/frase', valor: resultado.asl.toFixed(1) },
              { label: 'Média sílabas/palavra', valor: resultado.asw.toFixed(2) },
            ].map(({ label, valor }) => (
              <div key={label} className="surface p-4 text-center">
                <p className="text-xs text-si-muted uppercase tracking-wide mb-1">{label}</p>
                <p className="font-display font-bold text-si-text text-lg">{valor}</p>
              </div>
            ))}
          </div>

          {/* Escala de referência */}
          <div className="surface p-6">
            <p className="text-sm font-semibold text-si-muted mb-4 uppercase tracking-wide">Escala de legibilidade</p>
            <div className="space-y-2">
              {[
                { range: '90–100', label: 'Muito Fácil', cor: '#22d3ee' },
                { range: '70–89', label: 'Fácil / Bastante Fácil', cor: '#4ade80' },
                { range: '50–69', label: 'Médio / Moderado', cor: '#facc15' },
                { range: '30–49', label: 'Difícil', cor: '#fb923c' },
                { range: '0–29', label: 'Muito Difícil', cor: '#f87171' },
              ].map(({ range, label, cor }) => (
                <div key={range} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-si-dim text-xs font-mono">{range}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: cor }}
                  />
                  <span style={{ color: cor }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analisado && !resultado && (
        <p className="text-sm text-center" style={{ color: '#f87171' }}>
          Texto muito curto ou sem frases completas para analisar.
        </p>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
