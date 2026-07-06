/** Mapování vzdálených Framer URL na lokálně self-hostované soubory
 *  v /media/. Soubory stahuje `scripts/fetch-media.mjs` při buildu (na
 *  Vercelu, kde je otevřený internet). Pokud lokální soubor chybí, obrázek
 *  přes onError spadne zpět na původní CDN URL — nic se nerozbije. */

const IMG_RE =
  /framerusercontent\.com\/images\/([^/?]+)\.(webp|png|jpe?g|svg)\?width=(\d+)&height=(\d+)/;
const VID_RE = /framerusercontent\.com\/assets\/([^/?]+)\.mp4/;

/** Vzdálená URL → lokální cesta /media/<id>_<width>.<ext> (video bez šířky). */
export function local(url: string): string {
  const im = url.match(IMG_RE);
  if (im) return `/media/${im[1]}_${im[3]}.${im[2]}`;
  const vm = url.match(VID_RE);
  if (vm) return `/media/${vm[1]}.mp4`;
  return url;
}

/** onError handler: když lokální soubor 404, přepni prvek na CDN URL. */
export function fallback(remoteUrl: string) {
  return (e: { currentTarget: HTMLImageElement | HTMLVideoElement }) => {
    const el = e.currentTarget;
    if (el.getAttribute("src") === remoteUrl) return; // už jsme na fallbacku
    if ("srcset" in el) (el as HTMLImageElement).srcset = "";
    el.setAttribute("src", remoteUrl);
  };
}
