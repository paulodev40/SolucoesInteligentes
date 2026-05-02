import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adds `.visible` to elements with `.reveal` class as they enter the viewport.
 * Re-scans on route change.
 */
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)');
    if (els.length === 0) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

export default useReveal;
