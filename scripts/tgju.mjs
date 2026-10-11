export function tgjuEndpoint(indicator) {
  const endpoint = new URL(
    `https://api.tgju.org/v1/market/indicator/summary-table-data/${indicator}`,
  );
  endpoint.search = new URLSearchParams({
    lang: "fa",
    order_col: "timestamp",
    order_dir: "asc",
    start: "0",
    length: "20000",
  });
  return endpoint;
}

const price = (value) => {
  const result = Number(String(value).replaceAll(",", "")) / 10;
  if (!Number.isFinite(result) || result <= 0)
    throw new Error("Invalid TGJU price");
  return result;
};

// TGJU rows are [open, low, high, close, change, percent, gregorian, persian], in rial.
export function yearlyExtremes(history, today) {
  if (!Array.isArray(history.data) || !history.data.length) {
    throw new Error(
      "TGJU returned no historical records; existing data is unchanged.",
    );
  }
  if (
    history.data.length !==
    Number(history.recordsFiltered ?? history.recordsTotal)
  ) {
    throw new Error("Incomplete TGJU response; existing data is unchanged.");
  }
  const rows = history.data.filter((row) => row[6] <= today);
  const years = new Map();
  for (const [year, records] of Map.groupBy(rows, (row) =>
    Number(row[7].slice(0, 4)),
  )) {
    const minimum = Math.min(...records.map((row) => price(row[1])));
    const maximum = Math.max(...records.map((row) => price(row[2])));
    if (minimum > maximum) throw new Error("Invalid yearly range");
    years.set(year, { minimum, maximum, observations: records.length });
  }
  const latestDate = rows
    .map((row) => row[6])
    .sort()
    .at(-1)
    .replaceAll("/", "-");
  return { years, latestDate };
}
