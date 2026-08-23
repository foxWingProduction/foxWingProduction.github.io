import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from './useMediaPrefs';

/**
 * The trailing ring + dot. The ring eases toward the pointer on a rAF loop and
 * swells over links, becoming a labelled disc over anything with `data-cursor`.
 */
export function useCursor(): void {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const ring = document.querySelector<HTMLElement>('.cursor');
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    if (!ring || !dot) return;
    const label = ring.querySelector('span');

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx}px,${ty}px)`;
      document.body.classList.add('cursor-ready');
    };

    const follow = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);

    const HOVER = 'a, button, .filter, [role="button"], input, textarea';
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const media = target.closest<HTMLElement>('[data-cursor]');
      if (media) {
        if (label) label.textContent = media.dataset.cursor || 'View';
        document.body.classList.add('cursor-media');
        document.body.classList.remove('cursor-hover');
        return;
      }
      document.body.classList.remove('cursor-media');
      document.body.classList.toggle('cursor-hover', !!target.closest(HOVER));
    };
    const onLeave = () => document.body.classList.remove('cursor-ready');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('cursor-ready', 'cursor-hover', 'cursor-media');
    };
  }, []);
}
