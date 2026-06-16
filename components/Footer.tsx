import React from 'react';
import Link from 'next/link';
import { NAV_LINKS } from '../constants';

const socials = [
  { href: '#', label: 'Facebook', icon: 'fab fa-facebook-f' },
  { href: '#', label: 'Instagram', icon: 'fab fa-instagram' },
  { href: '#', label: 'Twitter', icon: 'fab fa-twitter' },
  { href: '#', label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-16 border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto py-14 px-5 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-10">
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="font-display font-extrabold text-2xl text-si-text inline-block">
              <span className="text-si-cyan">Soluções</span> Inteligentes
            </Link>
            <p className="text-si-muted text-base leading-relaxed max-w-sm">
              Inteligência artificial, soluções reais.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border)] text-si-muted hover:text-si-cyan hover:border-[var(--border-strong)] hover:bg-[var(--cyan-dim)] transition-all hover:shadow-[0_0_20px_var(--cyan-glow)]"
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div>
              <h3 className="section-label" style={{ marginBottom: 16 }}>Navegação</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-si-muted hover:text-si-cyan transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-label" style={{ marginBottom: 16 }}>Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacidade" className="text-si-muted hover:text-si-cyan transition-colors text-sm">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-si-muted hover:text-si-cyan transition-colors text-sm">
                    Termos de Serviço
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-si-dim font-mono">
            © {new Date().getFullYear()} <span className="text-si-cyan">Soluções Inteligentes 83</span>. Todos os direitos reservados.
          </p>
          <p className="text-xs text-si-dim font-mono tracking-widest uppercase">
            Powered by AI · Made in Brazil
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
