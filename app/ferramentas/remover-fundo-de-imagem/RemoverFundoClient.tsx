'use client';

import { useState, useCallback } from 'react';
import AdSlot from '../../../components/AdSlot';
import ImageDropZone from '../../../components/ImageDropZone';
import { downloadBlob, formatFileSize } from '../../../lib/image-core';

type Status = 'idle' | 'loading-model' | 'processing' | 'done' | 'error';

export default function RemoverFundoClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [resultado, setResultado] = useState<{ url: string; blob: Blob } | null>(null);
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
      setStatus('idle');
      setFile(f);
      setPreview(URL.createObjectURL(f));
    },
    [preview, resultado],
  );

  const remover = async () => {
    if (!file) return;
    setErro('');
    setStatus('loading-model');
    setProgressMsg('Carregando modelo de IA — na primeira vez pode levar 1–2 minutos…');

    try {
      // Dynamic import keeps the ~30 MB WASM bundle out of the initial page load
      const { removeBackground } = await import('@imgly/background-removal');

      setStatus('processing');
      setProgressMsg('Removendo fundo…');

      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.round((current / total) * 100);
            if (key.startsWith('fetch') || key.startsWith('download')) {
              setProgressMsg(`Baixando modelo: ${pct}%`);
            } else {
              setProgressMsg(`Processando: ${pct}%`);
            }
          }
        },
      });

      if (resultado) URL.revokeObjectURL(resultado.url);
      setResultado({ url: URL.createObjectURL(blob), blob });
      setStatus('done');
    } catch (e) {
      setStatus('error');
      setErro(
        'Não foi possível remover o fundo. Certifique-se de usar Chrome ou Edge atualizados. ' +
          'Se o erro persistir, tente uma imagem menor.',
      );
      console.error(e);
    }
  };

  const isWorking = status === 'loading-model' || status === 'processing';
  const outputFilename = file ? file.name.replace(/\.[^.]+$/, '') + '-sem-fundo.png' : 'sem-fundo.png';

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      <ImageDropZone
        onFile={handleFile}
        preview={preview}
        fileName={file?.name ?? ''}
        fileSize={file?.size ?? 0}
        inputId="remover-input"
        hint="JPG, PNG, WEBP — imagens nítidas têm melhor resultado"
      />

      {file && status === 'idle' && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal">
          <div className="rounded-lg border border-si-dim/30 p-4 text-sm text-si-muted space-y-1">
            <p>
              <strong className="text-si-text">Modelo de IA no navegador</strong> — na primeira
              vez, serão baixados ~30 MB de modelos (uma vez só; fica em cache).
            </p>
            <p>A imagem permanece no seu dispositivo e não é enviada a nenhum servidor.</p>
          </div>
          <button className="btn-primary w-full" onClick={remover}>
            ✂️ Remover Fundo
          </button>
        </div>
      )}

      {isWorking && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal text-center">
          <div className="flex justify-center">
            <div
              className="w-10 h-10 rounded-full border-4 border-si-cyan/30 border-t-si-cyan animate-spin"
            />
          </div>
          <p className="text-sm text-si-muted">{progressMsg}</p>
          <p className="text-xs text-si-dim">
            Não feche a aba — o processamento acontece aqui mesmo no navegador.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="surface p-7 sm:p-8 space-y-4 reveal">
          <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>
          <button className="btn-primary w-full" onClick={remover}>
            Tentar novamente
          </button>
        </div>
      )}

      {status === 'done' && resultado && (
        <div className="surface p-7 sm:p-8 space-y-5 reveal">
          <p className="text-sm text-center font-semibold text-si-text">Fundo removido com sucesso!</p>

          {/* Checkerboard background to show transparency */}
          <div
            className="flex justify-center rounded-lg overflow-hidden"
            style={{
              backgroundImage:
                'linear-gradient(45deg,#444 25%,transparent 25%),linear-gradient(-45deg,#444 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#444 75%),linear-gradient(-45deg,transparent 75%,#444 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultado.url}
              alt="Imagem sem fundo"
              className="max-h-64 max-w-full object-contain"
            />
          </div>

          <p className="text-xs text-center text-si-dim">
            {formatFileSize(resultado.blob.size)} · PNG com transparência
          </p>

          <button className="btn-primary w-full" onClick={() => downloadBlob(resultado.blob, outputFilename)}>
            ⬇ Baixar PNG sem fundo
          </button>

          <button
            className="btn-ghost w-full"
            onClick={() => {
              setResultado(null);
              setStatus('idle');
            }}
          >
            Processar outra imagem
          </button>

          <p className="text-xs text-si-dim text-center">
            🔒 Processado 100% no seu navegador — suas imagens não saem do dispositivo.
          </p>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
