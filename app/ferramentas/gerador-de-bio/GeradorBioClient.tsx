'use client';

import React, { useState } from 'react';
import AdSlot from '../../../components/AdSlot';

type Plataforma = 'linkedin' | 'instagram' | 'twitter' | 'whatsapp';

const PLATAFORMAS: { id: Plataforma; label: string; limite: number; emoji: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', limite: 300, emoji: '💼' },
  { id: 'instagram', label: 'Instagram', limite: 150, emoji: '📸' },
  { id: 'twitter', label: 'Twitter / X', limite: 160, emoji: '🐦' },
  { id: 'whatsapp', label: 'WhatsApp Status', limite: 139, emoji: '💬' },
];

function gerarBio(
  plataforma: Plataforma,
  nome: string,
  cargo: string,
  nicho: string,
  d1: string,
  d2: string,
  d3: string,
  cta: string,
): string {
  const n = nome.trim();
  const c = cargo.trim();
  const ni = nicho.trim();
  const difs = [d1, d2, d3].map((d) => d.trim()).filter(Boolean);
  const ct = cta.trim();

  if (!c || !ni) return '';

  switch (plataforma) {
    case 'linkedin': {
      const intro = n ? `${n} é ${c}` : c.charAt(0).toUpperCase() + c.slice(1);
      const difStr =
        difs.length === 3
          ? `${difs[0]}, ${difs[1]} e ${difs[2]}`
          : difs.length === 2
          ? `${difs[0]} e ${difs[1]}`
          : difs[0] ?? '';
      const partes = [
        `${intro} com foco em ${ni}.`,
        difStr ? `${difStr}.` : '',
        ct ? ct : '',
      ].filter(Boolean);
      return partes.join(' ');
    }

    case 'instagram': {
      const linhas = [
        `${c} | ${ni} ✨`,
        ...difs.map((d) => `▪ ${d}`),
        ct ? `👇 ${ct}` : '',
      ].filter(Boolean);
      return linhas.join('\n');
    }

    case 'twitter': {
      const difStr =
        difs.length >= 2
          ? `${difs[0]} e ${difs[1]}`
          : difs[0] ?? '';
      const partes = [
        `${c} | ${ni}.`,
        difStr ? `${difStr}.` : '',
        ct || '',
      ].filter(Boolean);
      return partes.join(' ');
    }

    case 'whatsapp': {
      const partes = [c, ni, ct].filter(Boolean);
      return partes.join(' | ');
    }
  }
}

const tabCls = (active: boolean) =>
  `px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
    active
      ? 'bg-[var(--cyan-dim)] border-[var(--cyan)] text-[var(--cyan)]'
      : 'border-[var(--border)] text-si-muted hover:border-[var(--cyan-dim)] hover:text-si-text'
  }`;

export default function GeradorBioClient() {
  const [plataforma, setPlataforma] = useState<Plataforma>('linkedin');
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [nicho, setNicho] = useState('');
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [d3, setD3] = useState('');
  const [cta, setCta] = useState('');
  const [bio, setBio] = useState('');
  const [copiado, setCopiado] = useState(false);

  const gerar = () => {
    const resultado = gerarBio(plataforma, nome, cargo, nicho, d1, d2, d3, cta);
    setBio(resultado);
    setCopiado(false);
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(bio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const limite = PLATAFORMAS.find((p) => p.id === plataforma)?.limite ?? 300;
  const podeGerar = cargo.trim().length > 0 && nicho.trim().length > 0;

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <div className="surface p-7 sm:p-8 space-y-7 reveal">

        {/* Plataforma */}
        <div>
          <label className="field-label">Plataforma</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PLATAFORMAS.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPlataforma(p.id); setBio(''); }}
                className={tabCls(plataforma === p.id)}
              >
                {p.emoji} {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-si-dim mt-2">
            Limite recomendado: <strong>{limite} caracteres</strong>
          </p>
        </div>

        {/* Nome + Cargo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label">Seu nome (opcional)</label>
            <input
              type="text"
              className="field"
              placeholder="Ex: Ana Costa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">Cargo / Profissão *</label>
            <input
              type="text"
              className="field"
              placeholder="Ex: Designer Gráfico, Consultor de Vendas"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>
        </div>

        {/* Nicho */}
        <div>
          <label className="field-label">Nicho / Área de atuação *</label>
          <input
            type="text"
            className="field"
            placeholder="Ex: branding para pequenas empresas, vendas B2B, marketing digital"
            value={nicho}
            onChange={(e) => setNicho(e.target.value)}
          />
        </div>

        {/* Diferenciais */}
        <div>
          <label className="field-label">Seus diferenciais (até 3)</label>
          <div className="space-y-3">
            {[
              { val: d1, set: setD1, ph: 'Ex: +5 anos de experiência no mercado' },
              { val: d2, set: setD2, ph: 'Ex: mais de 200 clientes atendidos' },
              { val: d3, set: setD3, ph: 'Ex: especialista em estratégias de crescimento orgânico' },
            ].map(({ val, set, ph }, i) => (
              <input
                key={i}
                type="text"
                className="field"
                placeholder={ph}
                value={val}
                onChange={(e) => set(e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div>
          <label className="field-label">Chamada para ação (opcional)</label>
          <input
            type="text"
            className="field"
            placeholder="Ex: Me chame no DM · Consultoria gratuita no link · Vamos conversar?"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />
        </div>

        <button className="btn-primary w-full" onClick={gerar} disabled={!podeGerar}>
          ✍️ Gerar Bio
        </button>
      </div>

      {bio && (
        <div className="reveal">
          <div className="terminal-box">
            <div className="terminal-bar">
              <span className="t-dot" style={{ background: '#ff5f57' }} />
              <span className="t-dot" style={{ background: '#febc2e' }} />
              <span className="t-dot" style={{ background: '#28c840' }} />
              <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                bio-gerada.txt
              </span>
              <span
                className="ml-auto text-xs"
                style={{
                  color: bio.length > limite ? '#f87171' : 'var(--text-muted)',
                }}
              >
                {bio.length} / {limite} chars
              </span>
            </div>
            <div className="terminal-body text-sm leading-relaxed whitespace-pre-wrap">
              {bio}
            </div>
          </div>

          {bio.length > limite && (
            <p className="mt-2 text-xs text-center" style={{ color: '#f87171' }}>
              Acima do limite recomendado para {PLATAFORMAS.find((p) => p.id === plataforma)?.label}.
              Considere encurtar os diferenciais ou o CTA.
            </p>
          )}

          <button className="btn-primary mt-4 w-full" onClick={copiar}>
            {copiado ? '✅ Copiado!' : '📋 Copiar Bio'}
          </button>

          <p className="mt-4 text-xs text-si-dim text-center">
            Cole a bio no seu perfil e ajuste conforme necessário. Personalize com emojis, links e palavras-chave do seu setor.
          </p>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
