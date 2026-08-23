import { Layout } from '@/components/layout/Layout';
import { Showreel } from '@/components/home/Showreel';
import { About } from '@/components/home/About';
import { Roadmap } from '@/components/home/Roadmap';
import { Work } from '@/components/home/Work';
import { Gallery } from '@/components/home/Gallery';
import { Team } from '@/components/home/Team';
import { Contact } from '@/components/home/Contact';
import { navLinks } from '@/data/site';
import { usePreloader } from '@/hooks/usePreloader';
import { useReveal } from '@/hooks/useReveal';
import { useCounters } from '@/hooks/useCounters';
import { useScrollEngine } from '@/hooks/useScrollEngine';
import { useScrollspy } from '@/hooks/useScrollspy';
import { useFilmPreviews } from '@/hooks/useFilmPreviews';
import { useMagnetic } from '@/hooks/useMagnetic';

const SECTION_IDS = navLinks.map((l) => l.section!).filter(Boolean);

export default function Home() {
  const { released, onReelReady } = usePreloader(true);
  const active = useScrollspy(SECTION_IDS);

  useReveal();
  useCounters();
  useScrollEngine();
  useFilmPreviews();
  useMagnetic();

  return (
    <Layout showPreloader preloaderReleased={released} activeSection={active}>
      <Showreel onReelReady={onReelReady} />
      <About />
      <Roadmap />
      <Work />
      <Gallery />
      <Team />
      <Contact />
    </Layout>
  );
}
