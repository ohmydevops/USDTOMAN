import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { build } from "esbuild";
import { governmentForYear, primaryGovernmentPerson } from "../src/government.js";

function createApp(saved = {}, intl = Intl) {
  let factory;
  const portraits = JSON.parse(fs.readFileSync("src/portraits.json", "utf8"));
  const governmentData = JSON.parse(fs.readFileSync("src/government.json", "utf8"));
  const leadership = JSON.parse(fs.readFileSync("src/leadership.json", "utf8"));
  const root = { dataset: {} };
  const source = fs.readFileSync("src/app.js", "utf8").replace(/^import .*;\r?\n/gm, "");
  vm.runInNewContext(source, {
    Intl: intl,
    portraits,
    governmentData,
    governmentForYear,
    primaryGovernmentPerson,
    leadership,
    localStorage: { getItem: (key) => saved[key], setItem: (key, value) => (saved[key] = value) },
    window: { location: { search: "", href: "https://example.test/" }, history: { replaceState: () => {} } },
    URL,
    URLSearchParams,
    document: { documentElement: root, addEventListener: (_, callback) => callback() },
    Alpine: { data: (_, callback) => (factory = callback) },
    navigator: {},
  });
  return { app: factory(), root };
}

test("multipliers use Persian digits, parentheses, and highest / lowest", () => {
  const { app } = createApp();
  assert.equal(app.priceMultiplier({ minimum: 100, maximum: 200 }), "(۲×)");
  assert.equal(app.priceMultiplier({ minimum: 100, maximum: 2200 }), "(۲۲×)");
  assert.equal(app.priceMultiplier({ minimum: 100, maximum: 225 }), "(۲٫۲۵×)");
  assert.equal(app.priceMultiplier({ minimum: 0, maximum: 200 }), "—");
  assert.equal(app.priceMultiplier({ minimum: null, maximum: 200 }), "—");
});

test("English mode uses English digits for years, prices, conversions, multipliers, and dates", () => {
  const { app } = createApp({ language: "en" });
  assert.equal(app.formatYear(1405), "1405");
  assert.equal(app.formatPrice(146980), "146,980");
  assert.equal(app.tomanValue(100), "10,000");
  assert.equal(app.priceMultiplier({ minimum: 100, maximum: 225 }), "(2.25×)");
  assert.ok(!/[۰-۹٠-٩]/.test(app.formatDate("2026-10-08")));
});

test("data age uses Tehran calendar days and localized digits", () => {
  const { app } = createApp();
  assert.equal(app.daysAgo("2026-10-08", new Date("2026-10-10T12:00:00Z")), "۲ روز پیش");
  app.toggleLanguage();
  assert.equal(app.daysAgo("2026-10-08", new Date("2026-10-10T12:00:00Z")), "2 days ago");
  assert.equal(app.daysAgo("2026-10-09", new Date("2026-10-09T21:00:00Z")), "1 day ago");
  assert.equal(app.daysAgo("2026-10-10", new Date("2026-10-10T12:00:00Z")), "0 days ago");
});

test("dollar input has a minimum of one with English and Persian digits", () => {
  const { app } = createApp();
  app.updateAmount("0");
  assert.equal(app.dollarAmount, 1);
  app.updateAmount("۰");
  assert.equal(app.dollarAmount, 1);
  app.updateAmount("");
  assert.equal(app.dollarAmount, 1);
  app.updateAmount("۲۵");
  assert.equal(app.dollarAmount, 25);
});

const sampleYears = () => [
  { year: 1392, minimum: 2889, maximum: 3690, goldGram: null, coin: null, minimumWage: 487125, inflation: 34.7 },
  { year: 1393, minimum: 3026, maximum: 3574, goldGram: { minimum: 90639, maximum: 106668 }, coin: { minimum: 895000, maximum: 1043000 }, minimumWage: 608910, inflation: 15.6 },
  { year: 1405, minimum: 146980, maximum: 272020, goldGram: { minimum: 15512000, maximum: 26842200 }, coin: { minimum: 153130000, maximum: 264300000 }, minimumWage: 16625550, inflation: null },
];

test("switching series shows gold, coin, or wage values and sorts missing years last", () => {
  const { app } = createApp({ language: "en" });
  app.data = { years: sampleYears() };
  app.setSeries("gold");
  assert.equal(app.cell(app.data.years[1], "maximum"), 106668);
  assert.equal(app.formatCell(app.data.years[0], "minimum"), "—");
  app.sortBy("minimum");
  assert.deepEqual(Array.from(app.sortedRows, (row) => row.year), [1405, 1393, 1392]);
  app.sortBy("minimum");
  assert.deepEqual(Array.from(app.sortedRows, (row) => row.year), [1393, 1405, 1392]);
  app.setSeries("coin");
  assert.equal(app.priceMultiplier(app.data.years[1]), "(1.17×)");
  app.setSeries("wage");
  assert.equal(app.cell(app.data.years[2], "minimum"), 16625550);
  assert.equal(app.priceMultiplier(app.data.years[2]), "—");
  app.setSeries("unknown");
  assert.equal(app.series, "wage");
});

test("inflation uses localized percentages and wages convert to dollars at the year's rates", () => {
  const { app } = createApp();
  app.data = { years: sampleYears() };
  app.setSeries("wage");
  assert.equal(app.formatCell(app.data.years[0], "maximum"), "۳۴٫۷٪");
  assert.equal(app.formatCell(app.data.years[2], "maximum"), "—");
  app.toggleLanguage();
  assert.equal(app.formatCell(app.data.years[1], "maximum"), "15.6%");
  assert.equal(app.formatCell(app.data.years[1], "minimum"), "608,910");
  // The lower dollar value uses the year's highest dollar price.
  assert.equal(app.conversion(app.data.years[2], "minimum"), "61");
  assert.equal(app.conversion(app.data.years[2], "maximum"), "113");
});

test("each series keeps its own conversion amount", () => {
  const { app } = createApp({ language: "en" });
  app.data = { years: sampleYears() };
  app.setSeries("coin");
  assert.equal(app.dollarAmount, 1);
  assert.equal(app.conversion(app.data.years[1], "maximum"), "1,043,000");
  app.updateAmount("3");
  app.setSeries("dollar");
  assert.equal(app.dollarAmount, 100);
  assert.equal(app.conversion(app.data.years[1], "minimum"), "302,600");
  app.setSeries("coin");
  assert.equal(app.dollarAmount, 3);
});

test("formatting repeated prices reuses formatters while supporting language changes", () => {
  let created = 0;
  const { app } = createApp({}, {
    NumberFormat: function (...args) { created++; return new Intl.NumberFormat(...args); },
    DateTimeFormat: Intl.DateTimeFormat,
  });
  for (let i = 0; i < 100; i++) app.formatPrice(1000);
  app.toggleLanguage();
  for (let i = 0; i < 100; i++) assert.equal(app.formatPrice(1000), "1,000");
  assert.equal(created, 2);
});

test("government tree shows finance transitions and the Central Bank governor for the selected year", () => {
  const { app } = createApp({ language: "en" });
  app.governmentYear = 1403;
  const finance = app.governmentTree.find(node => node.role === "وزیر امور اقتصادی و دارایی");
  assert.ok(finance.members.some(person => person.en === "Ehsan Khandozi"));
  assert.ok(finance.members.some(person => person.en === "Abdolnaser Hemmati"));
  const bank = app.governmentTree.find(node => node.role === "رئیس کل بانک مرکزی");
  assert.equal(bank.members[0].en, "Mohammad Reza Farzin");
  assert.ok(!app.governmentMinisters.some(node => node.role === "رئیس کل بانک مرکزی"));
  assert.equal(app.centralBankTree.members[0].en, "Mohammad Reza Farzin");
  assert.equal(app.formatTermDate("۳۱ مرداد ۱۴۰۳"), "31 Mordad 1403");
});

test("selecting a person updates their detail panel and localizes the role", () => {
  const { app } = createApp({ language: "en" });
  app.governmentYear = 1403;
  const bank = app.centralBankTree.members[0];
  app.selectGovernmentPerson(bank);
  assert.equal(app.selectedGovernmentPerson.en, "Mohammad Reza Farzin");
  assert.equal(app.selectedPersonRole, "Central Bank Governor");
  app.toggleLanguage();
  assert.equal(app.selectedPersonRole, "رئیس کل بانک مرکزی");
  const finance = app.governmentMinisters.find(node => node.role === "وزیر امور اقتصادی و دارایی").members[0];
  app.selectGovernmentPerson(finance);
  assert.equal(app.selectedGovernmentPerson.en, finance.en);
  assert.equal(app.selectedGovernmentPerson.source, finance.source);
});

test("theme and language persist and restore page direction", () => {
  const saved = {};
  const { app } = createApp(saved);
  app.toggleLanguage();
  app.toggleTheme();
  const reopened = createApp(saved);
  reopened.app.syncPage();
  assert.equal(reopened.root.lang, "en");
  assert.equal(reopened.root.dir, "ltr");
  assert.equal(reopened.root.dataset.theme, "dark");
});

test("every government person has a local portrait and both names", () => {
  const { app } = createApp();
  const data = JSON.parse(fs.readFileSync("src/data.json", "utf8"));
  for (const person of data.years.flatMap((row) => row.government)) {
    assert.ok(person.fa && person.en);
    assert.ok(app.portrait(person), person.en);
    assert.ok(fs.existsSync("src/assets/" + app.portrait(person)), person.en);
  }
});

test("translations have matching Persian and English text", () => {
  const { app } = createApp();
  const persian = app.t;
  app.toggleLanguage();
  assert.deepEqual(Object.keys(app.t).sort(), Object.keys(persian).sort());
  for (const text of Object.values(app.t)) assert.ok(text.length);
});

test("opening the site story uses the modal dialog", () => {
  const { app } = createApp();
  let opened = 0;
  app.$refs = { aboutDialog: { showModal: () => opened++ } };
  app.showAbout();
  assert.equal(opened, 1);
});

test("data sources include coin and supporting references without duplicate URLs", () => {
  const { app } = createApp();
  assert.equal(app.dataSources.length, 0);
  app.data = { sources: {
    gold: { name: "Gold", url: "https://example.test/gold", coinUrl: "https://example.test/coin", references: ["https://example.test/circular", "https://example.test/gold"] },
    inflation: { name: "Inflation", url: "https://example.test/inflation", references: { 1404: "https://example.test/1404" } },
  } };
  const urls = Array.from(app.dataSources, source => source.url);
  assert.deepEqual(urls, ["https://example.test/gold", "https://example.test/coin", "https://example.test/circular", "https://example.test/inflation", "https://example.test/1404"]);
  assert.ok(app.dataSources.find(source => source.url.endsWith("1404")).name.includes("۱۴۰۴"));
  app.toggleLanguage();
  assert.ok(app.dataSources.find(source => source.url.endsWith("1404")).name.includes("1404"));
});

test("source modal includes unique government and leadership references", () => {
  const { app } = createApp();
  assert.ok(app.governmentSources.includes("https://www.archontology.org/nations/iran/00_1979_td_pr.php"));
  assert.equal(new Set(app.governmentSources).size, app.governmentSources.length);
});

test("compiled app runs as a classic script and registers the Alpine component", async () => {
  const script = fs.readFileSync("scripts/build.mjs", "utf8");
  const options = vm.runInNewContext("(" + script.match(/await build\((\{[\s\S]*?\})\);/)[1] + ")");
  const result = await build({ ...options, write: false });
  let factory;
  vm.runInNewContext(result.outputFiles[0].text, {
    localStorage: { getItem: () => null },
    window: { location: { search: "" } },
    URLSearchParams,
    document: { addEventListener: (_, callback) => callback() },
    Alpine: { data: (_, callback) => (factory = callback) },
    navigator: {},
  });
  assert.equal(typeof factory, "function");
  assert.equal(factory().portrait({ en: "Hassan Rouhani" }), "portraits/hassan-rouhani-illustrated.webp");
});
