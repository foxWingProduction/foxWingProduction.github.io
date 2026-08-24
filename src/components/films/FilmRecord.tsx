import { useEffect, useRef, useState } from 'react';
import type { Film } from '@/types/content';
import { prefersReducedMotion } from '@/hooks/useMediaPrefs';

const INTERVAL = 4600;

/** One production: an auto-advancing still carousel beside its credits. */
export function FilmRecord({ film, hidden }: { film: Film; hidden: boolean }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    if (paused || hidden || prefersReducedMotion() || film.stills.length < 2) return;
    timer.current = window.setInterval(
      () => setIdx((i) => (i + 1) % film.stills.length),
      INTERVAL,
    );
    return () => window.clearInterval(timer.current);
  }, [paused, hidden, film.stills.length]);

  return (
    <article
      className={`project${hidden ? ' is-hidden' : ''}`}
      data-film={film.slug}
      data-genres={film.genres.join(' ')}
    >
      <div
        className="project__media"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="project__slides">
          {film.stills.map((s, i) => (
            <div className={`project__slide${i === idx ? ' is-active' : ''}`} key={s.src}>
              <img
                className={s.scope ? 'is-scope' : undefined}
                src={s.src}
                alt={`${film.title}, still ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="project__dots">
          {film.stills.map((s, i) => (
            <button
              key={s.src}
              className={i === idx ? 'active' : undefined}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>

      <div className="project__body">
        <div className="project__yearline">
          <span className="sep" />
          {[film.year, ...film.genreLabels].filter(Boolean).join(' · ')}
        </div>
        <h2 className="project__name">{film.title}</h2>
        <p className="project__synopsis">{film.synopsis}</p>
        <dl className="project__credits">
          {film.credits.map((c) => (
            <div className="credit" key={c.role}>
              <dt>{c.role}</dt>
              <dd>{c.people}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
