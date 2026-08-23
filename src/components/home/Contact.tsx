import { useRef } from 'react';
import { site, videos } from '@/data/site';
import { SplitText } from '@/components/ui/SplitText';
import { useBackgroundVideo } from '@/hooks/useBackgroundVideo';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useBackgroundVideo(ref, '.contact__frame', videos.contact.youtubeId, videos.contact.start);

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="contact__bg" aria-hidden="true">
        <img
          className="contact__poster"
          src="/images/films/rooted-remedy/still-1.jpg"
          alt=""
          loading="lazy"
        />
        <iframe
          className="contact__frame"
          title=""
          tabIndex={-1}
          aria-hidden="true"
          allow="autoplay; encrypted-media"
        />
        <span className="contact__scrim" />
      </div>

      <div className="container">
        <div className="contact__head">
          <p className="eyebrow centered reveal">Let's collaborate</p>
          <SplitText as="h2" className="contact__title">
            Have a story <em>worth telling?</em>
          </SplitText>
          <p className="lead reveal" data-delay="1">
            Ready to start your next project with us? Send us a message and we'll get back
            to you as soon as possible.
          </p>
        </div>

        <form
          className="form reveal"
          data-delay="2"
          action="mailto:rosa@foxwingproductions.com"
          method="post"
          encType="text/plain"
        >
          <div className="form__row">
            <div className="field">
              <input type="text" id="cf-name" name="Name" placeholder=" " required />
              <label htmlFor="cf-name">Your name</label>
            </div>
            <div className="field">
              <input type="email" id="cf-email" name="Email" placeholder=" " required />
              <label htmlFor="cf-email">Email address</label>
            </div>
          </div>
          <div className="field">
            <input type="text" id="cf-subject" name="Project" placeholder=" " />
            <label htmlFor="cf-subject">Project / subject</label>
          </div>
          <div className="field">
            <textarea id="cf-message" name="Message" rows={3} placeholder=" " required />
            <label htmlFor="cf-message">Tell us about your project</label>
          </div>
          <button type="submit" className="btn btn--solid form__send">
            Send message
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </button>
        </form>

        <div className="contact__cards reveal" data-delay="3">
          <a className="contact__card" href={`mailto:${site.email}`}>
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
              </svg>
            </span>
            <span className="tx">
              <span className="k">Email</span>
              <span className="v">
                contact@<wbr />foxwingproductions.com
              </span>
            </span>
          </a>
          <a className="contact__card" href={site.instagram}>
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span className="tx">
              <span className="k">Instagram</span>
              <span className="v">{site.instagramHandle}</span>
            </span>
          </a>
          <div className="contact__card">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M12 21.5s7.2-6.7 7.2-11.4a7.2 7.2 0 1 0-14.4 0C4.8 14.8 12 21.5 12 21.5Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
            </span>
            <span className="tx">
              <span className="k">Studio base</span>
              <span className="v">{site.locationLabel}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
