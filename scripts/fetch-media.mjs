/* Stáhne všechna média (obrázky + videa) z Framer CDN do public/media,
 * aby je Vercel servíroval ze stejné domény = rychleji a bez závislosti
 * na cizím CDN. Spouští se přes `prebuild` (vercel.json má buildCommand
 * "npm run build", takže hook proběhne).
 *
 * Zapisuje src/media-manifest.json se seznamem ÚSPĚŠNĚ stažených souborů.
 * Aplikace pak lokální cestu použije jen pro ně; pro zbytek jde rovnou na
 * CDN (žádné 404). Když je CDN nedostupné (build za firemní proxy),
 * manifest zůstane prázdný a vše jede z CDN — nic se nerozbije. */

import {
  readFileSync,
  mkdirSync,
  existsSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "media");
const MANIFEST = join(root, "src", "media-manifest.json");
const IMG_BASE = "https://framerusercontent.com/images/";
const VID_BASE = "https://framerusercontent.com/assets/";

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

const urls = [
  ...new Set(site.match(/https:\/\/framerusercontent\.com\/[^\s`"']+/g) || []),
].filter((u) => localName(u) !== null);

function download(url, dest, timeout) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        writeFileSync(dest, buf);
        resolve(buf.length);
      });
    });
    req.setTimeout(timeout, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

function writeManifest(names) {
  writeFileSync(MANIFEST, JSON.stringify(names.sort(), null, 2) + "\n");
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  // rychlý test dostupnosti CDN
  const probe = urls[0];
  try {
    await download(probe, join(OUT, localName(probe)), 8000);
  } catch (e) {
    console.warn(
      `[fetch-media] CDN nedostupné (${e.message}) — manifest prázdný, vše jede z CDN.`
    );
    writeManifest([]);
    return;
  }

  const done = [localName(probe)];
  let fail = 0,
    bytes = statSync(join(OUT, localName(probe))).size;

  await Promise.all(
    urls.slice(1).map(async (url) => {
      const name = localName(url);
      const dest = join(OUT, name);
      // videa jsou větší → delší timeout
      const timeout = name.endsWith(".mp4") ? 60000 : 20000;
      if (existsSync(dest) && statSync(dest).size > 0) {
        done.push(name);
        return;
      }
      try {
        bytes += await download(url, dest, timeout);
        done.push(name);
      } catch (e) {
        fail++;
        console.warn(`[fetch-media] ${name}: ${e.message} → zůstane na CDN`);
      }
    })
  );

  writeManifest(done);
  console.log(
    `[fetch-media] hotovo: ${done.length}/${urls.length} self-hostováno, ${fail} zůstává na CDN (${(bytes / 1024 / 1024).toFixed(1)} MB)`
  );
}

main().catch((e) => {
  console.warn("[fetch-media] chyba:", e.message);
  try {
    writeManifest([]);
  } catch {}
});
