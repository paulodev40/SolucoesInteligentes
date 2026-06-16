import type { Metadata } from 'next';
import PromptPage from '../../../views/PromptPage';

export const metadata: Metadata = {
  title: 'Gerador de Prompts para IA — ChatGPT, Claude e Gemini',
  description:
    'Crie prompts otimizados para ChatGPT, Claude e Gemini em segundos. Gerador gratuito de prompts para e-mail, redes sociais, marketing, relatórios e muito mais.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/prompt-ia' },
  openGraph: {
    title: 'Gerador de Prompts para IA | Soluções Inteligentes 83',
    description: 'Prompts otimizados para ChatGPT, Claude e Gemini. Gratuito.',
    url: 'https://solucoesinteligentes83.com/ferramentas/prompt-ia',
  },
};

export default function PromptIA() {
  return <PromptPage />;
}
