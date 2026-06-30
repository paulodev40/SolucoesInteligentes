import type { Metadata } from 'next';
import BlogPage from '../../views/BlogPage';
import { getPublishedPosts } from '../../lib/blogData';

// Revalida a cada 5 min para refletir posts publicados pelo painel/cron (Blob).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog — IA, Tecnologia e Produtividade',
  description:
    'Artigos práticos sobre inteligência artificial, marketing digital, produtividade e tendências tecnológicas para profissionais e empreendedores.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/blog' },
  openGraph: {
    title: 'Blog | Soluções Inteligentes 83',
    description: 'Artigos sobre IA, tecnologia e produtividade.',
    url: 'https://solucoesinteligentes83.com/blog',
  },
};

export default async function Blog() {
  const posts = await getPublishedPosts();
  return <BlogPage posts={posts} />;
}
