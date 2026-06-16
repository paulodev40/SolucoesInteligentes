'use client';

import React, { useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.appendChild(bar);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      bar.remove();
    };
  }, []);
  return null;
};

export default ScrollProgress;
