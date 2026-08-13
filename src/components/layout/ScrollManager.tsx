import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const STORE = 'fw:scroll';

const read = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
};
const write = (s: Record<string, number>) => {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(s));
  } catch {
    /* private mode, quota - not worth failing navigation over */
  }
};

/**
 * Runs a positioning attempt every frame until it reports success or we give
 * up. Needed because the hero reel, lazy images and web fonts all change the
 * document height after mount, so a single scroll on the first frame lands in
 * the wrong place.
 */
function settle(attempt: () => boolean, onDone: () => void, ms = 3000) {
  const until = performance.now() + ms;
  const tick = () => {
    if (attempt() || performance.now() > until) {
      onDone();
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const toOffset = (y: number, onDone: () => void) =>
  settle(() => {
    window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    // Landing short means the document has not grown back to that height yet
    // (lazy images, the reel), so keep trying rather than accepting a clamp.
    return Math.abs(window.scrollY - y) < 2;
  }, onDone);

const toElement = (selector: string, onDone: () => void) =>
  settle(() => {
    const el = document.querySelector(selector);
    if (!el) return false;
    // scroll-padding-top on <html> keeps this clear of the fixed nav
    el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    return true;
  }, onDone);

/**
 * Decides where a navigation lands:
 *
 *  - back / forward  -> exactly where that page was left
 *  - `state.scrollTo` -> the film record a work-grid card points at
 *  - a `#hash`        -> that section
 *  - anything else    -> the top
 *
 * Mounted once at the router root so it survives page changes and can record
 * the outgoing position before the next page renders.
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const keyRef = useRef(location.key);
  /* Last offset seen while the page was genuinely being browsed. */
  const lastY = useRef(0);
  /* Set the instant a navigation begins. Swapping in a shorter page makes the
     browser clamp scrollY and emit a scroll event; without this guard that
     clamp overwrites the position we just stored for the page being left. */
  const navigating = useRef(false);

  /* Take the browser off automatic restoration: in an SPA it competes with
     ours and wins the race, landing part-way up the page. */
  useEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  /* Freeze the stored offset as soon as a navigation starts, from either a
     link or the browser's own back/forward buttons. */
  useEffect(() => {
    let unlock = 0;
    const freeze = () => {
      if (navigating.current) return;
      navigating.current = true;
      write({ ...read(), [keyRef.current]: lastY.current });
      // Safety valve: a click that never navigates must not lock us forever.
      window.clearTimeout(unlock);
      unlock = window.setTimeout(() => {
        navigating.current = false;
      }, 2000);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a')) freeze();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', freeze);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', freeze);
      window.clearTimeout(unlock);
    };
  }, []);

  /* Track the live offset, and mirror it to storage while browsing. */
  useEffect(() => {
    keyRef.current = location.key;
    lastY.current = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (navigating.current) return;
      lastY.current = window.scrollY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        write({ ...read(), [keyRef.current]: lastY.current });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [location.key]);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const done = () => {
      navigating.current = false;
      lastY.current = window.scrollY;
    };

    if (navigationType === 'POP') {
      const y = read()[location.key];
      if (typeof y === 'number') {
        toOffset(y, done);
        return;
      }
    }
    if (target) {
      toElement(`[data-film="${CSS.escape(target)}"]`, done);
      return;
    }
    if (location.hash) {
      toElement(`#${CSS.escape(location.hash.slice(1))}`, done);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    done();
  }, [location, navigationType]);

  return null;
}
