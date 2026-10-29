// Builds artifact-dist/artifact.html: the same site as one file for publishing as a claude.ai artifact.
// The artifact host adds <html>/<head>/<body>, so this file holds only head tags and the app.
// React loads from cdnjs as a global (the artifact sandbox only allows CDN scripts); src/shims maps imports onto it.
// For normal hosting use `npm run build` (Vite) instead.
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";

const REACT = "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js";
const REACT_DOM = "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js";
const FONTS =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Source+Sans+3:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap";

const result = await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  jsx: "transform",
  alias: {
    react: "./src/shims/react.js",
    "react-dom/client": "./src/shims/react-dom-client.js",
  },
  outdir: "artifact-dist/tmp",
  write: false,
  logLevel: "warning",
});

const js = result.outputFiles.find((f) => f.path.endsWith(".js")).text.replace(/<\/script/gi, "<\\/script");
const css = result.outputFiles.find((f) => f.path.endsWith(".css")).text;

const page = `<title>Builder Commons Docs</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${css}</style>
<div id="root"></div>
<script src="${REACT}" crossorigin="anonymous"></script>
<script src="${REACT_DOM}" crossorigin="anonymous"></script>
<script>${js}</script>
`;

await mkdir("artifact-dist", { recursive: true });
await writeFile("artifact-dist/artifact.html", page);
console.log(`Built artifact-dist/artifact.html (${(page.length / 1024).toFixed(1)} KB)`);
