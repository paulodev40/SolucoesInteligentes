import { NextRequest, NextResponse } from 'next/server';
import { createDraft } from '../../../../lib/blogPipeline';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Cron semanal da Vercel (ver vercel.json). Gera UM rascunho e o guarda no Blob
// como "draft" (invisível no site). A Vercel envia o header Authorization com o
// CRON_SECRET quando ele está definido nas variáveis de ambiente.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }
  }

  try {
    const post = await createDraft();
    return NextResponse.json({
      ok: true,
      slug: post.slug,
      title: post.title,
      status: post.status,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido.';
    console.error('[cron/generate-draft]', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
