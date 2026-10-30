// The value model's rules and the worked example's links to real files. Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ESSENTIAL, FIELDS, SCENARIOS, compute, paybackText, validate } from "../src/data/value-model.js";
import { PILOT_OFFER } from "../src/data/pilot-offer.js";
import { EFFORT, EFFORT_TOTALS, mid } from "../src/data/effort.js";
import { renderEffort, renderOffer } from "../scripts/write-offer-docs.mjs";

const projectsDir = fileURLToPath(new URL("../../", import.meta.url));
const hasProjects = existsSync(projectsDir + "skool-owner-kit/pyproject.toml");
const base = SCENARIOS.base;
// A plain setup that is easy to reason about: no fees, no refunds, everyone gained keeps paying.
const plain = {
  ...base, horizonMonths: 12, newPaid: 100, price: 100, feePct: 0, feeFixed: 0, refundPct: 0, deliveryCost: 0,
  baseRenewalPct: 50, adoptionPct: 100, userChangePts: 10, laterRetentionPct: 100, maxPaidMonths: 100,
  questions: 0, apiMonthly: 0, monthlyFee: 0, implementationFee: 0, addonEligible: 0,
};
const close = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-6, `${msg}: ${a} vs ${b}`);

test("every preset fills every field and is valid", () => {
  for (const [name, s] of Object.entries(SCENARIOS)) {
    for (const [, key] of FIELDS) assert.ok(key in s, `${name}.${key}`);
    assert.equal(compute(s).ok, true, name);
  }
});

test("payments arrive month by month, starting at the first renewal", () => {
  const r = compute(plain);
  // 10 extra members per cohort; cohort m pays from month m+1. Month t has t cohorts paying: 10 * t * 100.
  for (const m of r.months) close(m.renewal, 10 * m.month * 100, `month ${m.month}`);
  assert.equal(r.months[0].renewal, 0, "nothing in the launch month");
});

test("late cohorts' renewals fall outside the period and are reported as future contribution", () => {
  const r = compute({ ...plain, horizonMonths: 12, maxPaidMonths: 4 });
  // Each cohort's gained members pay 3 times (months +1..+3). Cohorts 9, 10, 11 lose 1, 2, 3 payments to the future.
  close(r.renewalCash, 10 * 100 * (3 * 9 + 2 + 1 + 0), "inside the period");
  close(r.futureContribution, 10 * 100 * (1 + 2 + 3), "after the period");
  const last = compute({ ...plain, horizonMonths: 1 });
  assert.equal(last.renewalCash, 0, "a one-month horizon has no renewals yet");
  assert.ok(last.futureContribution > 0);
});

test("later monthly retention and the cap shape how long gained members pay", () => {
  const r = compute({ ...plain, horizonMonths: 3, laterRetentionPct: 50, maxPaidMonths: 100 });
  // cohort 0 pays 10 at month 1, 5 at month 2; cohort 1 pays 10 at month 2
  close(r.months[1].renewal, 1000, "month 1");
  close(r.months[2].renewal, 500 + 1000, "month 2");
});

test("zero and negative renewal change", () => {
  assert.equal(compute({ ...plain, userChangePts: 0 }).renewalCash, 0);
  const neg = compute({ ...plain, userChangePts: -10 });
  close(neg.renewalCash, -compute(plain).renewalCash, "symmetric loss");
  assert.ok(neg.horizonCash < 0);
});

test("fees, refunds and delivery costs come off every payment", () => {
  const r = compute({ ...plain, horizonMonths: 2, feePct: 3, feeFixed: 0.3, refundPct: 2, deliveryCost: 5 });
  close(r.netPayment, 100 * 0.95 - 0.3 - 5, "net per payment");
  close(r.months[1].renewal, 10 * (100 * 0.95 - 0.3 - 5), "month 1");
});

test("add-on revenue lands in the launch month, net of fees, refunds and delivery", () => {
  const r = compute({ ...plain, userChangePts: 0, addonEligible: 200, addonAdoptPct: 10, addonPrice: 100,
                      feePct: 5, refundPct: 5, addonDeliveryCost: 10, implementationFee: 1500 });
  close(r.addonCash, 20 * (90 - 10), "add-on");
  assert.deepEqual(r.buyersNeeded, { status: "needed", buyers: 19 });
  const more = compute({ ...plain, userChangePts: 0, addonEligible: 5, addonAdoptPct: 10, addonPrice: 100, implementationFee: 1500 });
  assert.equal(more.buyersNeeded.status, "more than offered");
  const free = compute({ ...plain, userChangePts: 0, addonPrice: 0, implementationFee: 100 });
  assert.deepEqual(free.buyersNeeded, { status: "not reachable", buyers: null });
  assert.deepEqual(compute(plain).buyersNeeded, { status: "not needed", buyers: 0 });
});

test("support: only paid hours actually cut become cash; the rest is capacity", () => {
  const q = { ...plain, userChangePts: 0, questions: 100, resolvedPct: 60, correctedPct: 10, minutesPerQuestion: 6,
              correctionMinutes: 12, hourlyCost: 30 };
  const none = compute({ ...q, paidHoursCut: 0 });
  close(none.support.netFreedHoursMonthly, 6 - 2, "saved minus correction");
  assert.equal(none.supportCashAvoided, 0);
  close(none.support.capacityHoursMonthly, 4, "all capacity");
  const some = compute({ ...q, paidHoursCut: 3 });
  close(some.support.cashHoursMonthly, 3, "cash hours");
  close(some.support.capacityHoursMonthly, 1, "remaining capacity");
  close(some.supportCashAvoided, 3 * 30 * 12, "cash over 12 months");
  const tooMany = compute({ ...q, paidHoursCut: 50 });
  close(tooMany.support.cashHoursMonthly, 4, "can't cut more than the tutor frees");
  const costly = compute({ ...q, resolvedPct: 5, correctedPct: 50, paidHoursCut: 2 });
  assert.ok(costly.support.netFreedHoursMonthly < 0, "corrections can outweigh savings");
  assert.equal(costly.supportCashAvoided, 0);
});

test("time is never counted as cash", () => {
  const a = compute({ ...base, setupHours: 0, ownHourValue: 0 });
  const b = compute({ ...base, setupHours: 500, ownHourValue: 1000 });
  assert.equal(a.horizonCash, b.horizonCash);
  close(b.time.ownTimeValue, (500 + base.pilotHours + base.monthlyHours * 12) * 1000, "time view");
});

test("payback comes from cumulative cash", () => {
  const r = compute({ ...plain, implementationFee: 3000 });
  // cumulative: -3000, -2000, 0 (month 2) ...
  assert.equal(r.payback.sustained, 2);
  assert.equal(paybackText(r.payback), "month 2");
  assert.equal(paybackText(compute({ ...plain, implementationFee: 0 }).payback), "launch month");
});

test("payback never reached", () => {
  const r = compute({ ...plain, userChangePts: 0, implementationFee: 100 });
  assert.equal(r.payback.sustained, null);
  assert.equal(paybackText(r.payback), "not reached within the modeled period");
});

test("an apparent break-even that later falls below zero is reported", () => {
  // Add-on cash covers the fee at launch, then a negative renewal change drains it.
  const r = compute({ ...plain, userChangePts: -5, addonEligible: 100, addonAdoptPct: 10, addonPrice: 200, implementationFee: 1000 });
  assert.equal(r.payback.firstBreakEven, 0);
  assert.ok(r.payback.fallsBelowAfter > 0);
  assert.equal(r.payback.sustained, null);
  assert.match(paybackText(r.payback), /^reached in month 0, then falls below zero again in month \d+$/);
});

test("break-even renewal change really breaks even, or says it can't", () => {
  const inputs = { ...base, implementationFee: 3000, monthlyFee: 100 };
  const need = compute(inputs).changeNeeded;
  assert.equal(need.status, "needed");
  close(compute({ ...inputs, userChangePts: need.userPoints }).horizonCash, 0, "cash at break-even");
  const short = compute({ ...base, horizonMonths: 1, implementationFee: 1000 });
  assert.equal(short.changeNeeded.status, "not reachable", "no renewals fall inside a one-month period");
  const huge = compute({ ...base, implementationFee: 10_000_000 });
  assert.equal(huge.changeNeeded.status, "not reachable");
  assert.ok(huge.changeNeeded.points > 100 - base.baseRenewalPct);
  assert.deepEqual(compute(plain).changeNeeded, { status: "not needed", points: 0 });
});

test("the most you could pay equals the period's cash before the fee", () => {
  const r = compute({ ...base, implementationFee: 0 });
  close(r.maxOneOff, r.horizonCash, "no fee");
  close(compute({ ...base, implementationFee: 777 }).maxOneOff, r.maxOneOff, "independent of the quote");
  assert.equal(compute({ ...plain, userChangePts: -10 }).maxOneOff, 0, "never negative");
});

test("zero revenue, zero costs, zero growth", () => {
  const zero = compute({ ...plain, newPaid: 0, questions: 0 });
  assert.equal(zero.horizonCash, 0);
  assert.equal(paybackText(zero.payback), "launch month");
  assert.deepEqual(zero.changeNeeded, { status: "not needed", points: 0 });
});

test("invalid and boundary inputs", () => {
  const bad = (patch) => validate({ ...base, ...patch }).errors;
  assert.ok(bad({ newPaid: -1 }).newPaid);
  assert.ok(bad({ price: "abc" }).price);
  assert.ok(bad({ feePct: 101 }).feePct);
  assert.ok(bad({ baseRenewalPct: -1 }).baseRenewalPct);
  assert.match(bad({ baseRenewalPct: 70, userChangePts: 31 }).userChangePts, /between -70 and 30/);
  assert.ok(bad({ baseRenewalPct: 70, userChangePts: -71 }).userChangePts);
  assert.equal(bad({ baseRenewalPct: 70, userChangePts: 30 }).userChangePts, undefined, "100% is allowed");
  assert.equal(bad({ baseRenewalPct: 70, userChangePts: -70 }).userChangePts, undefined, "0% is allowed");
  assert.ok(bad({ resolvedPct: 70, correctedPct: 40 }).correctedPct);
  assert.ok(bad({ feePct: 60, refundPct: 50 }).refundPct);
  assert.ok(bad({ horizonMonths: 0 }).horizonMonths);
  assert.ok(bad({ horizonMonths: 6.5 }).horizonMonths);
  assert.ok(bad({ maxPaidMonths: 0 }).maxPaidMonths);
  assert.ok(bad({ paidHoursCut: -2 }).paidHoursCut);
  assert.ok(bad({ setupHours: "" }).setupHours);
  const r = compute({ ...base, newPaid: -5 });
  assert.equal(r.ok, false);
  assert.ok(r.errors.newPaid);
});

test("defaults for your time come from the effort breakdown", () => {
  assert.equal(base.setupHours, mid(EFFORT_TOTALS.customerSetup));
  assert.equal(base.pilotHours, mid(EFFORT_TOTALS.customerPilot));
});

test("the demonstration's excerpts and run files match the saved outputs", { skip: !hasProjects }, () => {
  // The page module imports React, so read its data blocks as text instead of importing it.
  const page = readFileSync(fileURLToPath(new URL("../src/pages/Example.jsx", import.meta.url)), "utf8");
  const block = page.slice(page.indexOf("export const EXCERPTS"), page.indexOf("export default"));
  const excerpts = [...block.matchAll(/file: LAB \+ "([^"]+)",\s*text: `([\s\S]*?)`,/g)];
  assert.equal(excerpts.length, 7);
  for (const [, file, text] of excerpts) {
    const path = projectsDir + "skool-owner-kit/examples/agency-lab/" + file;
    assert.ok(readFileSync(path, "utf8").includes(text), `${file} no longer contains the excerpt`);
  }
  const runs = page.slice(page.indexOf("export const RUNS"), page.indexOf("export const EXCERPTS"));
  const files = [...runs.matchAll(/"(live-runs\/[^"]+\.md)"/g)].map((m) => m[1]);
  assert.equal(files.length, 8);
  for (const f of files) assert.ok(existsSync(projectsDir + "skool-owner-kit/examples/agency-lab/" + f), f);
});

test("effort and offer documents are generated from the same data", { skip: !hasProjects }, () => {
  assert.equal(readFileSync(projectsDir + "EFFORT.md", "utf8"), renderEffort(), "run npm run offer-docs");
  assert.equal(readFileSync(projectsDir + "PILOT-OFFER.md", "utf8"), renderOffer(), "run npm run offer-docs");
});

test("no guide restates an effort estimate that disagrees with the breakdown", { skip: !hasProjects }, () => {
  const docs = ["README.md", "ADMIN-GUIDE.md", "PILOT.md", "VALUE-MODEL.md", "BUSINESS-AUDIT.md", "OFFER.md",
                "skool-owner-kit/README.md"];
  for (const d of docs) {
    const text = readFileSync(projectsDir + d, "utf8");
    assert.doesNotMatch(text, /10[- ]to[- ]16 hours|10-16 hours|about two hours|an hour to review/i, d);
  }
});

test("effort totals add up", () => {
  const sum = (col) => EFFORT.reduce((t, r) => t + r[col][0], 0);
  assert.equal(EFFORT_TOTALS.customerOneOff[0], sum(3));
  assert.equal(EFFORT_TOTALS.customerSetup[0] + EFFORT_TOTALS.customerPilot[0], EFFORT_TOTALS.customerOneOff[0]);
});

test("adoption scales the renewal change, and break-even is reported per member who uses the pack", () => {
  const all = compute({ ...plain, adoptionPct: 100, userChangePts: 4 });
  const half = compute({ ...plain, adoptionPct: 50, userChangePts: 8 });
  close(all.renewalCash, half.renewalCash, "same cohort-level change");
  const need = compute({ ...base, adoptionPct: 25 }).changeNeeded;
  assert.equal(need.status, "needed");
  close(need.userPoints, need.points * 4, "a quarter adopt, so users need four times the change");
  assert.equal(compute({ ...base, adoptionPct: 0 }).changeNeeded.status, "not reachable", "nobody uses it");
  assert.match(validate({ ...base, baseRenewalPct: 95, userChangePts: 6 }).errors.userChangePts, /between -95 and 5/);
});

test("the calculator starts from the published pilot fee", () => {
  for (const s of Object.values(SCENARIOS)) assert.equal(s.implementationFee, PILOT_OFFER.terms.feeAmount);
  assert.equal(PILOT_OFFER.terms.fee, `US$${PILOT_OFFER.terms.feeAmount}`);
  for (const k of ESSENTIAL) assert.ok(FIELDS.some((f) => f[1] === k), k);
});

test("benchmark figures on the site match the saved blind grades", async () => {
  const { BENCHMARK } = await import("../src/data/benchmark.js");
  const dir = new URL("../../skool-owner-kit/examples/agency-lab/benchmark/grades/", import.meta.url);
  const by = { A: [], B: [], C: [] };
  const best = { A: 0, B: 0, C: 0 };
  for (const c of ["T1", "T2", "T3", "O2", "O3", "R2"]) {
    const g = JSON.parse(readFileSync(new URL(`${c}.json`, dir), "utf8"));
    for (const [letter, r] of Object.entries(g.replies)) {
      const run = g.letters[letter];
      if (!run.includes("fixed")) by[run.split("-")[1]].push(r);
    }
    best[g.letters[g.best].split("-")[1]] += 1;
  }
  const mean = (k, x) => (by[x].reduce((t, r) => t + r[k], 0) / by[x].length).toFixed(2);
  const sum = (k, x) => String(by[x].reduce((t, r) => t + r[k], 0));
  const row = (label) => BENCHMARK.results.find((r) => r[0] === label).slice(1);
  assert.deepEqual(row("Lesson rules applied correctly (0-2)"), ["A", "B", "C"].map((x) => mean("rules", x)));
  assert.deepEqual(row("Usable with light edits (0-2)"), ["A", "B", "C"].map((x) => mean("usable", x)));
  assert.deepEqual(row("Clarification quality (0-2)"), ["A", "B", "C"].map((x) => mean("clarify", x)));
  assert.deepEqual(row("Unsupported claims (total)"), ["A", "B", "C"].map((x) => sum("unsupported", x)));
  assert.deepEqual(row("Grader's preferred reply (of 6 cases)"), ["A", "B", "C"].map((x) => String(best[x])));
  for (const x of ["A", "B", "C"]) assert.equal(by[x].length, 7, x);
});

test("counting the owner's time raises the change needed, and the biggest levers come first", async () => {
  const { compute, SCENARIOS } = await import("../src/data/value-model.js");
  const r = compute(SCENARIOS.base);
  assert.equal(r.changeNeeded.status, "needed");
  assert.ok(r.changeNeededWithTime.userPoints > r.changeNeeded.userPoints);
  const noTime = compute({ ...SCENARIOS.base, ownHourValue: 0 });
  assert.equal(noTime.changeNeededWithTime.userPoints.toFixed(6), noTime.changeNeeded.userPoints.toFixed(6));
  const moves = r.sensitivity.map((x) => Math.abs(x.from - x.to));
  assert.deepEqual(moves, [...moves].sort((a, b) => b - a));
  assert.ok(r.sensitivity.every((x) => x.to <= x.from + 1e-9), "making an input better never raises the change needed");
  assert.equal(compute({ ...SCENARIOS.base, adoptionPct: 0 }).changeNeededWithTime.status, "not reachable");
});

test("skills vs Project figures on the site match the saved blind grades", async () => {
  const { COMPARISON } = await import("../src/data/benchmark.js");
  const dir = new URL("../../skool-owner-kit/examples/agency-lab/comparison/grades/", import.meta.url);
  const cases = ["T1", "T2", "O2", "O3", "H1", "H2", "H3", "H4"];
  const by = { P: [], K: [] };
  const best = { P: 0, K: 0, tie: 0 };
  for (const c of cases) {
    const g = JSON.parse(readFileSync(new URL(`${c}.json`, dir), "utf8"));
    for (const [letter, r] of Object.entries(g.replies)) by[g.letters[letter].split("-")[1]].push(r);
    best[g.best === "tie" ? "tie" : g.letters[g.best].split("-")[1]] += 1;
  }
  const mean = (k, x) => (by[x].reduce((t, r) => t + r[k], 0) / by[x].length).toFixed(2);
  const sum = (k, x) => by[x].reduce((t, r) => t + r[k], 0);
  const row = (label) => COMPARISON.results.find((r) => r[0] === label).slice(1);
  assert.deepEqual(row("Lesson rules applied correctly (0-2)"), [mean("rules", "P"), mean("rules", "K")]);
  assert.deepEqual(row("Unknown facts shown as unknown (0-2)"), [mean("unknowns", "P"), mean("unknowns", "K")]);
  assert.deepEqual(row("Lessons, member and own suggestions kept apart (0-2)"), [mean("sources", "P"), mean("sources", "K")]);
  assert.deepEqual(row("Usable deliverable by the end (0-2)"), [mean("deliverable", "P"), mean("deliverable", "K")]);
  assert.deepEqual(row("Citations judged supported"), ["P", "K"].map((x) => `${sum("citations_supported", x)} of ${sum("citations", x)}`));
  assert.deepEqual(row("Unsupported claims (total)"), ["P", "K"].map((x) => String(sum("unsupported", x))));
  assert.deepEqual(row("Grader's preferred conversation (of 8)"), [String(best.P), String(best.K)]);
  assert.match(COMPARISON.conclusion, new RegExp(`${best.P} of 8 cases \\(${best.tie} tie\\)`));
});
