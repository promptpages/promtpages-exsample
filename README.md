# PromptPages Examples (Static)

A fully static site showcasing example one-page business websites.

No login. No database. Just browse industries and preview example pages.

## Live site

After deploying: **https://promptpages.github.io/promtpages-exsample/**

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to GitHub Pages

```bash
npm install
npm run deploy
```

Or manually:

```bash
npm run build
# Then in GitHub → Settings → Pages
# Source: Deploy from a branch
# Branch: gh-pages / (root)
```

The `deploy` script builds the site and pushes the `dist` folder to the `gh-pages` branch.

## Structure

- `/` — Search and browse all example industries
- `/#/ex/lawn` — Example page for an industry (e.g. lawn, bakery, plumber)

All data lives in `src/data/industries.js` — edit that file to add or change examples.
