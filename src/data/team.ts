import type { TeamMember } from '@/types/content';

/** Everyone on the roster. Only those with `prose` content and not `hidden`
 *  get a bio page/route; only those in `featuredTeam` appear on the home
 *  page's talent grid. */
export const team: TeamMember[] = [
  {
    "slug": "rosa-riad",
    "name": "Rosa Riad",
    "role": "Founder / Executive Producer",
    "tags": [
      "Management",
      "Camera",
      "Direction"
    ],
    "photo": "/images/team/fullsize/rosa-riad.jpg",
    "hidden": true,
    "socials": [],
    "prose": [
      {
        "dropcap": true,
        "html": "Welcome to my world of cinematic passion and expertise! I'm Rosa Riad, a proud graduate from York University's esteemed Film Production program. With a rich background in the world of filmmaking, I've donned multiple hats throughout my journey."
      },
      {
        "dropcap": false,
        "html": "My journey began with an invaluable experience at Canada Film Equipment, where I not only served as the head of customer service but also as a versatile camera technician and a proficient grip and electric technician. These roles allowed me to delve deep into the intricacies of equipment, ensuring seamless operations on set and a keen eye for detail in every shot."
      },
      {
        "dropcap": false,
        "html": "However, my heart has always been drawn to the creative realm of producing and screenwriting. Over the years, I've honed my skills in these areas, crafting captivating narratives and orchestrating the various elements that breathe life into a film. My time on set has been a journey through various departments, but my focal point has always been the camera department. The art of capturing moments in time, translating emotions through lenses, and creating visual narratives fuels my passion."
      },
      {
        "dropcap": false,
        "html": "Film, for me, is a symphony of creativity and technical precision, and I'm dedicated to weaving both elements seamlessly into every project I touch. From crafting compelling screenplays that resonate with audiences to meticulously curating the visual tapestry of each scene, I approach every endeavor with a blend of expertise and fervor."
      },
      {
        "dropcap": false,
        "html": "Join me as we venture into the realm of storytelling, where every frame holds a world of wonder and every script has the power to touch hearts."
      },
      {
        "dropcap": false,
        "html": "Thank you for being a part of this cinematic odyssey."
      },
      {
        "dropcap": false,
        "html": "Warmly,<br><span class=\"bio__sign\">Rosa Riad</span>"
      }
    ],
    "title": "Rosa Riad | FoxWing Productions",
    "description": "Rosa Riad, Co-Founder & Producer at FoxWing Productions. York University film production graduate with a focus on producing, screenwriting and the camera department."
  },
  {
    "slug": "conor-forrest",
    "name": "Conor Forrest",
    "role": "Director of Development",
    "tags": [
      "Direction",
      "Screenwriting"
    ],
    "photo": "/images/team/fullsize/conor-forrest.jpg",
    "socials": [
      {
        "href": "https://www.facebook.com/sbunny.forrest/",
        "label": "Facebook",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8 0 14.7 0 12.3 0 10.8 1.5 10.8 4.1V6H8v3h2.8v8h3.2V9z\"/></svg>"
      },
      {
        "href": "https://www.imdb.com/name/nm10545957/?ref_=tt_ov_dr",
        "label": "IMDb",
        "svg": "<span class=\"imdb-mark\">IMDb</span>"
      },
      {
        "href": "https://www.instagram.com/conor.forrestlcp/",
        "label": "Instagram",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>"
      },
      {
        "href": "https://littlecatpictures.com/director",
        "label": "Website",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M2.5 12h19M12 2.5c2.8 2.5 4.2 6 4.2 9.5S14.8 19 12 21.5C9.2 19 7.8 15.5 7.8 12S9.2 5 12 2.5Z\"/></svg>"
      }
    ],
    "prose": [
      {
        "dropcap": true,
        "html": "Conor Forrest is a Canadian, Chinese, and British writer/director in Toronto with a passion for both fiction and documentary filmmaking. He got his Bachelor of Fine Arts in Film Production at York University, class of 2021. His recent achievements include having his short film Used Furniture (2022) acquired by CBC Gem and released on their Canadian Reflections Platform in April 2023. His feature-length documentary Unravelling The Ravelled Mind (2022) was picked up by Amazon Prime Video. Conor's mission is to raise awareness of the challenges and discrimination faced by children with ADHD through his work. He has particular expertise in crafting character-driven dramas and comedies that explore coming-of-age themes and dysfunctional family dynamics. Conor's films have been screened at various festivals, including the LA Shorts International Film Festival, Catalina Film Festival, Forest City Film Festival and Yorkton Film Festival. In March 2023 he was selected into the Sundance Collab: Preparing To Direct Your First Feature Film Course taught by Fire Island (2022) director Andrew Ahn. In May 2023 he was selected as one of only three filmmakers for the RBC Yorkton Film Festival Mentorship Program."
      }
    ],
    "title": "Conor Forrest | FoxWing Productions",
    "description": "Conor Forrest, Director of Development at FoxWing Productions. Canadian, Chinese and British writer/director with work on CBC Gem and Amazon Prime Video."
  },
  {
    "slug": "erhun-abbasli",
    "name": "Erhun Abbasli",
    "role": "Marketing Director",
    "tags": [
      "Marketing",
      "Media",
      "Distribution"
    ],
    "photo": "/images/team/fullsize/erhun-abbasli.jpg",
    "socials": [
      {
        "href": "https://www.facebook.com/erhunabbasli?mibextid=LQQJ4d",
        "label": "Facebook",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8 0 14.7 0 12.3 0 10.8 1.5 10.8 4.1V6H8v3h2.8v8h3.2V9z\"/></svg>"
      },
      {
        "href": "https://www.linkedin.com/in/erhun-abbasli/",
        "label": "LinkedIn",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z\"/></svg>"
      },
      {
        "href": "https://instagram.com/erhunabbasli?igshid=MzRlODBiNWFlZA==",
        "label": "Instagram",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>"
      }
    ],
    "prose": [
      {
        "dropcap": true,
        "html": "Hey there! My name is Erhun Abbasli, and I am excited to share my story here. Originally from Azerbaijan, I came to Canada with a passion for film production. I studied at York University, earning my BFA in Film Production, which laid the groundwork for my love of filmmaking."
      },
      {
        "dropcap": false,
        "html": "But I didn't stop there. My fascination extended beyond the camera and into the world of business and social media marketing. During my academic years, I transformed a small passion project into a thriving film community \"Filmmking\" on social media, connecting with 360K followers of content creators and filmmakers from around the world."
      },
      {
        "dropcap": false,
        "html": "My journey also includes collaborations with major filmmaking brands, where I've had the chance to get creative, organize successful campaigns, and pay attention to the finer details. Now, as the Social Media Marketing Specialist at FoxWing Productions, my goal is to harness the potential of social media to elevate our cinematic adventures."
      },
      {
        "dropcap": false,
        "html": "I'm on a mission to engage audiences, build connections, and explore the endless possibilities of storytelling."
      },
      {
        "dropcap": false,
        "html": "Cheers,<br><span class=\"bio__sign\">Erhun Abbasli</span>"
      }
    ],
    "title": "Erhun Abbasli | FoxWing Productions",
    "description": "Erhun Abbasli, Marketing Director at FoxWing Productions. York University BFA in Film Production and founder of the 360K-strong Filmmking community."
  },
  {
    "slug": "aleksandra-filatova",
    "name": "Aleksandra Filatova",
    "role": "Co-Founder / Producer",
    "tags": [
      "Production",
      "Direction",
      "Management"
    ],
    "photo": "/images/team/fullsize/aleksandra-filatova.jpg",
    "socials": [
      {
        "href": "https://www.facebook.com/profile.php?id=100010053002277",
        "label": "Facebook",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.8 0 14.7 0 12.3 0 10.8 1.5 10.8 4.1V6H8v3h2.8v8h3.2V9z\"/></svg>"
      },
      {
        "href": "https://www.imdb.com/name/nm11414546/",
        "label": "IMDb",
        "svg": "<span class=\"imdb-mark\">IMDb</span>"
      },
      {
        "href": "https://www.linkedin.com/in/aleksandra-filatova-767b07209/",
        "label": "LinkedIn",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z\"/></svg>"
      },
      {
        "href": "mailto:aleksandra@foxwingproductions.com",
        "label": "Email",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"4.5\" width=\"19\" height=\"15\" rx=\"2\"/><path d=\"m3 6 9 7 9-7\"/></svg>"
      }
    ],
    "prose": [
      {
        "dropcap": true,
        "html": "Allow me to introduce myself. My name is Aleksandra Filatova, and I am passionate about the world of cinema. After studying at York University, I proudly earned a bachelor's degree in film production, an achievement that solidified my foundation in this captivating industry. Throughout my journey in the world of film, I have had the privilege of working on numerous feature films as an assistant director. These experiences have allowed me to witness firsthand the inner workings of large-scale productions and gain invaluable insights into the art of filmmaking. Collaborating with talented directors, producers, and crew members, I have learned to navigate the fast-paced and sometimes unpredictable nature of the industry, honing my skills and expanding my knowledge every step of the way."
      },
      {
        "dropcap": false,
        "html": "In addition to my work as an assistant director, I have also taken on the role of a producer, dedicating my time and energy to bringing various short films to life. These projects have provided me with an opportunity to exercise my creativity, organizational abilities, and attention to detail. From managing budgets and assembling a skilled team to overseeing the production process and ensuring the smooth execution of each project, I have embraced the challenges and rewards of being a producer wholeheartedly."
      },
      {
        "dropcap": false,
        "html": "I am eager to take on new challenges and push the boundaries of my creativity. The power of film to evoke emotions, inspire discussions, and provoke change is what truly drives me. Whether it's through compelling narratives, thought-provoking documentaries, or visually stunning productions, I want my work to resonate deeply with audiences and leave a lasting impression."
      },
      {
        "dropcap": false,
        "html": "I am very excited to share my unique perspective, creativity, and passion with the world, as I embark on this exhilarating journey of bringing cinematic magic to life."
      },
      {
        "dropcap": false,
        "html": "Warmly,<br><span class=\"bio__sign\">Aleksandra Filatova</span>"
      }
    ],
    "title": "Aleksandra Filatova | FoxWing Productions",
    "description": "Aleksandra Filatova, Co-Founder & Producer at FoxWing Productions, a York University film production graduate and producer of award-driven short films."
  },
  {
    "slug": "alexandra-sklokin",
    "name": "Alexandra Sklokin",
    "role": "Website Designer",
    "tags": [
      "CS",
      "Math",
      "ML",
      "AI"
    ],
    "photo": "/images/team/fullsize/alexandra-sklokin.jpg",
    "socials": [
      {
        "href": "https://github.com/alexandrasklokin",
        "label": "GitHub",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z\"/></svg>"
      },
      {
        "href": "https://www.linkedin.com/in/alexandrasklokin/",
        "label": "LinkedIn",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z\"/></svg>"
      },
      {
        "href": "mailto:alexandrasklokin@gmail.com",
        "label": "Email",
        "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"4.5\" width=\"19\" height=\"15\" rx=\"2\"/><path d=\"m3 6 9 7 9-7\"/></svg>"
      }
    ],
    "prose": [
      {
        "dropcap": true,
        "html": "Alexandra designed and built FoxWing's website, bringing a background in computer science, mathematics, machine learning and AI to the studio's digital presence."
      }
    ],
    "title": "Alexandra Sklokin | FoxWing Productions",
    "description": "Alexandra Sklokin, Website Designer at FoxWing Productions, with a background in computer science, mathematics and machine learning."
  },
  {
    "slug": "al-raffay-mirza",
    "name": "Al-Raffay Mirza",
    "role": "Head Producer",
    "tags": [
      "Production"
    ],
    "photo": "/images/team/fullsize/al-raffay-mirza.jpg",
    "socials": [],
    "prose": [],
    "title": "Al-Raffay Mirza | FoxWing Productions",
    "description": "Al-Raffay Mirza, Head Producer at FoxWing Productions."
  },
  {
    "slug": "mustafa-el-sayed",
    "name": "Mustafa El Sayed",
    "role": "Producer",
    "tags": [
      "Production"
    ],
    "photo": "/images/team/fullsize/mustafa-el-sayed.jpg",
    "socials": [],
    "prose": [],
    "title": "Mustafa El Sayed | FoxWing Productions",
    "description": "Mustafa El Sayed, Producer at FoxWing Productions."
  },
  {
    "slug": "zaid-habayeb",
    "name": "Zaid Habayeb",
    "role": "Actor",
    "tags": [
      "Acting"
    ],
    "photo": "/images/team/fullsize/zaid-habayeb.jpg",
    "socials": [],
    "prose": [],
    "title": "Zaid Habayeb | FoxWing Productions",
    "description": "Zaid Habayeb, Actor at FoxWing Productions."
  }
];

export const memberBySlug = (slug: string): TeamMember | undefined =>
  team.find((m) => m.slug === slug);

/** The talent grid on the home page. */
export const featuredTeam = ['rosa-riad', 'al-raffay-mirza', 'mustafa-el-sayed', 'zaid-habayeb'];
