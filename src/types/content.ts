export interface Still {
  src: string;
  /** Source frame carries baked-in letterbox bars and must be cropped past them. */
  scope: boolean;
}

export interface Credit {
  role: string;
  people: string;
}

export interface Film {
  id: string;
  slug: string;
  title: string;
  year: string;
  /** Human-readable genre words shown in the year line, e.g. ["Action", "Thriller"]. */
  genreLabels: string[];
  /** Lowercase keys the genre filter matches against. */
  genres: string[];
  synopsis: string;
  credits: Credit[];
  stills: Still[];
}

export interface RoadmapStep {
  n: string;
  name: string;
  phase: string;
  title: string;
  text: string;
  /** Inline SVG markup for the phase icon. */
  icon: string;
}

export interface RailGroup {
  label: string;
  beforeStep: number;
}

export interface Social {
  href: string;
  label: string;
  svg: string;
}

export interface ProseBlock {
  dropcap: boolean;
  html: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  tags: string[];
  photo: string;
  socials: Social[];
  prose: ProseBlock[];
  title: string;
  description: string;
}
