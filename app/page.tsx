import type { Metadata } from 'next';
import HomePage from '../views/HomePage';

export const metadata: Metadata = {
  title: 'Soluções Inteligentes 83 — Ferramentas de IA para o seu dia a dia',
  description:
    'Ferramentas gratuitas, calculadoras, verificadores e recursos de inteligência artificial para profissionais, empreendedores e entusiastas de tecnologia.',
  alternates: { canonical: 'https://solucoesinteligentes83.com' },
  openGraph: {
    title: 'Soluções Inteligentes 83',
    description: 'Ferramentas de IA e calculadoras gratuitas para profissionais.',
    url: 'https://solucoesinteligentes83.com',
  },
};

export default function Home() {
  return <HomePage />;
}
