import type { Metadata } from 'next';
import BlogPage from '../../views/BlogPage';

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

export default function Blog() {
  return <BlogPage />;
}
