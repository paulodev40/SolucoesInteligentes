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

const FORMATS: { value: OutputFormat; label: string; desc: string }[] = [
  { value: 'image/webp', label: 'WEBP', desc: 'Melhor compressão, ideal para web' },
  { value: 'image/jpeg', label: 'JPEG', desc: 'Compatível com tudo, ótimo para fotos' },
  { value: 'image/png', label: 'PNG', desc: 'Lossless, suporta transparência' },
];

const tabCls = (active: boolean) =>
  `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
    active
      ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
      : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
  }`;

export default function ConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [format, setFormat] = useState<OutputFormat>('image/webp');
  const [quality, setQuality] = useState(90);
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState<{
    url: string;
    blob: Blob;
    filename: string;
    originalSize: number;
  } | null>(null);
  const [erro, setErro] = useState('');

  const handleFile = useCallback(
    (f: File) => {
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
    },
    [preview, resultado],
  );

  const converter = async () => {
    if (!file) return;
    setProcessando(true);
    setErro('');
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await loadImageBitmap(file);
      // JPEG não suporta transparência — preenche com branco
      const bg = format === 'image/jpeg' ? '#ffffff' : undefined;
      const canvas = drawToCanvas(bitmap, bitmap.width, bitmap.height, bg);
      const isPng = format === 'image/png';
      const blob = await canvasToBlob(canvas, format, isPng ? undefined : quality / 100);
      if (resultado) URL.revokeObjectURL(resultado.url);
      setResultado({
        url: URL.createObjectURL(blob),
        blob,
        filename: getOutputFilename(file.name, format),
        originalSize: file.size,
      });
    } catch (e) {
      setErro('Erro ao converter. Tente novamente.');
      console.error(e);
    } finally {
      bitmap?.close();
      setProcessando(false);
    }
  };

  const isPng = format === 'image/png';
  const selectedFormatInfo = FORMATS.find((f) => f.value === format);

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <ImageDropZone
        onFile={handleFile}
        preview={preview}
        fileName={file?.name ?? ''}
        fileSize={file?.size ?? 0}
        inputId="converter-input"
      />

      {file && (
        <div className="surface p-7 sm:p-8 space-y-6 reveal">
          {/* Formato */}
          <div>
            <p className="text-sm font-semibold text-si-muted mb-3">Converter para</p>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button key={f.value} onClick={() => setFormat(f.value)} className={tabCls(format === f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
            {selectedFormatInfo && (
              <p className="text-xs text-si-dim mt-2">{selectedFormatInfo.desc}</p>
            )}
            {format === 'image/jpeg' && (
              <p className="text-xs text-si-dim mt-1">
                Áreas transparentes serão preenchidas com fundo branco.
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

          <button className="btn-primary w-full" onClick={converter} disabled={processando}>
            {processando ? 'Convertendo…' : '🔄 Converter Imagem'}
          </button>
        </div>
      )}

      {resultado && (
        <div className="surface p-7 sm:p-8 space-y-5 reveal">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="surface p-4">
              <p className="text-xs text-si-muted uppercase tracking-wide mb-1">Original</p>
              <p className="font-display font-bold text-si-text">{formatFileSize(resultado.originalSize)}</p>
            </div>
            <div className="surface p-4">
              <p className="text-xs text-si-muted uppercase tracking-wide mb-1">Convertido</p>
              <p className="font-display font-bold text-si-cyan">{formatFileSize(resultado.blob.size)}</p>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultado.url} alt="Resultado" className="max-h-48 mx-auto rounded-lg object-contain" />

          <button className="btn-primary w-full" onClick={() => downloadBlob(resultado.blob, resultado.filename)}>
            ⬇ Baixar como {format === 'image/jpeg' ? 'JPEG' : format === 'image/png' ? 'PNG' : 'WEBP'}
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
