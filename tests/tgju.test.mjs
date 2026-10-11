import test from "node:test";
import assert from "node:assert/strict";
import { yearlyExtremes } from "../scripts/tgju.mjs";

const row = (open, low, high, close, gregorian, persian) => [open, low, high, close, "", "", gregorian, persian];

test("yearly extremes use daily lows and highs in toman, grouped by Persian year", () => {
  const history = {
    recordsFiltered: 4,
    data: [
      row("10,000", "9,000", "12,000", "11,000", "2025/03/19", "1403/12/29"),
      row("20,000", "18,000", "25,000", "22,000", "2025/03/22", "1404/01/02"),
      row("21,000", "15,000", "21,500", "16,000", "2025/04/10", "1404/01/21"),
      row("99,000", "1,000", "99,000", "99,000", "2025/04/11", "1404/01/22"),
    ],
  };
  const result = yearlyExtremes(history, "2025/04/10");
  assert.deepEqual(result.years.get(1404), { minimum: 1500, maximum: 2500, observations: 2 });
  assert.deepEqual(result.years.get(1403), { minimum: 900, maximum: 1200, observations: 1 });
  assert.equal(result.latestDate, "2025-04-10");
});

test("incomplete or invalid TGJU responses are rejected", () => {
  assert.throws(() => yearlyExtremes({ data: [] }, "2025/04/10"), /no historical records/);
  assert.throws(
    () => yearlyExtremes({ recordsFiltered: 2, data: [row("1", "1", "1", "1", "2025/04/10", "1404/01/21")] }, "2025/04/10"),
    /Incomplete/,
  );
  assert.throws(
    () => yearlyExtremes({ recordsFiltered: 1, data: [row("1", "-", "1", "1", "2025/04/10", "1404/01/21")] }, "2025/04/10"),
    /Invalid TGJU price/,
  );
});
