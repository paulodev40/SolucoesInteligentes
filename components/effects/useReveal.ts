import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adds `.visible` to elements with `.reveal` class as they enter the viewport.
 * Re-scans on route change.
 */
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const observeEl = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.classList.contains('visible')) return;
      // If already in viewport at observe time, mark visible right away
      // (covers async-rendered content that mounts already on screen).
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('visible');
        return;
      }
      io.observe(el);
    };

    // Observe existing elements
    document
      .querySelectorAll<HTMLElement>('.reveal:not(.visible)')
      .forEach(observeEl);

    // Watch for elements added later (e.g. after async data loads)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList?.contains('reveal')) observeEl(node);
          node
            .querySelectorAll?.<HTMLElement>('.reveal:not(.visible)')
            .forEach(observeEl);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}

export default useReveal;
