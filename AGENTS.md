# AI agent guidelines

## Development

- At the start of each session that involves editing the website, run `npm run dev` and open `http://127.0.0.1:4173/` in the Codex in-app browser. Reuse an existing project dev server and browser tab when available instead of starting duplicates. Keep the server running while editing so changes reload automatically.
- Commit or push only when the developer explicitly requests that action.
- Edit source files, not generated `dist/` files. Use Alpine.js for interaction and Tailwind CSS for UI.
- For behavior changes, write a meaningful unit test first, then implement. Use unit tests only; avoid tests of documentation wording, CSS classes, or layout details.
- Run `npm test` after changes. Run `npm run build` for application or data changes.
- Prefer local resources. Keep runtime assets and dependencies local; use the internet only when necessary to obtain resources or verify facts.

## UI

- Provide Persian and English text, digits, and dates, with correct RTL/LTR direction. Persist theme and language preferences.
- Keep the existing palette, compact layout, and shared scrollbar styling consistent. Tooltips and modals must appear above other layers.
- Show one representative leader portrait per year. Use compact government lists, desktop details on the left, and lists only on mobile.

## Data

- Prices: use `npm run update-data`, or pass complete local TGJU snapshots with `npm run update-data -- dollar.json [gold-gram.json] [coin.json]` (missing ones are fetched). This updates existing dollar rows from 1391 and 18k gold gram (`geram18`) and Bahar Azadi coin (`sekeb`) rows from 1393; add new year rows manually and preserve older source distinctions and toman units.
- Wage and inflation: add `minimumWage` (monthly toman, 30 × the Supreme Labour Council daily rate) and, after a year ends, `inflation` with `inflationSource` (`cbi` or `sci`) manually. Gold before 1393 stays `null` until a consistent source is found.
- Government: update `src/government.json`, `src/leadership.json`, and affected `government` entries in `src/data.json` together. Verify terms and transitions, retain source links, and keep bilingual names consistent.
- Keep portraits local in `src/assets/portraits/` with metadata in `src/portraits.json`. Preserve source credits as plain text.
- Never invent missing facts or prices. Review data diffs and keep the existing snapshot when retrieval fails.
