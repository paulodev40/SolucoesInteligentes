import type { Metadata } from 'next';
import OnlineCoursesPage from '../../views/OnlineCoursesPage';

export const metadata: Metadata = {
  title: 'Cursos Online de IA e Tecnologia',
  description:
    'Cursos práticos sobre inteligência artificial, automação e tecnologia para profissionais que querem se destacar no mercado.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/cursos-online' },
};

export default function CursosOnline() {
  return <OnlineCoursesPage />;
}
