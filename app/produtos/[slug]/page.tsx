import type { Metadata } from 'next';
import { PRODUCTS } from '../../../constants';
import ProductDetailPage from '../../../views/ProductDetailPage';

interface Props {
  params: Promise<{ slug: string }>;
}

// Apenas produtos existentes são pré-renderizados. Qualquer outro slug (ex.: produtos
// descontinuados como rememberme/scei) retorna 404 de verdade, em vez de um soft-404
// com status 200 — melhor para SEO e para a revisão do AdSense.
export const dynamicParams = false;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Produto não encontrado' };

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    alternates: { canonical: `https://solucoesinteligentes83.com/produtos/${slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `https://solucoesinteligentes83.com/produtos/${slug}`,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default function ProdutoDetalhe() {
  return <ProductDetailPage />;
}
