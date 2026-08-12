import { useEffect } from 'react';
import { prefersReducedMotion } from './useMediaPrefs';

/** Counts `[data-count]` up from zero the first time it enters view. */
export function useCounters(deps: unknown[] = []): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (!els.length) return;

    const frames: number[] = [];
    const settle = (el: HTMLElement) => {
      const t = parseFloat(el.dataset.count!);
      el.textContent = el.dataset.pad === 'true' && t < 10 ? `0${t}` : String(t);
    };

    const run = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count!);
      const pad = el.dataset.pad === 'true';
      const duration = 1900;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        const val = Math.round(target * eased);
        el.textContent = pad && val < 10 ? `0${val}` : String(val);
        if (p < 1) frames.push(requestAnimationFrame(step));
      };
      frames.push(requestAnimationFrame(step));
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (prefersReducedMotion()) settle(el);
          else run(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      frames.forEach(cancelAnimationFrame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
