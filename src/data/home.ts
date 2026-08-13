import type { Still } from '@/types/content';

export interface Stat {
  count: number;
  pad: boolean;
  suffix: string;
  label: string;
  note: string;
}

export const stats: Stat[] = [
  {
    "count": 45,
    "pad": false,
    "suffix": "",
    "label": "Projects Produced",
    "note": "Film, commercial & music video"
  },
  {
    "count": 22,
    "pad": false,
    "suffix": "",
    "label": "Films Released",
    "note": "Selected work on the films page"
  },
  {
    "count": 50,
    "pad": false,
    "suffix": "+",
    "label": "Cast & Crew",
    "note": "Collaborators to date"
  }
];

export interface FilmCard {
  size: 'wide' | 'tall' | 'third' | 'half';
  href: string;
  title: string;
  /** Record on the filmography page this card scrolls to. */
  filmSlug: string;
  tags: string[];
  year: string;
  stills: Still[];
  delay: number | null;
  alt: string;
}

/** The selected-work mosaic. Order and tile sizes drive the grid layout. */
export const filmCards: FilmCard[] = [
  {
    "size": "wide",
    "href": "filmography",
    "title": "DELIVERY",
    "filmSlug": "delivery",
    "tags": [
      "Action",
      "Thriller"
    ],
    "year": "2023",
    "stills": [
      {
        "src": "/images/films/delivery/still-1.png",
        "scope": false
      },
      {
        "src": "/images/films/delivery/still-2.png",
        "scope": false
      },
      {
        "src": "/images/films/delivery/still-3.png",
        "scope": false
      },
      {
        "src": "/images/films/delivery/still-4.png",
        "scope": false
      }
    ],
    "delay": null,
    "alt": "Still from DELIVERY"
  },
  {
    "size": "tall",
    "href": "filmography",
    "title": "I'm Only Visiting",
    "filmSlug": "im-only-visiting",
    "tags": [
      "Mystery",
      "Thriller"
    ],
    "year": "2023",
    "stills": [
      {
        "src": "/images/films/im-only-visiting/still-1.jpg",
        "scope": true
      },
      {
        "src": "/images/films/im-only-visiting/still-2.jpg",
        "scope": true
      },
      {
        "src": "/images/films/im-only-visiting/still-3.jpg",
        "scope": true
      }
    ],
    "delay": 1,
    "alt": "Still from I'm Only Visiting"
  },
  {
    "size": "third",
    "href": "filmography",
    "title": "Daddy-O",
    "filmSlug": "daddy-o",
    "tags": [
      "Horror"
    ],
    "year": "2023",
    "stills": [
      {
        "src": "/images/films/daddy-o/still-1.png",
        "scope": false
      },
      {
        "src": "/images/films/daddy-o/still-2.png",
        "scope": false
      },
      {
        "src": "/images/films/daddy-o/still-3.png",
        "scope": false
      }
    ],
    "delay": null,
    "alt": "Still from Daddy-O"
  },
  {
    "size": "third",
    "href": "filmography",
    "title": "Tarantino",
    "filmSlug": "tarantino",
    "tags": [
      "Music Video"
    ],
    "year": "2023",
    "stills": [
      {
        "src": "/images/films/tarantino/still-1.jpg",
        "scope": false
      },
      {
        "src": "/images/films/tarantino/still-2.jpg",
        "scope": false
      },
      {
        "src": "/images/films/tarantino/still-3.jpg",
        "scope": false
      }
    ],
    "delay": 1,
    "alt": "Still from the Tarantino music video"
  },
  {
    "size": "third",
    "href": "filmography",
    "title": "First Fan",
    "filmSlug": "first-fan",
    "tags": [
      "Drama"
    ],
    "year": "2023",
    "stills": [
      {
        "src": "/images/films/first-fan/still-1.jpg",
        "scope": false
      },
      {
        "src": "/images/films/first-fan/still-2.jpg",
        "scope": false
      },
      {
        "src": "/images/films/first-fan/still-3.jpg",
        "scope": false
      }
    ],
    "delay": 2,
    "alt": "Still from First Fan"
  },
  {
    "size": "half",
    "href": "filmography",
    "title": "Ava",
    "filmSlug": "ava",
    "tags": [
      "Drama"
    ],
    "year": "2024",
    "stills": [
      {
        "src": "/images/films/ava/still-1.jpg",
        "scope": false
      },
      {
        "src": "/images/films/ava/still-2.jpg",
        "scope": false
      },
      {
        "src": "/images/films/ava/still-3.jpg",
        "scope": false
      }
    ],
    "delay": null,
    "alt": "Still from Ava"
  },
  {
    "size": "half",
    "href": "filmography",
    "title": "Rooted Remedy",
    "filmSlug": "rooted-remedy",
    "tags": [
      "Drama"
    ],
    "year": "2024",
    "stills": [
      {
        "src": "/images/films/rooted-remedy/still-1.jpg",
        "scope": false
      },
      {
        "src": "/images/films/rooted-remedy/still-2.jpg",
        "scope": false
      },
      {
        "src": "/images/films/rooted-remedy/still-3.jpg",
        "scope": false
      }
    ],
    "delay": 1,
    "alt": "Still from Rooted Remedy"
  }
];

export interface GalleryItem {
  full: string;
  thumb: string;
}

export const gallery: GalleryItem[] = [
  {
    "full": "/images/gallery/fullsize/1.jpg",
    "thumb": "/images/gallery/thumbnails/1.jpg"
  },
  {
    "full": "/images/gallery/fullsize/7.jpg",
    "thumb": "/images/gallery/thumbnails/7.jpg"
  },
  {
    "full": "/images/gallery/fullsize/24.jpg",
    "thumb": "/images/gallery/thumbnails/24.jpg"
  },
  {
    "full": "/images/gallery/fullsize/15.png",
    "thumb": "/images/gallery/thumbnails/15.png"
  },
  {
    "full": "/images/gallery/fullsize/14.jpg",
    "thumb": "/images/gallery/thumbnails/14.jpg"
  },
  {
    "full": "/images/gallery/fullsize/22.jpg",
    "thumb": "/images/gallery/thumbnails/22.jpg"
  },
  {
    "full": "/images/gallery/fullsize/23.jpg",
    "thumb": "/images/gallery/thumbnails/23.jpg"
  },
  {
    "full": "/images/gallery/fullsize/6.jpg",
    "thumb": "/images/gallery/thumbnails/6.jpg"
  },
  {
    "full": "/images/gallery/fullsize/12.jpg",
    "thumb": "/images/gallery/thumbnails/12.jpg"
  }
];
