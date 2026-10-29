# Builder Commons docs

Documentation site for the nine tools in `founder-projects/`, built with React 18 and Vite.

## Run it

```bash
npm install
npm run dev        # local site with hot reload at http://localhost:5173
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve `dist/` locally to check the production build |
| `npm test` | Check the docs content (fields, ids, test totals, tool folders exist) |
| `npm run build:artifact` | Build `artifact-dist/artifact.html`, a single-file copy for a claude.ai artifact link |

## Deploy

`dist/` is a static site. It uses relative paths, so it works at a domain root or a sub-path.

- **Vercel / Netlify:** build command `npm run build`, output folder `dist`.
- **GitHub Pages:** run `npm run build` and publish the `dist` folder.

## Project structure

```
index.html              page shell, fonts
src/main.jsx            app, hash routing, layout
src/pages/              Home, ToolPage, GettingStarted, Trust
src/components/         Sidebar, CodeBlock, tables, callouts
src/data/tools.js       all text, commands and test counts
src/styles.css          dark theme tokens, layout
src/shims/              used only by build:artifact (React from CDN)
scripts/build-artifact.mjs
tests/data.test.mjs
```

## Edit content

Everything visitors read is in `src/data/tools.js`. Change `SUITE.name` there to rename the collection.
Each tool page has its own link (`#shipsafe`, `#geo-audit`, ...), so you can send one founder the page that fits them.
