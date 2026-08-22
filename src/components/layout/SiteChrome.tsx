import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useMediaPrefs';

/** Fixed overlays that sit above every page: the loading curtain, the scroll
 *  progress bar, and the two halves of the custom cursor. */
export function Preloader({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="preloader">
      <img className="preloader__mark" src="/images/brand/logo.png" alt="" />
      <div className="preloader__bar" />
    </div>
  );
}

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function Cursor() {
  return (
    <>
      <div className="cursor" aria-hidden="true">
        <span>Play</span>
      </div>
      <div className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/** Mobile only (see .back-to-top's max-width query) - pages run much longer
 *  on a phone with no hover-driven quick nav, so a jump-to-top affordance
 *  earns its keep there in a way it wouldn't on desktop. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
