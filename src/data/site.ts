/** Single source of truth for identity, contact details and navigation. */
export const site = {
  name: 'FoxWing Productions',
  url: 'https://foxwingproductions.com',
  email: 'contact@foxwingproductions.com',
  instagram: 'https://www.instagram.com/foxwingproductions/',
  instagramHandle: '@foxwingproductions',
  city: 'Toronto',
  region: 'ON',
  country: 'CA',
  locationLabel: 'Toronto, Ontario \u00b7 Canada',
  tagline: 'Myth to picture: unleashing cinematic wonders.',
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** id of the home-page section this link tracks, for the scrollspy. */
  section?: string;
}

/** Home tracks its own sections with the scrollspy. */
export const navLinks: NavLink[] = [
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Services', href: '/#services', section: 'services' },
  { label: 'Work', href: '/#work', section: 'work' },
  { label: 'Gallery', href: '/#gallery', section: 'gallery' },
  { label: 'Talent', href: '/#team', section: 'team' },
];

/** Inner pages swap in a shorter set led by Films, and mark their own entry. */
export const innerNavLinks: NavLink[] = [
  { label: 'Films', href: '/filmography' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Talent', href: '/#team' },
];

export const footerLinks = {
  explore: [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Films', href: '/filmography' },
    { label: 'Talent', href: '/#team' },
  ],
  connect: [
    { label: 'Email', href: `mailto:${site.email}` },
    { label: 'Instagram', href: site.instagram },
    { label: 'Contact', href: '/#contact' },
  ],
};

/** Background clips. Swapping a video means changing only these. */
export const videos = {
  hero: { vimeoId: '1198577114', start: 68, quality: '1080p' },
  roadmap: { youtubeId: 'yTUklOpcp6Q', start: 68 },
  contact: { youtubeId: '1TsgF3FuEC0', start: 9 },
} as const;
