#!/usr/bin/env node
/**
 * Walks the built dist/ output for every index.html (vite-react-ssg's
 * nested dirStyle means one per route) and writes sitemap.xml + robots.txt
 * from that. Driven by the actual build output rather than duplicating the
 * route list from routes.tsx, so it can never drift out of sync as films or
 * team members are added, removed or hidden.
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://foxwingproductions.com';
const DIST = fileURLToPath(new URL('../dist', import.meta.url));

function findRoutes(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'assets' || entry === 'images') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findRoutes(full, out);
    } else if (entry === 'index.html') {
      const rel = relative(DIST, full).replace(/index\.html$/, '');
      out.push(rel === '' ? '/' : `/${rel}`);
    }
  }
  return out;
}

const routes = findRoutes(DIST).sort((a, b) => a.localeCompare(b));
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(`sitemap.xml: ${routes.length} routes`);
routes.forEach((r) => console.log(`  ${r}`));
