/** Obsah a média webu — struktura 1:1 s referencí, značka = Vrstva.
 *  Texty jsou česky. Vizuály využívají veřejné CDN předlohy, aby stránka
 *  byla vždy plná (žádné prázdné bloky jako v předchozím buildu). */

const IMG = "https://framerusercontent.com/images/";
const VID = "https://framerusercontent.com/assets/";

export const MEDIA = {
  heroVideo: `${VID}u2L9fMdGTUNkypRRe2obhvVYoo.mp4`,
  ctaVideo: `${VID}dXtBzmfad4Rec1Ho4fvtuYGuPzQ.mp4`,
  testimonial: `${IMG}CvnUgsF4wSNCHF2JQoRDj2A1ads.jpg?width=2731&height=4096`,
};

export type Project = {
  slug: string;
  category: string;
  year: string;
  brand: string;
  title: string;
  img: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "tricko-slims",
    category: "branding // marketing",
    year: "2026",
    brand: "Gentle Park",
    title: "Tričko Slims",
    img: `${IMG}dEyd7hRzg4wgPG0RDXNDM1Moak.webp?width=1600&height=917`,
  },
  {
    slug: "kryt-iphone",
    category: "branding // obaly",
    year: "2026",
    brand: "mobile elegant",
    title: "Kryt na iPhone",
    img: `${IMG}YTLLiztyzNibPIlp3rdVwpGhRc.png?width=1376&height=768`,
  },
  {
    slug: "only-the-brave",
    category: "ui/ux // webdesign",
    year: "2026",
    brand: "Lereve",
    title: "Only The Brave",
    img: `${IMG}5Xl3vkxzIYkCslhhaUYSPzShNW0.webp?width=1600&height=917`,
  },
  {
    slug: "opalovaci-krem",
    category: "branding // marketing",
    year: "2026",
    brand: "syagi",
    title: "Opalovací krém",
    img: `${IMG}bFAJHKDeaSouskKTyxrbM32z0.png?width=1400&height=1189`,
  },
  {
    slug: "na-miru",
    category: "branding // marketing",
    year: "2026",
    brand: "matcha club",
    title: "Návrh na míru",
    img: `${IMG}AylmkRt1aL0hFRrC4xB5Tvwsg.webp?width=1600&height=917`,
  },
  {
    slug: "webdesign",
    category: "ui/ux // agentura",
    year: "2026",
    brand: "orfolio",
    title: "Webdesign",
    img: `${IMG}8pG5ifB43qSDxeq1VYhb3k6sgcA.png?width=1200&height=673`,
  },
  {
    slug: "pletove-serum",
    category: "strategie // marketing",
    year: "2026",
    brand: "Novili",
    title: "Pleťové sérum",
    img: `${IMG}PA46gcLDDhOTxXBrPG24ffJvqY.webp?width=1600&height=917`,
  },
  {
    slug: "casual-kosile",
    category: "marketing // branding",
    year: "2026",
    brand: "easy fashion",
    title: "Casual košile",
    img: `${IMG}ZnHx1XRtOSRzIuEbTUJr8QOkHI.webp?width=1600&height=917`,
  },
];

export type Partner = {
  name: string;
  logo: string;
  logoW: number;
  logoH: number;
  left: { value: number; suffix: string; label: string };
  right: { value: number; suffix: string; label: string };
};

export const PARTNERS: Partner[] = [
  {
    name: "Walter",
    logo: `${IMG}c7gOuXVBIgAOQKrde4yKe9Nth4.svg?width=118&height=25`,
    logoW: 118,
    logoH: 25,
    left: { value: 150, suffix: "+", label: "Digitálních zážitků" },
    right: { value: 67, suffix: " %", label: "Kvalifikovanějších leadů" },
  },
  {
    name: "Monosen",
    logo: `${IMG}pN15qcho0Pl4bX7FkEn7HkSaXik.svg?width=120&height=16`,
    logoW: 120,
    logoH: 16,
    left: { value: 200, suffix: "+", label: "Uživatelských rozhraní" },
    right: { value: 75, suffix: " %", label: "Vyšší retence uživatelů" },
  },
  {
    name: "Overcut",
    logo: `${IMG}J521yxWmVF2ZDxPBDZjqj7Z3kI.svg?width=74&height=21`,
    logoW: 74,
    logoH: 21,
    left: { value: 150, suffix: "+", label: "Inovativních řešení" },
    right: { value: 80, suffix: " %", label: "Optimalizace konverzí" },
  },
];

export type Skill = { left: string; right: string; img: string };

export const SKILLS: Skill[] = [
  { left: "Kreativní", right: "Vedení", img: `${IMG}tPZAvYJYJ7Rm08ZyJ3kTzmG1gIg.png?width=900&height=900` },
  { left: "UI/UX", right: "Design", img: `${IMG}vXdEBSjbjZWjn6CW8R7z9BVIUdc.png?width=680&height=900` },
  { left: "Branding", right: "Strategie", img: `${IMG}aZo97IXqP4X0kS3P9MoYOEV3hCo.png?width=680&height=900` },
  { left: "Video", right: "Střih", img: `${IMG}gmRo5dtINgQKt14iYv8SNpubVpc.png?width=680&height=900` },
  { left: "Motion", right: "Design", img: `${IMG}oc7ObmaWyBI5sgBFIo7Xnp9oGCQ.png?width=720&height=900` },
  { left: "Digitální", right: "Marketing", img: `${IMG}SvB4Wd4za9gsOb6K5UiL4Tv94.png?width=680&height=900` },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  img: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Vrstva nám přestavěla celý příběh produktu od základu. Co dřív působilo genericky, je teď nezaměnitelně naše — a čísla se hnula spolu s tím.",
    name: "Adam Kolář",
    role: "Produktový ředitel, SaaS firma",
    img: `${IMG}CvnUgsF4wSNCHF2JQoRDj2A1ads.jpg?width=1400&height=2100`,
  },
  {
    quote:
      "Tým rozumí pohybu. Každá interakce má svůj smysl a nic nepůsobí nalepeně. Náš launch vypadal jako událost, ne jen jako další stránka.",
    name: "Karel Dohnal",
    role: "Zakladatel, fintech startup",
    img: `${IMG}tPZAvYJYJ7Rm08ZyJ3kTzmG1gIg.png?width=1200&height=1200`,
  },
  {
    quote:
      "Rychlé, ostré a opravdu strategické. Vrstva pracovala s naší značkou jako se systémem, ne jako s logem — a je to vidět na každé obrazovce.",
    name: "Lucie Marešová",
    role: "Marketingová ředitelka, e-shop",
    img: `${IMG}aZo97IXqP4X0kS3P9MoYOEV3hCo.png?width=911&height=1199`,
  },
];

export type Post = {
  slug: string;
  category: string;
  title: string;
  img: string;
};

export const JOURNAL: Post[] = [
  {
    slug: "systemy-ne-loga",
    category: "branding //",
    title: "Proč silné značky stojí na systémech, ne na logu",
    img: `${IMG}bNjaBzh6o5JZ2KBOPZTP06KkFM.png?width=1060&height=1058`,
  },
  {
    slug: "motion-srozumitelnost",
    category: "motion // animace",
    title: "Jak motion design zlepšuje srozumitelnost produktu",
    img: `${IMG}P6oFcbPOazBjjX0KwsXPEcxCjjc.png?width=846&height=1058`,
  },
  {
    slug: "vize-k-realizaci",
    category: "marketing // strategie",
    title: "Od vize k realizaci: jak design sjednotí tým",
    img: `${IMG}105xqT6vhMxzOfnrFGFsrt9MWag.png?width=790&height=1046`,
  },
];

export const PROCESS = [
  { title: "Objevujeme", body: "Výzkum přináší poznatky, které formují celý projekt." },
  { title: "Definujeme & navrhujeme", body: "Z poznatků vzniká strategie — a váš produkt začne být vidět." },
  { title: "Spouštíme & škálujeme", body: "Zajistíme hladký start a pomáháme značce dál růst." },
];

export const FAQ = [
  {
    q: "Na co se ve Vrstvě specializujeme?",
    a: "Na strategii značky, vizuální identitu, UI/UX design, motion a front-endový vývoj — tým, který vás provede od nápadu až po hotový produkt, ne jen po šablonu.",
  },
  {
    q: "Pracujete se startupy, nebo s velkými firmami?",
    a: "S oběma. Dokážeme jet dost rychle pro startupy v rané fázi a zároveň dost strukturovaně pro rostoucí firmy a zavedené značky.",
  },
  {
    q: "S jakými obory nejčastěji pracujete?",
    a: "Hlavně technologie, SaaS, fintech a spotřebitelské značky — ale proces zůstává stejný všude, kde je příběh, který stojí za to vyprávět srozumitelně.",
  },
  {
    q: "Jak vypadá váš návrhový proces?",
    a: "Strukturovaný, ale flexibilní: objevujeme, definujeme & navrhujeme a poté spouštíme & škálujeme — a vy jste u toho v každém kroku.",
  },
  {
    q: "Jak dlouho projekt obvykle trvá?",
    a: "Zaměřená landing page zabere 3–4 týdny; kompletní web nebo produktová identita obvykle 6–10 týdnů podle rozsahu.",
  },
];

export const STATS = [
  { value: "9+", label: "let na trhu" },
  { value: "500+", label: "projektů" },
  { value: "99 %", label: "spokojenost klientů" },
];

export const NAV_LINKS = [
  { label: "Práce", id: "#work" },
  { label: "Studio", id: "#skills" },
  { label: "Žurnál", id: "#journal" },
  { label: "Dotazy", id: "#faq" },
];
