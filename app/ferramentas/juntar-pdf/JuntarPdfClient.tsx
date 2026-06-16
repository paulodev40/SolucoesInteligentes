'use client';

import { useState, useCallback, useId } from 'react';
import AdSlot from '../../../components/AdSlot';
import { formatFileSize, downloadBlob } from '../../../lib/pdf-core';

interface PdfEntry {
  id: string;
  file: File;
  pageCount: number | null; // null while loading
  error: boolean;
}

export default function JuntarPdfClient() {
  const uid = useId();
  const inputId = `pdf-input-${uid}`;

  const [entries, setEntries] = useState<PdfEntry[]>([]);
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState<{ url: string; blob: Blob } | null>(null);
  const [erro, setErro] = useState('');
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const list = Array.from(newFiles).filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    if (list.length === 0) {
      setErro('Selecione apenas arquivos PDF.');
      return;
    }
    setErro('');
    setResultado(null);

    const pending: PdfEntry[] = list.map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      pageCount: null,
      error: false,
    }));

    setEntries((prev) => [...prev, ...pending]);

    // Load page counts asynchronously
    const { PDFDocument } = await import('pdf-lib');
    for (const entry of pending) {
      try {
        const bytes = await entry.file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? { ...e, pageCount: doc.getPageCount() } : e)),
        );
      } catch {
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? { ...e, pageCount: null, error: true } : e)),
        );
      }
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setResultado(null);
  };

  const moveEntry = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= entries.length) return;
    setEntries((prev) => {
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    setResultado(null);
  };

  // Drag-to-reorder handlers
  const onDragStart = (idx: number) => setDragIdx(idx);
  const onDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };
  const onDrop2 = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragIdx === null || dragIdx === idx) return;
    setEntries((prev) => {
      const next = [...prev];
      const [item] = next.splice(dragIdx, 1);
      next.splice(idx, 0, item);
      return next;
    });
    setDragIdx(null);
    setDragOverIdx(null);
    setResultado(null);
  };
  const onDragEnd = () => {
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const juntar = async () => {
    if (entries.length < 2) {
      setErro('Adicione pelo menos 2 PDFs para juntar.');
      return;
    }
    setProcessando(true);
    setErro('');
    if (resultado) URL.revokeObjectURL(resultado.url);
    setResultado(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();

      for (const entry of entries) {
        const bytes = await entry.file.arrayBuffer();
        let src;
        try {
          src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        } catch {
          throw new Error(
            `"${entry.file.name}" está protegido por senha e não pode ser processado.`,
          );
        }
        const pageIndices = src.getPageIndices();
        const copied = await merged.copyPages(src, pageIndices);
        copied.forEach((p) => merged.addPage(p));
      }

      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setResultado({ url: URL.createObjectURL(blob), blob });
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao juntar os PDFs. Tente novamente.');
      console.error(e);
    } finally {
      setProcessando(false);
    }
  };

  const totalPages = entries.reduce((sum, e) => sum + (e.pageCount ?? 0), 0);

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
        <div className="text-4xl mb-3">📄</div>
        <p className="text-si-text font-semibold">Arraste PDFs aqui</p>
        <p className="text-sm text-si-muted mt-1">ou clique para selecionar — vários arquivos de uma vez</p>
        <input
          id={inputId}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* File list */}
      {entries.length > 0 && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-si-muted">
              {entries.length} arquivo{entries.length !== 1 ? 's' : ''}
              {totalPages > 0 && ` · ${totalPages} páginas no total`}
            </p>
            <button
              className="text-xs text-si-dim hover:text-red-400 transition-colors"
              onClick={() => { setEntries([]); setResultado(null); }}
            >
              Remover todos
            </button>
          </div>

          <p className="text-xs text-si-dim">
            Arraste os itens para reordenar — a ordem da lista = ordem no PDF final.
          </p>

          <ul className="space-y-2">
            {entries.map((entry, idx) => (
              <li
                key={entry.id}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDrop={(e) => onDrop2(e, idx)}
                onDragEnd={onDragEnd}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors select-none ${
                  dragOverIdx === idx && dragIdx !== idx
                    ? 'border-si-cyan bg-si-cyan/5'
                    : entry.error
                      ? 'border-red-500/40 bg-red-500/5'
                      : 'border-si-dim'
                }`}
              >
                <span className="cursor-grab text-si-dim text-lg leading-none">⠿</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-si-text truncate">{entry.file.name}</p>
                  <p className="text-xs text-si-dim">
                    {formatFileSize(entry.file.size)}
                    {entry.error
                      ? ' · ⚠ protegido ou inválido'
                      : entry.pageCount !== null
                        ? ` · ${entry.pageCount} pág.`
                        : ' · carregando…'}
                  </p>
                </div>
                {/* Up/Down for mobile */}
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => moveEntry(idx, -1)}
                    disabled={idx === 0}
                    className="w-6 h-6 text-xs text-si-muted hover:text-si-text disabled:opacity-30 transition-opacity"
                    title="Mover para cima"
                  >↑</button>
                  <button
                    onClick={() => moveEntry(idx, 1)}
                    disabled={idx === entries.length - 1}
                    className="w-6 h-6 text-xs text-si-muted hover:text-si-text disabled:opacity-30 transition-opacity"
                    title="Mover para baixo"
                  >↓</button>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-si-dim hover:text-red-400 transition-colors text-sm shrink-0"
                  title="Remover"
                >✕</button>
              </li>
            ))}
          </ul>

          <button
            className="btn-ghost w-full text-sm"
            onClick={() => document.getElementById(inputId)?.click()}
          >
            + Adicionar mais PDFs
          </button>

          {erro && <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>}

          <button
            className="btn-primary w-full"
            onClick={juntar}
            disabled={processando || entries.length < 2}
            style={{ opacity: entries.length < 2 ? 0.5 : 1 }}
          >
            {processando ? 'Juntando…' : `📎 Juntar ${entries.length} PDFs e Baixar`}
          </button>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal">
          <p className="text-sm text-center font-semibold text-si-text">
            PDF unificado pronto! ({formatFileSize(resultado.blob.size)})
          </p>
          <button
            className="btn-primary w-full"
            onClick={() => downloadBlob(resultado.blob, 'documentos-unidos.pdf')}
          >
            ⬇ Baixar PDF unificado
          </button>
          <p className="text-xs text-si-dim text-center">
            🔒 Processado 100% no seu navegador — seus PDFs não foram enviados a nenhum servidor.
          </p>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
