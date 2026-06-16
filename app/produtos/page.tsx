import type { Metadata } from 'next';
import ProductsPage from '../../views/ProductsPage';

export const metadata: Metadata = {
  title: 'Produtos — Apps e Ferramentas de IA',
  description:
    'Conheça os produtos da Soluções Inteligentes 83: apps mobile, ferramentas de automação e soluções com inteligência artificial.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/produtos' },
};

export default function Produtos() {
  return <ProductsPage />;
}
