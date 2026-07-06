import { useState, type ImgHTMLAttributes } from "react";
import type { Pic } from "../images";

/**
 * Art-directed obrázek. Zkusí kurátorskou fotku, při chybě spadne na
 * spolehlivý fallback (žádné rozbité obrázky). Jemný fade-in po načtení.
 */
export default function Img({
  pic,
  className = "",
  imgClassName = "",
  eager = false,
}: {
  pic: Pic;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [src, setSrc] = useState(pic.src);
  const [loaded, setLoaded] = useState(false);

  const props: ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt: pic.alt,
    loading: eager ? "eager" : "lazy",
    decoding: "async",
    onLoad: () => setLoaded(true),
    onError: () => {
      if (src !== pic.fallback) setSrc(pic.fallback);
      else setLoaded(true);
    },
  };

  return (
    <div className={`relative overflow-hidden bg-ink2 ${className}`}>
      {/* jemný shimmer, než se obrázek načte */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br from-ink2 to-ink transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
      />
      <img
        {...props}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] ${
          loaded ? "opacity-100" : "scale-105 opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
