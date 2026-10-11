# USD / Toman

Yearly US dollar, 18k gold, and Bahar Azadi coin prices in Iran, with the monthly minimum wage, annual inflation, Persian/English, light/dark themes, and cabinet details.

[Open the website](https://ohmydevops.github.io/USDTOMAN/)

## Run locally

```sh
npm ci
npm run build
npm run dev
```

Open http://127.0.0.1:4173/. Source files are in `src/`; `dist/` is generated. Built with Alpine.js and Tailwind CSS.

## Update and check

- Prices: run `npm run update-data` to refresh the stored TGJU dollar, gold, and coin snapshots.
- Wage and inflation: edit `minimumWage` and `inflation` in `src/data.json` when new figures are published.
- Government: edit `src/government.json` and `src/leadership.json`, keeping names and sources consistent.
- Run `npm test` and `npm run build` after application changes.

See [AGENTS.md](AGENTS.md) for development and data guidelines. GitHub Actions deploys to GitHub Pages on pushes to `main`.
