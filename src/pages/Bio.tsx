import { Link } from 'react-router-dom';
import type { TeamMember } from '@/types/content';
import { Layout } from '@/components/layout/Layout';
import { useReveal } from '@/hooks/useReveal';
import { useScrollEngine } from '@/hooks/useScrollEngine';

/** One template for all five team biographies. */
export default function Bio({ member }: { member: TeamMember }) {
  useReveal();
  useScrollEngine();

  return (
    <Layout condensed variant="inner" activeLabel="Team">
      <main className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container">
          <Link className="link-underline" to="/#team" style={{ marginBottom: '2.5rem' }}>
            <svg
              className="arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              style={{ transform: 'rotate(180deg)' }}
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Back to team
          </Link>
          <div className="bio" style={{ marginTop: '2.5rem' }}>
            <div className="bio__media reveal in">
              <img src={member.photo} alt={member.name} />
            </div>
            <div className="reveal in" data-delay="1">
              <p className="bio__role">{member.role}</p>
              <h1 className="bio__name">{member.name}</h1>
              <div className="bio__tags">
                {member.tags.map((t) => (
                  <span className="bio__tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="bio__socials">
                {member.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    aria-label={s.label}
                    dangerouslySetInnerHTML={{ __html: s.svg }}
                  />
                ))}
              </div>
              <div className="bio__prose">
                {member.prose.map((p, i) => (
                  <p
                    key={i}
                    className={p.dropcap ? 'dropcap' : undefined}
                    dangerouslySetInnerHTML={{ __html: p.html }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
