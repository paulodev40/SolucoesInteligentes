import type { Metadata } from 'next';
import AboutPage from '../../views/AboutPage';

export const metadata: Metadata = {
  title: 'Sobre — Soluções Inteligentes 83',
  description:
    'Conheça a Soluções Inteligentes 83: nossa missão é tornar a inteligência artificial acessível para profissionais e empreendedores brasileiros.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/sobre' },
};

export default function Sobre() {
  return <AboutPage />;
}
