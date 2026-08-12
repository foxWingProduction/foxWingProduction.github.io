import { useRef } from 'react';
import { stats } from '@/data/home';
import { videos } from '@/data/site';
import { useVimeoBackground } from '@/hooks/useVimeoBackground';

/**
 * The first screen: the wordmark over a silent showreel, with the stats riding
 * on the same footage so there is no break in the picture between them.
 */
export function Showreel({ onReelReady }: { onReelReady: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useVimeoBackground(ref, {
    vimeoId: videos.hero.vimeoId,
    start: videos.hero.start,
    quality: videos.hero.quality,
    onPlaying: onReelReady,
  });

  return (
    <div className="showreel" ref={ref}>
      <div className="hero__stage" data-parallax="0.07">
        <iframe
          className="hero__frame"
          title="FoxWing Productions showreel, playing silently"
          allow="autoplay; fullscreen; picture-in-picture"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <section className="hero" id="top">
        <div className="hero__inner">
          <h1 className="hero__title">
            <span className="line">
              <span>FoxWing</span>
            </span>
            <span className="line">
              <span>Productions</span>
            </span>
          </h1>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {stats.map((s, i) => (
              <div
                className="stat reveal"
                key={s.label}
                {...(i > 0 ? { 'data-delay': String(i) } : {})}
              >
                <div className="stat__num">
                  <span data-count={s.count} {...(s.pad ? { 'data-pad': 'true' } : {})}>
                    0
                  </span>
                  {s.suffix && <span className="suffix">{s.suffix}</span>}
                </div>
                <div className="stat__label">
                  {s.label}
                  <span className="stat__note">{s.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
