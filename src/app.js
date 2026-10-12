import portraits from "./portraits.json";
import governmentData from "./government.json";
import { governmentForYear, primaryGovernmentPerson } from "./government.js";
import leadership from "./leadership.json";

const translations = {
  fa: {
    title: "قیمت سالانه دلار در ایران",
    introduction:
      "من همیشه مشکل این که دلار ۲۰ هزار تومانی برای چه موقعی بوده رو داشتم. یکبار برای همیشه گفتم یک چیزی دم دستم باشه که نیاز نباشه سرچ کنم همش. این سایت رو درست کردم.",
    year: "سال",
    government: "دولت",
    minimum: "کمترین",
    maximum: "بیشترین",
    multiplier: "نسبت بیشترین به کمترین قیمت در این سال",
    unit: "تومان",
    conversion: "ارزش دلاری",
    amount: "مبلغ به دلار",
    coverage: "آخرین داده:",
    daysAgo: "روز پیش",
    dayAgo: "روز پیش",
    source: "منبع داده:",
    createdWith: "ساخته شده با علاقه و درد توسط",
    createdWhen: "در یک بعدازظهر مهر ۱۴۰۵",
    light: "تم روشن",
    dark: "تم تاریک",
    loading: "در حال دریافت داده‌ها…",
    error: "دریافت داده‌ها ناموفق بود.",
    more: "بیشتر",
    close: "بستن",
    governmentTree: "ساختار دولت در سال",
    cabinet: "هیئت دولت",
    officeholdersNote: "افرادی که در بخشی از این سال خدمت کرده‌اند. نام‌های متعدد نشان‌دهنده تغییر مسئول هستند؛ همه هم‌زمان در سمت نبوده‌اند.",
    historicalSource: "منبع",
    imageSources: "منابع تصاویر",
    priceSources: "منابع قیمت‌ها",
    governmentSources: "منابع هیئت دولت",
    sourcesUsed: "منابع استفاده شده",
    whySite: "چرا این سایت؟",
    readThis: "لطفاً این را بخوانید",
    contactNote: "برای پیشنهاد امکانات جدید، ارسال بازخورد یا تماس با من، می‌توانید به این نشانی ایمیل بزنید:",
    usageResponsibility: "مسئولیت هرگونه استفاده از این سایت و اطلاعات آن بر عهده کاربر است. ما صرفاً داده‌های عمومی را گردآوری و مرتب می‌کنیم و مسئولیتی در قبال نحوه استفاده افراد از این سایت نداریم.",
    all: "همه",
    explorer: "کاوش قیمت‌ها",
    lookupPrice: "قیمت به تومان",
    lookupDollar: "هر ۱ دلار",
    lookupGold: "هر ۱ گرم طلای ۱۸ عیار",
    lookupCoin: "هر ۱ سکه بهار آزادی",
    lookupHint: "مثلاً ۲۰٬۰۰۰",
    lookupEmpty: "قیمت را وارد کنید تا سال‌های مرتبط نمایش داده شوند.",
    lookupNoMatch: "سال مطابقی در داده‌های ثبت‌شده پیدا نشد.",
    lookupNote: "تطبیق با بازه کمترین و بیشترین قیمت ثبت‌شده است؛ به معنی ثبت معامله دقیقاً با این قیمت نیست.",
    explorerIn: "در سال",
    explorerMissing: "برای این سال داده معتبر ثبت نشده است.",
    explorerLoading: "در حال دریافت داده‌ها…",
    explorerNote: "اطلاعات از داده‌های ثبت‌شده سایت است. قیمت‌های سال جاری تا آخرین تاریخ داده محاسبه شده‌اند.",
    desktopFeaturesTitle: "امکانات بیشتر در نسخه دسکتاپ",
    desktopFeaturesNote: "برای استفاده از امکانات بیشتر سایت، مثل محاسبه‌گر قیمت‌های مختلف به دلخواه شما، مثلاً «۱۲۰ دلار چقدر می‌شده؟» و همچنین دیدن جدول بزرگ از همه داده‌ها کنار هم، سایت را در حالت دسکتاپ مرورگر یا روی رایانه باز کنید.",
    understand: "متوجه شدم",
    siteFeatures: "امکانات سایت",
    publicDataNote: "این سایت صرفاً برای گردآوری، مرتب‌سازی و نمایش تجمیعی داده‌های عمومی و درک بهتر اطلاعات تاریخی ساخته شده است و هدف دیگری ندارد. فعالیت آن در چارچوب قوانین و مقررات کشور است و هیچ‌گونه جهت‌گیری سیاسی یا تبلیغی ندارد.",
    featurePrices: "کمترین و بیشترین قیمت سالانه دلار، طلای ۱۸ عیار و سکه بهار آزادی به تومان",
    featureWages: "حداقل حقوق ماهانه، تورم سالانه و محاسبه حقوق به دلار",
    featureConversion: "محاسبه ارزش مبلغ دلخواه دلار، مقدار طلا یا تعداد سکه به تومان در هر سال",
    featureSorting: "مرتب‌سازی سال‌ها، قیمت‌ها، حقوق و تورم",
    featureGovernment: "مشاهده مسئولان دولت، وزیر اقتصاد و رئیس بانک مرکزی هر سال، همراه با دوره مسئولیت و منابع",
    imageNote: "پرتره‌ها با هوش مصنوعی و بر اساس عکس‌های ویکی‌مدیا کامانز بازطراحی شده‌اند. منابع عکس‌های اصلی:",
    publicDomain: "مالکیت عمومی",
    unknownAuthor: "پدیدآورنده نامشخص",
    acting: "سرپرست",
    yearEvents: "تغییرات این سال",
    portraitRule: "تصویر جدول مربوط به فردی است که در این سال بیشترین مدت مسئولیت را داشته است.",
    centralBank: "بانک مرکزی",
    president: "رئیس‌جمهور",
    primeMinister: "نخست‌وزیر",
    termsAndSources: "دوره مسئولیت و منابع",
    otherLeaders: "دیگر مسئولان این سال",
    personHint: "برای دیدن جزئیات، روی نام هر فرد بزنید.",
    series: "نمایش داده",
    dollar: "دلار",
    goldGram: "طلای ۱۸ عیار",
    coin: "سکه بهار آزادی",
    wage: "حقوق و تورم",
    minimumWage: "حداقل حقوق ماهانه",
    inflation: "تورم سالانه",
    wageInDollars: "حقوق به دلار",
    gramUnit: "گرم",
    coinUnit: "سکه",
    goldAmount: "مقدار طلا به گرم",
    coinAmount: "تعداد سکه",
    goldNote: "طلای ۱۸ عیار هر گرم؛ کمترین و بیشترین قیمت روزانه TGJU از ۱۳۹۳. برای سال‌های قبل داده یکدست و معتبری پیدا نشد.",
    coinNote: "سکه تمام بهار آزادی (طرح قدیم)؛ کمترین و بیشترین قیمت روزانه TGJU از ۱۳۹۳. برای سال‌های قبل داده یکدست و معتبری پیدا نشد.",
    wageNote: "حداقل حقوق پایه ماهانه مصوب شورای عالی کار. تورم سالانه (میانگین ۱۲ ماهه): بانک مرکزی تا ۱۴۰۱ و مرکز آمار از ۱۴۰۲؛ تورم سال جاری پس از پایان سال اعلام می‌شود. حقوق به دلار با بیشترین و کمترین قیمت دلار همان سال حساب شده است.",
  },
  en: {
    title: "Yearly dollar prices in Iran",
    introduction:
      "I always had trouble remembering when the dollar was 20,000 tomans. Once and for all, I wanted something handy so I wouldn't have to keep searching. So I made this website.",
    year: "Year",
    government: "Government",
    minimum: "Minimum",
    maximum: "Maximum",
    multiplier: "Highest / lowest price this year",
    unit: "toman",
    conversion: "Dollar value",
    amount: "Amount in dollars",
    coverage: "Latest observation:",
    daysAgo: "days ago",
    dayAgo: "day ago",
    source: "Data sources:",
    createdWith: "Made with passion and pain by",
    createdWhen: "on an afternoon in Mehr 1405",
    light: "Light theme",
    dark: "Dark theme",
    loading: "Loading data…",
    error: "Could not load data. Please reload.",
    more: "More",
    close: "Close",
    governmentTree: "Government in",
    cabinet: "Cabinet",
    officeholdersNote: "People who served during part of this year. Multiple names indicate changes in office; they did not all serve simultaneously.",
    historicalSource: "Source",
    imageSources: "Image sources",
    priceSources: "Price sources",
    governmentSources: "Cabinet sources",
    sourcesUsed: "Sources used",
    whySite: "Why this site?",
    readThis: "Please read this",
    contactNote: "For feature requests, feedback, or other inquiries, you can email me at:",
    usageResponsibility: "Users are responsible for any use of this website and its information. We only collect and organize public data and are not responsible for how people use this website.",
    all: "All",
    explorer: "Explore prices",
    lookupPrice: "Price in tomans",
    lookupDollar: "Per 1 dollar",
    lookupGold: "Per 1 gram of 18k gold",
    lookupCoin: "Per 1 Bahar Azadi coin",
    lookupHint: "For example, 20,000",
    lookupEmpty: "Enter a price to see matching years.",
    lookupNoMatch: "No matching year was found in the saved data.",
    lookupNote: "Matches use recorded minimum–maximum ranges; they do not confirm a trade at that exact price.",
    explorerIn: "in year",
    explorerMissing: "No reliable data is recorded for this year.",
    explorerLoading: "Loading data…",
    explorerNote: "Information comes from the site's saved data. Current-year prices cover observations through the latest data date.",
    desktopFeaturesTitle: "More features on desktop",
    desktopFeaturesNote: "For more features, such as calculating values for an amount of your choice—for example, ‘How much was 120 dollars worth?’—and viewing a large table with all data side by side, open the site in your browser's desktop mode or on a computer.",
    understand: "I understand",
    siteFeatures: "Site features",
    publicDataNote: "This site exists solely to collect, organize, and display aggregated public data for a better understanding of historical information, with no other purpose. It operates within the country's laws and regulations and has no political or promotional agenda.",
    featurePrices: "Yearly lowest and highest dollar, 18k gold, and Bahar Azadi coin prices in tomans",
    featureWages: "Monthly minimum wage, annual inflation, and wage conversion to dollars",
    featureConversion: "Calculate the value of a chosen dollar amount, gold weight, or number of coins in tomans for each year",
    featureSorting: "Sort years, prices, wages, and inflation",
    featureGovernment: "Explore each year's government leaders, economy minister, and Central Bank governor, with terms and sources",
    imageNote: "AI-generated illustrated portraits based on Wikimedia Commons photographs. Original photo sources:",
    publicDomain: "Public domain",
    unknownAuthor: "Unknown author",
    acting: "Acting",
    yearEvents: "Changes this year",
    portraitRule: "The table portrait represents the leader who served longest during this year.",
    centralBank: "Central Bank",
    president: "President",
    primeMinister: "Prime Minister",
    termsAndSources: "Terms and sources",
    otherLeaders: "Other leaders this year",
    personHint: "Select a name to view their details.",
    series: "Data shown",
    dollar: "Dollar",
    goldGram: "18k gold",
    coin: "Bahar Azadi coin",
    wage: "Wage & inflation",
    minimumWage: "Monthly minimum wage",
    inflation: "Annual inflation",
    wageInDollars: "Wage in dollars",
    gramUnit: "g",
    coinUnit: "coins",
    goldAmount: "Gold amount in grams",
    coinAmount: "Number of coins",
    goldNote: "18-karat gold per gram; TGJU daily lows and highs from 1393. No consistent, reliable data was found for earlier years.",
    coinNote: "Full Bahar Azadi coin (old design); TGJU daily lows and highs from 1393. No consistent, reliable data was found for earlier years.",
    wageNote: "Monthly base minimum wage set by the Supreme Labour Council. Annual inflation (12-month average): Central Bank through 1401, Statistical Centre from 1402; the current year's rate is published after the year ends. Wage in dollars uses that year's highest and lowest dollar prices.",
  },
};
const numberFormatters = new Map();
const numberFormatter = (locale, options) => {
  const key = locale + JSON.stringify(options);
  if (!numberFormatters.has(key)) numberFormatters.set(key, new Intl.NumberFormat(locale, options));
  return numberFormatters.get(key);
};
const preference = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const remember = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
const sortParameters = new URLSearchParams(window.location.search);
const sortableColumns = ["year", "minimum", "maximum"];
const initialSort = sortParameters.get("sort");
// The two value columns show a range for prices, or wage and inflation.
const seriesKeys = ["dollar", "gold", "coin", "wage", "all"];
const priceRanges = { gold: "goldGram", coin: "coin" };
const initialSeries = sortParameters.get("series");

document.addEventListener("alpine:init", () =>
  Alpine.data("dollarTable", () => ({
    lang: preference("language") === "en" ? "en" : "fa",
    theme: preference("theme") === "dark" ? "dark" : "light",
    data: null,
    loading: true,
    error: false,
    series: seriesKeys.includes(initialSeries) ? initialSeries : "dollar",
    amounts: { dollar: 100, gold: 10, coin: 1, wage: 100 },
    explorerYear: null,
    explorerPrice: "",
    explorerSeries: "dollar",
    mobileFeaturesAcknowledged: preference("mobileFeaturesAcknowledged") === "true",
    readThisAcknowledged: preference("readThisAcknowledged") === "true",
    governmentYear: null,
    selectedGovernmentPerson: null,
    currentDate: new Date(),
    sortKey: sortableColumns.includes(initialSort) ? initialSort : "year",
    ascending: sortParameters.get("order") === "asc",
    columns: [
      { key: "year" },
      { key: "government" },
      { key: "minimum", unit: true },
      { key: "maximum", unit: true },
    ],
    get t() {
      return translations[this.lang];
    },
    get locale() {
      return this.lang === "fa" ? "fa-IR" : "en-US";
    },
    async init() {
      this.ensureDesktopSeries(window.innerWidth);
      this.syncPage();
      this.$nextTick(() => this.showWelcome(window.innerWidth));
      await this.refreshData();
      this.onOnline = () => this.refreshData();
      this.onVisible = () => {
        if (document.visibilityState === "visible") this.refreshData();
      };
      window.addEventListener("online", this.onOnline);
      document.addEventListener("visibilitychange", this.onVisible);
      this.refreshTimer = setInterval(() => {
        if (document.visibilityState === "visible") this.refreshData();
      }, 60000);
    },
    destroy() {
      clearInterval(this.refreshTimer);
      window.removeEventListener("online", this.onOnline);
      document.removeEventListener("visibilitychange", this.onVisible);
    },
    async refreshData() {
      if (this.refreshing) return;
      this.refreshing = true;
      try {
        const response = await fetch("data.json", { cache: "no-store" });
        if (!response.ok) throw Error(response.status);
        const data = await response.json();
        if (!Array.isArray(data.years)) throw Error("Invalid data");
        if (JSON.stringify(data) !== JSON.stringify(this.data))
          this.data = data;
        this.error = false;
      } catch {
        this.error = !this.data;
      } finally {
        this.currentDate = new Date();
        this.loading = false;
        this.refreshing = false;
      }
    },
    syncPage() {
      document.documentElement.lang = this.lang;
      document.documentElement.dir = this.lang === "fa" ? "rtl" : "ltr";
      document.documentElement.dataset.theme = this.theme;
      document.title =
        this.lang === "fa"
          ? "قیمت سالانه دلار در ایران؛ کمترین و بیشترین نرخ | USD / Toman"
          : "Yearly dollar prices in Iran: minimum and maximum | USD / Toman";
    },
    toggleLanguage() {
      this.lang = this.lang === "fa" ? "en" : "fa";
      remember("language", this.lang);
      this.syncPage();
    },
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      remember("theme", this.theme);
      this.syncPage();
    },
    sortBy(key) {
      if (!sortableColumns.includes(key)) return;
      if (this.sortKey === key) this.ascending = !this.ascending;
      else {
        this.sortKey = key;
        this.ascending = false;
      }
      this.syncUrl();
    },
    setSeries(key) {
      if (!seriesKeys.includes(key)) return;
      this.series = key;
      if (key === "all") this.sortKey = "year";
      this.syncUrl();
    },
    showWelcome(width) {
      if (!this.readThisAcknowledged) this.showReadThis();
      else if (width < 1024 && !this.mobileFeaturesAcknowledged) this.showMobileFeatures(width);
      else if (sortParameters.get("credits") === "1") this.$refs.creditsDialog.showModal();
    },
    acknowledgeReadThis(width = window.innerWidth) {
      if (this.readThisAcknowledged) return;
      this.readThisAcknowledged = true;
      remember("readThisAcknowledged", "true");
      this.showWelcome(width);
    },
    showMobileFeatures(width) {
      if (width < 1024 && !this.mobileFeaturesAcknowledged)
        this.$refs.mobileFeaturesDialog.showModal();
    },
    acknowledgeMobileFeatures() {
      this.onMobileFeaturesClosed();
      this.$refs.mobileFeaturesDialog.close();
    },
    onMobileFeaturesClosed() {
      this.mobileFeaturesAcknowledged = true;
      remember("mobileFeaturesAcknowledged", "true");
    },
    ensureDesktopSeries(width) {
      if (width < 1024 && this.series === "all") this.setSeries("dollar");
    },
    get allColumns() {
      return [
        { key: "minimum", label: this.t.dollar, range: this.t.minimum },
        { key: "maximum", label: this.t.dollar, range: this.t.maximum },
        { key: "goldMinimum", label: this.t.goldGram, range: this.t.minimum },
        { key: "goldMaximum", label: this.t.goldGram, range: this.t.maximum },
        { key: "coinMinimum", label: this.t.coin, range: this.t.minimum },
        { key: "coinMaximum", label: this.t.coin, range: this.t.maximum },
        { key: "minimumWage", label: this.t.minimumWage },
        { key: "inflation", label: this.t.inflation },
      ];
    },
    allValue(row, key) {
      const value = { goldMinimum: row.goldGram?.minimum, goldMaximum: row.goldGram?.maximum,
        coinMinimum: row.coin?.minimum, coinMaximum: row.coin?.maximum }[key] ?? row[key] ?? null;
      if (key === "inflation") return value === null ? "—" : numberFormatter(this.locale, { style: "percent", maximumFractionDigits: 1 }).format(value / 100);
      return this.formatPrice(value);
    },
    syncUrl() {
      const url = new URL(window.location.href);
      url.searchParams.set("sort", this.sortKey);
      url.searchParams.set("order", this.ascending ? "asc" : "desc");
      url.searchParams.set("series", this.series);
      window.history.replaceState(null, "", url);
    },
    get seriesOptions() {
      return [
        { key: "dollar", label: this.t.dollar },
        { key: "gold", label: this.t.goldGram },
        { key: "coin", label: this.t.coin },
        { key: "wage", label: this.t.wage },
        { key: "all", label: this.t.all },
      ];
    },
    get seriesNote() {
      return { gold: this.t.goldNote, coin: this.t.coinNote, wage: this.t.wageNote }[this.series] || "";
    },
    columnLabel(key) {
      if (this.series === "wage" && key === "minimum") return this.t.minimumWage;
      if (this.series === "wage" && key === "maximum") return this.t.inflation;
      return this.t[key];
    },
    columnHasUnit(key) {
      return (key === "minimum" || key === "maximum") && !(this.series === "wage" && key === "maximum");
    },
    get amountUnit() {
      return { dollar: "$", gold: this.t.gramUnit, coin: this.t.coinUnit }[this.series] || "$";
    },
    get amountLabel() {
      return { gold: this.t.goldAmount, coin: this.t.coinAmount }[this.series] || this.t.amount;
    },
    get dollarAmount() {
      return this.amounts[this.series];
    },
    set dollarAmount(value) {
      this.amounts[this.series] = value;
    },
    // Value in the minimum or maximum column for the selected series.
    cell(row, key) {
      if (key === "year") return row.year;
      if (this.series === "wage") return key === "minimum" ? row.minimumWage : row.inflation;
      const range = priceRanges[this.series] ? row[priceRanges[this.series]] : row;
      return range?.[key] ?? null;
    },
    formatCell(row, key) {
      const value = this.cell(row, key);
      if (this.series === "wage" && key === "maximum")
        return value === null
          ? "—"
          : numberFormatter(this.locale, { style: "percent", maximumFractionDigits: 1 }).format(value / 100);
      return this.formatPrice(value);
    },
    // Desktop conversion columns: amount × price, or the wage in dollars at the year's rates.
    conversion(row, key) {
      if (this.series !== "wage") return this.tomanValue(this.cell(row, key));
      const dollar = key === "minimum" ? row.maximum : row.minimum;
      if (!row.minimumWage || !dollar || dollar <= 0) return "—";
      return numberFormatter(this.locale, { maximumFractionDigits: 0 }).format(row.minimumWage / dollar);
    },
    portrait(person) {
      return portraits[person.en]?.src;
    },
    primaryPerson(row) {
      return primaryGovernmentPerson(row, leadership.terms);
    },
    get governmentEvent() {
      return leadership.events[this.governmentYear] || null;
    },
    get portraitCredits() {
      return Object.entries(portraits).map(([en, credit]) => ({
        ...credit,
        en,
        fa: this.data?.years.flatMap(row => row.government).find(person => person.en === en)?.fa || en,
      }));
    },
    showExplorer() {
      this.explorerSeries = "dollar";
      this.explorerYear = this.explorerYears[0]?.year ?? null;
      this.$refs.explorerDialog.showModal();
    },
    get explorerYears() {
      return [...(this.data?.years || [])].sort((a, b) => b.year - a.year);
    },
    updateExplorerPrice(value) {
      const normalized = String(value).replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit)).replace(/[,٬\s]/g, "");
      if (normalized === "" || (/^\d+$/.test(normalized) && Number.isSafeInteger(Number(normalized)) && Number(normalized) > 0)) this.explorerPrice = normalized;
    },
    get explorerPriceDisplay() {
      return this.explorerPrice === "" ? "" : numberFormatter(this.locale, { maximumFractionDigits: 0 }).format(Number(this.explorerPrice));
    },
    get explorerMatches() {
      const normalized = String(this.explorerPrice).replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)).replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit)).replace(/[,٬\s]/g, "");
      const price = Number(normalized);
      if (!/^\d+(\.\d+)?$/.test(normalized) || !Number.isFinite(price) || price <= 0) return [];
      return this.explorerYears.filter(row => {
        const range = this.explorerSeries === "gold" ? row.goldGram : this.explorerSeries === "coin" ? row.coin : row;
        return range && Number.isFinite(range.minimum) && Number.isFinite(range.maximum) && price >= range.minimum && price <= range.maximum;
      });
    },
    get explorerRow() {
      return this.data?.years.find(row => row.year === Number(this.explorerYear ?? this.explorerYears[0]?.year)) || null;
    },
    get explorerRange() {
      const row = this.explorerRow;
      if (!row) return null;
      return this.explorerSeries === "gold" ? row.goldGram : this.explorerSeries === "coin" ? row.coin : row;
    },
    get explorerPriceNote() {
      if (this.explorerSeries === "gold") return this.t.goldNote;
      if (this.explorerSeries === "coin") return this.t.coinNote;
      return this.data?.sources?.[this.explorerRow?.source]?.coverage || "";
    },
    get explorerSource() {
      return this.data?.sources?.[this.explorerSeries === "dollar" ? this.explorerRow?.source : "tgjuGold"] || null;
    },
    showAbout() {
      this.$refs.aboutDialog.showModal();
    },
    showReadThis() {
      this.$refs.readThisDialog.showModal();
    },
    get dataSources() {
      const links = new Map();
      const add = (url, name) => {
        if (url && !links.has(url)) links.set(url, { url, name });
      };
      for (const source of Object.values(this.data?.sources || {})) {
        add(source.url, source.name);
        add(source.coinUrl, this.t.coin);
        for (const [key, url] of Object.entries(source.references || {})) {
          const label = Array.isArray(source.references)
            ? (this.lang === "fa" ? "مرجع " : "Reference ") + this.formatYear(Number(key) + 1)
            : this.formatYear(Number(key));
          add(url, source.name + " · " + label);
        }
      }
      return [...links.values()];
    },
    get governmentSources() {
      return [...new Set([
        ...governmentData.records.map(person => person.source),
        leadership.termSource,
        ...leadership.terms.map(person => person.source),
        ...Object.values(leadership.events).flatMap(event => [event.source, event.electionSource]),
        this.data?.governmentSource?.url,
      ].filter(Boolean))];
    },
    get governmentTree() {
      if (this.governmentYear === null) return [];
      return governmentForYear(this.governmentYear, governmentData.records).map(node => ({
        ...node,
        label: this.lang === "fa" ? node.role : governmentData.roles[node.role],
      }));
    },
    get governmentLeaders() {
      return this.governmentTree.filter(node => ["رئیس‌جمهور", "نخست‌وزیر", "معاون اول"].includes(node.role));
    },
    get governmentMinisters() {
      return this.governmentTree.filter(node => !["رئیس‌جمهور", "نخست‌وزیر", "رئیس کل بانک مرکزی"].includes(node.role))
        .sort((a, b) => {
          const priority = role => role === "وزیر امور اقتصادی و دارایی" ? 0 : role === "رئیس کل بانک مرکزی" ? 1 : 2;
          return priority(a.role) - priority(b.role) || a.label.localeCompare(b.label, this.locale);
        });
    },
    get centralBankTree() {
      return this.governmentTree.find(node => node.role === "رئیس کل بانک مرکزی") || null;
    },
    get governmentPrimaryLeader() {
      const row = this.data?.years.find(row => row.year === this.governmentYear);
      return row ? this.primaryPerson(row) : null;
    },
    selectGovernmentPerson(person) {
      this.selectedGovernmentPerson = { ...person };
    },
    get selectedPersonRole() {
      const role = this.selectedGovernmentPerson?.role;
      return role ? (this.lang === "fa" ? role : governmentData.roles[role]) : "";
    },
    showGovernment(row) {
      this.governmentYear = row.year;
      const primary = this.primaryPerson(row);
      const leaders = this.governmentLeaders.flatMap(node => node.members);
      const normalize = name => name.replace(/ \(.+\)/, "");
      const person = leaders.find(person => normalize(person.en) === normalize(primary.en)) || leaders[0] || this.centralBankTree?.members[0];
      this.selectedGovernmentPerson = person ? { ...person } : null;
      this.$refs.governmentDialog.showModal();
    },
    formatTermDate(value) {
      if (this.lang === "fa") return value;
      const words = {
        "فروردین": "Farvardin", "اردیبهشت": "Ordibehesht", "خرداد": "Khordad",
        "تیر": "Tir", "مرداد": "Mordad", "شهریور": "Shahrivar", "مهر": "Mehr",
        "آبان": "Aban", "آذر": "Azar", "دی": "Dey", "بهمن": "Bahman", "اسفند": "Esfand",
        "بهار": "Spring", "تابستان": "Summer", "پاییز": "Autumn", "زمستان": "Winter",
        "در حال تصدی": "Present", "اکنون": "Present", "متصدی": "Present", "تاکنون": "Present",
      };
      let text = value.replace(/[۰-۹]/g, digit => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
      for (const [fa, en] of Object.entries(words)) text = text.replaceAll(fa, en);
      return text;
    },
    governmentName(row) {
      return row.government
        .map((person) => person[this.lang])
        .join(this.lang === "fa" ? "، " : ", ");
    },
    get sortedRows() {
      if (!this.data) return [];
      const key = this.sortKey,
        direction = this.ascending ? 1 : -1;
      return [...this.data.years].sort((a, b) => {
        if (key === "government")
          return (
            direction *
              a.government
                .map((p) => p[this.lang])
                .join(" ")
                .localeCompare(
                  b.government.map((p) => p[this.lang]).join(" "),
                  this.locale,
                ) || b.year - a.year
          );
        const first = this.cell(a, key),
          second = this.cell(b, key);
        if (first === null && second !== null) return 1;
        if (second === null && first !== null) return -1;
        return direction * ((first ?? 0) - (second ?? 0)) || b.year - a.year;
      });
    },
    formatYear(value) {
      return numberFormatter(this.locale, { useGrouping: false }).format(
        value,
      );
    },
    tomanValue(price) {
      const amount = Number(this.dollarAmount);
      if (!Number.isFinite(amount) || amount < 0 || !price || price <= 0)
        return "—";
      return numberFormatter(this.locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(amount * price)
        .replace("٫", ".");
    },
    updateAmount(value) {
      const normalized = value
        .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
        .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
        .replace(/[,٬\s]/g, "");
      if (/^\d*$/.test(normalized) && Number.isFinite(Number(normalized)))
        this.dollarAmount = Math.max(1, Number(normalized));
    },
    formatPrice(value) {
      return value === null
        ? "—"
        : numberFormatter(this.locale, {
            maximumFractionDigits: 0,
          }).format(value);
    },
    priceMultiplier(row) {
      const minimum = this.cell(row, "minimum"),
        maximum = this.cell(row, "maximum");
      if (
        this.series === "wage" ||
        !Number.isFinite(minimum) ||
        !Number.isFinite(maximum) ||
        minimum <= 0 ||
        maximum < minimum
      )
        return "—";
      return (
        "(" + numberFormatter(this.locale, {
          useGrouping: false,
          maximumFractionDigits: 2,
        }).format(maximum / minimum) + "×)"
      );
    },
    daysAgo(value, now = this.currentDate) {
      const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Tehran", year: "numeric", month: "2-digit", day: "2-digit",
      }).formatToParts(now).map(part => [part.type, part.value]));
      const today = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
      const observed = Date.parse(value + "T00:00:00Z");
      if (!Number.isFinite(observed)) return "—";
      const days = Math.max(0, Math.round((today - observed) / 86400000));
      return numberFormatter(this.locale, { useGrouping: false }).format(days) + " " + (days === 1 ? this.t.dayAgo : this.t.daysAgo);
    },
    formatDate(value) {
      return new Intl.DateTimeFormat(this.locale + "-u-ca-persian", {
        numberingSystem: this.lang === "fa" ? "arabext" : "latn",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(value + "T12:00:00Z"));
    },
  })),
);

if ("serviceWorker" in navigator) {
  const alreadyControlled = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (alreadyControlled && !reloading) {
      reloading = true;
      window.location.reload();
    }
  });
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        updateViaCache: "none",
      });
      const check = () => registration.update().catch(() => {});
      window.addEventListener("online", check);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") check();
      });
      setInterval(() => {
        if (document.visibilityState === "visible") check();
      }, 300000);
    } catch {
      // The website still works when installation is unavailable.
    }
  });
}
