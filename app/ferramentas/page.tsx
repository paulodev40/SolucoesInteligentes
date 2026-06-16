import type { Metadata } from 'next';
import ToolsPage from '../../views/ToolsPage';

export const metadata: Metadata = {
  title: 'Ferramentas Gratuitas — Calculadoras e IA',
  description:
    'Calculadora de férias e 13º salário, verificador de CNPJ, gerador de prompts para IA e muito mais — ferramentas gratuitas para o seu dia a dia profissional.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas' },
  openGraph: {
    title: 'Ferramentas Gratuitas | Soluções Inteligentes 83',
    description: 'Calculadoras, verificadores e ferramentas de IA gratuitas.',
    url: 'https://solucoesinteligentes83.com/ferramentas',
  },
};

export default function Ferramentas() {
  return <ToolsPage />;
}
