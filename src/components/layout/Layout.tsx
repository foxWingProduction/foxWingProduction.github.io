import { type ReactNode } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { BackToTop, Cursor, Preloader, ScrollProgress } from './SiteChrome';
import { useCursor } from '@/hooks/useCursor';

interface LayoutProps {
  children: ReactNode;
  /** Nav starts condensed on inner pages, transparent over the home hero. */
  condensed?: boolean;
  activeSection?: string | null;
  variant?: 'home' | 'inner';
  activeLabel?: string;
  /** Home shows the loading curtain; inner pages do not, as before. */
  showPreloader?: boolean;
  preloaderReleased?: boolean;
}

export function Layout({
  children,
  condensed = false,
  activeSection = null,
  variant = 'home',
  activeLabel,
  showPreloader = false,
  preloaderReleased = true,
}: LayoutProps) {
  useCursor();


  return (
    <>
      {showPreloader && <Preloader hidden={preloaderReleased} />}
      <ScrollProgress />
      <Cursor />
      <Nav condensed={condensed} activeSection={activeSection} variant={variant} activeLabel={activeLabel} />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
