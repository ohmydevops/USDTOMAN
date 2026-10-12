import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { build } from "esbuild";
import sharp from "sharp";
import { createHash } from "node:crypto";
import { primaryGovernmentPerson } from "../src/government.js";

// Keep editable source separate from the files served to visitors.
fs.mkdirSync("dist", { recursive: true });
fs.cpSync("src/assets/fonts", "dist/fonts", { recursive: true });
const portraits = JSON.parse(fs.readFileSync("src/portraits.json", "utf8"));
fs.mkdirSync("dist/portraits", { recursive: true });
for (const portrait of Object.values(portraits)) fs.copyFileSync("src/assets/" + portrait.src, "dist/" + portrait.src);
const leadership = JSON.parse(fs.readFileSync("src/leadership.json", "utf8"));
const data = JSON.parse(fs.readFileSync("src/data.json", "utf8"));
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
// Redirect legacy portrait-credit links to the in-page sources modal.
fs.writeFileSync("dist/portrait-credits.html", '<!doctype html><meta http-equiv="refresh" content="0;url=./?credits=1">');
const priceFormatter = new Intl.NumberFormat("fa", {
  maximumFractionDigits: 0,
});
const yearFormatter = new Intl.NumberFormat("fa", { useGrouping: false });
const staticRows = [...data.years]
  .sort((first, second) => second.year - first.year)
  .map((row) => {
    const person = primaryGovernmentPerson(row, leadership.terms);
    const government = `<button type="button" class="portrait-person" aria-label="${escapeHtml(person.fa)}" title="${escapeHtml(person.fa)}"><img src="${portraits[person.en].src}" alt="${escapeHtml(person.fa)}" width="40" height="40" loading="lazy"><span class="portrait-tooltip" role="tooltip">${escapeHtml(person.fa)}</span></button>`;
    const price = (value) =>
      value == null ? "—" : priceFormatter.format(value);
    const multiplier =
      Number.isFinite(row.minimum) &&
      Number.isFinite(row.maximum) &&
      row.minimum > 0 &&
      row.maximum >= row.minimum
        ? "(" + new Intl.NumberFormat("fa-IR", {
            useGrouping: false,
            maximumFractionDigits: 2,
          }).format(row.maximum / row.minimum) + "×)"
        : "—";
    return `<tr class="table-row"><td class="font-medium text-sm sm:text-base px-2 py-1.5 sm:px-4"><div class="flex items-center justify-center gap-2" dir="rtl"><bdi dir="ltr">${yearFormatter.format(row.year)}</bdi>${government}</div></td><td class="font-medium px-2 py-1.5 sm:px-4"><bdi dir="ltr">${price(row.minimum)}</bdi></td><td class="font-medium px-2 py-1.5 text-accent sm:px-4"><bdi dir="ltr">${price(row.maximum)}</bdi><span dir="ltr" class="ms-1 inline-flex items-baseline whitespace-nowrap text-[10px] sm:text-xs font-normal text-muted" title="نسبت بیشترین به کمترین قیمت در این سال">${multiplier === "—" ? "—" : `${multiplier.split("×")[0]}<span class="text-base sm:text-lg font-medium leading-none">↑</span>)`}</span></td><td class="font-medium px-1 py-1.5 text-center text-xs"><span dir="ltr">${row.maximum > 0 ? new Intl.NumberFormat("fa", { maximumFractionDigits: 0 }).format(100 * row.minimum).replace("٫", ".") : "—"}</span></td><td class="font-medium px-1 py-1.5 text-center text-xs"><span dir="ltr">${row.minimum > 0 ? new Intl.NumberFormat("fa", { maximumFractionDigits: 0 }).format(100 * row.maximum).replace("٫", ".") : "—"}</span></td></tr>`;
  })
  .join("\n");
const html = fs
  .readFileSync("src/index.html", "utf8")
  .replace("<!-- STATIC_TABLE_ROWS -->", staticRows);
fs.writeFileSync("dist/index.html", html);
fs.copyFileSync("src/data.json", "dist/data.json");
fs.copyFileSync("src/manifest.webmanifest", "dist/manifest.webmanifest");
for (const size of [192, 512]) {
  await sharp("src/assets/favicon-franklin.png")
    .resize(size, size)
    .flatten({ background: "#ecebdc" })
    .png()
    .toFile(`dist/icon-${size}.png`);
}
fs.copyFileSync("src/assets/favicon.svg", "dist/favicon.svg");
fs.copyFileSync("src/robots.txt", "dist/robots.txt");
fs.copyFileSync("src/sitemap.xml", "dist/sitemap.xml");
await sharp("src/assets/favicon-franklin.png")
  .resize(32, 32)
  .png()
  .toFile("dist/favicon-32.png");
await sharp("src/assets/favicon-franklin.png")
  .resize(180, 180)
  .png()
  .toFile("dist/apple-touch-icon.png");
await sharp("src/assets/og-image.svg").png().toFile("dist/og-image.png");
await sharp("src/assets/og-image-2.png")
  .resize(1200, 630)
  .png()
  .toFile("dist/og-image-2.png");
fs.copyFileSync("node_modules/alpinejs/dist/cdn.min.js", "dist/alpine.min.js");

await build({
  bundle: true,
  format: "iife",
  entryPoints: ["src/app.js"],
  outfile: "dist/app.js",
  minify: true,
  target: "es2020",
});

const result = spawnSync(
  process.execPath,
  [
    "node_modules/@tailwindcss/cli/dist/index.mjs",
    "-i",
    "src/styles.css",
    "-o",
    "dist/style.css",
    "--minify",
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) process.exit(result.status ?? 1);
const assets = [
  "portrait-credits.html",
  ...Object.values(portraits).map((portrait) => portrait.src),
  "index.html",
  "app.js",
  "alpine.min.js",
  "style.css",
  "data.json",
  "manifest.webmanifest",
  "favicon-32.png",
  "apple-touch-icon.png",
  "icon-192.png",
  "icon-512.png",
  "fonts/vazirmatn.woff2",
];
const hash = createHash("sha256");
for (const asset of assets) hash.update(fs.readFileSync(`dist/${asset}`));
hash.update(fs.readFileSync("src/sw.js"));
const worker = fs
  .readFileSync("src/sw.js", "utf8")
  .replace("BUILD_VERSION", hash.digest("hex").slice(0, 16))
  .replace("BUILD_ASSETS", JSON.stringify(assets));
fs.writeFileSync("dist/sw.js", worker);
