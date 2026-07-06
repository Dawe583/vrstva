/* Stáhne všechna média (obrázky + videa) z Framer CDN do public/media,
 * aby je Vercel servíroval ze stejné domény = rychleji a bez závislosti
 * na cizím CDN. Spouští se automaticky přes `prebuild`.
 *
 * Odolnost: když je CDN nedostupné (např. lokální build za firemní
 * proxy), skript to po krátkém testu vzdá a build pokračuje — aplikace
 * pak přes onError použije původní CDN URL, takže se nic nerozbije. */

import { readFileSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "media");
const IMG_BASE = "https://framerusercontent.com/images/";
const VID_BASE = "https://framerusercontent.com/assets/";

// --- vytáhni všechny CDN URL ze site.ts ---------------------------------
const site = readFileSync(join(root, "src", "site.ts"), "utf8")
  .replaceAll("${IMG}", IMG_BASE)
  .replaceAll("${VID}", VID_BASE);

const IMG_RE =
  /framerusercontent\.com\/images\/([^/?]+)\.(webp|png|jpe?g|svg)\?width=(\d+)&height=(\d+)/;
const VID_RE = /framerusercontent\.com\/assets\/([^/?]+)\.mp4/;

function localName(url) {
  const im = url.match(IMG_RE);
  if (im) return `${im[1]}_${im[3]}.${im[2]}`;
  const vm = url.match(VID_RE);
  if (vm) return `${vm[1]}.mp4`;
  return null;
}

// Jen konkrétní soubory (s platným názvem) — ať do seznamu nepropadnou
// holé bázové URL z definic `const IMG = "..."` apod.
const urls = [
  ...new Set(site.match(/https:\/\/framerusercontent\.com\/[^\s`"']+/g) || []),
].filter((u) => localName(u) !== null);

function download(url, dest, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        writeFileSync(dest, Buffer.concat(chunks));
        resolve(Buffer.concat(chunks).length);
      });
    });
    req.setTimeout(timeout, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  // rychlý test dostupnosti CDN — ať zbytečně nečekáme na 30 timeoutů
  const probe = urls[0];
  try {
    await download(probe, join(OUT, localName(probe)), 6000);
  } catch (e) {
    console.warn(
      `[fetch-media] CDN nedostupné (${e.message}) — přeskakuji, aplikace použije CDN fallback.`
    );
    return;
  }

  let ok = 1,
    fail = 0,
    skip = 0,
    bytes = 0;
  await Promise.all(
    urls.slice(1).map(async (url) => {
      const name = localName(url);
      if (!name) return;
      const dest = join(OUT, name);
      if (existsSync(dest)) {
        skip++;
        return;
      }
      try {
        bytes += await download(url, dest);
        ok++;
      } catch (e) {
        fail++;
        console.warn(`[fetch-media] ${name}: ${e.message}`);
      }
    })
  );
  console.log(
    `[fetch-media] hotovo: ${ok} staženo, ${skip} přeskočeno, ${fail} selhalo (${(bytes / 1024 / 1024).toFixed(1)} MB)`
  );
}

main().catch((e) => {
  console.warn("[fetch-media] chyba, pokračuji s CDN fallbackem:", e.message);
});
