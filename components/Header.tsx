'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : (pathname ?? '').startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b backdrop-blur-xl ${
        scrolled
          ? 'bg-[rgba(5,8,16,0.95)] border-[var(--border-strong)] shadow-[0_0_40px_rgba(0,212,255,0.06)]'
          : 'bg-[rgba(5,8,16,0.75)] border-[var(--border)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <img
              src="/assets/images/logotipo.png"
              alt="Soluções Inteligentes 83"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.35))' }}
            />
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-si-text">
              <span className="text-si-cyan">Soluções</span> Inteligentes 83
            </span>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full font-mono text-[0.62rem] tracking-[0.12em] uppercase"
              style={{
                background: 'rgba(0,255,136,0.08)',
                color: 'var(--green)',
                border: '1px solid rgba(0,255,136,0.25)',
              }}
            >
              <span className="dot-pulse dot-pulse--green" />
              AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3.5 py-2 rounded-md font-body text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-si-cyan bg-[var(--cyan-dim)]'
                    : 'text-si-muted hover:text-si-cyan hover:bg-[var(--cyan-dim)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-si-muted hover:text-si-cyan hover:bg-[var(--cyan-dim)] transition-colors focus:outline-none focus:ring-2 focus:ring-si-cyan"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <i className="fas fa-times text-lg" /> : <i className="fas fa-bars text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--border)] bg-[rgba(5,8,16,0.98)] backdrop-blur-xl"
        >
          <div className="px-3 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-body text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-si-cyan bg-[var(--cyan-dim)] border border-[var(--border-strong)]'
                    : 'text-si-muted hover:text-si-cyan hover:bg-[var(--cyan-dim)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
