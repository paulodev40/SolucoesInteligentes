'use client';

import { formatFileSize } from '../lib/image-core';

interface Props {
  onFile: (file: File) => void;
  preview: string;
  fileName: string;
  fileSize: number;
  inputId: string;
  accept?: string;
  hint?: string;
}

export default function ImageDropZone({
  onFile,
  preview,
  fileName,
  fileSize,
  inputId,
  accept = 'image/*',
  hint = 'JPG, PNG, WEBP',
}: Props) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById(inputId)?.click()}
      className="surface border-2 border-dashed border-si-dim hover:border-si-cyan transition-colors p-10 text-center cursor-pointer reveal"
    >
      {preview ? (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 max-w-full rounded-lg object-contain"
          />
          <p className="text-sm text-si-muted">
            {fileName} — {formatFileSize(fileSize)}
          </p>
          <p className="text-xs text-si-cyan">Clique para trocar a imagem</p>
        </div>
      ) : (
        <>
          <div className="text-4xl mb-3">🖼️</div>
          <p className="text-si-text font-semibold">Arraste uma imagem aqui</p>
          <p className="text-sm text-si-muted mt-1">ou clique para selecionar — {hint}</p>
        </>
      )}
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}
