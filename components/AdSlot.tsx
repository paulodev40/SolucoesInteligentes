'use client';

interface AdSlotProps {
  className?: string;
  label?: string;
}

// Substituir o conteúdo interno por <ins class="adsbygoogle"> após aprovação do AdSense.
// Manter o wrapper externo (define o espaço visual e evita layout shift).
export default function AdSlot({ className = '', label = 'Anúncio' }: AdSlotProps) {
  return (
    <div
      className={`w-full flex items-center justify-center border border-dashed border-si-dim rounded-lg text-si-dim text-xs tracking-wide ${className}`}
      style={{ minHeight: 90 }}
      aria-label={label}
    >
      {label}
    </div>
  );
}
