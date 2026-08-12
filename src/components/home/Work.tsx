import { Link } from 'react-router-dom';
import { filmCards } from '@/data/home';
import { SplitText } from '@/components/ui/SplitText';

const ArrowOut = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

/** The selected-work mosaic. Hover cycling is wired by useFilmPreviews. */
export function Work() {
  return (
    <section className="section section--lit section--close-bottom" id="work">
      <div className="container">
        <div className="films__head">
          <div>
            <p className="eyebrow reveal">Selected work</p>
            <SplitText as="h2" className="section-title">
              The films we've <em>brought to life</em>.
            </SplitText>
          </div>
          <div className="reveal" data-delay="2">
            <Link className="link-underline" to="/filmography">
              All productions
              <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="films__grid">
          {filmCards.map((card) => (
            <Link
              key={card.title}
              className={`film film--${card.size} reveal`}
              to={`/${card.href}`}
              data-cursor="View"
              {...(card.delay !== null ? { 'data-delay': String(card.delay) } : {})}
            >
              <div className="film__media">
                {card.stills.map((s, i) => (
                  <img
                    key={s.src}
                    className={`film__img${s.scope ? ' film__img--scope' : ''}${i === 0 ? ' is-active' : ''}`}
                    src={s.src}
                    alt={i === 0 ? card.alt : ''}
                    {...(i === 0 ? {} : { 'aria-hidden': true })}
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="film__plate" aria-hidden="true" />
              <span className="film__scrim" aria-hidden="true" />
              <div className="film__meta">
                <div className="film__tags">
                  {card.tags.map((t) => (
                    <span className="film__tag" key={t}>
                      {t}
                    </span>
                  ))}
                  <span className="film__tag film__tag--year">{card.year}</span>
                </div>
                <div className="film__name">{card.title}</div>
                <span className="film__view">
                  View film <ArrowOut />
                </span>
              </div>
              <span className="film__dots" aria-hidden="true">
                {card.stills.map((s, i) => (
                  <i key={s.src} className={i === 0 ? 'on' : undefined} />
                ))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
