import type { Metadata } from 'next';
import PrivacyPolicyPage from '../../views/PrivacyPolicyPage';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade e proteção de dados da Soluções Inteligentes 83.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/privacidade' },
  robots: { index: false },
};

export default function Privacidade() {
  return <PrivacyPolicyPage />;
}
