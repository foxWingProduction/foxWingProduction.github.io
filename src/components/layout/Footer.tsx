import { Link } from 'react-router-dom';
import { footerLinks, site } from '@/data/site';

/** Internal routes get a <Link>; hashes, mailto and external URLs stay <a>. */
function FooterLink({ href, label }: { href: string; label: string }) {
  const isRoute = href.startsWith('/') && !href.startsWith('/#');
  return isRoute ? <Link to={href}>{label}</Link> : <a href={href}>{label}</a>;
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand-lockup">
              <img src="/images/brand/logo.png" alt="" />
              <span className="brand-lockup__txt">
                <span className="name">FoxWing</span>
                <span className="sub">Productions</span>
              </span>
            </span>
            <p className="footer__tag">
              Myth to picture: <em>unleashing cinematic wonders</em>.
            </p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <h5>Explore</h5>
              {footerLinks.explore.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </div>
            <div className="footer__col">
              <h5>Connect</h5>
              {footerLinks.connect.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Toronto, Canada</span>
        </div>
      </div>
    </footer>
  );
}
