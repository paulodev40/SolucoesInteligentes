export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Parse a range string like "1-3, 5, 8-10" into 0-indexed page numbers.
 * Throws a user-readable error on bad input.
 */
export function parsePageRanges(input: string, maxPage: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) throw new Error('Informe pelo menos uma página ou intervalo.');
  for (const part of parts) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) throw new Error(`Formato inválido: "${part}". Use números ou intervalos como "1-3".`);
    const start = parseInt(m[1], 10);
    const end = m[2] ? parseInt(m[2], 10) : start;
    if (start < 1 || end < 1)
      throw new Error(`Número de página deve ser maior que 0: "${part}".`);
    if (start > maxPage || end > maxPage)
      throw new Error(`Página fora do intervalo (o PDF tem ${maxPage} pág.): "${part}".`);
    if (start > end)
      throw new Error(`Intervalo invertido (início > fim): "${part}".`);
    for (let i = start; i <= end; i++) pages.add(i - 1); // convert to 0-indexed
  }
  return [...pages].sort((a, b) => a - b);
}

/** Zero-padded integer string, e.g. pad(3, 10) → "03", pad(3, 100) → "003" */
export function pad(n: number, total: number): string {
  const digits = String(total).length;
  return String(n).padStart(digits, '0');
}
