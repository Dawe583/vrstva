/**
 * Centrální katalog obrázků. Každý obrázek má kurátorskou Unsplash fotku
 * (primární) a picsum seed jako spolehlivý fallback (viz komponenta Img,
 * onError přepne na fallback => web nikdy neukáže rozbitý obrázek).
 *
 * Chceš vlastní fotky nebo přesné Unsplash URL? Uprav jen tenhle soubor.
 */

const U = (id: string, w = 1400, h = 0) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${
    h ? `&h=${h}` : ""
  }&q=80`;

const P = (seed: string, w = 1400, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Pic = { src: string; fallback: string; alt: string };

const pic = (id: string, seed: string, alt: string, w = 1400, h = 1000): Pic => ({
  src: U(id, w, h),
  fallback: P(seed, w, h),
  alt,
});

export const IMAGES = {
  hero: pic("1618005182384-a83a8bd57fbe", "vrstva-hero", "Abstraktní 3D vizuál", 1400, 1000),

  services: {
    webdesign: pic("1559028012-481c04fa702d", "vrstva-webdesign", "Ukázka web designu", 1200, 900),
    analytics: pic("1551288049-bebda4e38f71", "vrstva-analytics", "Měření výkonu webu", 1200, 700),
  },

  projects: [
    pic("1618005182384-a83a8bd57fbe", "vrstva-bystra", "Projekt Bystrá — fintech", 1300, 900),
    pic("1600607687939-ce8a6c25118c", "vrstva-atelier", "Projekt Atelier Hana Marek", 1300, 900),
    pic("1510812431401-41d2bd2722f3", "vrstva-vino", "Projekt Roubal a syn — vinařství", 1300, 900),
    pic("1566073771259-6a8506099945", "vrstva-hotel", "Projekt Mezanin — hotel", 1300, 900),
  ] as Pic[],

  team: [
    pic("1500648767791-00dcc994a43e", "vrstva-team-1", "Portrét člena týmu", 600, 760),
    pic("1494790108377-be9c29b29330", "vrstva-team-2", "Portrét členky týmu", 600, 760),
    pic("1507003211169-0a1dd7228f2d", "vrstva-team-3", "Portrét člena týmu", 600, 760),
    pic("1438761681033-6461ffad8d80", "vrstva-team-4", "Portrét členky týmu", 600, 760),
  ] as Pic[],

  journal: [
    pic("1561070791-2526d30994b5", "vrstva-journal-1", "Náhled článku", 800, 560),
    pic("1481487196290-c152efe083f5", "vrstva-journal-2", "Náhled článku", 800, 560),
    pic("1517180102446-f3ece451e9d8", "vrstva-journal-3", "Náhled článku", 800, 560),
  ] as Pic[],

  case: {
    cover: pic("1620121692029-d088224ddc74", "vrstva-case-cover", "Case study — úvodní vizuál", 1400, 900),
    shots: [
      pic("1559028012-481c04fa702d", "vrstva-case-1", "Detail projektu", 900, 640),
      pic("1551288049-bebda4e38f71", "vrstva-case-2", "Detail projektu", 900, 640),
      pic("1517245386807-bb43f82c33c4", "vrstva-case-3", "Detail projektu", 900, 640),
    ] as Pic[],
  },

  about: pic("1497366216548-37526070297c", "vrstva-about", "Studio Vrstva", 1200, 1500),
} as const;
