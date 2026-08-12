import { useState } from 'react';
import { gallery } from '@/data/home';
import { SplitText } from '@/components/ui/SplitText';
import { Lightbox } from '@/components/ui/Lightbox';

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="section bg-charcoal section--close-top section--close-bottom" id="gallery">
        <div className="container">
          <div className="section-head centered">
            <p className="eyebrow centered reveal">From the set</p>
            <SplitText as="h2" className="section-title">
              A look behind the <em>lens</em>.
            </SplitText>
          </div>
        </div>
        <div className="gallery__grid reveal">
          {gallery.map((g, i) => (
            <a
              key={g.full}
              className="gallery__item"
              data-cursor="Open"
              href={g.full}
              onClick={(e) => {
                e.preventDefault();
                setOpen(i);
              }}
            >
              <img src={g.thumb} alt="On-set photography" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <Lightbox
        sources={gallery.map((g) => g.full)}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </>
  );
}
