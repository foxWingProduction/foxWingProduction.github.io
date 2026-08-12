import { useEffect } from 'react';
import { prefersReducedMotion } from './useMediaPrefs';

/**
 * Adds `.in` to every `.reveal`, `.reveal-clip` and `.split` once it scrolls
 * into view. Re-runs per route so newly mounted sections are picked up, and
 * disconnects on unmount.
 *
 * `deps` should change whenever the route does.
 */
export function useReveal(deps: unknown[] = []): void {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-clip, .split'),
    );
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          obs.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
