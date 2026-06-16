import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import PixQRClient from './PixQRClient';

export const metadata: Metadata = {
  title: 'Gerador de QR Code PIX — Criar PIX Copia e Cola Grátis',
  description:
    'Gere QR Code PIX e código Copia e Cola a partir da sua chave. Defina valor e descrição, baixe em PNG. Grátis, sem cadastro e 100% no seu navegador.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/gerador-qr-code-pix' },
  openGraph: {
    title: 'Gerador de QR Code PIX | Soluções Inteligentes 83',
    description: 'Gere QR Code PIX e Pix Copia e Cola grátis. 100% no navegador, sua chave não sai do dispositivo.',
    url: 'https://solucoesinteligentes83.com/ferramentas/gerador-qr-code-pix',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Gerador de QR Code PIX',
      url: 'https://solucoesinteligentes83.com/ferramentas/gerador-qr-code-pix',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Gere QR Code PIX e código Pix Copia e Cola a partir da sua chave PIX. Informe nome, cidade e valor opcional. Download em PNG. 100% no navegador — a chave nunca sai do dispositivo.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Posso receber PIX com QR Code sem valor definido?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. Deixando o campo de valor vazio, o gerador cria um QR Code PIX estático sem valor fixo. O pagador abre o app do banco, escaneia o QR e define o valor que deseja pagar. Ideal para cobranças variáveis ou doações.',
          },
        },
        {
          '@type': 'Question',
          name: 'O QR Code PIX tem validade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O QR Code estático (gerado por este gerador) não tem validade — pode ser reutilizado indefinidamente para receber pagamentos. O QR Code dinâmico (gerado pelos bancos para uma transação específica) tem validade definida pelo emissor, geralmente de minutos a horas.',
          },
        },
        {
          '@type': 'Question',
          name: 'É seguro usar este gerador de QR Code PIX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim. A ferramenta roda 100% no seu navegador — a chave PIX e os dados do payload são processados localmente e nunca enviados a servidores externos. Você pode verificar isso na aba Network do DevTools: nenhuma requisição de rede é feita ao clicar em "Gerar".',
          },
        },
      ],
    },
  ],
};

export default function GeradorQRCodePix() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Finanças</div>
            <h1 className="section-title">Gerador de QR Code PIX</h1>
            <p className="section-desc">
              Crie seu QR Code PIX e Pix Copia e Cola a partir da sua chave. Defina valor e
              descrição, baixe a imagem em PNG. Grátis, sem cadastro e 100% no seu navegador —
              sua chave nunca é enviada a nenhum servidor.
            </p>
          </div>

          <div className="mt-10">
            <PixQRClient />
          </div>

          {/* Conteúdo SEO */}
          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Como gerar um QR Code PIX
              </h2>
              <p>
                Gerar um QR Code PIX com esta ferramenta é simples e leva menos de 30 segundos:
              </p>
              <ol className="mt-3 space-y-2 text-sm list-decimal list-inside">
                <li>Selecione o <strong className="text-si-text">tipo de chave</strong> (CPF, CNPJ, e-mail, celular ou aleatória).</li>
                <li>Informe sua <strong className="text-si-text">chave PIX</strong> no campo correspondente.</li>
                <li>Preencha o <strong className="text-si-text">nome do recebedor</strong> e a <strong className="text-si-text">cidade</strong> (obrigatórios pelo padrão do Banco Central).</li>
                <li>Opcionalmente, defina um <strong className="text-si-text">valor</strong> fixo e uma descrição.</li>
                <li>Clique em <strong className="text-si-text">"Gerar QR Code PIX"</strong> e use o botão para baixar a imagem ou copiar o Pix Copia e Cola.</li>
              </ol>
              <p className="mt-3">
                O QR Code gerado segue o padrão <strong className="text-si-text">BR Code / EMV QR Code</strong>{' '}
                definido pelo Banco Central do Brasil — compatível com todos os apps de banco e
                carteiras digitais que aceitam PIX.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                O que é o Pix Copia e Cola?
              </h2>
              <p>
                O <strong className="text-si-text">Pix Copia e Cola</strong> é a representação
                em texto do mesmo payload que está codificado no QR Code. É o mesmo dado — só
                que em formato de string alfanumérica que pode ser copiada e colada no campo
                "Pix Copia e Cola" do app do banco.
              </p>
              <p className="mt-3">
                Ele é especialmente útil quando o pagador está em um dispositivo e não consegue
                escanear o QR (por exemplo, receber o QR no mesmo celular que vai pagar).
                Ao colar o código no campo "Copia e Cola" do app do banco, o sistema lê o mesmo
                payload e completa a transação normalmente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                QR Code PIX estático vs. dinâmico
              </h2>
              <p>
                Existem dois tipos de QR Code PIX:
              </p>
              <ul className="mt-3 space-y-3 text-sm">
                <li>
                  <strong className="text-si-text">Estático (este gerador):</strong> reutilizável
                  indefinidamente, pode ter valor fixo ou aberto. Ideal para cobranças recorrentes,
                  pontos de venda físicos, doações e links de pagamento. Não exige integração com
                  sistema bancário.
                </li>
                <li>
                  <strong className="text-si-text">Dinâmico:</strong> gerado pelos sistemas dos
                  bancos para uma transação específica. Permite rastreamento individual de cada
                  pagamento, expiração automática e conciliação por sistema. Exige integração via API
                  bancária. É o padrão usado por e-commerces e sistemas de ERP.
                </li>
              </ul>
              <p className="mt-3">
                Para a maioria dos autônomos, MEIs e pequenas empresas, o QR Code estático
                gerado aqui é suficiente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                É seguro usar um gerador de QR Code PIX online?
              </h2>
              <p>
                Depende de como o gerador funciona. Muitos sites enviam sua chave PIX para
                um servidor externo — o que representa risco de privacidade e, em alguns casos,
                de segurança.
              </p>
              <p className="mt-3">
                <strong className="text-si-text">Esta ferramenta funciona de forma diferente:</strong>{' '}
                todo o processamento acontece no seu navegador, usando JavaScript local.
                Nenhuma requisição de rede é feita com sua chave ou com o payload gerado.
                Você pode confirmar isso abrindo o DevTools do navegador (F12) → aba Network
                e clicando em "Gerar QR Code" — nenhuma chamada externa será registrada.
              </p>
              <p className="mt-3">
                O QR Code é gerado localmente pelo padrão BR Code do Banco Central, e a imagem
                é renderizada direto no seu navegador sem sair do dispositivo.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Posso receber PIX com QR Code sem valor definido?',
                    a: 'Sim. Deixando o campo de valor vazio, o QR Code gerado é do tipo "sem valor" — o pagador define o valor no momento do pagamento. É o tipo mais usado para cobranças variáveis, gorjetas e doações.',
                  },
                  {
                    q: 'O QR Code PIX gerado aqui tem validade?',
                    a: 'Não. O QR Code estático não expira. Você pode imprimir, compartilhar em redes sociais, colocar no site ou em cartão de visita — ele continuará funcionando indefinidamente, enquanto sua chave PIX estiver ativa.',
                  },
                  {
                    q: 'Qual a diferença entre chave PIX e QR Code PIX?',
                    a: 'A chave PIX (CPF, e-mail, celular ou aleatória) é o identificador da sua conta. O QR Code PIX é uma forma visual de compartilhar essa chave junto com outras informações (nome, cidade, valor) no padrão do Banco Central — para que o pagador não precise digitar nada.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border-l-2 border-si-cyan pl-5">
                    <p className="font-semibold text-si-text mb-1">{q}</p>
                    <p className="text-sm">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <AdSlot label="Anúncio" className="mt-16" />
        </div>
      </section>
    </>
  );
}
