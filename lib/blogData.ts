import type { BlogPost } from '../types';
import { BLOG_POSTS as STATIC_POSTS } from '../constants';
import { getStoredPosts } from './blogStore';

// Fonte unificada dos posts do blog:
//   1. Posts do Blob (gerados pela automação na Vercel) — mais recentes
//   2. Posts estáticos do projeto (originais + os gerados localmente via CLI)
// Dedup por slug (a primeira ocorrência vence — Blob tem prioridade).

function dedupeBySlug(posts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const out: BlogPost[] = [];
  for (const p of posts) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
  }
  return out;
}

/** Todos os posts (inclui rascunhos). Usado para localizar um post pelo slug. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const stored = await getStoredPosts();
  return dedupeBySlug([...stored, ...STATIC_POSTS]);
}

/** Apenas posts publicados — listagem pública, sitemap e geração estática. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.status !== 'draft');
}

/** Localiza um post pelo slug (entre todos, inclusive rascunhos). */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug);
}
