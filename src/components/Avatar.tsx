/**
 * Monogram avatar — iniciály v gradientovém kroužku. Náhrada portrétních
 * fotek: konzistentní, vždy se načte, drží paletu značky.
 */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const RINGS = [
  "from-accent to-[#b03a17]",
  "from-[#3a4d6b] to-accent",
  "from-accent-soft to-cool",
  "from-[#78659a] to-accent",
];

export default function Avatar({
  name,
  seed = 0,
  className = "",
}: {
  name: string;
  seed?: number;
  className?: string;
}) {
  const ring = RINGS[seed % RINGS.length];
  return (
    <div
      className={`grid place-items-center rounded-full bg-gradient-to-br ${ring} ${className}`}
      aria-hidden
    >
      <span className="font-display text-[0.9em] font-medium leading-none text-ink/90">
        {initials(name)}
      </span>
    </div>
  );
}
