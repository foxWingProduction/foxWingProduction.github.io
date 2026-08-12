import { Link } from 'react-router-dom';
import { featuredTeam, team } from '@/data/team';
import { SplitText } from '@/components/ui/SplitText';

/** Home-page social labels name the person; the bio page labels do not. */
const socialLabel = (label: string, name: string) =>
  label === 'Email' ? `Email ${name}` : `${name} on ${label}`;

export function Team() {
  const members = team.filter((m) => featuredTeam.includes(m.slug));

  return (
    <section className="section section--close-top" id="team">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow reveal">The people</p>
          <SplitText as="h2" className="section-title">
            Behind <em>FoxWing</em>.
          </SplitText>
        </div>
        <div className="team__grid team__grid--single">
          {members.map((m) => (
            <div className="member reveal" key={m.slug}>
              <div className="member__media">
                <img
                  src={m.photo.replace('/fullsize/', '/thumbnails/')}
                  alt={m.name}
                  loading="lazy"
                />
                <div className="member__socials">
                  {m.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      aria-label={socialLabel(s.label, m.name)}
                      dangerouslySetInnerHTML={{ __html: s.svg }}
                    />
                  ))}
                </div>
              </div>
              <div className="member__info">
                <div>
                  <div className="member__name">{m.name}</div>
                  <div className="member__role">{m.role}</div>
                </div>
                <span className="member__view">Read bio</span>
              </div>
              <Link
                className="member__stretch"
                to={`/${m.slug}`}
                aria-label={`Read bio: ${m.name}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
