import type { Metadata } from 'next';
import ConsultingPage from '../../views/ConsultingPage';

export const metadata: Metadata = {
  title: 'Consultoria em IA e Transformação Digital',
  description:
    'Consultoria especializada em inteligência artificial e transformação digital para empresas e empreendedores que querem escalar com tecnologia.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/consultoria' },
};

export default function Consultoria() {
  return <ConsultingPage />;
}
