import React from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Produtos', href: '/produtos' },
  { name: 'Cursos Online', href: '/cursos-online' },
  { name: 'Ferramentas', href: '/ferramentas' },
  { name: 'Conteúdo Digital', href: '/conteudo-digital' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Política de Privacidade', href: '/privacidade' },
  { name: 'Termos de Serviço', href: '/termos' },
  { name: 'Sobre', href: '/sobre' },
];

const socials = [
  { label: 'Instagram', icon: 'fab fa-instagram', href: 'https://instagram.com/solucoesinteligentes83' },
  { label: 'YouTube', icon: 'fab fa-youtube', href: 'https://youtube.com/@solucoesinteligentes83' },
  { label: 'Facebook', icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=61586224777647' },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="relative max-w-[1180px] mx-auto mt-20 px-6 pt-12 pb-10"
      style={{ borderTop: '1px solid rgba(140,170,255,.12)' }}
    >
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-[11px] font-display font-bold text-base">
            <img
              src="/assets/images/logotipo.png"
              alt=""
              width={40}
              height={40}
              className="object-contain"
              style={{ width: 40, height: 40, filter: 'drop-shadow(0 0 10px rgba(34,224,255,.4))' }}
            />
            Soluções Inteligentes<span className="text-si-cyan"> 83</span>
          </Link>
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed" style={{ color: '#8a97b5' }}>
            Inteligência artificial, soluções reais. Ferramentas gratuitas de IA para
            profissionais, empreendedores e entusiastas de tecnologia.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-link inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                style={{
                  color: '#aab6d6',
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(140,170,255,.16)',
                }}
              >
                <i className={`${s.icon} text-base`} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-label mb-4" style={{ fontSize: 11, letterSpacing: '2px', color: '#6b78a0' }}>
            Navegação
          </div>
          <div className="flex flex-col gap-[11px] text-sm" style={{ color: '#aab6d6' }}>
            {navLinks.map((l) => (
              <Link key={l.name} href={l.href} className="footer-link transition-colors w-fit">
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-label mb-4" style={{ fontSize: 11, letterSpacing: '2px', color: '#6b78a0' }}>
            Legal
          </div>
          <div className="flex flex-col gap-[11px] text-sm" style={{ color: '#aab6d6' }}>
            {legalLinks.map((l) => (
              <Link key={l.name} href={l.href} className="footer-link transition-colors w-fit">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-10 pt-[22px] flex flex-wrap justify-between gap-[10px] font-mono"
        style={{ borderTop: '1px solid rgba(140,170,255,.1)', fontSize: 12.5, color: '#6b78a0' }}
      >
        <span>© 2026 Soluções Inteligentes 83. Todos os direitos reservados.</span>
        <span>Powered by AI · Made in Brazil 🇧🇷</span>
      </div>
    </footer>
  );
};

export default Footer;
