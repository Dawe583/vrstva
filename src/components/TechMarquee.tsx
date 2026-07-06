import {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandFigma,
  IconBrandTailwind,
  IconBrandNextjs,
  IconBrandFramer,
  IconBrandThreejs,
  IconBrandGraphql,
  IconBrandVite,
  IconBrandOpenai,
  IconWebhook,
  IconShoppingCartBolt,
} from "@tabler/icons-react";

const TECH = [
  { icon: IconBrandReact, label: "React" },
  { icon: IconBrandTypescript, label: "TypeScript" },
  { icon: IconBrandNextjs, label: "Next.js" },
  { icon: IconBrandTailwind, label: "Tailwind" },
  { icon: IconBrandFramer, label: "Motion" },
  { icon: IconBrandThreejs, label: "WebGL" },
  { icon: IconBrandFigma, label: "Figma" },
  { icon: IconBrandGraphql, label: "GraphQL" },
  { icon: IconBrandVite, label: "Vite" },
  { icon: IconWebhook, label: "Headless CMS" },
  { icon: IconShoppingCartBolt, label: "Shopify" },
  { icon: IconBrandOpenai, label: "AI integrace" },
];

const maskStyle = {
  WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
  maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
} as const;

function Row({ items, reverse = false }: { items: typeof TECH; reverse?: boolean }) {
  // duplikace kvůli plynulé smyčce (-50 %) — vizuálně jeden souvislý pás
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden" style={maskStyle}>
      <div className={`flex w-max ${reverse ? "marquee-track-rev" : "marquee-track"}`}>
        {loop.map((t, i) => (
          <span
            key={i}
            className="group mx-2.5 flex items-center gap-2.5 rounded-full border border-line bg-ink2/40 px-5 py-2.5 text-muteb transition-colors hover:border-accent/40"
          >
            <t.icon size={20} stroke={1.6} className="text-mute transition-colors group-hover:text-accent" />
            <span className="whitespace-nowrap text-sm font-medium">{t.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Dvouřadý pás technologií. Druhá řada je posunutá a jede opačně/jiným tempem,
    takže nepůsobí jako zdvojení. */
export default function TechMarquee() {
  const shifted = [...TECH.slice(6), ...TECH.slice(0, 6)];
  return (
    <section aria-label="Technologie a nástroje" className="overflow-hidden border-y border-line py-10 md:py-14">
      <div className="mx-auto mb-8 max-w-[1400px] px-6 md:px-10">
        <span className="text-sm uppercase tracking-[0.16em] text-mute">
          Stavíme na osvědčeném — a experimentujeme s novým
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <Row items={TECH} />
        <Row items={shifted} reverse />
      </div>
    </section>
  );
}
