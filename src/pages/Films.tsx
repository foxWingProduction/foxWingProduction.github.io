import { useState } from 'react';
import { Link } from 'react-router-dom';
import { films } from '@/data/films';
import { Layout } from '@/components/layout/Layout';
import { FilmRecord } from '@/components/films/FilmRecord';
import { useReveal } from '@/hooks/useReveal';
import { useScrollEngine } from '@/hooks/useScrollEngine';

const GENRES = [
  { key: 'all', label: 'All' },
  { key: 'film', label: 'Film' },
  { key: 'music', label: 'Music Video' },
];

export default function Films() {
  const [filter, setFilter] = useState('all');
  useReveal();
  useScrollEngine();

  return (
    <Layout condensed variant="inner" activeLabel="Films">
      <section className="subhero">
        <div className="container subhero__inner">
          <p className="eyebrow reveal in">Selected work &middot; 2023-2025</p>
          <h1 className="subhero__title reveal in">
            The <em className="green-text">FoxWing</em>
            <br />
            filmography.
          </h1>
          <p className="subhero__sub reveal in">
            A selection of our film and music video work, each carried from first myth to
            final picture.
          </p>

          <div className="filters reveal in" role="tablist" aria-label="Filter films by genre">
            {GENRES.map((g) => (
              <button
                key={g.key}
                className={`filter${filter === g.key ? ' active' : ''}`}
                onClick={() => setFilter(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="projects-list">
        {films.map((film) => (
          <FilmRecord
            key={film.id}
            film={film}
            hidden={filter !== 'all' && !film.genres.includes(filter)}
          />
        ))}
      </div>

      <section
        className="section--tight section"
        style={{ textAlign: 'center', borderTop: '1px solid var(--line)' }}
      >
        <div className="container">
          <p className="eyebrow centered reveal">Now in development</p>
          <h2
            className="section-title reveal"
            data-delay="1"
            style={{ maxWidth: '18ch', marginInline: 'auto' }}
          >
            More cinematic wonders to be <em>unleashed soon</em>.
          </h2>
          <div className="reveal" data-delay="2" style={{ marginTop: '2.5rem' }}>
            <Link className="btn" to="/#contact">
              Work with us
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
