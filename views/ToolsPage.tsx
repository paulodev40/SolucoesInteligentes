import React from 'react';
import Link from 'next/link';

const tools = [
  { icon: '🏖️', cat: 'Trabalhista', name: 'Calculadora de Férias e 13º', desc: 'Calcule férias (com terço constitucional) e 13º proporcional, com desconto estimado de INSS e IRRF.', href: '/ferramentas/calculadora-ferias-13' },
  { icon: '🏢', cat: 'Empresarial', name: 'Consultar CNPJ', desc: 'Consulte razão social, situação cadastral, endereço e sócios — dados da Receita Federal.', href: '/ferramentas/cnpj' },
  { icon: '✨', cat: 'IA', name: 'Gerador de Prompts para IA', desc: 'Crie prompts eficientes para ChatGPT, Claude e Gemini em segundos.', href: '/ferramentas/gerador-de-prompts' },
  { icon: '📈', cat: 'Financeiro', name: 'Calculadora de Juros Compostos', desc: 'Simule o crescimento do investimento com aportes mensais e taxa anual, ano a ano.', href: '/ferramentas/calculadora-juros-compostos' },
  { icon: '%', cat: 'Matemática', name: 'Calculadora de Porcentagem', desc: 'Quanto é X% de um valor, descontos, acréscimos e variações percentuais.', href: '/ferramentas/calculadora-porcentagem' },
  { icon: '⚡', cat: 'Finanças', name: 'Gerador de QR Code PIX', desc: 'Gere QR Code e Pix Copia e Cola a partir da sua chave. 100% no navegador.', href: '/ferramentas/gerador-qr-code-pix' },
  { icon: '🗜️', cat: 'Imagem', name: 'Comprimir Imagem', desc: 'Reduza o tamanho de JPG, PNG e WEBP com controle de qualidade. Sem upload.', href: '/ferramentas/comprimir-imagem' },
  { icon: '↔️', cat: 'Imagem', name: 'Redimensionar Imagem', desc: 'Altere dimensões em pixels com trava de proporção automática. Sem upload.', href: '/ferramentas/redimensionar-imagem' },
  { icon: '🔄', cat: 'Imagem', name: 'Converter Imagem', desc: 'Converta entre JPG, PNG e WEBP no navegador, com fundo branco no JPEG.', href: '/ferramentas/converter-imagem' },
  { icon: '✂️', cat: 'Imagem · IA', name: 'Remover Fundo de Imagem', desc: 'Remova o fundo de fotos com IA no navegador. Resultado em PNG transparente.', href: '/ferramentas/remover-fundo-de-imagem' },
  { icon: '📎', cat: 'PDF', name: 'Juntar PDF', desc: 'Una vários PDFs em um só, na ordem que quiser. Reordene arrastando.', href: '/ferramentas/juntar-pdf' },
  { icon: '✂️', cat: 'PDF', name: 'Dividir PDF', desc: 'Extraia páginas, separe em individuais ou divida em blocos. Resultado em .zip.', href: '/ferramentas/dividir-pdf' },
  { icon: '🤖', cat: 'IA', name: 'Resumidor de Texto com IA', desc: 'Cole qualquer texto e receba um resumo claro e objetivo em segundos.', href: '/ferramentas/resumidor-de-texto' },
  { icon: '📊', cat: 'Escrita', name: 'Analisador de Legibilidade', desc: 'Score Flesch adaptado para português com nível de escolaridade e dicas.', href: '/ferramentas/analisador-de-legibilidade' },
  { icon: '✍️', cat: 'Perfil', name: 'Gerador de Bio Profissional', desc: 'Bio para LinkedIn, Instagram, Twitter/X e WhatsApp em segundos.', href: '/ferramentas/gerador-de-bio' },
];

const ToolsPage: React.FC = () => {
  return (
    <main className="relative max-w-[1180px] mx-auto px-6 pt-[160px]">
      <header className="relative text-center">
        <div
          data-parallax
          data-depth="16"
          className="absolute pointer-events-none"
          style={{
            top: -40,
            left: '14%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(43,255,154,.14),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />
        <div
          data-parallax
          data-depth="-18"
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: '12%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(34,224,255,.16),transparent 68%)',
            filter: 'blur(24px)',
          }}
        />

        <div
          className="relative inline-flex items-center font-mono uppercase"
          style={{
            gap: 9,
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(43,255,154,.08)',
            border: '1px solid rgba(43,255,154,.28)',
            fontSize: 12,
            letterSpacing: '2.5px',
            color: '#7fffc0',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#2bff9a',
              animation: 'badgePulse 2s infinite',
            }}
          />
          Ferramentas · 100% Gratuitas
        </div>

        <h1
          className="relative font-display font-bold"
          style={{
            fontSize: 'clamp(36px,5.4vw,64px)',
            letterSpacing: '-1.5px',
            margin: '24px 0 0',
            lineHeight: 1.05,
          }}
        >
          Recursos para o seu{' '}
          <span
            style={{
              background: 'linear-gradient(100deg,#22e0ff,#2bff9a 60%,#8b5cff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'shimmerBg 6s linear infinite',
            }}
          >
            dia a dia
          </span>
        </h1>

        <p
          className="relative"
          style={{
            margin: '22px auto 0',
            maxWidth: '58ch',
            color: '#aab6d6',
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          Calculadoras, verificadores, geradores e ferramentas de IA — tudo gratuito, sem login e
          direto no navegador.
        </p>
      </header>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]"
        style={{ marginTop: 56 }}
      >
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            data-reveal
            className="glass-card flex flex-col"
            style={{ padding: '24px 22px', borderRadius: 20 }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 30 }}>{t.icon}</div>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: '.5px',
                  background: 'rgba(34,224,255,.12)',
                  border: '1px solid rgba(34,224,255,.3)',
                  color: '#7fe9ff',
                }}
              >
                {t.cat}
              </span>
            </div>
            <h3
              className="font-display font-semibold"
              style={{ fontSize: 18, lineHeight: 1.25 }}
            >
              {t.name}
            </h3>
            <p
              className="flex-1"
              style={{ marginTop: 9, fontSize: 13.5, color: '#8a97b5', lineHeight: 1.55 }}
            >
              {t.desc}
            </p>
            <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: '#22e0ff' }}>
              Acessar →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ToolsPage;
