export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function calcReduction(original: number, compressed: number): number {
  return Math.round(((original - compressed) / original) * 100);
}

// Respects EXIF orientation
export function loadImageBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions);
}

export function drawToCanvas(
  bitmap: ImageBitmap,
  targetWidth: number,
  targetHeight: number,
  fillBackground?: string,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;
  if (fillBackground) {
    ctx.fillStyle = fillBackground;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      type,
      quality,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function getOutputFilename(original: string, mimeType: string): string {
  const ext = mimeType === 'image/jpeg' ? 'jpg' : mimeType === 'image/png' ? 'png' : 'webp';
  const base = original.replace(/\.[^.]+$/, '');
  return `${base}.${ext}`;
}
