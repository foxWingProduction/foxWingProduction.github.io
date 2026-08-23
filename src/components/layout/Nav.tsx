import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { innerNavLinks, navLinks } from '@/data/site';
import { prefersReducedMotion } from '@/hooks/useMediaPrefs';

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

/**
 * A `/#section` link. On the home page it's a same-page scroll only - the
 * URL never changes, so scrolling past a section doesn't leave the address
 * bar out of sync with what's on screen. From any other page it's a real
 * route change to "/" (via ScrollManager's `state.scrollTo`), since that
 * genuinely is navigating to a different page.
 */
function SectionLink({
  href,
  variant,
  className,
  onNavigate,
  children,
}: {
  href: string;
  variant: 'home' | 'inner';
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const id = href.slice(2);

  if (variant === 'home') {
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
      onNavigate?.();
    };
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to="/" state={{ scrollTo: id }} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
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
                <SectionLink
                  key={l.href}
                  href={l.href}
                  variant={variant}
                  className={`nav__link${isActive(l) ? ' active' : ''}`}
                >
                  {l.label}
                </SectionLink>
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
            <SectionLink href="/#contact" variant={variant} className="btn btn--cta nav__cta">
              <span className="dot" />
              Work with Us
            </SectionLink>
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
            <SectionLink
              key={l.href}
              href={l.href}
              variant={variant}
              onNavigate={() => setMenuOpen(false)}
            >
              {idx}
              {l.label}
            </SectionLink>
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
