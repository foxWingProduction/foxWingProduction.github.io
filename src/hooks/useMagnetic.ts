import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from './useMediaPrefs';

/** `[data-magnetic]` elements lean toward the pointer while it is over them. */
export function useMagnetic(deps: unknown[] = []): void {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const teardown: Array<() => void> = [];

    els.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic!) || 0.28;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`;
      };
      const onLeave = () => {
        el.style.transform = '';
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      teardown.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.style.transform = '';
      });
    });

    return () => teardown.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
