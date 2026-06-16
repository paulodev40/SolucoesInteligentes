import type { Metadata } from 'next';
import TermsPage from '../../views/TermsPage';

export const metadata: Metadata = {
  title: 'Termos de Serviço',
  description: 'Termos de uso e condições de serviço da Soluções Inteligentes 83.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/termos' },
  robots: { index: false },
};

export default function Termos() {
  return <TermsPage />;
}
