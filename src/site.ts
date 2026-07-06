/** Obsah a média webu — struktura 1:1 s referencí, značka = Vrstva.
 *  Vizuály využívají veřejné CDN předlohy, aby stránka byla vždy plná
 *  (žádné prázdné bloky jako v předchozím buildu). */

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
    slug: "slims-t-shirt",
    category: "branding // marketing",
    year: "2026",
    brand: "Gentle Park",
    title: "slims t-shirt",
    img: `${IMG}dEyd7hRzg4wgPG0RDXNDM1Moak.webp?width=1600&height=917`,
  },
  {
    slug: "iphone-cover",
    category: "branding // cover design",
    year: "2026",
    brand: "mobile elegant",
    title: "i-phone cover",
    img: `${IMG}YTLLiztyzNibPIlp3rdVwpGhRc.png?width=1376&height=768`,
  },
  {
    slug: "only-the-brave",
    category: "ui/ux design // website design",
    year: "2026",
    brand: "Lereve",
    title: "Only The Brave",
    img: `${IMG}5Xl3vkxzIYkCslhhaUYSPzShNW0.webp?width=1600&height=917`,
  },
  {
    slug: "sunscreen",
    category: "branding // marketing",
    year: "2026",
    brand: "syagi",
    title: "sunscreen",
    img: `${IMG}bFAJHKDeaSouskKTyxrbM32z0.png?width=1400&height=1189`,
  },
  {
    slug: "custom-designed",
    category: "branding // marketing",
    year: "2026",
    brand: "matcha club",
    title: "custom-designed",
    img: `${IMG}AylmkRt1aL0hFRrC4xB5Tvwsg.webp?width=1600&height=917`,
  },
  {
    slug: "web-design",
    category: "ui/ux design // agency",
    year: "2026",
    brand: "orfolio",
    title: "Web design",
    img: `${IMG}8pG5ifB43qSDxeq1VYhb3k6sgcA.png?width=1200&height=673`,
  },
  {
    slug: "face-seram",
    category: "strategy // marketing",
    year: "2026",
    brand: "Novili",
    title: "Face seram",
    img: `${IMG}PA46gcLDDhOTxXBrPG24ffJvqY.webp?width=1600&height=917`,
  },
  {
    slug: "casual-shirt-marketing",
    category: "marketing // branding",
    year: "2026",
    brand: "easy fashion",
    title: "casual shirt marketing",
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
    left: { value: 150, suffix: "+", label: "Digital experiences" },
    right: { value: 67, suffix: "%", label: "More qualified rate" },
  },
  {
    name: "Monosen",
    logo: `${IMG}pN15qcho0Pl4bX7FkEn7HkSaXik.svg?width=120&height=16`,
    logoW: 120,
    logoH: 16,
    left: { value: 200, suffix: "+", label: "Eng. user interfaces" },
    right: { value: 75, suffix: "%", label: "Higher retention rate" },
  },
  {
    name: "Overcut",
    logo: `${IMG}J521yxWmVF2ZDxPBDZjqj7Z3kI.svg?width=74&height=21`,
    logoW: 74,
    logoH: 21,
    left: { value: 150, suffix: "+", label: "Innovative solutions" },
    right: { value: 80, suffix: "%", label: "Conv. rate optimization" },
  },
];

export type Skill = { left: string; right: string; img: string };

export const SKILLS: Skill[] = [
  { left: "Creative", right: "Direction", img: `${IMG}tPZAvYJYJ7Rm08ZyJ3kTzmG1gIg.png?width=900&height=900` },
  { left: "UI/UX", right: "Design", img: `${IMG}vXdEBSjbjZWjn6CW8R7z9BVIUdc.png?width=680&height=900` },
  { left: "Branding", right: "Strategy", img: `${IMG}aZo97IXqP4X0kS3P9MoYOEV3hCo.png?width=680&height=900` },
  { left: "Video", right: "Editing", img: `${IMG}gmRo5dtINgQKt14iYv8SNpubVpc.png?width=680&height=900` },
  { left: "Motion", right: "Design", img: `${IMG}oc7ObmaWyBI5sgBFIo7Xnp9oGCQ.png?width=720&height=900` },
  { left: "Digital", right: "Marketing", img: `${IMG}SvB4Wd4za9gsOb6K5UiL4Tv94.png?width=680&height=900` },
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
      "Vrstva rebuilt our product story from the ground up. What used to feel generic now feels unmistakably ours — and the numbers moved with it.",
    name: "Neatian Meyal",
    role: "Head of Product, SaaS Company",
    img: `${IMG}CvnUgsF4wSNCHF2JQoRDj2A1ads.jpg?width=1400&height=2100`,
  },
  {
    quote:
      "The team gets motion. Every interaction earns its place and nothing feels bolted on. Our launch felt like an event, not a page.",
    name: "Karel Dohnal",
    role: "Founder, Fintech Startup",
    img: `${IMG}tPZAvYJYJ7Rm08ZyJ3kTzmG1gIg.png?width=1200&height=1200`,
  },
  {
    quote:
      "Fast, sharp and genuinely strategic. Vrstva treated our brand like a system, not a logo — and it shows on every screen.",
    name: "Lucie Marešová",
    role: "CMO, E-commerce Brand",
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
    slug: "systems-not-logos",
    category: "Branding //",
    title: "Why Strong Brands Are Built on Systems, Not Logos",
    img: `${IMG}bNjaBzh6o5JZ2KBOPZTP06KkFM.png?width=1060&height=1058`,
  },
  {
    slug: "motion-product-clarity",
    category: "Motion // animation",
    title: "How Motion Design Improves Product Clarity",
    img: `${IMG}P6oFcbPOazBjjX0KwsXPEcxCjjc.png?width=846&height=1058`,
  },
  {
    slug: "vision-to-execution",
    category: "marketing // strategy",
    title: "From Vision to Execution: Aligning Teams Through Design",
    img: `${IMG}105xqT6vhMxzOfnrFGFsrt9MWag.png?width=790&height=1046`,
  },
];

export const PROCESS = [
  { title: "Discover", body: "Research provides the insight that shapes the project." },
  { title: "Define & design", body: "Insight becomes strategy — and makes your product visible." },
  { title: "Launch & scale", body: "We ensure a smooth launch and help the brand keep growing." },
];

export const FAQ = [
  {
    q: "What services does Vrstva specialize in?",
    a: "Brand strategy, identity, UI/UX design, motion, and front-end development — an end-to-end team for tech brands that want more than a template.",
  },
  {
    q: "Do you work with startups or enterprise clients?",
    a: "Both. We move fast enough for early-stage startups and structured enough for scaling companies and established brands.",
  },
  {
    q: "What industries do you usually work with?",
    a: "Mostly technology, SaaS, fintech and consumer brands — but the process stays the same wherever there is a story worth telling clearly.",
  },
  {
    q: "What is your design process like?",
    a: "A structured but flexible flow: discover, define & design, then launch & scale — with you in the room at every step.",
  },
  {
    q: "How long does a project usually take?",
    a: "A focused landing page runs 3–4 weeks; a full site or product identity typically takes 6–10 weeks depending on scope.",
  },
];

export const STATS = [
  { value: "9+", label: "years" },
  { value: "500+", label: "projects" },
  { value: "99%", label: "client satisfaction" },
];

export const NAV_LINKS = [
  { label: "Work", id: "#work" },
  { label: "Company", id: "#skills" },
  { label: "Journal", id: "#journal" },
  { label: "FAQ", id: "#faq" },
];
