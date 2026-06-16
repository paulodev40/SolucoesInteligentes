import type { Metadata } from 'next';
import { BLOG_POSTS } from '../../../constants';
import BlogPostPage from '../../../views/BlogPostPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
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
