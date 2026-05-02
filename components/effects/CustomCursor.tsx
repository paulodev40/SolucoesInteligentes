import React, { useEffect } from 'react';

/**
 * Custom cursor with smooth follow ring + dot + cyan trail.
 * Disabled automatically on coarse pointers via CSS.
 */
const CustomCursor: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('theme-cursor');

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail-canvas';
    document.body.append(ring, dot, canvas);

    const ctx = canvas.getContext('2d')!;
    let mx = -200, my = -200, rx = -200, ry = -200;
    type P = { x: number; y: number; age: number; size: number };
    let trail: P[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      const sp = document.getElementById('spotlight');
      if (sp) sp.style.background = `radial-gradient(circle 500px at ${mx}px ${my}px, rgba(0,212,255,0.045), transparent 70%)`;
      trail.push({ x: mx, y: my, age: 0, size: 3 + Math.random() * 2 });
      if (trail.length > 28) trail.shift();
    };
    const onDown = () => document.body.classList.add('cursor-click');
    const onUp = () => document.body.classList.remove('cursor-click');
    const hoverSel = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest(hoverSel)) document.body.classList.add('cursor-hover');
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t && t.closest && t.closest(hoverSel)) document.body.classList.remove('cursor-hover');
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((p, i) => {
        p.age++;
        const progress = i / trail.length;
        const alpha = progress * 0.5 * (1 - p.age / 60);
        if (alpha <= 0) return;
        const radius = p.size * progress;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
        grad.addColorStop(0, `rgba(0,212,255,${alpha})`);
        grad.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      trail = trail.filter(p => p.age < 50);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      ring.remove(); dot.remove(); canvas.remove();
      document.body.classList.remove('theme-cursor', 'cursor-hover', 'cursor-click');
    };
  }, []);
  return null;
};

export default CustomCursor;
