import { IMAGES, type Pic } from "./images";

/** Projekty + hloubkový case study obsah (otevírá se v detailu). */
export type Project = {
  name: string;
  meta: string;
  tags: string[];
  cover: Pic;
  year: string;
  intro: string;
  challenge: string;
  approach: string;
  results: { k: string; v: string }[];
  shots: Pic[];
};

export const PROJECTS: Project[] = [
  {
    name: "Bystrá",
    meta: "Fintech aplikace",
    year: "2026",
    tags: ["Produktový design", "Vývoj", "Web"],
    cover: IMAGES.projects[0],
    intro:
      "Nová generace bankovní aplikace, která staví na důvěře a přehlednosti. Kompletní vizuální identita a produktový web.",
    challenge:
      "Fintech přeplněný trh, kde každá aplikace vypadá stejně. Bystrá potřebovala vyčnívat a zároveň působit důvěryhodně a bezpečně.",
    approach:
      "Postavili jsme klidný, sebevědomý vizuál s jedním výrazným akcentem a živými, ale nerušivými animacemi. Web vede návštěvníka od problému k řešení v pěti krocích.",
    results: [
      { k: "+118 %", v: "registrací za první kvartál" },
      { k: "1,4 s", v: "průměrné načtení stránky" },
      { k: "4,9/5", v: "hodnocení v App Store" },
    ],
    shots: IMAGES.case.shots,
  },
  {
    name: "Atelier Hana Marek",
    meta: "Architektura",
    year: "2025",
    tags: ["Web design", "Art direction"],
    cover: IMAGES.projects[1],
    intro:
      "Portfolio architektonického ateliéru, kde má hlavní slovo práce sama. Minimalismus, prostor a typografie.",
    challenge:
      "Ukázat desítky projektů tak, aby web nepůsobil jako katalog, ale jako galerie. Každá stavba si zaslouží pozornost.",
    approach:
      "Horizontální plátna, velké fotografie a jemné přechody. Web dýchá stejně jako stavby, které představuje.",
    results: [
      { k: "+65 %", v: "delší čas na stránce" },
      { k: "3×", v: "více poptávek na velké zakázky" },
      { k: "0", v: "šablon — vše na míru" },
    ],
    shots: IMAGES.case.shots,
  },
  {
    name: "Roubal a syn",
    meta: "E-shop vinařství",
    year: "2025",
    tags: ["E-commerce", "Branding", "Vývoj"],
    cover: IMAGES.projects[2],
    intro:
      "Rodinné vinařství s tradicí od roku 1921 dostalo e-shop, který prodává příběh stejně dobře jako víno.",
    challenge:
      "Přenést atmosféru sklepa a rodinné historie do online nákupu, aniž by se ztratila snadnost objednání.",
    approach:
      "Tmavá, hřejivá paleta, ruční detaily a plynulý checkout. Storytelling propletený s produktem.",
    results: [
      { k: "+212 %", v: "online obratu meziročně" },
      { k: "2,4×", v: "průměrná hodnota objednávky" },
      { k: "38 %", v: "návštěvníků z organiky" },
    ],
    shots: IMAGES.case.shots,
  },
  {
    name: "Mezanin",
    meta: "Hotel a rezervace",
    year: "2024",
    tags: ["Web design", "Vývoj", "Rezervace"],
    cover: IMAGES.projects[3],
    intro:
      "Butikový hotel v centru Prahy s rezervačním systémem, který nikoho neztratí cestou k potvrzení pobytu.",
    challenge:
      "Rezervace bez frustrace. Ukázat atmosféru hotelu a zároveň dovést hosta plynule k dokončení objednávky.",
    approach:
      "Cinematické fotografie pokojů, plynulé přechody a rezervační tok o třech krocích. Vše rychlé a přístupné.",
    results: [
      { k: "+74 %", v: "přímých rezervací (mimo portály)" },
      { k: "−31 %", v: "opuštění rezervace" },
      { k: "1,2 s", v: "první vykreslení obsahu" },
    ],
    shots: IMAGES.case.shots,
  },
];

/** Tým. */
export const TEAM = [
  { name: "Marek Dvořák", role: "Kreativní ředitel", pic: IMAGES.team[0] },
  { name: "Klára Nová", role: "Art direction & design", pic: IMAGES.team[1] },
  { name: "Tomáš Beneš", role: "Vývoj & animace", pic: IMAGES.team[2] },
  { name: "Eliška Horká", role: "Strategie & copy", pic: IMAGES.team[3] },
];

/** Journal / blog. */
export const JOURNAL = [
  {
    title: "Proč weby v roce 2026 potřebují pohyb",
    cat: "Trendy",
    date: "12. 6. 2026",
    read: "5 min",
    pic: IMAGES.journal[0],
  },
  {
    title: "Bento mřížky: jak vyprávět příběh v buňkách",
    cat: "Design",
    date: "28. 5. 2026",
    read: "7 min",
    pic: IMAGES.journal[1],
  },
  {
    title: "Rychlost jako součást značky, ne jen metrika",
    cat: "Vývoj",
    date: "9. 5. 2026",
    read: "6 min",
    pic: IMAGES.journal[2],
  },
];

/** Ceník / balíčky. */
export const PRICING = [
  {
    name: "Prezentace",
    price: "od 60 000 Kč",
    tagline: "Jednostránkový web, který prodává.",
    features: ["Design na míru", "Do 5 sekcí", "Animace a efekty", "Kontaktní formulář", "Nasazení a doména"],
    featured: false,
  },
  {
    name: "Web na míru",
    price: "od 140 000 Kč",
    tagline: "Vícestránkový web s napojením na systémy.",
    features: [
      "Vše z Prezentace",
      "Vícestránková struktura",
      "CMS pro samosprávu",
      "SEO a měření výkonu",
      "Case study a blog",
      "3 měsíce podpory",
    ],
    featured: true,
  },
  {
    name: "E-shop / produkt",
    price: "individuálně",
    tagline: "E-commerce nebo produktová aplikace.",
    features: ["Vše z Web na míru", "E-commerce / rezervace", "Integrace plateb", "Napojení na sklad", "Průběžná optimalizace"],
    featured: false,
  },
];
