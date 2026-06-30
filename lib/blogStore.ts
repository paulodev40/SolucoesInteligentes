import { put, list } from '@vercel/blob';
import type { BlogPost } from '../types';

// Camada de armazenamento dos posts gerados pela automação, usando Vercel Blob.
// - O índice (lista de posts) fica em "blog/index.json".
// - As capas ficam em "blog/covers/<slug>.png" (URL pública de CDN).
//
// Se BLOB_READ_WRITE_TOKEN não estiver definido (ex.: dev local sem Blog
// configurado), tudo degrada graciosamente: leitura retorna [] e escrita lança
// um erro claro. Assim o site continua funcionando com os posts atuais.

const INDEX_PATH = 'blog/index.json';
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export function blobEnabled(): boolean {
  return Boolean(TOKEN);
}

async function getIndexUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: INDEX_PATH, token: TOKEN });
  const found = blobs.find((b) => b.pathname === INDEX_PATH);
  return found?.url ?? null;
}

/** Lê os posts gerados do Blob. Retorna [] se o Blob não estiver configurado. */
export async function getStoredPosts(): Promise<BlogPost[]> {
  if (!TOKEN) return [];
  try {
    const url = await getIndexUrl();
    if (!url) return [];
    // cache-busting: o índice muda quando publicamos/geramos.
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
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
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
    token: TOKEN,
  });
}

/** Faz upload da capa (PNG) e retorna a URL pública. */
export async function saveCover(slug: string, png: Buffer | Uint8Array): Promise<string> {
  if (!TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN ausente — configure o Vercel Blob.');
  const body = new Blob([new Uint8Array(png)], { type: 'image/png' });
  const { url } = await put(`blog/covers/${slug}.png`, body, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/png',
    token: TOKEN,
  });
  return url;
}
