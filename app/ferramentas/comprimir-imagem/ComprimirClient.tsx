'use client';

import { useState, useCallback } from 'react';
import AdSlot from '../../../components/AdSlot';
import ImageDropZone from '../../../components/ImageDropZone';
import {
  formatFileSize,
  calcReduction,
  loadImageBitmap,
  drawToCanvas,
  canvasToBlob,
  downloadBlob,
  getOutputFilename,
} from '../../../lib/image-core';

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png';

const FORMATS: { value: OutputFormat; label: string; recommended: boolean }[] = [
  { value: 'image/webp', label: 'WEBP ★', recommended: true },
  { value: 'image/jpeg', label: 'JPEG', recommended: false },
  { value: 'image/png', label: 'PNG', recommended: false },
];

const tabCls = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
    active
      ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
      : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
  }`;

export default function ComprimirClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [format, setFormat] = useState<OutputFormat>('image/webp');
  const [quality, setQuality] = useState(82);
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState<{
    url: string;
    blob: Blob;
    originalSize: number;
    compressedSize: number;
    filename: string;
  } | null>(null);
  const [erro, setErro] = useState('');

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith('image/')) {
        setErro('Selecione uma imagem válida (JPG, PNG, WEBP, etc.)');
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      if (resultado) URL.revokeObjectURL(resultado.url);
      setResultado(null);
      setErro('');
      setFile(f);
      setPreview(URL.createObjectURL(f));
    },
    [preview, resultado],
  );

  const comprimir = async () => {
    if (!file) return;
    setProcessando(true);
    setErro('');
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await loadImageBitmap(file);
      const bg = format === 'image/jpeg' ? '#ffffff' : undefined;
      const canvas = drawToCanvas(bitmap, bitmap.width, bitmap.height, bg);
      const isPng = format === 'image/png';
      const blob = await canvasToBlob(canvas, format, isPng ? undefined : quality / 100);
      const url = URL.createObjectURL(blob);
      setResultado({
        url,
        blob,
        originalSize: file.size,
        compressedSize: blob.size,
        filename: getOutputFilename(file.name, format),
      });
    } catch (e) {
      setErro('Erro ao processar a imagem. Tente novamente.');
      console.error(e);
    } finally {
      bitmap?.close();
      setProcessando(false);
    }
  };

  const isPng = format === 'image/png';
  const reduction = resultado ? calcReduction(resultado.originalSize, resultado.compressedSize) : 0;

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <ImageDropZone
        onFile={handleFile}
        preview={preview}
        fileName={file?.name ?? ''}
        fileSize={file?.size ?? 0}
        inputId="comprimir-input"
      />

      {file && (
        <div className="surface p-7 sm:p-8 space-y-6 reveal">
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
            {isPng && (
              <p className="text-xs text-si-dim mt-2">
                PNG é lossless — o tamanho pode não reduzir. Para comprimir de verdade, use WEBP ou JPEG.
              </p>
            )}
          </div>

          {/* Qualidade */}
          {!isPng && (
            <div>
              <p className="text-sm font-semibold text-si-muted mb-2">
                Qualidade: <span className="text-si-cyan">{quality}%</span>
              </p>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-xs text-si-dim mt-1">
                <span>Arquivo menor</span>
                <span>Melhor qualidade</span>
              </div>
            </div>
          )}

          {erro && <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>}

          <button className="btn-primary w-full" onClick={comprimir} disabled={processando}>
            {processando ? 'Comprimindo…' : '🗜️ Comprimir Imagem'}
          </button>
        </div>
      )}

      {resultado && (
        <div className="surface p-7 sm:p-8 space-y-5 reveal">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="surface p-4">
              <p className="text-xs text-si-muted uppercase tracking-wide mb-1">Original</p>
              <p className="font-display font-bold text-si-text">{formatFileSize(resultado.originalSize)}</p>
            </div>
            <div className="surface p-4">
              <p className="text-xs text-si-muted uppercase tracking-wide mb-1">Comprimido</p>
              <p className="font-display font-bold text-si-cyan">{formatFileSize(resultado.compressedSize)}</p>
            </div>
            <div className="surface p-4">
              <p className="text-xs text-si-muted uppercase tracking-wide mb-1">Redução</p>
              <p
                className="font-display font-bold text-2xl"
                style={{ color: reduction > 0 ? 'var(--green)' : 'var(--pink)' }}
              >
                {reduction > 0 ? `-${reduction}%` : `+${Math.abs(reduction)}%`}
              </p>
            </div>
          </div>

          {reduction < 0 && (
            <p className="text-xs text-si-dim text-center">
              O arquivo ficou maior — isso ocorre quando PNG ou alta qualidade é aplicado a imagens já comprimidas.
              Tente WEBP com qualidade menor.
            </p>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultado.url} alt="Resultado" className="max-h-48 mx-auto rounded-lg object-contain" />

          <button className="btn-primary w-full" onClick={() => downloadBlob(resultado.blob, resultado.filename)}>
            ⬇ Baixar imagem comprimida
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
