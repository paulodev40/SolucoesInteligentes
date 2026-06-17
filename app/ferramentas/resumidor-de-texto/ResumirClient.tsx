'use client';

import React, { useState } from 'react';
import AdSlot from '../../../components/AdSlot';

const MAX_CHARS = 2000;

export default function ResumirClient() {
  const [texto, setTexto] = useState('');
  const [resumo, setResumo] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const resumir = async () => {
    if (texto.trim().length < 50) {
      setErro('Digite pelo menos 50 caracteres para resumir.');
      return;
    }
    setCarregando(true);
    setErro('');
    setResumo('');
    setCopiado(false);

    try {
      const res = await fetch('/api/resumir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro desconhecido');
      setResumo(data.resumo);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao resumir. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(resumo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const restante = MAX_CHARS - texto.length;

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <div className="surface p-7 sm:p-8 space-y-5 reveal">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="field-label">Cole ou digite o texto</label>
            <span
              className="text-xs"
              style={{ color: restante < 100 ? 'var(--pink)' : 'var(--text-muted)' }}
            >
              {restante.toLocaleString('pt-BR')} caracteres restantes
            </span>
          </div>
          <textarea
            className="field"
            rows={10}
            placeholder="Cole aqui o texto que deseja resumir — artigo, relatório, e-mail, contrato, ata de reunião..."
            value={texto}
            maxLength={MAX_CHARS}
            onChange={(e) => {
              setTexto(e.target.value);
              setErro('');
            }}
          />
        </div>

        {erro && (
          <p className="text-sm" style={{ color: '#f87171' }}>
            {erro}
          </p>
        )}

        <button
          className="btn-primary w-full"
          onClick={resumir}
          disabled={carregando || texto.trim().length < 50}
        >
          {carregando ? '✨ Resumindo com IA…' : '✨ Resumir com IA'}
        </button>

        <p className="text-xs text-si-dim text-center">
          Máximo de {MAX_CHARS.toLocaleString('pt-BR')} caracteres · Resultado em até 10 segundos
        </p>
      </div>

      {resumo && (
        <div className="reveal">
          <div className="terminal-box">
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: '#ff5f57' }} />
              <span className="t-dot" style={{ background: '#febc2e' }} />
              <span className="t-dot" style={{ background: '#28c840' }} />
              <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                resumo-gerado.txt
              </span>
            </div>
            <div className="terminal-body text-sm leading-relaxed whitespace-pre-wrap">
              {resumo}
            </div>
          </div>

          <button className="btn-primary mt-4 w-full" onClick={copiar}>
            {copiado ? '✅ Copiado!' : '📋 Copiar Resumo'}
          </button>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
