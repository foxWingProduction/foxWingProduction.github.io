import { useEffect } from 'react';
import { clamp, prefersReducedMotion } from './useMediaPrefs';

/**
 * Every scroll-linked effect on one listener and one rAF: the progress bar,
 * the nav's condensed/hidden state, and all `[data-parallax]` elements.
 * Reads are batched so nothing thrashes layout.
 */
export function useScrollEngine(deps: unknown[] = []): void {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    const nav = document.querySelector<HTMLElement>('.nav');
    const parallax = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    ).map((el) => ({ el, speed: parseFloat(el.dataset.parallax!) || 0.2 }));

    const reduced = prefersReducedMotion();
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (bar) {
        const max = document.documentElement.scrollHeight - vh;
        bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
      }

      if (nav) {
        nav.classList.toggle('scrolled', y > 24);
        nav.classList.toggle(
          'hidden',
          y > vh * 0.9 && y > lastY + 4 && !document.body.classList.contains('menu-open'),
        );
      }
      lastY = y;

      if (!reduced) {
        parallax.forEach((p) => {
          const rect = p.el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          const offset = (rect.top + rect.height / 2 - vh / 2) * p.speed;
          p.el.style.transform = `translate3d(0,${offset.toFixed(2)}px,0)`;
        });
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      nav?.classList.remove('scrolled', 'hidden');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
