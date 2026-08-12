import { useEffect, type RefObject } from 'react';

interface Options {
  vimeoId: string;
  start: number;
  quality: string;
  /** Fires once the player reports real playback, releasing the preloader. */
  onPlaying?: () => void;
}

/**
 * The hero showreel: a silent, looping Vimeo background.
 *
 * `background=1` strips every player control, so the frame needs no oversizing
 * to hide chrome and can sit at native scale. The iframe is only revealed once
 * the player reports it is actually playing, so if Vimeo refuses to start
 * (geo-block, blocked third-party frames, a privacy extension) its error card
 * never becomes visible - the stage simply stays black.
 */
export function useVimeoBackground(
  sectionRef: RefObject<HTMLElement | null>,
  { vimeoId, start, quality, onPlaying }: Options,
): void {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const frame = section.querySelector<HTMLIFrameElement>('.hero__frame');
    const stage = section.querySelector<HTMLElement>('.hero__stage');
    if (!frame) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      section.classList.add('video-ready');
      onPlaying?.();
    };

    const onMessage = (e: MessageEvent) => {
      if (!/^https?:\/\/player\.vimeo\.com/.test(e.origin)) return;
      if (!frame.contentWindow || e.source !== frame.contentWindow) return;
      let data = e.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data) return;
      if (data.event === 'ready') {
        ['play', 'playing', 'timeupdate'].forEach((name) =>
          frame.contentWindow?.postMessage(
            JSON.stringify({ method: 'addEventListener', value: name }),
            '*',
          ),
        );
      } else if (
        data.event === 'play' ||
        data.event === 'playing' ||
        (data.event === 'timeupdate' && data.data && data.data.seconds > 0)
      ) {
        reveal();
      }
    };
    window.addEventListener('message', onMessage);

    /* Cover the stage by measurement rather than viewport maths: the stage
       wraps the hero and the stats, whose height varies with wrapping, so any
       svh-based guess leaves bars on some screens. */
    const fitStage = () => {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const ar = 16 / 9;
      let w = r.width;
      let h = r.height;
      if (w / h < ar) w = h * ar;
      else h = w / ar;
      frame.style.width = `${Math.ceil(w)}px`;
      frame.style.height = `${Math.ceil(h)}px`;
    };
    fitStage();
    window.addEventListener('resize', fitStage, { passive: true });
    window.addEventListener('orientationchange', fitStage);
    window.addEventListener('load', fitStage);
    document.fonts?.ready.then(fitStage).catch(() => {});
    const ro = stage && 'ResizeObserver' in window ? new ResizeObserver(fitStage) : null;
    if (ro && stage) ro.observe(stage);

    const params = [
      'background=1',
      'autoplay=1',
      'loop=1',
      'muted=1',
      'autopause=0',
      `quality=${quality}`,
      'dnt=1',
    ].join('&');
    frame.src =
      `https://player.vimeo.com/video/${vimeoId}?${params}` +
      (start ? `#t=${start}s` : '');

    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('resize', fitStage);
      window.removeEventListener('orientationchange', fitStage);
      window.removeEventListener('load', fitStage);
      ro?.disconnect();
      section.classList.remove('video-ready');
    };
  }, [sectionRef, vimeoId, start, quality, onPlaying]);
}
