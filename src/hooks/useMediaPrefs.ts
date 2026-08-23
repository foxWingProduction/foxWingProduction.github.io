/** Motion and pointer capability, read once. Mirrors the guards the original
 *  vanilla script used to decide whether an effect runs at all. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v: number, a: number, b: number): number =>
  Math.min(Math.max(v, a), b);
