// Writes ../READINESS.md from src/data/readiness.js so the site and the repository say the same thing.
// Usage: npm run readiness            (write)
//        npm run readiness -- --check (exit 1 if the file is out of date)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { READINESS, STATUSES, readinessSummary } from "../src/data/readiness.js";

export function renderReadiness() {
  const c = readinessSummary();
  const out = [
    "# Readiness",
    "",
    "<!-- Generated from docs-site/src/data/readiness.js by `npm run readiness`. Edit that file, not this one. -->",
    "",
    "What each integration has been tested against. Passing tests against fakes does not make an integration",
    "production ready; only a live check (with a date and version) does.",
    "",
    `Totals: ${c.local} work locally, ${c.fixture} tested against fakes only, ${c.live} live verified, ${c.experimental} unverified or unsupported.`,
    "",
    "| Status | Meaning |",
    "|---|---|",
    ...Object.values(STATUSES).map((s) => `| ${s.label} | ${s.text} |`),
    "",
  ];
  for (const [tool, rows] of Object.entries(READINESS)) {
    out.push(`## ${tool}`, "", "| Integration | Status | Evidence | Live check |", "|---|---|---|---|");
    for (const [name, status, evidence, live] of rows) {
      const check = live ? `${live.date}, ${live.version}: ${live.what}` : "Not yet";
      out.push(`| ${name} | ${STATUSES[status].label} | ${evidence} | ${check} |`);
    }
    out.push("");
  }
  out.push(
    "## Live checks still to do",
    "",
    "Each needs an account the maintainer controls (never a customer's) and is a manual run. Record the date,",
    "version or plan, and what you ran in `docs-site/src/data/readiness.js`, then regenerate this file.",
    "",
    "1. Upload a `skillkit pack --format claude-app` zip to a Claude account and run it.",
    "2. Install a `skillkit pack --marketplace` plugin in Claude Code from a GitHub repository.",
    "3. Convert a real exported n8n workflow and a Make.com blueprint; run a bridge skill against a test n8n instance.",
    "4. Run `skillkit eval --provider anthropic` and `--provider openai` with a small key.",
    "5. Import a real Skool member export and receive one real Zapier test event.",
    "6. One small run per AI provider in geo-audit and voice-qa; one read-only ghl-kit report on a test sub-account.",
    "",
  );
  return out.join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = fileURLToPath(new URL("../../READINESS.md", import.meta.url));
  const text = renderReadiness();
  if (process.argv.includes("--check")) {
    const ok = existsSync(target) && readFileSync(target, "utf8") === text;
    console.log(ok ? "READINESS.md is up to date" : "READINESS.md is out of date: run npm run readiness");
    process.exit(ok ? 0 : 1);
  }
  writeFileSync(target, text);
  console.log(`Wrote ${target}`);
}
