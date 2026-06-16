import type { Metadata } from 'next';
import FeriasPage from '../../../views/FeriasPage';

export const metadata: Metadata = {
  title: 'Calculadora de Férias e 13º Salário 2026 — Gratuita',
  description:
    'Calcule férias com terço constitucional e 13º salário proporcional com desconto de INSS e IRRF. Calculadora trabalhista gratuita e atualizada para 2026.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/ferias-13' },
  openGraph: {
    title: 'Calculadora de Férias e 13º Salário | Soluções Inteligentes 83',
    description: 'Calcule férias e 13º salário com descontos de INSS e IRRF. Gratuita e atualizada.',
    url: 'https://solucoesinteligentes83.com/ferramentas/ferias-13',
  },
};

export default function Ferias() {
  return <FeriasPage />;
}
