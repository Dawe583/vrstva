/** Rozhoduje, jestli se médium načte lokálně (self-hostované v /media/)
 *  nebo přímo z Framer CDN.
 *
 *  Klíčové: `local()` vrátí lokální cestu JEN pro soubory, které se
 *  opravdu stáhly při buildu (jsou v manifestu). Pro ostatní vrací rovnou
 *  CDN URL — takže nikdy nevzniká 404 → žádný zbytečný dvojitý request
 *  u obrázků a žádné rozbité video. Manifest generuje `scripts/fetch-
 *  media.mjs`; když CDN není dostupné, zůstane prázdný a vše jede z CDN. */

import manifest from "./media-manifest.json";

const downloaded = new Set(manifest as string[]);

const IMG_RE =
  /framerusercontent\.com\/images\/([^/?]+)\.(webp|png|jpe?g|svg)\?width=(\d+)&height=(\d+)/;
const VID_RE = /framerusercontent\.com\/assets\/([^/?]+)\.mp4/;

/** Název lokálního souboru pro danou vzdálenou URL (nebo null). */
export function fileNameFor(url: string): string | null {
  const im = url.match(IMG_RE);
  if (im) return `${im[1]}_${im[3]}.${im[2]}`;
  const vm = url.match(VID_RE);
  if (vm) return `${vm[1]}.mp4`;
  return null;
}

/** Vrátí lokální /media cestu (pokud je soubor stažený), jinak CDN URL. */
export function local(url: string): string {
  const name = fileNameFor(url);
  if (name && downloaded.has(name)) return `/media/${name}`;
  return url;
}
