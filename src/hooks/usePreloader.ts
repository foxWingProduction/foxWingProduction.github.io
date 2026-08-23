import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useMediaPrefs';

/**
 * Holds the curtain until the hero reel reports playback, so the page is
 * revealed with the video already running rather than on a black frame.
 * The cap guarantees it never hangs, and pages without a reel fall back to
 * window load.
 *
 * Returns `released` plus the callback the reel calls once it is playing.
 */
export function usePreloader(hasReel: boolean): {
  released: boolean;
  onReelReady: () => void;
} {
  const [released, setReleased] = useState(false);
  const done = useRef(false);

  const release = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setReleased(true);
    document.body.classList.add('loaded');
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    if (hasReel && !prefersReducedMotion()) {
      timers.push(window.setTimeout(release, 3200));
    } else {
      const onLoad = () =>
        timers.push(window.setTimeout(release, prefersReducedMotion() ? 0 : 550));
      if (document.readyState === 'complete') onLoad();
      else window.addEventListener('load', onLoad);
      timers.push(window.setTimeout(release, 2600));
      return () => {
        window.removeEventListener('load', onLoad);
        timers.forEach(clearTimeout);
      };
    }
    return () => timers.forEach(clearTimeout);
  }, [hasReel, release]);

  return { released, onReelReady: release };
}
