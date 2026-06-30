import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../../components/AdSlot';
import ComoUsar from '../../../components/ComoUsar';
import GeradorBioClient from './GeradorBioClient';

export const metadata: Metadata = {
  title: 'Gerador de Bio Profissional — LinkedIn, Instagram, Twitter e WhatsApp',
  description:
    'Crie uma bio profissional para LinkedIn, Instagram, Twitter/X e WhatsApp em segundos. Preencha cargo, nicho e diferenciais e gere um perfil pronto para usar. Grátis.',
  alternates: { canonical: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-bio' },
  openGraph: {
    title: 'Gerador de Bio Profissional | Soluções Inteligentes 83',
    description: 'Bio para LinkedIn, Instagram, Twitter e WhatsApp. Rápido e gratuito.',
    url: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-bio',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Gerador de Bio Profissional',
      url: 'https://solucoesinteligentes83.com/ferramentas/gerador-de-bio',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Gerador gratuito de bio profissional para LinkedIn, Instagram, Twitter/X e WhatsApp. Informe seu cargo, nicho, diferenciais e CTA e receba uma bio estruturada e pronta para usar.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que colocar na bio do LinkedIn?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A bio do LinkedIn deve ter: seu cargo e área de atuação, seus principais diferenciais (experiência, resultados, especializações) e uma chamada para ação clara (convite para conectar, link de contato ou proposta). Use até 300 caracteres e seja específico sobre quem você atende.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como escrever uma boa bio para o Instagram?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A bio do Instagram tem limite de 150 caracteres. Use a primeira linha para identificar seu cargo e nicho. As linhas seguintes para 2–3 diferenciais curtos. Termine com uma CTA (Link na bio, DM aberto, etc). Use emojis para economizar espaço e destacar visualmente.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a diferença entre bio do LinkedIn e Instagram?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O LinkedIn permite até 300 caracteres e pede um tom mais formal e profissional. O Instagram tem limite de 150 caracteres, permite formato com quebras de linha e costuma ter um tom mais direto e visual. Este gerador adapta automaticamente o formato e o comprimento para cada plataforma.',
          },
        },
      ],
    },
  ],
};

export default function GeradorBioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">
            ← Voltar às ferramentas
          </Link>

          <div className="reveal">
            <div className="section-label">Perfil Profissional</div>
            <h1 className="section-title">Gerador de Bio Profissional</h1>
            <p className="section-desc">
              Crie uma bio impactante para LinkedIn, Instagram, Twitter/X ou WhatsApp em segundos.
              Preencha suas informações e gere um perfil estruturado e pronto para usar.
            </p>
          </div>

          <ComoUsar
            className="mt-8"
            steps={[
              'Escolha a plataforma (LinkedIn, Instagram, Twitter/X ou WhatsApp).',
              'Preencha cargo e nicho (obrigatórios) e, se quiser, nome, diferenciais e CTA.',
              'Clique em "Gerar Bio" e copie o texto pronto.',
            ]}
            output="Uma bio pronta, formatada e adaptada ao limite de caracteres da plataforma escolhida, com contador de caracteres e botão para copiar."
            example="Cargo 'Designer Gráfico' + nicho 'branding para pequenas empresas' no Instagram gera uma bio curta com diferenciais e CTA."
          />

          <div className="mt-10">
            <GeradorBioClient />
          </div>

          <article className="mt-20 space-y-10 text-si-muted leading-relaxed reveal">
            <div className="section-divider" />

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Por que a sua bio profissional importa?
              </h2>
              <p>
                A bio é a primeira impressão que as pessoas têm de você online. Em redes
                sociais profissionais como o LinkedIn, é o texto que aparece nos resultados
                de busca e nas preview cards quando alguém compartilha seu perfil. No
                Instagram, é o único espaço de texto clicável disponível para quem te
                descobre organicamente.
              </p>
              <p className="mt-3">
                Uma bio bem estruturada responde três perguntas em segundos: quem você é,
                o que você faz e por que a pessoa deveria se conectar com você. Este
                gerador monta essa estrutura automaticamente — você só precisa fornecer
                as informações.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-3">
                Elementos de uma bio profissional eficaz
              </h2>
              <ul className="space-y-3 text-sm">
                {[
                  { t: 'Cargo e área de atuação', d: 'Deixe claro o que você faz logo na primeira linha. Seja específico: "Consultora de Marketing Digital para e-commerces" é melhor que "Consultora".' },
                  { t: 'Diferenciais concretos', d: 'Números e resultados são mais convincentes que adjetivos. "Mais de 100 projetos entregues" é melhor que "experiente e comprometida".' },
                  { t: 'Quem você atende', d: 'Mencione seu público ideal. Isso filtra visitantes e atrai exatamente as pessoas certas para o seu negócio.' },
                  { t: 'Chamada para ação (CTA)', d: 'Diga à pessoa o que fazer a seguir: "Me chame no DM", "Link na bio para agendar", "Conecte-se comigo". Sem CTA, a maioria não age.' },
                ].map(({ t, d }) => (
                  <li key={t} className="flex gap-3">
                    <strong className="text-si-text whitespace-nowrap">{t}:</strong>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-si-text mb-6">
                Perguntas frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Posso usar a mesma bio em todas as plataformas?',
                    a: 'Não é recomendado. Cada plataforma tem limites de caracteres, tom e formato diferentes. O LinkedIn espera linguagem profissional e permite até 300 caracteres. O Instagram pede concisão (150 chars) e aceita emojis bem. O Twitter/X tem 160 chars. Este gerador adapta o texto automaticamente para cada uma.',
                  },
                  {
                    q: 'Devo incluir palavras-chave na bio do LinkedIn?',
                    a: 'Sim. O algoritmo do LinkedIn usa o texto da bio para indexar perfis nas buscas. Inclua termos que seu cliente ideal buscaria — como "gestão de tráfego pago", "vendas para SaaS" ou "design de interiores corporativos". Isso aumenta a visibilidade orgânica do seu perfil.',
                  },
                  {
                    q: 'Com que frequência devo atualizar minha bio?',
                    a: 'Sempre que mudar de cargo, nicho, especialização ou oferta. Uma bio desatualizada pode afastar oportunidades. Como regra, revise a cada 6 meses ou sempre que tiver uma conquista significativa a adicionar.',
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
