import type { Metadata } from 'next';
import DigitalContentPage from '../../views/DigitalContentPage';

export const metadata: Metadata = {
  title: 'Conteúdo Digital — E-books e Templates com IA',
  description:
    'E-books, templates e conteúdos digitais práticos sobre inteligência artificial, produtividade e empreendedorismo.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/conteudo-digital' },
};

export default function ConteudoDigital() {
  return <DigitalContentPage />;
}
