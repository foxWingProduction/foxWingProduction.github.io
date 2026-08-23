import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from './useMediaPrefs';

/**
 * Muted YouTube loop behind a full-width section, loaded only when the section
 * nears the viewport so visitors who never scroll there pay nothing for it.
 *
 * Skipped on small screens by default: YouTube keeps its own centred touch
 * controls visible there no matter what the URL params say, so a
 * `desktopOnly: false` override just swaps a blank mobile background for a
 * visible play/pause/skip overlay. Give the section a poster image instead
 * (see About) rather than disabling this flag.
 */
export function useBackgroundVideo(
  sectionRef: RefObject<HTMLElement | null>,
  frameSelector: string,
  youtubeId: string,
  start: number,
  /** Delay before the fade-in reveal. The iframe's `load` event fires as
   *  soon as the embed document arrives, well before the player has
   *  actually started autoplaying - revealing at 0 risks exposing its own
   *  pre-play overlay (with playlist mode on, that includes prev/next
   *  arrows). Keep some buffer; only drop it if that flash is acceptable. */
  readyDelay = 2200,
  desktopOnly = true,
): void {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const frame = section.querySelector<HTMLIFrameElement>(frameSelector);
    if (!frame || !youtubeId) return;
    if ((desktopOnly && !window.matchMedia('(min-width: 861px)').matches) || prefersReducedMotion()) return;

    let timer = 0;
    const onLoad = () => {
      timer = window.setTimeout(() => section.classList.add('video-ready'), readyDelay);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        frame.src =
          `https://www.youtube-nocookie.com/embed/${youtubeId}` +
          `?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}` +
          `&start=${start}` +
          '&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0';
        frame.addEventListener('load', onLoad);
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      frame.removeEventListener('load', onLoad);
      section.classList.remove('video-ready');
    };
  }, [sectionRef, frameSelector, youtubeId, start, readyDelay, desktopOnly]);
}
