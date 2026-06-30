import React from 'react';

interface ComoUsarProps {
  /** 2 a 3 passos curtos de como usar a ferramenta. */
  steps: string[];
  /** Descrição clara do resultado/saída que o usuário recebe. */
  output: string;
  /** Exemplo opcional (texto ou JSX) para ilustrar o uso. */
  example?: React.ReactNode;
  className?: string;
}

/**
 * Bloco "Como usar" exibido no topo das ferramentas: passos numerados,
 * destaque do resultado e um exemplo opcional. Mantém o conteúdo
 * explicativo mais longo que já existe abaixo de cada ferramenta.
 */
const ComoUsar: React.FC<ComoUsarProps> = ({ steps, output, example, className }) => (
  <div className={`surface p-6 sm:p-7 reveal ${className ?? ''}`}>
    <div className="flex items-center gap-3 mb-4">
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
        style={{ background: 'var(--cyan-dim)', border: '1px solid var(--border-strong)' }}
      >
        <i className="fas fa-circle-info text-si-cyan" />
      </span>
      <h2 className="font-display font-bold text-lg text-si-text">Como usar</h2>
    </div>

    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-si-cyan"
            style={{ background: 'var(--cyan-dim)', border: '1px solid var(--border-strong)' }}
          >
            {i + 1}
          </span>
          <span className="text-si-muted leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>

    <div className="mt-5 pt-4 flex items-start gap-3" style={{ borderTop: '1px solid var(--border)' }}>
      <i className="fas fa-arrow-right-to-bracket text-si-cyan mt-1 flex-shrink-0" />
      <p className="text-si-muted">
        <strong className="text-si-text">Resultado:</strong> {output}
      </p>
    </div>

    {example && (
      <div className="mt-3 flex items-start gap-3">
        <i className="fas fa-lightbulb text-si-cyan mt-1 flex-shrink-0" />
        <div className="text-si-muted">
          <strong className="text-si-text">Exemplo:</strong> {example}
        </div>
      </div>
    )}
  </div>
);

export default ComoUsar;
