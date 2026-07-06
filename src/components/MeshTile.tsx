import { type ReactNode, useMemo } from "react";

/**
 * Animovaný mesh-gradient vizuál — náhrada fotek. Čistě CSS (transform/opacity),
 * takže levný na GPU i v mnoha instancích. Každá dlaždice se podle `seed`
 * hýbe a komponuje jinak, aby působila samostatně, ale drží paletu značky.
 * `motif` přidá jemnou animovanou linkovou grafiku pro charakter.
 */
type Motif = "rings" | "grid" | "wave" | "dots" | "orbit" | "none";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

// malý deterministický hash → stabilní variace bez Math.random
function rng(seed: number) {
  let s = (seed * 2654435761) % 2147483647;
  return () => {
    s = (s * 48271) % 2147483647;
    return s / 2147483647;
  };
}

const PALETTE = [
  "232,86,42", // accent
  "240,116,78", // accent soft
  "58,77,107", // cool
  "180,70,40", // deep accent
  "120,110,150", // muted violet-cool
];

function MotifSvg({ motif, tint }: { motif: Motif; tint: string }) {
  const stroke = `rgba(${tint},0.5)`;
  if (motif === "rings")
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {[30, 55, 80, 105].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="0.6"
            style={{ transformOrigin: "100px 100px", animation: `mt-pulse ${6 + i}s ease-in-out ${i * 0.4}s infinite` }}
          />
        ))}
      </svg>
    );
  if (motif === "grid")
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <g stroke={stroke} strokeWidth="0.5" style={{ animation: "mt-slide 14s linear infinite" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"v" + i} x1={i * 25} y1="0" x2={i * 25} y2="200" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"h" + i} x1="0" y1={i * 25} x2="200" y2={i * 25} />
          ))}
        </g>
      </svg>
    );
  if (motif === "wave")
    return (
      <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d="M0 60 Q 50 20 100 60 T 200 60"
            fill="none"
            stroke={stroke}
            strokeWidth="0.8"
            style={{ transform: `translateY(${i * 14 - 14}px)`, animation: `mt-wave ${5 + i}s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </svg>
    );
  if (motif === "dots")
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill={stroke} style={{ animation: "mt-pulse 7s ease-in-out infinite" }}>
          {Array.from({ length: 6 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <circle key={`${r}-${c}`} cx={20 + c * 32} cy={20 + r * 32} r="1.6" />
            ))
          )}
        </g>
      </svg>
    );
  if (motif === "orbit")
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="100" cy="100" rx="70" ry="34" fill="none" stroke={stroke} strokeWidth="0.6" />
        <ellipse cx="100" cy="100" rx="34" ry="70" fill="none" stroke={stroke} strokeWidth="0.6" />
        <g style={{ transformOrigin: "100px 100px", animation: "mt-spin 12s linear infinite" }}>
          <circle cx="170" cy="100" r="3" fill={`rgba(${tint},0.9)`} />
        </g>
        <g style={{ transformOrigin: "100px 100px", animation: "mt-spin 9s linear infinite reverse" }}>
          <circle cx="100" cy="170" r="2.4" fill={`rgba(${tint},0.7)`} />
        </g>
      </svg>
    );
  return null;
}

export default function MeshTile({
  seed = 1,
  motif = "none",
  className = "",
  children,
}: {
  seed?: number;
  motif?: Motif;
  className?: string;
  children?: ReactNode;
}) {
  const blobs = useMemo(() => {
    const r = rng(seed + 7);
    const count = 3;
    const tint = PALETTE[seed % PALETTE.length];
    return {
      tint,
      items: Array.from({ length: count }).map((_, i) => {
        const color = PALETTE[Math.floor(r() * PALETTE.length)];
        return {
          color,
          x: 15 + r() * 70,
          y: 15 + r() * 70,
          size: 55 + r() * 50,
          dur: 12 + r() * 12,
          delay: -r() * 10,
          op: 0.5 + r() * 0.35,
          anim: `mt-drift${1 + (i % 3)}`,
        };
      }),
    };
  }, [seed]);

  return (
    <div className={`relative overflow-hidden bg-ink2 ${className}`}>
      {/* mesh blobs */}
      <div className="absolute inset-0">
        {blobs.items.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}%`,
              height: `${b.size}%`,
              transform: "translate(-50%,-50%)",
              background: `radial-gradient(circle, rgba(${b.color},${b.op}), transparent 62%)`,
              filter: "blur(14px)",
              animation: `${b.anim} ${b.dur}s ease-in-out ${b.delay}s infinite alternate`,
              willChange: "transform",
            }}
          />
        ))}
      </div>
      {/* motiv */}
      <div className="absolute inset-0 opacity-[0.55] mix-blend-soft-light">
        <MotifSvg motif={motif} tint={blobs.tint} />
      </div>
      {/* zrno + vinětace */}
      <div aria-hidden className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: GRAIN }} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_10%,transparent_40%,rgba(12,12,14,0.55))]" />
      {children}
    </div>
  );
}
