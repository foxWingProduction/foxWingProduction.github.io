import { Fragment, useRef, useState, type KeyboardEvent } from 'react';
import { railGroups, roadmapSteps } from '@/data/roadmap';
import { Layout } from '@/components/layout/Layout';
import { Icon } from '@/components/ui/Icon';
import { useReveal } from '@/hooks/useReveal';
import { useScrollEngine } from '@/hooks/useScrollEngine';
import { clamp, prefersReducedMotion } from '@/hooks/useMediaPrefs';

export default function Services() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  /** Bumped on every change so the entry animation replays. */
  const [enterKey, setEnterKey] = useState(0);

  useReveal();
  useScrollEngine();

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
  const onKeyDown = (e: KeyboardEvent) => {
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
    <Layout condensed variant="inner" activeLabel="Services">
      <section className="subhero">
        <div className="container subhero__inner">
          <p className="eyebrow reveal in">What we do</p>
          <h1 className="subhero__title reveal in">
            Full-service production,
            <br />
            <em className="green-text">end to end</em>.
          </h1>
          <p className="subhero__sub reveal in">
            Every project runs the same pipeline, from the first research note to the last
            truck off location. Step through it below.
          </p>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="roadmap__bg" aria-hidden="true">
          <img className="roadmap__frame" src="/images/studio/on-set.jpg" alt="" />
          <span className="roadmap__scrim" />
        </div>
        <div className="container">
          <div className="roadmap reveal" data-delay="1">
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
              {/* Every phase stays in flow (grid-stacked, visibility-hidden rather than
                  display:none) so the tallest one sets the panel's height and the card
                  doesn't resize as you step through - see .roadmap__stack in main.css. */}
              <div className="roadmap__stack">
                {roadmapSteps.map((s, i) => (
                  <div
                    className={`phase${i === current ? ' is-active is-entering' : ''}`}
                    key={`${s.n}-${i === current ? enterKey : 'idle'}`}
                    role="tabpanel"
                    id={`phase-${i + 1}`}
                    aria-labelledby={`step-${i + 1}`}
                    aria-hidden={i !== current}
                  >
                    <Icon className="phase__icon" svg={s.icon} />
                    <p className="phase__stage">
                      {s.phase} <span className="phase__count">{s.n} / 08</span>
                    </p>
                    <h3 className="phase__title">{s.title}</h3>
                    <p className="phase__text">{s.text}</p>
                  </div>
                ))}
              </div>

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
    </Layout>
  );
}
