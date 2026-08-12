import { Fragment, useRef, useState } from 'react';
import { railGroups, roadmapSteps } from '@/data/roadmap';
import { videos } from '@/data/site';
import { SplitText } from '@/components/ui/SplitText';
import { Icon } from '@/components/ui/Icon';
import { useBackgroundVideo } from '@/hooks/useBackgroundVideo';
import { clamp, prefersReducedMotion } from '@/hooks/useMediaPrefs';

/**
 * The eight services ordered as a real production pipeline, so the rail reads
 * as a sequence rather than a grid of tiles. Implemented as an ARIA tablist
 * with roving tabindex; the muted clip behind it loads only when the section
 * nears the viewport.
 */
export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  /** Bumped on every change so the entry animation replays. */
  const [enterKey, setEnterKey] = useState(0);

  useBackgroundVideo(
    sectionRef,
    '.roadmap__frame',
    videos.roadmap.youtubeId,
    videos.roadmap.start,
  );

  const last = roadmapSteps.length - 1;

  const go = (n: number, focus = false) => {
    const next = clamp(n, 0, last);
    setCurrent(next);
    setEnterKey((k) => k + 1);
    if (focus) {
      stepsRef.current
        ?.querySelectorAll<HTMLButtonElement>('.step')
        [next]?.focus();
    }
  };

  const onStepClick = (i: number) => {
    go(i);
    // Stacked layout puts the panel below the rail, so bring it into view
    // rather than leaving the tap looking like it did nothing.
    if (panelsRef.current && window.matchMedia('(max-width: 1100px)').matches) {
      panelsRef.current.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'nearest',
      });
    }
  };

  /** Roving-tabindex keyboard support, per the ARIA tabs pattern. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    if (map[e.key]) {
      e.preventDefault();
      go((current + map[e.key] + roadmapSteps.length) % roadmapSteps.length, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(last, true);
    }
  };

  const fillHeight = last > 0 ? `${(current / last) * 100}%` : '100%';

  return (
    <section className="section roadmap-section" id="services" ref={sectionRef}>
      <div className="roadmap__bg" aria-hidden="true">
        <img
          className="roadmap__poster"
          src="/images/films/tarantino/still-2.jpg"
          alt=""
          loading="lazy"
        />
        <iframe
          className="roadmap__frame"
          title=""
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media"
        />
        <span className="roadmap__scrim" />
      </div>

      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">What we do</p>
          <SplitText as="h2" className="section-title">
            Full-service production, <em>end to end</em>.
          </SplitText>
          <p
            className="lead reveal"
            data-delay="1"
            style={{ marginTop: '1.2rem', maxWidth: '56ch' }}
          >
            Every project runs the same pipeline, from the first research note to the last
            truck off location. Step through it below.
          </p>
        </div>

        <div className="roadmap reveal" data-delay="2">
          <div className="roadmap__rail">
            <span className="roadmap__track" aria-hidden="true">
              <span className="roadmap__fill" style={{ height: fillHeight }} />
            </span>
            <div
              className="roadmap__steps"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Production pipeline"
              ref={stepsRef}
              onKeyDown={onKeyDown}
            >
              {roadmapSteps.map((s, i) => (
                /* A Fragment, not a wrapper element: the rail is a flex column
                   whose CSS keys off :first-child and sibling order, so any
                   extra node would change the spacing. */
                <Fragment key={s.n}>
                  {railGroups
                    .filter((g) => g.beforeStep === i + 1)
                    .map((g) => (
                      <p className="roadmap__phase" key={g.label}>
                        {g.label}
                      </p>
                    ))}
                  <button
                    className={`step${i === current ? ' is-active' : ''}${i < current ? ' is-done' : ''}`}
                    role="tab"
                    id={`step-${i + 1}`}
                    aria-controls={`phase-${i + 1}`}
                    aria-selected={i === current}
                    tabIndex={i === current ? 0 : -1}
                    type="button"
                    onClick={() => onStepClick(i)}
                  >
                    <span className="step__node" aria-hidden="true" />
                    <span className="step__idx">{s.n}</span>
                    <span className="step__name">{s.name}</span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="roadmap__panels" ref={panelsRef}>
            {roadmapSteps.map((s, i) => (
              <div
                className={`phase${i === current ? ' is-active is-entering' : ''}`}
                key={`${s.n}-${i === current ? enterKey : 'idle'}`}
                role="tabpanel"
                id={`phase-${i + 1}`}
                aria-labelledby={`step-${i + 1}`}
                hidden={i !== current}
              >
                <Icon className="phase__icon" svg={s.icon} />
                <p className="phase__stage">
                  {s.phase} <span className="phase__count">{s.n} / 08</span>
                </p>
                <h3 className="phase__title">{s.title}</h3>
                <p className="phase__text">{s.text}</p>
              </div>
            ))}

            <div className="roadmap__nav">
              <button
                className="roadmap__arrow"
                type="button"
                aria-label="Previous stage"
                disabled={current === 0}
                onClick={() => go(current - 1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                className="roadmap__arrow"
                type="button"
                aria-label="Next stage"
                disabled={current === last}
                onClick={() => go(current + 1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
