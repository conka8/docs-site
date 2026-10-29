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
| `npm run readiness` | Regenerate `../READINESS.md` from `src/data/readiness.js` |
| `npm run downloads` | Rebuild `public/downloads/` (tool zips, starter bundle, manifest) from the tool folders next to this repo |

## Deploy

`dist/` is a static site. It uses relative paths, so it works at a domain root or a sub-path.

- **Vercel / Netlify:** build command `npm run build`, output folder `dist`.
- **GitHub Pages:** run `npm run build` and publish the `dist` folder.

## Project structure

```
index.html              page shell, fonts
src/main.jsx            app, hash routing, layout
src/pages/              Home (the offer), Example, Value (calculator), Pilot, Admins, Members, GettingStarted (install),
                        Compare, Trust (readiness), Releases, ToolPage
src/components/         Sidebar, CodeBlock, tables, callouts
src/data/tools.js       tool text, commands and test counts
src/data/catalog.js     starter/more tier, version, needs, costs, first run per tool
src/data/readiness.js   integration readiness (source of ../READINESS.md)
src/data/nav.js         pages, sections, search keywords
src/data/offer.js       optional paid services (off until enabled with a contact)
src/data/value-model.js the value calculator's formulas (tested in tests/offer.test.mjs)
src/data/downloads.js   reads public/downloads/manifest.json
public/downloads/       tool zips + manifest (built by ../scripts/package_tools.py)
src/styles.css          dark theme tokens, layout
src/shims/              used only by build:artifact (React from CDN)
scripts/build-artifact.mjs
tests/data.test.mjs     content shape
tests/release.test.mjs  versions, commands, sample paths, downloads, readiness, prices only in pilot terms
```

## Edit content

Everything visitors read is in `src/data/tools.js`. Change `SUITE.name` there to rename the collection.
Each page and section has its own link: `#skillport`, `#skillport/limits`, `#admins/ship`. Hover a heading and use
the `#` next to it to copy the link.

Before a release, follow `../MAINTAINING.md`.
