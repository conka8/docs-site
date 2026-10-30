// Checks the docs content so a typo in src/data/tools.js can't ship a broken page.
// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { GROUPS, SUITE, TOOLS, TOTAL_TESTS } from "../src/data/tools.js";
import { PAGE_IDS } from "../src/data/nav.js";

const projectsDir = fileURLToPath(new URL("../../", import.meta.url));
// The tools live next to this repository on the maintainer's machine; on a CI checkout of the docs alone they don't.
const hasProjects = existsSync(projectsDir + "skillport/pyproject.toml");
const RESERVED_HASHES = ["settings", "sidebar", "customize", "upgrade", "downloads", "main", ...PAGE_IDS];

test("suite has a name and license", () => {
  assert.ok(SUITE.name.length > 0);
  assert.equal(SUITE.license, "MIT");
});

test("there are nine tools with unique, URL-safe ids", () => {
  assert.equal(TOOLS.length, 9);
  const ids = TOOLS.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    assert.match(id, /^[a-z0-9-]+$/);
    assert.ok(!RESERVED_HASHES.includes(id), `${id} collides with a reserved or page route`);
  }
});

test("every tool has the fields its page renders", () => {
  const groupIds = new Set(GROUPS.map((g) => g.id));
  for (const t of TOOLS) {
    for (const key of ["name", "cli", "tagline", "summary", "why"]) {
      assert.ok(typeof t[key] === "string" && t[key].length > 0, `${t.id}.${key}`);
    }
    assert.ok(groupIds.has(t.group), `${t.id} has unknown group ${t.group}`);
    assert.ok(Number.isInteger(t.tests) && t.tests > 0, `${t.id}.tests`);
    for (const key of ["audience", "highlights", "quickstart", "commands", "options", "outputs", "owners", "limits", "verify"]) {
      assert.ok(Array.isArray(t[key]) && t[key].length > 0, `${t.id}.${key} is empty`);
    }
    assert.ok(t.example && t.example.title && t.example.code, `${t.id}.example`);
    for (const q of t.quickstart) assert.ok(q.label && q.code, `${t.id} quickstart entry`);
    for (const row of [...t.commands, ...t.options, ...t.outputs]) assert.equal(row.length, 2, `${t.id} table row ${row[0]}`);
  }
});

test("every group has at least one tool", () => {
  for (const g of GROUPS) assert.ok(TOOLS.some((t) => t.group === g.id), g.id);
});

test("total test count matches the sum shown on the site", () => {
  assert.equal(TOTAL_TESTS, TOOLS.reduce((s, t) => s + t.tests, 0));
  assert.equal(TOTAL_TESTS, 2150);
});

test("every documented tool exists next to the docs", { skip: !hasProjects }, () => {
  for (const t of TOOLS) {
    assert.ok(existsSync(projectsDir + t.id + "/README.md"), `missing ${t.id}/README.md`);
  }
});

test("the shipsafe demo video and its poster are in public/media", () => {
  const media = fileURLToPath(new URL("../public/media/", import.meta.url));
  for (const f of ["shipsafe-demo.webm", "shipsafe-demo-poster.jpg"]) assert.ok(existsSync(media + f), `missing public/media/${f}`);
});
