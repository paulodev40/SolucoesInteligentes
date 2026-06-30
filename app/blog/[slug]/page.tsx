import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUBLISHED_BLOG_POSTS } from '../../../constants';
import { getPostBySlug, getPublishedPosts } from '../../../lib/blogData';
import BlogPostPage from '../../../views/BlogPostPage';

interface Props {
  params: Promise<{ slug: string }>;
}

// Revalida a cada 5 min. Posts publicados pelo painel/cron (Blob) que ainda não
// foram pré-renderizados são gerados sob demanda (dynamicParams padrão = true).
export const revalidate = 300;

// Pré-renderiza no build os posts estáticos publicados (originais + CLI). Os posts
// do Blob são renderizados sob demanda na primeira visita e cacheados pelo ISR.
export async function generateStaticParams() {
  return PUBLISHED_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status === 'draft') return { title: 'Post não encontrado' };

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `https://solucoesinteligentes83.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://solucoesinteligentes83.com/blog/${slug}`,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Rascunhos nunca aparecem publicamente.
  if (!post || post.status === 'draft') notFound();

  // Navegação e relacionados usam apenas posts publicados.
  const published = await getPublishedPosts();
  const index = published.findIndex((p) => p.slug === slug);
  const prevPost = index > 0 ? published[index - 1] : null;
  const nextPost = index >= 0 && index < published.length - 1 ? published[index + 1] : null;

  const relatedPosts = [
    ...published.filter((p) => p.slug !== slug && p.category === post.category),
    ...published.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <BlogPostPage post={post} prevPost={prevPost} nextPost={nextPost} relatedPosts={relatedPosts} />
  );
}
