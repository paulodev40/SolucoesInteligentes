import type { Metadata } from 'next';
import { BLOG_POSTS, PUBLISHED_BLOG_POSTS } from '../../../constants';
import BlogPostPage from '../../../views/BlogPostPage';

interface Props {
  params: Promise<{ slug: string }>;
}

// Só os posts publicados são pré-renderizados. Com dynamicParams = false,
// qualquer slug fora dessa lista (ex.: rascunhos) retorna 404 em produção.
// Em desenvolvimento (npm run dev) os rascunhos continuam acessíveis por URL
// para revisão visual antes da aprovação.
export const dynamicParams = false;

export async function generateStaticParams() {
  return PUBLISHED_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post não encontrado' };

  return {
    title: post.title,
    description: post.excerpt,
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

export default function BlogPost() {
  return <BlogPostPage />;
}
