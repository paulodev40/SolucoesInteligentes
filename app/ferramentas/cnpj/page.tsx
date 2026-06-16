import type { Metadata } from 'next';
import CNPJPage from '../../../views/CNPJPage';

export const metadata: Metadata = {
  title: 'Consultar CNPJ Grátis — Dados da Receita Federal',
  description:
    'Consulte dados de qualquer empresa pelo CNPJ: razão social, situação cadastral, endereço e quadro de sócios. Dados diretos da Receita Federal, gratuito.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/cnpj' },
  openGraph: {
    title: 'Consultar CNPJ Grátis | Soluções Inteligentes 83',
    description: 'Consulte situação cadastral, endereço e sócios pelo CNPJ. Dados da Receita Federal.',
    url: 'https://solucoesinteligentes83.com/ferramentas/cnpj',
  },
};

export default function CNPJ() {
  return <CNPJPage />;
}
