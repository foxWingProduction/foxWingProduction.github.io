import { useEffect } from 'react';
import { prefersReducedMotion } from './useMediaPrefs';

/**
 * Hovering a film card cycles its stills into a moving preview. Kept as a DOM
 * effect rather than per-card state so a hover never re-renders the grid.
 */
export function useFilmPreviews(deps: unknown[] = []): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const teardown: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('.film').forEach((card) => {
      const shots = Array.from(card.querySelectorAll<HTMLElement>('.film__img'));
      const dots = Array.from(card.querySelectorAll<HTMLElement>('.film__dots i'));
      if (shots.length < 2) return;

      let i = 0;
      let timer = 0;
      const show = (n: number) => {
        shots[i].classList.remove('is-active');
        dots[i]?.classList.remove('on');
        i = n % shots.length;
        shots[i].classList.add('is-active');
        dots[i]?.classList.add('on');
      };

      const onEnter = () => {
        window.clearInterval(timer);
        timer = window.setInterval(() => show(i + 1), 1100);
      };
      const onLeave = () => {
        window.clearInterval(timer);
        show(0);
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      teardown.push(() => {
        window.clearInterval(timer);
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => teardown.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
