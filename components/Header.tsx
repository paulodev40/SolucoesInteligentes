'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Cursos', path: '/cursos-online' },
  { name: 'Ferramentas', path: '/ferramentas' },
  { name: 'Blog', path: '/blog' },
  { name: 'Sobre', path: '/sobre' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : (pathname ?? '').startsWith(path);

  return (
    <nav
      className="fixed top-[18px] left-1/2 z-50 flex items-center gap-[18px] py-[11px] pl-[18px] pr-[14px]"
      style={{
        transform: 'translateX(-50%)',
        width: 'min(1180px, calc(100% - 32px))',
        background: 'var(--glass-nav)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(140,170,255,.16)',
        borderRadius: 18,
        boxShadow:
          '0 18px 50px -20px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.07)',
      }}
    >
      <Link href="/" className="flex items-center gap-[11px] font-display font-bold">
        <img
          src="/assets/images/logotipo.png"
          alt="Soluções Inteligentes 83"
          width={38}
          height={38}
          className="object-contain"
          style={{ width: 38, height: 38, filter: 'drop-shadow(0 0 10px rgba(34,224,255,.5))' }}
        />
        <span className="text-[15px] tracking-[0.2px] whitespace-nowrap">
          Soluções Inteligentes<span className="text-si-cyan"> 83</span>
        </span>
      </Link>

      <div className="flex-1" />

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1 text-[13.5px] font-semibold" style={{ color: '#aeb9d6' }}>
        {LINKS.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.name}
              href={link.path}
              className="px-3 py-2 rounded-[10px] transition-colors"
              style={
                active
                  ? { background: 'rgba(34,224,255,.12)', color: '#fff' }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,.06)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.color = '';
                }
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <Link href="/produtos" className="hidden md:inline-flex cta-grad" style={{ padding: '10px 18px', borderRadius: 12, fontSize: 13.5 }}>
        Começar →
      </Link>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-[10px] text-si-muted"
        style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(140,170,255,.16)' }}
      >
        {open ? <i className="fas fa-times text-lg" /> : <i className="fas fa-bars text-lg" />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden absolute left-0 right-0 top-[calc(100%+10px)] p-3 flex flex-col gap-1"
          style={{
            background: 'rgba(10,14,26,.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(140,170,255,.16)',
            borderRadius: 18,
            boxShadow: '0 18px 50px -20px rgba(0,0,0,.7)',
          }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-[10px] text-[15px] font-semibold transition-colors"
              style={
                isActive(link.path)
                  ? { background: 'rgba(34,224,255,.12)', color: '#fff' }
                  : { color: '#aeb9d6' }
              }
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/produtos"
            onClick={() => setOpen(false)}
            className="cta-grad justify-center mt-1"
            style={{ padding: '12px 18px', borderRadius: 12, fontSize: 14 }}
          >
            Começar →
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
