'use client';

import { useState, useCallback, useId } from 'react';
import AdSlot from '../../../components/AdSlot';
import { formatFileSize, downloadBlob, parsePageRanges, pad } from '../../../lib/pdf-core';

type Mode = 'range' | 'all' | 'chunk';

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: 'range', label: 'Extrair páginas', desc: 'Defina quais páginas manter num único PDF' },
  { id: 'all', label: 'Uma por arquivo', desc: 'Cada página vira um PDF separado (entregue em .zip)' },
  { id: 'chunk', label: 'A cada N páginas', desc: 'Divide em blocos de N páginas (entregue em .zip)' },
];

const tabCls = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
    active
      ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
      : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
  }`;

export default function DividirPdfClient() {
  const uid = useId();
  const inputId = `pdf-input-${uid}`;

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [mode, setMode] = useState<Mode>('range');
  const [rangeInput, setRangeInput] = useState('');
  const [chunkSize, setChunkSize] = useState('5');
  const [processando, setProcessando] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [resultado, setResultado] = useState<{ url: string; blob: Blob; filename: string } | null>(null);
  const [erro, setErro] = useState('');

  const handleFile = useCallback(async (f: File) => {
    if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) {
      setErro('Selecione um arquivo PDF.');
      return;
    }
    if (resultado) URL.revokeObjectURL(resultado.url);
    setResultado(null);
    setErro('');
    setFile(f);
    setPageCount(0);
    setLoadingMeta(true);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch {
      setErro('Não foi possível ler o PDF. Ele pode estar protegido por senha ou corrompido.');
    } finally {
      setLoadingMeta(false);
    }
  }, [resultado]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const dividir = async () => {
    if (!file || pageCount === 0) return;
    setProcessando(true);
    setErro('');
    setProgress(null);
    if (resultado) URL.revokeObjectURL(resultado.url);
    setResultado(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const srcBytes = await file.arrayBuffer();
      let src;
      try {
        src = await PDFDocument.load(srcBytes, { ignoreEncryption: true });
      } catch {
        throw new Error('Este PDF está protegido por senha e não pode ser processado.');
      }

      if (mode === 'range') {
        // Single PDF with selected pages
        let pages: number[];
        try {
          pages = parsePageRanges(rangeInput, pageCount);
        } catch (e) {
          throw e; // user-readable message from parsePageRanges
        }
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, pages);
        copied.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const baseName = file.name.replace(/\.pdf$/i, '');
        setResultado({ url: URL.createObjectURL(blob), blob, filename: `${baseName}-extraido.pdf` });

      } else {
        // Multiple PDFs → zip
        const { zipSync } = await import('fflate');
        const zipEntries: Record<string, Uint8Array> = {};
        const baseName = file.name.replace(/\.pdf$/i, '');

        let chunks: number[][] = [];
        if (mode === 'all') {
          chunks = Array.from({ length: pageCount }, (_, i) => [i]);
        } else {
          // chunk mode
          const n = parseInt(chunkSize, 10);
          if (!isFinite(n) || n < 1) throw new Error('Tamanho do bloco deve ser um número maior que 0.');
          if (n >= pageCount) throw new Error(`O bloco (${n}) é maior ou igual ao total de páginas (${pageCount}). Use "Extrair páginas" ou reduza o tamanho.`);
          for (let i = 0; i < pageCount; i += n) {
            chunks.push(Array.from({ length: Math.min(n, pageCount - i) }, (_, j) => i + j));
          }
        }

        const total = chunks.length;
        for (let ci = 0; ci < total; ci++) {
          setProgress({ current: ci + 1, total });
          const out = await PDFDocument.create();
          const copied = await out.copyPages(src, chunks[ci]);
          copied.forEach((p) => out.addPage(p));
          const pdfBytes = await out.save();
          const label =
            mode === 'all'
              ? `pagina-${pad(ci + 1, total)}.pdf`
              : `${baseName}-parte-${pad(ci + 1, total)}.pdf`;
          zipEntries[label] = pdfBytes;
        }

        const zipped = zipSync(zipEntries);
        const blob = new Blob([zipped], { type: 'application/zip' });
        const zipName =
          mode === 'all'
            ? `${baseName}-paginas.zip`
            : `${baseName}-dividido.zip`;
        setResultado({ url: URL.createObjectURL(blob), blob, filename: zipName });
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao dividir o PDF. Tente novamente.');
      console.error(e);
    } finally {
      setProcessando(false);
      setProgress(null);
    }
  };

  const modeInfo = MODES.find((m) => m.id === mode)!;

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(inputId)?.click()}
        className="surface border-2 border-dashed border-si-dim hover:border-si-cyan transition-colors p-10 text-center cursor-pointer reveal"
      >
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">📄</div>
            <p className="text-sm font-semibold text-si-text">{file.name}</p>
            <p className="text-xs text-si-muted">
              {formatFileSize(file.size)}
              {loadingMeta ? ' · lendo…' : pageCount > 0 ? ` · ${pageCount} páginas` : ''}
            </p>
            <p className="text-xs text-si-cyan mt-1">Clique para trocar o arquivo</p>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-3">📄</div>
            <p className="text-si-text font-semibold">Arraste um PDF aqui</p>
            <p className="text-sm text-si-muted mt-1">ou clique para selecionar</p>
          </>
        )}
        <input
          id={inputId}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
      </div>

      {file && pageCount > 0 && (
        <div className="surface p-7 sm:p-8 space-y-6 reveal">
          {/* Modo */}
          <div>
            <p className="text-sm font-semibold text-si-muted mb-3">Modo de divisão</p>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button key={m.id} onClick={() => setMode(m.id)} className={tabCls(mode === m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-si-dim mt-2">{modeInfo.desc}</p>
          </div>

          {/* Opções por modo */}
          {mode === 'range' && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-si-muted">
                Páginas a extrair{' '}
                <span className="font-normal text-si-dim">(ex.: 1-3, 5, 8-10)</span>
              </span>
              <input
                type="text"
                className="form-field"
                placeholder={`1-${pageCount} para todas`}
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
              />
              <span className="text-xs text-si-dim">
                O PDF tem {pageCount} páginas. Use vírgula para separar e hífen para intervalos.
              </span>
            </label>
          )}

          {mode === 'chunk' && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-si-muted">Páginas por bloco</span>
              <input
                type="number"
                min={1}
                max={pageCount - 1}
                className="form-field"
                value={chunkSize}
                onChange={(e) => setChunkSize(e.target.value)}
              />
              <span className="text-xs text-si-dim">
                Um PDF de {pageCount} páginas dividido em blocos de {chunkSize || '?'} gerará{' '}
                {chunkSize && parseInt(chunkSize) > 0
                  ? Math.ceil(pageCount / parseInt(chunkSize))
                  : '?'}{' '}
                arquivos.
              </span>
            </label>
          )}

          {mode === 'all' && (
            <div className="rounded-lg border border-si-dim/30 p-4 text-sm text-si-muted">
              Cada uma das <strong className="text-si-text">{pageCount} páginas</strong> se tornará
              um PDF individual. Os arquivos serão entregues num único <strong className="text-si-text">.zip</strong>.
            </div>
          )}

          {erro && <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>}

          {processando && progress && (
            <div className="space-y-2">
              <p className="text-xs text-si-muted text-center">
                Gerando arquivo {progress.current} de {progress.total}…
              </p>
              <div className="h-1.5 rounded-full bg-si-dim/30 overflow-hidden">
                <div
                  className="h-full bg-si-cyan transition-all"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          <button className="btn-primary w-full" onClick={dividir} disabled={processando}>
            {processando && !progress ? 'Processando…' : '✂️ Dividir PDF'}
          </button>
        </div>
      )}

      {resultado && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal">
          <p className="text-sm text-center font-semibold text-si-text">
            Pronto! ({formatFileSize(resultado.blob.size)})
          </p>
          <button className="btn-primary w-full" onClick={() => downloadBlob(resultado.blob, resultado.filename)}>
            ⬇ Baixar {resultado.filename.endsWith('.zip') ? 'arquivo .zip' : 'PDF extraído'}
          </button>
          <p className="text-xs text-si-dim text-center">
            🔒 Processado 100% no seu navegador — seu PDF não foi enviado a nenhum servidor.
          </p>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
