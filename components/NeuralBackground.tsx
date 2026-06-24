'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Fundo de rede neural animado e interativo.
 * Porte 1:1 do protótipo (designs/NeuralBg.dc.html) para React.
 * - Partículas que quicam nas bordas e se ligam por linhas quando próximas.
 * - Atração/realce em torno do cursor + parallax suave do campo.
 * - Parallax de qualquer elemento com [data-parallax][data-depth].
 */
const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stop = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const N = Math.max(40, Math.min(120, Math.floor((w * h) / 15000)));
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.8,
      });
    }

    const layers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    );

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const el of layers) {
        const dep = parseFloat(el.getAttribute('data-depth') || '10');
        el.style.transform = `translate(${nx * dep}px,${ny * dep}px)`;
      }
    };

    const loop = () => {
      if (stop) return;
      ctx.clearRect(0, 0, w, h);
      const ox = (mx - w / 2) * 0.012;
      const oy = (my - h / 2) * 0.012;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dxm = mx - p.x;
        const dym = my - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 170) {
          p.x += (dxm / dm) * 0.5;
          p.y += (dym / dm) * 0.5;
        }
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 128) {
            const al = (1 - d / 128) * 0.5;
            ctx.strokeStyle = `rgba(90,180,255,${al})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x + ox, a.y + oy);
            ctx.lineTo(b.x + ox, b.y + oy);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 170) {
          const al = (1 - d / 170) * 0.6;
          ctx.strokeStyle = `rgba(34,224,255,${al})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x + ox, p.y + oy);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150,210,255,0.85)';
        ctx.shadowColor = 'rgba(34,224,255,0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    loop();

    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="neural-bg" aria-hidden="true" />;
};

export default NeuralBackground;
