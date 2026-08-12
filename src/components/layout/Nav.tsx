import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { innerNavLinks, navLinks } from '@/data/site';

interface NavProps {
  /** Home starts transparent; inner pages start in the condensed state. */
  condensed?: boolean;
  /** Section id currently under the scrollspy, if any. Home only. */
  activeSection?: string | null;
  /** Inner pages use a shorter link set and mark their own entry instead. */
  variant?: 'home' | 'inner';
  /** Label of the inner-nav link to mark active, e.g. "Films" or "Team". */
  activeLabel?: string;
}

export function Nav({
  condensed = false,
  activeSection = null,
  variant = 'home',
  activeLabel,
}: NavProps) {
  const links = variant === 'home' ? navLinks : innerNavLinks;
  const isActive = (l: (typeof links)[number]) =>
    variant === 'home'
      ? Boolean(activeSection && l.section === activeSection)
      : l.label === activeLabel;
  const [menuOpen, setMenuOpen] = useState(false);

  /* The overlay's styling keys off body classes, exactly as before. */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.body.classList.toggle('is-locked', menuOpen);
    return () => {
      document.body.classList.remove('menu-open', 'is-locked');
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`nav${condensed ? ' scrolled' : ''}`} id="mainNav">
        <div className="nav__inner">
          {/* Home leads with the emblem alone; inner pages carry the full
              lockup so the company name is present without the hero. */}
          {variant === 'home' ? (
            <Link
              className="nav__brand nav__brand--emblem"
              to="/"
              aria-label="FoxWing Productions home"
            >
              <img src="/images/brand/logo.png" alt="FoxWing Productions" />
            </Link>
          ) : (
            <Link className="nav__brand" to="/" aria-label="FoxWing Productions home">
              <span className="brand-lockup">
                <img src="/images/brand/logo.png" alt="" />
                <span className="brand-lockup__txt">
                  <span className="name">FoxWing</span>
                  <span className="sub">Productions</span>
                </span>
              </span>
            </Link>
          )}
          <nav className="nav__links" aria-label="Primary">
            {links.map((l) =>
              l.href.startsWith('/#') ? (
                <a
                  key={l.href}
                  className={`nav__link${isActive(l) ? ' active' : ''}`}
                  href={l.href}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  className={`nav__link${isActive(l) ? ' active' : ''}`}
                  to={l.href}
                >
                  {l.label}
                </Link>
              ),
            )}
            <a className="btn btn--cta nav__cta" href="/#contact">
              <span className="dot" />
              Work with Us
            </a>
          </nav>
          <button
            className="nav__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobileMenu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="nav__overlay" id="mobileMenu">
        {[...links, { label: 'Contact', href: '/#contact' }].map((l, i) => {
          const idx = <span className="idx">{String(i + 1).padStart(2, '0')}</span>;
          return l.href.startsWith('/#') ? (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {idx}
              {l.label}
            </a>
          ) : (
            <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>
              {idx}
              {l.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
