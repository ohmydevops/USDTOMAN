import fs from "node:fs/promises";
import { tgjuEndpoint, yearlyExtremes } from "./tgju.mjs";

// Optional local snapshots, in order: dollar, 18k gold gram, Bahar Azadi coin.
const series = [
  { key: "dollar", indicator: "price_dollar_rl", firstYear: 1391 },
  { key: "goldGram", indicator: "geram18", firstYear: 1393 },
  { key: "coin", indicator: "sekeb", firstYear: 1393 },
];

const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})
  .format(new Date())
  .replaceAll("-", "/");

async function history(indicator, snapshotPath) {
  if (snapshotPath) return JSON.parse(await fs.readFile(snapshotPath, "utf8"));
  const response = await fetch(tgjuEndpoint(indicator), {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok)
    throw new Error(`TGJU returned HTTP ${response.status} for ${indicator}`);
  return response.json();
}

// Fetch and validate every series before writing, so a failure keeps the existing snapshot.
const results = [];
for (const [index, item] of series.entries()) {
  results.push(
    yearlyExtremes(
      await history(item.indicator, process.argv[2 + index]),
      today,
    ),
  );
}

const dataset = JSON.parse(await fs.readFile("src/data.json", "utf8"));
const updated = {};
for (const [index, item] of series.entries()) {
  updated[item.key] = 0;
  for (const year of dataset.years) {
    // TGJU starts partway through 1390 for the dollar and 1392 for gold; keep earlier years as they are.
    if (year.year < item.firstYear) continue;
    const range = results[index].years.get(year.year);
    if (!range) throw new Error(`Missing ${item.key} records for ${year.year}`);
    if (item.key === "dollar") {
      Object.assign(year, range, { source: "tgju", resolution: "daily" });
    } else year[item.key] = range;
    updated[item.key]++;
  }
}
dataset.latestDate = results[0].latestDate;
dataset.retrievedAt = today.replaceAll("/", "-");
dataset.sources.tgju.dataUrl = tgjuEndpoint("price_dollar_rl").toString();
dataset.sources.tgjuGold.dataUrls = series
  .slice(1)
  .map((item) => tgjuEndpoint(item.indicator).toString());
await fs.writeFile("src/data.json", JSON.stringify(dataset, null, 2) + "\n");
console.log(
  `Updated ${updated.dollar} dollar, ${updated.goldGram} gold, and ${updated.coin} coin years through ${dataset.latestDate}; prices converted from rial to toman.`,
);
