import { useRef } from 'react';
import { SplitText } from '@/components/ui/SplitText';
import { useBackgroundVideo } from '@/hooks/useBackgroundVideo';
import { videos } from '@/data/site';

export function About() {
  const ref = useRef<HTMLElement>(null);
  useBackgroundVideo(ref, '.about__frame', videos.roadmap.youtubeId, videos.roadmap.start, 7000);

  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className="about__bg" aria-hidden="true">
        <img className="about__poster" src="/images/studio/about-video-poster.jpg" alt="" />
        <iframe
          className="about__frame"
          title=""
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media"
        />
        <span className="about__scrim" />
      </div>

      <div className="container">
        <div className="about__head">
          <p className="eyebrow reveal">Who we are</p>
          <SplitText as="p" className="display-line">
            A <em>Toronto-based</em> film production company built by filmmakers, for
            stories that deserve to be seen.
          </SplitText>
          <p className="reveal" data-delay="1">
            FoxWing Productions brings cinematic ambition to every frame, from intimate
            character dramas to neon-lit thrillers. We shepherd projects from first myth
            to final picture, pairing creative instinct with the production rigour a
            great film demands.
          </p>
          <p className="reveal" data-delay="2">
            Founded and led by producers who came up through the camera and the cutting
            room, we know the craft from the inside. Whatever the genre, our goal is the
            same: work that resonates deeply and leaves a lasting impression.
          </p>
          <div className="reveal" data-delay="3">
            <a className="link-underline" href="#work">
              See the work
              <svg
                className="arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
