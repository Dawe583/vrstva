/** Obsah webu. Vizuály jsou generované (MeshTile) — každý nese `seed` a `motif`
    místo cesty k fotce, takže se vždy vykreslí a žijí animací. */

export type Motif = "rings" | "grid" | "wave" | "dots" | "orbit" | "none";

export type Project = {
  name: string;
  meta: string;
  year: string;
  tags: string[];
  seed: number;
  motif: Motif;
  intro: string;
  challenge: string;
  approach: string;
  results: { k: string; v: string }[];
  shots: { seed: number; motif: Motif }[];
};

export const PROJECTS: Project[] = [
  {
    name: "Bystrá",
    meta: "Fintech aplikace",
    year: "2026",
    tags: ["Produktový design", "Vývoj", "Web"],
    seed: 3,
    motif: "orbit",
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
    shots: [
      { seed: 31, motif: "grid" },
      { seed: 32, motif: "dots" },
      { seed: 33, motif: "wave" },
    ],
  },
  {
    name: "Atelier Hana Marek",
    meta: "Architektura",
    year: "2025",
    tags: ["Web design", "Art direction"],
    seed: 2,
    motif: "grid",
    intro:
      "Portfolio architektonického ateliéru, kde má hlavní slovo práce sama. Minimalismus, prostor a typografie.",
    challenge:
      "Ukázat desítky projektů tak, aby web nepůsobil jako katalog, ale jako galerie. Každá stavba si zaslouží pozornost.",
    approach:
      "Horizontální plátna, velké plochy a jemné přechody. Web dýchá stejně jako stavby, které představuje.",
    results: [
      { k: "+65 %", v: "delší čas na stránce" },
      { k: "3×", v: "více poptávek na velké zakázky" },
      { k: "0", v: "šablon — vše na míru" },
    ],
    shots: [
      { seed: 21, motif: "grid" },
      { seed: 22, motif: "rings" },
      { seed: 23, motif: "orbit" },
    ],
  },
  {
    name: "Roubal a syn",
    meta: "E-shop vinařství",
    year: "2025",
    tags: ["E-commerce", "Branding", "Vývoj"],
    seed: 0,
    motif: "wave",
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
    shots: [
      { seed: 11, motif: "wave" },
      { seed: 12, motif: "dots" },
      { seed: 13, motif: "rings" },
    ],
  },
  {
    name: "Mezanin",
    meta: "Hotel a rezervace",
    year: "2024",
    tags: ["Web design", "Vývoj", "Rezervace"],
    seed: 4,
    motif: "rings",
    intro:
      "Butikový hotel v centru Prahy s rezervačním systémem, který nikoho neztratí cestou k potvrzení pobytu.",
    challenge:
      "Rezervace bez frustrace. Ukázat atmosféru hotelu a zároveň dovést hosta plynule k dokončení objednávky.",
    approach:
      "Cinematické plochy, plynulé přechody a rezervační tok o třech krocích. Vše rychlé a přístupné.",
    results: [
      { k: "+74 %", v: "přímých rezervací (mimo portály)" },
      { k: "−31 %", v: "opuštění rezervace" },
      { k: "1,2 s", v: "první vykreslení obsahu" },
    ],
    shots: [
      { seed: 41, motif: "rings" },
      { seed: 42, motif: "orbit" },
      { seed: 43, motif: "grid" },
    ],
  },
];

export const TEAM = [
  { name: "Marek Dvořák", role: "Kreativní ředitel", seed: 0 },
  { name: "Klára Nová", role: "Art direction & design", seed: 1 },
  { name: "Tomáš Beneš", role: "Vývoj & animace", seed: 2 },
  { name: "Eliška Horká", role: "Strategie & copy", seed: 3 },
];

export type Article = {
  title: string;
  cat: string;
  date: string;
  read: string;
  seed: number;
  motif: Motif;
  lead: string;
  body: string[];
};

export const JOURNAL: Article[] = [
  {
    title: "Proč weby v roce 2026 potřebují pohyb",
    cat: "Trendy",
    date: "12. 6. 2026",
    read: "5 min",
    seed: 3,
    motif: "wave",
    lead: "Animace přestala být ozdoba. Stala se součástí identity značky a způsobu, jak web komunikuje.",
    body: [
      "Ještě před pár lety byl pohyb na webu luxus. Dnes je to jazyk. Award galerie jako Awwwards jsou plné stránek, které se chovají spíš jako zážitek než dokument — a návštěvníci to očekávají.",
      "Klíč není „víc animací“. Klíč je záměr. Každý přechod, hover a scroll efekt má nést význam, jako řeč těla v rozhovoru. Zbytečný pohyb ruší; promyšlený pohyb vede pozornost přesně tam, kam chcete.",
      "V praxi to znamená tři věci: orchestraci (jeden velký moment místo deseti malých), respekt k výkonu (animace nesmí sekat) a přístupnost (vždy s ohledem na prefers-reduced-motion).",
    ],
  },
  {
    title: "Bento mřížky: jak vyprávět příběh v buňkách",
    cat: "Design",
    date: "28. 5. 2026",
    read: "7 min",
    seed: 2,
    motif: "grid",
    lead: "Asymetrická mřížka není jen layout. Je to způsob, jak dát každé informaci správnou váhu.",
    body: [
      "Bento grid si vypůjčil jméno z japonské krabičky na oběd — a stejně jako ona rozděluje prostor na buňky různých velikostí, kde každá má svůj obsah a svou důležitost.",
      "Tajemství dobrého benta je variace s rytmem. Velká buňka přitáhne oko, malá dá kontext. Když se velikosti opakují bez logiky, mřížka ztratí spád. Když nesou hierarchii, čte se sama.",
      "Do buněk patří i pohyb: jedna může být fotka, druhá živý gradient, třetí statistika, která se dopočítá při scrollu. Různorodost drží pozornost.",
    ],
  },
  {
    title: "Rychlost jako součást značky, ne jen metrika",
    cat: "Vývoj",
    date: "9. 5. 2026",
    read: "6 min",
    seed: 0,
    motif: "dots",
    lead: "Nejlepší animace je ta, kterou uživatel necítí jako čekání. Výkon je zážitek.",
    body: [
      "Rychlost webu se často měří jako technická metrika — Core Web Vitals, sekundy do prvního vykreslení. Ale uživatel ji vnímá jako pocit: plyne to, nebo to sekne?",
      "Prémiový web musí být rychlý navzdory tomu, že je bohatý na efekty. To znamená disciplínu: animovat jen transform a opacity, pauzovat WebGL mimo obraz, rozdělit kód a načítat těžké části až když jsou potřeba.",
      "Když je základ rychlý, pohyb působí jako luxus. Když je pomalý, i ta nejhezčí animace působí jako lag. Rychlost je proto první vrstva každého našeho projektu.",
    ],
  },
];

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
