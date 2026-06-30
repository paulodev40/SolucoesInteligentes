import type { BlogPost } from '../types';
import { getStoredPosts, saveStoredPosts, saveCover } from './blogStore';
import { getAllPosts } from './blogData';
import { generatePost } from './blogGenerate';

/**
 * Gera um novo rascunho (texto + capa), salva a capa no Blob e adiciona o post
 * (status "draft") ao índice no Blob. Retorna o post criado.
 */
export async function createDraft(topic?: string): Promise<BlogPost> {
  const all = await getAllPosts();
  const existingTitles = all.map((p) => p.title);
  const takenSlugs = new Set(all.map((p) => p.slug));

  const { post, cover } = await generatePost({ topic, existingTitles, takenSlugs });

  if (cover) {
    try {
      post.imageUrl = await saveCover(post.slug, cover);
    } catch {
      // mantém a imagem padrão se o upload da capa falhar
    }
  }

  const stored = await getStoredPosts();
  stored.unshift(post);
  await saveStoredPosts(stored);
  return post;
}

/** Muda o status de um post do Blob. Retorna false se o slug não existir lá. */
export async function setStoredStatus(
  slug: string,
  status: 'draft' | 'published',
): Promise<boolean> {
  const posts = await getStoredPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return false;
  post.status = status;
  await saveStoredPosts(posts);
  return true;
}

/** Remove um post do Blob. Retorna false se o slug não existir lá. */
export async function deleteStored(slug: string): Promise<boolean> {
  const posts = await getStoredPosts();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) return false;
  await saveStoredPosts(next);
  return true;
}
