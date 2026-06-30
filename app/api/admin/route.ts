import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getStoredPosts } from '../../../lib/blogStore';
import { createDraft, setStoredStatus, deleteStored } from '../../../lib/blogPipeline';

// Atualiza imediatamente a listagem, a página do post e o sitemap após uma ação,
// para o post publicado aparecer na hora (sem esperar a revalidação de 5 min).
function revalidateBlog(slug?: string) {
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/blog/${slug}`);
}

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

function authorized(req: NextRequest): boolean | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null; // painel não configurado
  return req.headers.get('x-admin-key') === password;
}

export async function GET(req: NextRequest) {
  const ok = authorized(req);
  if (ok === null) {
    return NextResponse.json({ error: 'Painel não configurado (defina ADMIN_PASSWORD).' }, { status: 503 });
  }
  if (!ok) return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });

  const posts = await getStoredPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const ok = authorized(req);
  if (ok === null) {
    return NextResponse.json({ error: 'Painel não configurado (defina ADMIN_PASSWORD).' }, { status: 503 });
  }
  if (!ok) return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const action = body?.action as string | undefined;
  const slug = body?.slug as string | undefined;

  try {
    switch (action) {
      case 'generate': {
        const post = await createDraft(typeof body?.topic === 'string' ? body.topic : undefined);
        return NextResponse.json({ ok: true, post });
      }
      case 'publish': {
        if (!slug) return NextResponse.json({ error: 'slug obrigatório.' }, { status: 400 });
        const found = await setStoredStatus(slug, 'published');
        revalidateBlog(slug);
        return NextResponse.json({ ok: found });
      }
      case 'unpublish': {
        if (!slug) return NextResponse.json({ error: 'slug obrigatório.' }, { status: 400 });
        const found = await setStoredStatus(slug, 'draft');
        revalidateBlog(slug);
        return NextResponse.json({ ok: found });
      }
      case 'delete': {
        if (!slug) return NextResponse.json({ error: 'slug obrigatório.' }, { status: 400 });
        const found = await deleteStored(slug);
        revalidateBlog(slug);
        return NextResponse.json({ ok: found });
      }
      default:
        return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
