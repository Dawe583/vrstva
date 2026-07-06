/** Pomocník pro responzivní obrázky z Framer CDN.
 *  Z URL tvaru `...?width=W&height=H` vyrobí srcset s menšími variantami
 *  (poměr stran zůstává) — mobil pak stahuje několikanásobně méně dat
 *  a sekce se načítá okamžitě. */
export function srcSetFor(url: string, widths: number[]): string {
  const m = url.match(/^(.*)\?width=(\d+)&height=(\d+)$/);
  if (!m) return "";
  const base = m[1];
  const ratio = Number(m[3]) / Number(m[2]);
  return widths
    .map((w) => `${base}?width=${w}&height=${Math.round(w * ratio)} ${w}w`)
    .join(", ");
}
