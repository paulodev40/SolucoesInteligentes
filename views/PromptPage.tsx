'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const TIPOS = [
  { id: 'email',         label: '📧 E-mail profissional',       placeholder: 'Ex: solicitar reunião, apresentar proposta, responder reclamação' },
  { id: 'social',        label: '📱 Post para redes sociais',    placeholder: 'Ex: lançamento de produto, dica, engajamento no Instagram/LinkedIn' },
  { id: 'blog',          label: '📝 Artigo para blog',           placeholder: 'Ex: tendências de IA, dicas de finanças, tutorial passo a passo' },
  { id: 'marketing',     label: '🎯 Copy / Marketing',           placeholder: 'Ex: anúncio de produto, landing page, mensagem de WhatsApp' },
  { id: 'apresentacao',  label: '🎤 Apresentação / Pitch',       placeholder: 'Ex: pitch de startup, proposta comercial, aula ou palestra' },
  { id: 'relatorio',     label: '📊 Relatório executivo',        placeholder: 'Ex: resultados mensais, análise de KPIs, desempenho da equipe' },
  { id: 'resumo',        label: '📄 Resumo de documento',        placeholder: 'Ex: artigo acadêmico, contrato, ata de reunião' },
  { id: 'codigo',        label: '💻 Código / Programação',       placeholder: 'Ex: função em Python, componente React, query SQL, debug' },
  { id: 'analise',       label: '🔍 Análise e pesquisa',         placeholder: 'Ex: comparar opções, pesquisa de mercado, revisão crítica' },
  { id: 'traducao',      label: '🌐 Tradução / Adaptação',       placeholder: 'Ex: traduzir para inglês, adaptar tom para outro país ou público' },
];

const TONS = [
  'Profissional e formal',
  'Informal e descontraído',
  'Técnico e especializado',
  'Persuasivo e direto',
  'Didático e educativo',
  'Jornalístico e objetivo',
];

const INSTRUCOES: Record<string, string> = {
  email:        'Escreva um e-mail profissional com assunto, saudação, corpo claro e fechamento adequado. Seja objetivo e respeite o tom indicado.',
  social:       'Crie o texto do post com uma abertura que prenda atenção, conteúdo de valor e CTA (chamada para ação). Sugira de 3 a 5 hashtags relevantes.',
  blog:         'Escreva um artigo completo com título atrativo, introdução que desperte curiosidade, desenvolvimento com subtítulos e conclusão com CTA.',
  marketing:    'Crie um copy persuasivo com headline impactante, problema → solução, benefícios claros, prova social (se houver) e CTA direto.',
  apresentacao: 'Crie uma estrutura de apresentação com abertura impactante, desenvolvimento lógico dos pontos principais e fechamento memorável com CTA.',
  relatorio:    'Estruture o relatório com sumário executivo, análise dos dados fornecidos, conclusões objetivas e recomendações de ação.',
  resumo:       'Faça um resumo estruturado com os pontos principais, conclusões e informações mais relevantes. Seja fiel ao conteúdo original.',
  codigo:       'Escreva o código de forma limpa, com comentários nas partes mais complexas e seguindo boas práticas da linguagem indicada.',
  analise:      'Realize uma análise completa e imparcial, apresentando diferentes perspectivas, pontos positivos e negativos, e uma conclusão embasada.',
  traducao:     'Realize a tradução/adaptação mantendo o sentido original, adaptando expressões idiomáticas e respeitando o tom solicitado.',
};

function gerarPrompt(fields: Record<string, string>): string {
  const { tipo, contexto, publico, tom, objetivo, detalhes, restricoes } = fields;
  const tipoLabel = TIPOS.find(t => t.id === tipo)?.label.replace(/^[^\s]+\s/, '') ?? tipo;

  const linhas: string[] = [];
  linhas.push(`Você é um especialista em ${tipoLabel}.`);
  linhas.push('');

  if (contexto)   linhas.push(`**Contexto / O que criar:** ${contexto}`);
  if (publico)    linhas.push(`**Público-alvo:** ${publico}`);
  linhas.push(`**Tom da comunicação:** ${tom || 'Profissional e formal'}`);
  if (objetivo)   linhas.push(`**Objetivo principal:** ${objetivo}`);
  if (detalhes)   linhas.push(`**Informações e detalhes importantes:** ${detalhes}`);
  if (restricoes) linhas.push(`**Restrições / O que evitar:** ${restricoes}`);
  linhas.push('');
  linhas.push(INSTRUCOES[tipo] ?? 'Desenvolva o conteúdo solicitado de forma clara e objetiva.');

  return linhas.join('\n');
}

const PromptPage: React.FC = () => {
  const [fields, setFields] = useState<Record<string, string>>({
    tipo: 'email',
    tom: 'Profissional e formal',
  });
  const [prompt, setPrompt] = useState('');
  const [copiado, setCopiado] = useState(false);

  const set = (key: string, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const gerar = () => {
    setPrompt(gerarPrompt(fields));
    setCopiado(false);
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const tipoAtual = TIPOS.find((t) => t.id === fields.tipo);

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">← Voltar às ferramentas</Link>

        <div className="reveal">
          <div className="section-label">Inteligência Artificial</div>
          <h1 className="section-title">Gerador de Prompts para IA</h1>
          <p className="section-desc">
            Crie prompts eficientes para ChatGPT, Claude e Gemini em segundos.
            Preencha os campos abaixo e gere um prompt estruturado pronto para usar.
          </p>
        </div>

        <div className="surface p-7 sm:p-8 space-y-7 reveal">

          {/* Tipo de tarefa */}
          <div>
            <label className="field-label">Tipo de tarefa</label>
            <div className="grid grid-cols-2 gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => set('tipo', t.id)}
                  className="text-left px-3 py-2.5 rounded-lg border text-sm transition-all"
                  style={{
                    background:     fields.tipo === t.id ? 'var(--cyan-dim)'      : 'var(--surface)',
                    borderColor:    fields.tipo === t.id ? 'var(--cyan)'          : 'var(--border)',
                    color:          fields.tipo === t.id ? 'var(--cyan)'          : 'var(--text-muted)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contexto */}
          <div>
            <label className="field-label">Contexto — o que você quer criar?</label>
            <textarea
              className="field"
              rows={2}
              placeholder={tipoAtual?.placeholder}
              value={fields.contexto ?? ''}
              onChange={(e) => set('contexto', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Público */}
            <div>
              <label className="field-label">Público-alvo</label>
              <input
                type="text"
                className="field"
                placeholder="Ex: empreendedores brasileiros, jovens de 20–35 anos"
                value={fields.publico ?? ''}
                onChange={(e) => set('publico', e.target.value)}
              />
            </div>
            {/* Tom */}
            <div>
              <label className="field-label">Tom da comunicação</label>
              <select
                className="field"
                style={{ appearance: 'auto' }}
                value={fields.tom ?? 'Profissional e formal'}
                onChange={(e) => set('tom', e.target.value)}
              >
                {TONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <label className="field-label">Objetivo principal</label>
            <input
              type="text"
              className="field"
              placeholder="Ex: convencer o cliente a agendar uma reunião, aumentar engajamento, explicar um conceito"
              value={fields.objetivo ?? ''}
              onChange={(e) => set('objetivo', e.target.value)}
            />
          </div>

          {/* Detalhes */}
          <div>
            <label className="field-label">Informações e detalhes importantes (opcional)</label>
            <textarea
              className="field"
              rows={3}
              placeholder="Ex: nome do produto, dados, argumentos-chave, exemplos reais, links"
              value={fields.detalhes ?? ''}
              onChange={(e) => set('detalhes', e.target.value)}
            />
          </div>

          {/* Restrições */}
          <div>
            <label className="field-label">Restrições / O que evitar (opcional)</label>
            <input
              type="text"
              className="field"
              placeholder="Ex: não mencionar concorrentes, evitar gírias, máximo 200 palavras"
              value={fields.restricoes ?? ''}
              onChange={(e) => set('restricoes', e.target.value)}
            />
          </div>

          <button className="btn-primary w-full" onClick={gerar}>
            ✨ Gerar Prompt
          </button>
        </div>

        {prompt && (
          <div className="mt-8 reveal">
            <div className="terminal-box">
              <div className="terminal-bar">
                <span className="t-dot" style={{ background: '#ff5f57' }} />
                <span className="t-dot" style={{ background: '#febc2e' }} />
                <span className="t-dot" style={{ background: '#28c840' }} />
                <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  prompt-gerado.txt
                </span>
              </div>
              <div className="terminal-body text-sm leading-relaxed whitespace-pre-wrap">
                {prompt}
              </div>
            </div>

            <button className="btn-primary mt-4 w-full" onClick={copiar}>
              {copiado ? '✅ Copiado!' : '📋 Copiar Prompt'}
            </button>

            <p className="mt-4 text-xs text-si-dim text-center leading-relaxed">
              Cole este prompt no ChatGPT, Claude ou Gemini e personalize conforme necessário.
              Quanto mais detalhes você adicionar, melhor será a resposta da IA.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromptPage;
