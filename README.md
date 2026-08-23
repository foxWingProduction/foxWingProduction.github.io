# FoxWing Productions Website

Marketing site for [FoxWing Productions](https://foxwingproductions.com), a
Toronto-based film production company.

React + TypeScript, built with Vite and prerendered to static HTML, deployed to
GitHub Pages.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # prerender to dist/
npm run preview    # serve the built output
npm run typecheck
```

## Project structure

```
src/
├── main.tsx              entry; mounts the router
├── routes.tsx            route table + per-route <head>
├── pages/                one component per route
│   ├── Home.tsx
│   ├── Films.tsx
│   └── Bio.tsx           one template, five biographies
├── components/
│   ├── layout/           Nav, Footer, Layout, chrome, Seo
│   ├── home/             the home page sections, in page order
│   ├── films/            FilmRecord
│   └── ui/               SplitText, Lightbox, Icon
├── hooks/                one behaviour each (see below)
├── data/                 all copy and content, typed
├── types/content.ts      the content model
└── styles/main.css       the whole design system
public/
├── images/               brand · films · gallery · team · studio
└── CNAME
```

### Routes

Each route prerenders to its own `index.html`, so the live URLs and their
metadata are unchanged from the original static site.

| URL | Page |
|---|---|
| `/` | Home |
| `/projects` | Films, with genre filters |
| `/rosa-riad`, `/conor-forrest`, `/erhun-abbasli`, `/aleksandra-filatova`, `/alexandra-sklokin` | Biographies |

### Hooks

The interaction layer is split one behaviour per hook. Each cleans up after
itself so it survives client-side navigation, and every one is disabled under
`prefers-reduced-motion`.

| Hook | Does |
|---|---|
| `usePreloader` | Holds the curtain until the hero reel is actually playing |
| `useCursor` | The trailing ring and dot |
| `useScrollEngine` | Progress bar, nav state and parallax on one rAF |
| `useReveal` | Adds `.in` as elements scroll into view |
| `useCounters` | Counts the stats up from zero |
| `useScrollspy` | Highlights the nav link for the section in view |
| `useVimeoBackground` | The hero showreel, sized to cover by measurement |
| `useBackgroundVideo` | Muted YouTube loops, loaded only when near the viewport |
| `useFilmPreviews` | Hover cycles a film card's stills |
| `useMagnetic` | The CTA leans toward the pointer |

## Editing content

Everything editable lives in `src/data/` and needs no component changes:

| What | Where |
|---|---|
| Films, credits, stills | `films.ts` |
| Biographies | `team.ts` |
| The production roadmap | `roadmap.ts` |
| Stats, work grid, gallery | `home.ts` |
| Contact details, nav, **video ids and start times** | `site.ts` |

To swap a background video, change its entry in `site.ts`:

```ts
export const videos = {
  hero:     { vimeoId: '…', start: 46, quality: '1080p' },
  roadmap:  { youtubeId: '…', start: 68 },
  contact:  { youtubeId: '…', start: 9 },
};
```

`start` is the second the clip begins from.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. The custom domain is held in `public/CNAME`.
Set Pages → Source to **GitHub Actions** in the repository settings.

## Notes

- `main.css` is the original stylesheet, unchanged. Components render the class
  names it already expects, which is what keeps the design identical.
- Headings that animate word by word use `<SplitText>`, which renders the word
  spans directly rather than mutating the DOM after load, so the prerendered
  markup and the hydrated markup match.
