import type { RouteRecord } from "vite-react-ssg";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { Root } from "@/components/layout/Root";
import { Seo } from "@/components/layout/Seo";
import Home from "@/pages/Home";
import Films from "@/pages/Films";
import Services from "@/pages/Services";
import Bio from "@/pages/Bio";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/images/brand/wordmark.png`,
  description: "Toronto-based film production company.",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  sameAs: [site.instagram],
};

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <>
            <Seo
              title="FoxWing Productions | Toronto Film Production Company"
              ogTitle="FoxWing Productions | Myth to Picture"
              description="FoxWing Productions is a Toronto-based film production company. Myth to picture: unleashing cinematic wonders across film, commercial and music video. Full-service production: locations, casting, crew, equipment and management."
              ogImage={`${site.url}/images/brand/og-cover.jpg`}
              jsonLd={organizationJsonLd}
            />
            <Home />
          </>
        ),
      },
      {
        path: "filmography",
        element: (
          <>
            <Seo
              path="/filmography"
              title="Films | FoxWing Productions"
              description="The films of FoxWing Productions: Return To Sender, Insomnia, Rooted Remedy, Ava, First Fan, Tarantino, Daddy-O, I'm Only Visiting and DELIVERY. Award-driven cinema produced in Toronto."
            />
            <Films />
          </>
        ),
      },
      {
        path: "services",
        element: (
          <>
            <Seo
              path="/services"
              title="Services | FoxWing Productions"
              description="Full-service film production in Toronto: research, budgeting, locations & permits, casting, crew hiring, equipment, production management and logistics, one team from first myth to final picture."
            />
            <Services />
          </>
        ),
      },
      ...team.filter((member) => member.prose.length > 0 && !member.hidden).map((member) => ({
        path: member.slug,
        element: (
          <>
            <Seo
              path={`/${member.slug}`}
              title={member.title}
              description={member.description}
            />
            <Bio member={member} />
          </>
        ),
      })),
    ],
  },
];
