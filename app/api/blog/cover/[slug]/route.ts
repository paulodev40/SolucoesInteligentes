import { NextResponse } from 'next/server';
import { getCoverBytes } from '../../../../../lib/blogStore';

export const runtime = 'nodejs';

// Serve publicamente a capa de um post guardada no Vercel Blob privado.
// O token fica só no servidor; o visitante recebe apenas a imagem.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const bytes = await getCoverBytes(slug);
  if (!bytes) {
    return NextResponse.json({ error: 'Capa não encontrada.' }, { status: 404 });
  }
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      // Cache na borda/navegador — a imagem de um slug não muda.
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
    },
  });
}
