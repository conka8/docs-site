// Keeps the site in step with the tools, the downloads and the readiness data. Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { TOOLS } from "../src/data/tools.js";
import { CATALOG, STARTER } from "../src/data/catalog.js";
import { READINESS, STATUSES } from "../src/data/readiness.js";
import { PILOT_OFFER } from "../src/data/pilot-offer.js";
import { PAGES } from "../src/data/nav.js";
import { renderReadiness } from "../scripts/write-readiness.mjs";

const projectsDir = fileURLToPath(new URL("../../", import.meta.url));
const downloadsDir = fileURLToPath(new URL("../public/downloads/", import.meta.url));
const srcDir = fileURLToPath(new URL("../src/", import.meta.url));
const hasProjects = existsSync(projectsDir + "skillport/pyproject.toml");
const manifest = JSON.parse(readFileSync(downloadsDir + "manifest.json", "utf8"));

function pyproject(id) {
  return readFileSync(projectsDir + id + "/pyproject.toml", "utf8");
}

test("every tool has catalog facts and the starter bundle lists real tools", () => {
  for (const t of TOOLS) {
    const c = CATALOG[t.id];
    assert.ok(c, `${t.id} has no catalog entry`);
    for (const k of ["tier", "version", "useCase", "needs", "cost", "produces"]) assert.ok(c[k], `${t.id}.${k}`);
    assert.ok(c.firstRun?.code && c.firstRun?.expect, `${t.id}.firstRun`);
    assert.equal(c.tier === "starter", STARTER.includes(t.id), `${t.id} tier vs STARTER`);
  }
  assert.equal(Object.keys(CATALOG).length, TOOLS.length);
});

test("site versions and command names match each tool's pyproject.toml", { skip: !hasProjects }, () => {
  for (const t of TOOLS) {
    const toml = pyproject(t.id);
    assert.match(toml, new RegExp(`^version = "${CATALOG[t.id].version.replace(/\./g, "\\.")}"`, "m"), `${t.id} version`);
    assert.match(toml, new RegExp(`^${t.cli} = "`, "m"), `${t.id}: command ${t.cli} is not in [project.scripts]`);
  }
});

test("every sample file a quickstart or first run mentions ships with the tool", { skip: !hasProjects }, () => {
  for (const t of TOOLS) {
    const texts = [...t.quickstart.map((q) => q.code), CATALOG[t.id].firstRun.code];
    for (const text of texts) {
      for (const [path] of text.matchAll(/\bexamples\/[\w./-]*[\w]/g)) {
        assert.ok(existsSync(projectsDir + t.id + "/" + path), `${t.id}: ${path} is mentioned but not shipped`);
      }
    }
  }
});

test("readiness rows are well formed and live claims carry evidence", () => {
  for (const t of TOOLS) {
    const rows = READINESS[t.id];
    assert.ok(rows?.length, `${t.id} has no readiness rows`);
    for (const [name, status, evidence, live] of rows) {
      assert.ok(name && evidence, `${t.id} row`);
      assert.ok(STATUSES[status], `${t.id}: unknown status ${status}`);
      if (status === "live") {
        assert.ok(live?.date && live?.version && live?.what, `${t.id}: "${name}" is live without date, version and what was run`);
        assert.match(live.date, /^\d{4}-\d{2}-\d{2}$/);
      } else assert.equal(live, null, `${t.id}: "${name}" has a live check but status ${status}`);
    }
  }
});

test("READINESS.md is generated from the same data", { skip: !hasProjects }, () => {
  assert.equal(readFileSync(projectsDir + "READINESS.md", "utf8"), renderReadiness(), "run npm run readiness");
});

test("every download in the manifest exists with the recorded size and checksum", () => {
  for (const d of manifest.files) {
    const data = readFileSync(downloadsDir + d.file);
    assert.equal(data.length, d.bytes, d.file);
    assert.equal(createHash("sha256").update(data).digest("hex"), d.sha256, d.file);
  }
  const zips = readdirSync(downloadsDir).filter((f) => f.endsWith(".zip"));
  assert.deepEqual(zips.sort(), manifest.files.map((d) => d.file).sort(), "zips on disk vs manifest");
});

test("every tool and the starter bundle has a download at the version the site shows", () => {
  for (const t of TOOLS) {
    const d = manifest.files.find((f) => f.tool === t.id);
    assert.ok(d, `no download for ${t.id}`);
    assert.equal(d.version, CATALOG[t.id].version, `${t.id} download version`);
  }
  const starter = manifest.files.find((f) => f.tool === "builder-commons-starter");
  assert.ok(starter, "no starter bundle download");
  assert.deepEqual([...starter.contains].sort(), [...STARTER].sort());
});

test("page section ids are unique and URL-safe", () => {
  for (const p of PAGES) {
    const ids = p.sections.map((s) => s[0]);
    assert.equal(new Set(ids).size, ids.length, p.id);
    for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
  }
});

test("no prices, checkout or purchase buttons anywhere on the site", () => {
  const files = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(dir + e.name + "/");
      else if (/\.(jsx?|mjs)$/.test(e.name)) files.push(dir + e.name);
    }
  };
  walk(srcDir);
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    assert.doesNotMatch(text, /checkout|buy now|add to cart|pricing plan/i, f);
    // tools.js holds calculator output such as "$300k", Example.jsx quotes the synthetic member's own prices from
    // the recorded runs, and pilot-offer.js holds the one decided price. Anywhere else an amount would be unsourced.
    if (!["data/tools.js", "pages/Example.jsx", "data/pilot-offer.js"].some((x) => f.endsWith(x))) {
      assert.doesNotMatch(text, /[$€£]\s?\d|\/mo\b|\bUSD\s?\d/i, f);
    }
  }
});

test("the enquiry only links somewhere real", () => {
  const dest = PILOT_OFFER.enquiry.destination;
  if (dest) assert.match(dest, /^(mailto:\S+@\S+\.\S+|https:\/\/\S+\.\S+)$/);
  const form = dest.match(/[?&]template=([\w.-]+)/);
  if (form) assert.ok(existsSync(new URL(`../.github/ISSUE_TEMPLATE/${form[1]}`, import.meta.url)), form[1]);
  assert.ok(PILOT_OFFER.enquiry.prepare.length >= 3);
  for (const key of ["deliverables", "revisions", "customerInputs", "exclusions", "acceptanceFails", "maintenance"]) {
    assert.ok(PILOT_OFFER[key].length > 0, key);
  }
});
