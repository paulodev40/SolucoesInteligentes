'use client';

import { useState, useCallback } from 'react';
import AdSlot from '../../../components/AdSlot';
import ImageDropZone from '../../../components/ImageDropZone';
import {
  formatFileSize,
  loadImageBitmap,
  drawToCanvas,
  canvasToBlob,
  downloadBlob,
  getOutputFilename,
} from '../../../lib/image-core';

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png';

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: 'image/webp', label: 'WEBP' },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
];

const tabCls = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
    active
      ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
      : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
  }`;

export default function RedimensionarClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [lockAR, setLockAR] = useState(true);
  const [format, setFormat] = useState<OutputFormat>('image/webp');
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState<{ url: string; blob: Blob; filename: string } | null>(null);
  const [erro, setErro] = useState('');

  const ar = origW && origH ? origW / origH : 1;

  const handleFile = useCallback(
    async (f: File) => {
      if (!f.type.startsWith('image/')) {
        setErro('Selecione uma imagem válida.');
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      if (resultado) URL.revokeObjectURL(resultado.url);
      setResultado(null);
      setErro('');
      setFile(f);
      setPreview(URL.createObjectURL(f));

      let bitmap: ImageBitmap | null = null;
      try {
        bitmap = await loadImageBitmap(f);
        setOrigW(bitmap.width);
        setOrigH(bitmap.height);
        setW(String(bitmap.width));
        setH(String(bitmap.height));
      } finally {
        bitmap?.close();
      }
    },
    [preview, resultado],
  );

  const handleWChange = (val: string) => {
    setW(val);
    if (lockAR) {
      const num = parseInt(val, 10);
      setH(isFinite(num) && num > 0 ? String(Math.round(num / ar)) : '');
    }
  };

  const handleHChange = (val: string) => {
    setH(val);
    if (lockAR) {
      const num = parseInt(val, 10);
      setW(isFinite(num) && num > 0 ? String(Math.round(num * ar)) : '');
    }
  };

  const redimensionar = async () => {
    if (!file) return;
    const targetW = parseInt(w, 10);
    const targetH = parseInt(h, 10);
    if (!isFinite(targetW) || targetW < 1 || !isFinite(targetH) || targetH < 1) {
      setErro('Informe largura e altura válidas (números inteiros positivos).');
      return;
    }
    if (targetW > 10000 || targetH > 10000) {
      setErro('Dimensões máximas: 10 000 × 10 000 px.');
      return;
    }
    setProcessando(true);
    setErro('');
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await loadImageBitmap(file);
      const bg = format === 'image/jpeg' ? '#ffffff' : undefined;
      const canvas = drawToCanvas(bitmap, targetW, targetH, bg);
      const isPng = format === 'image/png';
      const blob = await canvasToBlob(canvas, format, isPng ? undefined : 0.9);
      if (resultado) URL.revokeObjectURL(resultado.url);
      setResultado({ url: URL.createObjectURL(blob), blob, filename: getOutputFilename(file.name, format) });
    } catch (e) {
      setErro('Erro ao processar a imagem.');
      console.error(e);
    } finally {
      bitmap?.close();
      setProcessando(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <ImageDropZone
        onFile={handleFile}
        preview={preview}
        fileName={file?.name ?? ''}
        fileSize={file?.size ?? 0}
        inputId="redim-input"
      />

      {file && (
        <div className="surface p-7 sm:p-8 space-y-6 reveal">
          {origW > 0 && (
            <p className="text-sm text-si-muted">
              Dimensões originais:{' '}
              <span className="text-si-text font-semibold">
                {origW} × {origH} px
              </span>
            </p>
          )}

          {/* Dimensões */}
          <div className="flex items-end gap-3">
            <label className="flex flex-col gap-1 flex-1">
              <span className="text-sm font-semibold text-si-muted">Largura (px)</span>
              <input
                type="number"
                min={1}
                max={10000}
                className="form-field"
                value={w}
                onChange={(e) => handleWChange(e.target.value)}
              />
            </label>

            <button
              onClick={() => setLockAR((v) => !v)}
              title={lockAR ? 'Proporção travada' : 'Proporção livre'}
              className="mb-1 w-10 h-10 flex items-center justify-center rounded-lg border transition-colors"
              style={{
                border: '1px solid',
                borderColor: lockAR ? 'var(--cyan)' : 'var(--border)',
                color: lockAR ? 'var(--cyan)' : 'var(--text-muted)',
              }}
            >
              {lockAR ? '🔒' : '🔓'}
            </button>

            <label className="flex flex-col gap-1 flex-1">
              <span className="text-sm font-semibold text-si-muted">Altura (px)</span>
              <input
                type="number"
                min={1}
                max={10000}
                className="form-field"
                value={h}
                onChange={(e) => handleHChange(e.target.value)}
              />
            </label>
          </div>

          {/* Formato */}
          <div>
            <p className="text-sm font-semibold text-si-muted mb-3">Formato de saída</p>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button key={f.value} onClick={() => setFormat(f.value)} className={tabCls(format === f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {erro && <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>}

          <button className="btn-primary w-full" onClick={redimensionar} disabled={processando}>
            {processando ? 'Redimensionando…' : '↔ Redimensionar Imagem'}
          </button>
        </div>
      )}

      {resultado && (
        <div className="surface p-7 sm:p-8 space-y-5 reveal">
          <p className="text-sm text-center text-si-muted">
            {w} × {h} px — {formatFileSize(resultado.blob.size)}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultado.url} alt="Resultado" className="max-h-48 mx-auto rounded-lg object-contain" />
          <button className="btn-primary w-full" onClick={() => downloadBlob(resultado.blob, resultado.filename)}>
            ⬇ Baixar imagem redimensionada
          </button>
          <p className="text-xs text-si-dim text-center">
            🔒 Processado 100% no seu navegador — nenhuma imagem é enviada a servidores.
          </p>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
