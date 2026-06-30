import { put, list } from '@vercel/blob';
import type { BlogPost } from '../types';

// Armazenamento dos posts gerados pela automação, usando Vercel Blob (store PRIVADO).
// - Índice (lista de posts): "blog/index.json"
// - Capas: "blog/covers/<slug>.png"
//
// Como o store é privado, a leitura é feita no servidor com o BLOB_READ_WRITE_TOKEN.
// As capas são expostas ao público pela rota /api/blog/cover/<slug>.
//
// Sem BLOB_READ_WRITE_TOKEN (ex.: dev local), tudo degrada graciosamente.

const INDEX_PATH = 'blog/index.json';
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export function blobEnabled(): boolean {
  return Boolean(TOKEN);
}

async function findBlobUrl(pathname: string): Promise<string | null> {
  const { blobs } = await list({ prefix: pathname, token: TOKEN });
  const found = blobs.find((b) => b.pathname === pathname);
  return found?.url ?? null;
}

// Busca o conteúdo de um blob privado (autenticado com o token).
async function fetchBlob(url: string): Promise<Response> {
  return fetch(`${url}?t=${Date.now()}`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

/** Lê os posts gerados do Blob. Retorna [] se o Blob não estiver configurado. */
export async function getStoredPosts(): Promise<BlogPost[]> {
  if (!TOKEN) return [];
  try {
    const url = await findBlobUrl(INDEX_PATH);
    if (!url) return [];
    const res = await fetchBlob(url);
    if (!res.ok) return [];
    const data = (await res.json()) as BlogPost[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Salva a lista completa de posts gerados no Blob. */
export async function saveStoredPosts(posts: BlogPost[]): Promise<void> {
  if (!TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN ausente — configure o Vercel Blob.');
  await put(INDEX_PATH, JSON.stringify(posts, null, 2), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
    token: TOKEN,
  });
}

/**
 * Faz upload da capa (PNG) no Blob privado e retorna o caminho público pelo qual
 * ela será servida (rota /api/blog/cover/<slug>).
 */
export async function saveCover(slug: string, png: Buffer | Uint8Array): Promise<string> {
  if (!TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN ausente — configure o Vercel Blob.');
  const body = new Blob([new Uint8Array(png)], { type: 'image/png' });
  await put(`blog/covers/${slug}.png`, body, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/png',
    token: TOKEN,
  });
  return `/api/blog/cover/${slug}`;
}

/** Lê os bytes de uma capa do Blob privado (usado pela rota pública de imagem). */
export async function getCoverBytes(slug: string): Promise<ArrayBuffer | null> {
  if (!TOKEN) return null;
  try {
    const url = await findBlobUrl(`blog/covers/${slug}.png`);
    if (!url) return null;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}
