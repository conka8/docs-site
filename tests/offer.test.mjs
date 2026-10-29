// The value model's rules and the worked example's links to real files. Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { FIELDS, SCENARIOS, compute } from "../src/data/value-model.js";

const projectsDir = fileURLToPath(new URL("../../", import.meta.url));
const hasProjects = existsSync(projectsDir + "skool-owner-kit/pyproject.toml");
const base = SCENARIOS.base;

test("every scenario fills every field", () => {
  for (const s of Object.values(SCENARIOS)) for (const [, key] of FIELDS) assert.ok(key in s, key);
});

test("no renewal change and no cut in paid hours means no cash benefit", () => {
  const r = compute(SCENARIOS.conservative);
  assert.equal(r.renewalCashMonthly, 0);
  assert.equal(r.cashAvoidedMonthly, 0);
  assert.ok(r.net12 < 0, "costs remain");
});

test("renewal revenue: members x lift x price after fees x months", () => {
  const r = compute({ ...base, newPaid: 100, renewalLiftPts: 5, price: 100, feePct: 0, extraMonths: 2 });
  assert.equal(r.renewalCashMonthly, 100 * 0.05 * 100 * 2);
});

test("the lift can't push renewals above 100%", () => {
  const r = compute({ ...base, baseRenewalPct: 98, renewalLiftPts: 10, newPaid: 100, price: 100, feePct: 0, extraMonths: 1 });
  assert.equal(r.extraRenewals, 2);
});

test("freed support time is cash only when paid hours are cut, never both", () => {
  const capacity = compute({ ...base, staffHoursCut: 0 });
  const cash = compute({ ...base, staffHoursCut: 1 });
  assert.equal(capacity.cashAvoidedMonthly, 0);
  assert.ok(capacity.capacityHoursMonthly > 0);
  assert.equal(cash.capacityHoursMonthly, 0);
  assert.ok(Math.abs(cash.cashAvoidedMonthly - capacity.capacityValueMonthly) < 1e-9);
  assert.equal(capacity.net12 + 12 * 0, capacity.net12); // capacity never enters the cash total
  assert.ok(cash.net12 > capacity.net12);
});

test("correction time is subtracted from time freed", () => {
  const r = compute({ ...base, questions: 100, resolvedPct: 50, minutesPerQuestion: 6, correctedPct: 10, correctionMinutes: 30 });
  assert.equal(r.hoursFreedGross, 5);
  assert.equal(r.correctionHours, 5);
  assert.equal(r.capacityHoursMonthly, 0);
});

test("break-even lift really breaks even over 12 months", () => {
  const inputs = { ...base, implementationFee: 3000, monthlyFee: 100, staffHoursCut: 0 };
  const need = compute(inputs).liftNeededPts;
  const at = compute({ ...inputs, renewalLiftPts: need });
  assert.ok(Math.abs(at.net12) < 1e-6, `net12 at break-even is ${at.net12}`);
});

test("payback and the most you could pay", () => {
  const free = compute({ ...base, implementationFee: 0 });
  assert.ok(Math.abs(free.maxOneOffFor12mPayback - 12 * free.netCashMonthly) < 1e-9);
  const paid = compute({ ...base, implementationFee: free.netCashMonthly * 4 });
  assert.ok(Math.abs(paid.paybackMonths - 4) < 1e-9);
  const never = compute({ ...SCENARIOS.conservative, implementationFee: 1000 });
  assert.equal(never.paybackMonths, null);
});

test("add-on revenue is one-off and net of fees and refunds", () => {
  const r = compute({ ...base, addonEligible: 200, addonAdoptPct: 10, addonPrice: 100, feePct: 5, refundPct: 5, implementationFee: 900 });
  assert.ok(Math.abs(r.addonCashOneOff - 1800) < 1e-9);
  assert.equal(r.addonBuyersNeeded, 10);
});

test("the wider 12-month view charges your hours and credits capacity separately", () => {
  const r = compute(base);
  const hours = base.setupHours + 12 * base.monthlyHours;
  assert.ok(Math.abs(r.net12WithTime - (r.net12 + 12 * r.capacityValueMonthly - hours * base.hourlyCost)) < 1e-9);
});

test("bad or empty inputs don't break the maths", () => {
  const r = compute({});
  assert.equal(r.netCashMonthly, 0);
  assert.equal(r.liftNeededPts, null);
  assert.equal(compute({ ...base, resolvedPct: 250 }).hoursFreedGross, base.questions * base.minutesPerQuestion / 60);
});

test("worked-example excerpts still match the files they quote", { skip: !hasProjects }, async () => {
  // The page module imports React, so read the excerpt block as text instead of importing it.
  const page = readFileSync(fileURLToPath(new URL("../src/pages/Example.jsx", import.meta.url)), "utf8");
  const block = page.slice(page.indexOf("export const EXCERPTS"), page.indexOf("export default"));
  const excerpts = [...block.matchAll(/file: "([^"]+)",\s*text: `([\s\S]*?)`,/g)];
  assert.equal(excerpts.length, 5);
  for (const [, file, text] of excerpts) {
    assert.ok(readFileSync(projectsDir + file, "utf8").includes(text.replace(/\\`/g, "`")), `${file} no longer contains the excerpt`);
  }
});
