import { Head } from 'vite-react-ssg';
import { site } from '@/data/site';

interface SeoProps {
  title: string;
  description: string;
  /** Path without a trailing slash, e.g. "/filmography". "" for the home page. */
  path?: string;
  ogTitle?: string;
  ogImage?: string;
  /** Emitted as an application/ld+json block when given. */
  jsonLd?: Record<string, unknown>;
}

/** Per-route <head>. Prerendered into the static HTML, so crawlers see it. */
export function Seo({ title, description, path = '', ogTitle, ogImage, jsonLd }: SeoProps) {
  const url = `${site.url}${path}/`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
