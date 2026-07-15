'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import NeuralSphere from '../components/NeuralSphere';

/** Centro horizontal da esfera no desktop (fração da largura do viewport). */
const SPHERE_CENTER_X = 0.62;
const CX = `${SPHERE_CENTER_X * 100}%`;

const ORBIT_LABELS = [
  {
    href: '/produtos',
    num: '02 — PRODUTOS',
    sub: 'APPS DE IA · IOS & WEB',
    style: { left: `calc(${CX} + 24vmin)`, top: 'calc(50% - 24vmin)' } as React.CSSProperties,
    right: false,
  },
  {
    href: '/cursos-online',
    num: '03 — ACADEMY',
    sub: 'PROGRAMAÇÃO TURBO COM I.A.',
    style: { left: `calc(${CX} + 29vmin)`, top: 'calc(50% - 2vmin)' } as React.CSSProperties,
    right: false,
  },
  {
    href: '/blog',
    num: '05 — STUDIO',
    sub: 'BLOG & TENDÊNCIAS DE IA',
    style: { left: `calc(${CX} + 20vmin)`, top: 'calc(50% + 22vmin)' } as React.CSSProperties,
    right: false,
  },
  {
    href: '/ferramentas',
    num: '04 — FERRAMENTAS',
    sub: '15+ GRATUITAS · SEM LOGIN',
    style: {
      left: `calc(${CX} - 28vmin)`,
      top: 'calc(50% + 20vmin)',
      transform: 'translateX(-100%)',
      textAlign: 'right',
    } as React.CSSProperties,
    right: true,
  },
];

const STATS = [
  { value: '15', suffix: '+', label: 'FERRAMENTAS' },
  { value: '04', suffix: '', label: 'PRODUTOS' },
  { value: '100', suffix: '%', label: 'SEM LOGIN' },
  { value: 'BR', suffix: '', label: 'FEITO NO BRASIL' },
];

const EQ_BARS = [
  { dur: '1.1s', delay: '-0.0s' },
  { dur: '1.3s', delay: '-0.2s' },
  { dur: '0.9s', delay: '-0.4s' },
  { dur: '1.5s', delay: '-0.1s' },
  { dur: '1.0s', delay: '-0.6s' },
  { dur: '1.4s', delay: '-0.3s' },
  { dur: '1.2s', delay: '-0.7s' },
  { dur: '0.8s', delay: '-0.5s' },
];

const TICKS: React.CSSProperties[] = [
  { left: '26%', top: '22%' },
  { right: '27%', top: '64%' },
  { left: '31%', bottom: '22%' },
  { right: '20%', top: '20%' },
];

const Dot: React.FC = () => (
  <span
    className="inline-block w-[6px] h-[6px] rounded-full bg-si-cyan shrink-0"
    style={{ boxShadow: '0 0 8px rgba(34,224,255,.8)' }}
  />
);

const ImmersiveHome: React.FC = () => {
  const degRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="si-home-bg relative h-[100dvh] overflow-hidden text-si-text">
      <style>{`
        @keyframes si-eq{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
        @keyframes si-blink{0%,100%{opacity:1}50%{opacity:.25}}
        .si-home-bg{
          background:
            radial-gradient(1100px 700px at 50% 45%,rgba(34,224,255,.07),transparent 62%),
            repeating-linear-gradient(0deg,transparent 0 55px,rgba(140,170,255,.05) 55px 56px),
            repeating-linear-gradient(90deg,transparent 0 55px,rgba(140,170,255,.05) 55px 56px),#05070f;
        }
        @media (min-width:1024px){
          .si-home-bg{
            background:
              radial-gradient(1100px 700px at ${CX} 50%,rgba(34,224,255,.07),transparent 62%),
              repeating-linear-gradient(0deg,transparent 0 55px,rgba(140,170,255,.05) 55px 56px),
              repeating-linear-gradient(90deg,transparent 0 55px,rgba(140,170,255,.05) 55px 56px),#05070f;
          }
        }
      `}</style>

      <NeuralSphere degreesRef={degRef} centerX={SPHERE_CENTER_X} />

      {/* Pill central — abaixo do header glass flutuante */}
      <div
        className="absolute left-1/2 z-30 hidden sm:flex items-center gap-2 px-4 py-2 rounded-[3px] font-mono text-[10.5px] tracking-[2.5px]"
        style={{
          top: 104,
          transform: 'translateX(-50%)',
          background: 'rgba(14,19,34,.85)',
          border: '1px solid rgba(34,224,255,.3)',
          color: '#7fe9ff',
        }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full bg-si-cyan"
          style={{ animation: 'si-blink 2.2s infinite' }}
        />
        ECOSSISTEMA SI·83
      </div>

      {/* Headline */}
      <div className="absolute left-5 sm:left-9 top-[21%] z-20 max-w-[520px] pr-5">
        <div className="font-mono text-[11px] tracking-[2.5px] text-si-cyan mb-[18px]">
          01 — ECOSSISTEMA
        </div>
        <h1
          className="font-display font-medium"
          style={{
            fontSize: 'clamp(34px,3.8vw,54px)',
            lineHeight: 1.06,
            letterSpacing: '-1.5px',
            textWrap: 'balance',
          }}
        >
          Inteligência artificial,{' '}
          <span
            style={{
              background: 'linear-gradient(100deg,#22e0ff,#8b5cff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            soluções reais.
          </span>
        </h1>
        <p className="mt-5 max-w-[29ch] text-[14.5px] leading-[1.65] text-si-muted">
          Produtos, cursos, ferramentas e conteúdo — um ecossistema de IA sob um único ponto de
          vista.
        </p>
        <div className="flex items-center gap-[18px] mt-7 flex-wrap">
          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-[10px] px-[22px] py-3 rounded-[3px] font-mono text-[11px] tracking-[2px] transition-colors"
            style={{
              border: '1px solid rgba(34,224,255,.45)',
              background: 'rgba(34,224,255,.08)',
              color: '#7fe9ff',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(34,224,255,.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(34,224,255,.08)')}
          >
            EXPLORAR FERRAMENTAS →
          </Link>
          <Link
            href="/produtos"
            className="font-mono text-[11px] tracking-[2px] text-si-faint pb-[3px] transition-colors hover:text-si-text"
            style={{ borderBottom: '1px solid rgba(140,170,255,.25)' }}
          >
            VER PRODUTOS
          </Link>
        </div>
      </div>

      {/* Labels orbitando a esfera (desktop) */}
      {ORBIT_LABELS.map((l) => (
        <Link
          key={l.num}
          href={l.href}
          className="hidden lg:block absolute z-20 transition-opacity hover:opacity-60"
          style={l.style}
        >
          <div
            className={`flex items-center gap-2 font-mono text-[11px] tracking-[2px] text-si-text ${
              l.right ? 'justify-end' : ''
            }`}
          >
            {l.right ? (
              <>
                {l.num}
                <Dot />
              </>
            ) : (
              <>
                <Dot />
                {l.num}
              </>
            )}
          </div>
          <div
            className={`mt-[6px] font-mono text-[10.5px] tracking-[1px] text-si-faint ${
              l.right ? 'mr-[14px]' : 'ml-[14px]'
            }`}
          >
            {l.sub}
          </div>
        </Link>
      ))}

      {/* Stats */}
      <div
        className="absolute left-5 sm:left-9 bottom-[86px] sm:bottom-[30px] z-20 grid grid-cols-2 gap-x-10 gap-y-4 sm:flex"
        style={{ columnGap: 'clamp(20px,3.5vw,48px)' }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display font-medium text-[26px] sm:text-[30px] tracking-[-.5px]">
              {s.value}
              {s.suffix && <span className="text-si-cyan">{s.suffix}</span>}
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[1.5px] text-si-faint">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Readout de graus */}
      <div className="hidden sm:block absolute right-[120px] bottom-8 z-20 font-mono text-[11px] tracking-[2px] text-si-faint">
        <span ref={degRef}>000</span>°
      </div>

      {/* Marcas "+" decorativas */}
      {TICKS.map((style, i) => (
        <div
          key={i}
          className="absolute z-10 font-mono text-[13px] text-si-faint opacity-55 pointer-events-none"
          style={style}
        >
          +
        </div>
      ))}

      {/* Equalizer */}
      <div className="absolute right-5 sm:right-9 bottom-[30px] z-20 flex items-end gap-[3px] h-[26px]">
        {EQ_BARS.map((b, i) => (
          <span
            key={i}
            className="w-[3px] h-full bg-si-cyan origin-bottom"
            style={{ animation: `si-eq ${b.dur} ease-in-out ${b.delay} infinite` }}
          />
        ))}
      </div>

      {/* Hairline */}
      <div
        className="hidden sm:block absolute left-9 right-9 bottom-[78px] z-20"
        style={{ borderTop: '1px solid rgba(140,170,255,.16)' }}
      />
    </section>
  );
};

export default ImmersiveHome;
