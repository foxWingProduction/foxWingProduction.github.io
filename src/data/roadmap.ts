import type { RoadmapStep, RailGroup } from '@/types/content';

/** The production pipeline, shown as an ARIA tablist under "What we do". */
export const roadmapSteps: RoadmapStep[] = [
  {
    "n": "01",
    "name": "Film-Related Research",
    "phase": "Development",
    "title": "Film-Related Research",
    "text": "Conducting research related to the film's subject matter, historical context, or any other elements that require in-depth knowledge for an accurate portrayal.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2\"/><path d=\"M2.5 9h19M7 5v4M12 5v4M17 5v4M7 19v-4M12 19v-4M17 19v-4\"/></svg>"
  },
  {
    "n": "02",
    "name": "Budget & Scheduling",
    "phase": "Development",
    "title": "Budget & Scheduling",
    "text": "Developing a comprehensive budget that outlines expenses and revenue sources for the film. Creating a production schedule that outlines when and where each scene will be shot.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"4.5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M3 9h18M8 2.5v4M16 2.5v4\"/></svg>"
  },
  {
    "n": "03",
    "name": "Location Services & Permits",
    "phase": "Pre-Production",
    "title": "Location Services & Permits",
    "text": "Finding suitable filming locations, obtaining necessary permits, and ensuring legal compliance to shoot at those locations.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg>"
  },
  {
    "n": "04",
    "name": "Casting",
    "phase": "Pre-Production",
    "title": "Casting",
    "text": "Holding auditions, selecting actors for roles, and negotiating contracts with them.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"13\" rx=\"2\"/><circle cx=\"9\" cy=\"10\" r=\"2.3\"/><path d=\"M5.5 16c.6-1.8 2-2.7 3.5-2.7s2.9.9 3.5 2.7M15 8h4M15 12h3M9 21h6\"/></svg>"
  },
  {
    "n": "05",
    "name": "Crew Hiring",
    "phase": "Pre-Production",
    "title": "Crew Hiring",
    "text": "Hiring and managing the various crew members necessary for a film production, including the director of photography, sound engineer, production designer, etc.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><circle cx=\"17\" cy=\"9.5\" r=\"2.3\"/><path d=\"M3.5 19c.6-3 2.9-4.6 5.5-4.6s4.9 1.6 5.5 4.6M16 13.5c2.2.2 3.8 1.6 4.3 3.9\"/></svg>"
  },
  {
    "n": "06",
    "name": "Equipment Rental",
    "phase": "Pre-Production",
    "title": "Equipment Rental",
    "text": "Procuring and renting the necessary filming equipment, such as cameras, lighting, sound equipment, and props.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M3 7h11v10H3z\"/><circle cx=\"8.5\" cy=\"12\" r=\"2.3\"/><path d=\"M14 10.5 21 7v10l-7-3.5zM3 7l2-2h6l2 2\"/></svg>"
  },
  {
    "n": "07",
    "name": "Production Management",
    "phase": "Production",
    "title": "Production Management",
    "text": "Overseeing the day-to-day operations of the film production, including managing the crew, coordinating activities, and problem-solving.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"9\" y=\"15\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"M6 9v3a2 2 0 0 0 2 2h4M18 15v-2a2 2 0 0 0-2-2h-4\"/></svg>"
  },
  {
    "n": "08",
    "name": "Transport & Logistical Services",
    "phase": "Production",
    "title": "Transport & Logistical Services",
    "text": "Arranging transportation for crew and equipment to and from filming locations. Managing logistics such as catering, accommodation, and scheduling.",
    "icon": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z\"/><circle cx=\"6\" cy=\"17.5\" r=\"1.8\"/><circle cx=\"17\" cy=\"17.5\" r=\"1.8\"/></svg>"
  }
];

/** Phase headings interleaved into the rail before the given step number. */
export const railGroups: RailGroup[] = [
  {
    "label": "Development",
    "beforeStep": 1
  },
  {
    "label": "Pre-Production",
    "beforeStep": 3
  },
  {
    "label": "Production",
    "beforeStep": 7
  }
];
