import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("src/data.json", "utf8"));
const currentYear = Math.max(...data.years.map((row) => row.year));

test("every year has a monthly minimum wage that never decreases", () => {
  let previous = 0;
  for (const row of [...data.years].sort((a, b) => a.year - b.year)) {
    assert.ok(Number.isFinite(row.minimumWage) && row.minimumWage >= previous, String(row.year));
    previous = row.minimumWage;
  }
});

test("completed years have sourced inflation and the current year waits until it ends", () => {
  for (const row of data.years) {
    if (row.year === currentYear) {
      assert.equal(row.inflation, null);
      continue;
    }
    assert.ok(Number.isFinite(row.inflation), String(row.year));
    assert.ok(data.sources[row.inflationSource + "Inflation"], String(row.year));
  }
});

test("gold and coin ranges start with TGJU's first full year and are valid", () => {
  for (const row of data.years) {
    for (const key of ["goldGram", "coin"]) {
      if (row.year < 1393) {
        assert.equal(row[key], null, `${key} ${row.year}`);
        continue;
      }
      const range = row[key];
      assert.ok(range.minimum > 0 && range.minimum <= range.maximum, `${key} ${row.year}`);
      assert.ok(range.observations > 0, `${key} ${row.year}`);
    }
  }
});
