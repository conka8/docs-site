// The value model behind the "Estimate value" page: a month-by-month cohort cash-flow model.
// Pure functions, so the page, the tests and VALUE-MODEL.md use the same maths. It is a decision aid:
// every output is only as good as its inputs, and every preset is an illustration, not a measurement.
//
// Timeline: month 0 is the launch month. Each month in the horizon a cohort of new paid members joins and gets
// the pack. Their joining payment is unchanged. The pack's assumed effect is a change in how many of them make
// the FIRST renewal payment, one month after joining. Members gained (or lost) at that renewal then keep paying
// at the "later monthly retention" rate, up to the cap on total paid months. Payments are counted only in the
// month they would arrive; payments after the horizon are reported separately as projected future contribution.
//
// Three kinds of benefit are kept apart:
//   1. cash in (incremental renewal payments, optional add-on sales), net of fees, refunds and delivery costs
//   2. support spending actually avoided (only the paid hours you really cut)
//   3. staff capacity freed (hours; never counted as cash)

import { EFFORT_TOTALS, mid } from "./effort.js";
import { PILOT_OFFER } from "./pilot-offer.js";

// [group, key, label, unit, help, kind]  kind: count | money | pct | change | hours | months | minutes
export const FIELDS = [
  ["Period", "horizonMonths", "Months to model", "months", "Cash is only counted inside this period.", "months"],
  ["Members and revenue", "newPaid", "New paid members per month", "members", "From your platform's dashboard.", "count"],
  ["Members and revenue", "price", "Membership price per month", "money", "What a member pays you each month.", "money"],
  ["Members and revenue", "feePct", "Payment fee (percent)", "%", "Skool Pro: 2.9% (help.skool.com, Sep 2026).", "pct"],
  ["Members and revenue", "feeFixed", "Payment fee (fixed, per payment)", "money", "Skool Pro: 30c per transaction.", "money"],
  ["Members and revenue", "baseRenewalPct", "New members who make their first renewal today", "%", "Your baseline, from your retention numbers.", "pct"],
  ["Members and revenue", "adoptionPct", "New members who use the pack", "%", "Not everyone installs it. The pilot measures this first.", "pct"],
  ["Members and revenue", "userChangePts", "Change in first renewal among members who use it", "points", "Unknown until a pilot measures it. Can be 0 or negative.", "change"],
  ["Members and revenue", "laterRetentionPct", "Monthly retention after the first renewal", "%", "Applied to members gained or lost at the first renewal.", "pct"],
  ["Members and revenue", "maxPaidMonths", "Most months one member pays in total", "months", "Caps how long a gained member is counted.", "months"],
  ["Members and revenue", "refundPct", "Refunds (share of these payments)", "%", "", "pct"],
  ["Members and revenue", "deliveryCost", "Extra delivery cost per extra paying member per month", "money", "For example per-seat software or coaching time you pay for.", "money"],
  ["Optional add-on sale", "addonEligible", "Members offered a paid add-on (launch month)", "members", "Leave at 0 if the pack is part of membership.", "count"],
  ["Optional add-on sale", "addonAdoptPct", "Share who buy it", "%", "No public evidence yet that members pay extra for AI tools.", "pct"],
  ["Optional add-on sale", "addonPrice", "Add-on price (one-off)", "money", "", "money"],
  ["Optional add-on sale", "addonDeliveryCost", "Delivery cost per add-on buyer", "money", "", "money"],
  ["Member questions", "questions", "Repetitive member questions per month", "questions", "Count a normal month first.", "count"],
  ["Member questions", "resolvedPct", "Share the tutor answers correctly (no correction)", "%", "Measure it in the pilot.", "pct"],
  ["Member questions", "correctedPct", "Share of tutor answers someone has to correct", "%", "Resolved + corrected can't exceed 100%. The rest go to staff as before.", "pct"],
  ["Member questions", "minutesPerQuestion", "Staff minutes per question today", "minutes", "", "minutes"],
  ["Member questions", "correctionMinutes", "Staff minutes to correct one wrong answer", "minutes", "", "minutes"],
  ["Member questions", "hourlyCost", "Cost of a paid support hour", "money", "", "money"],
  ["Member questions", "paidHoursCut", "Paid support hours you will actually cut per month", "hours", "Only these become cash. 0 if you answer questions yourself.", "hours"],
  ["Your costs", "implementationFee", "Pilot or implementation price (launch month)", "money", `The published design-partner fee is ${PILOT_OFFER.terms.fee}. Enter amounts in the same currency throughout.`, "money"],
  ["Your costs", "monthlyFee", "Monthly maintenance or support fee", "money", "", "money"],
  ["Your costs", "apiMonthly", "API and software costs per month", "money", "", "money"],
  ["Your time (not cash)", "setupHours", "Your setup hours (one-off)", "hours", `Estimate: ${EFFORT_TOTALS.customerSetup.join("-")} hours (Effort breakdown).`, "hours"],
  ["Your time (not cash)", "pilotHours", "Your pilot logging hours (total)", "hours", `Estimate: ${EFFORT_TOTALS.customerPilot.join("-")} hours.`, "hours"],
  ["Your time (not cash)", "monthlyHours", "Your maintenance hours per month", "hours", `Estimate: ${EFFORT_TOTALS.customerMonthly.join("-")} hours.`, "hours"],
  ["Your time (not cash)", "ownHourValue", "What an hour of your time is worth", "money", "Used only in the time view.", "money"],
];

const COMMON = {
  horizonMonths: 12, newPaid: 30, price: 97, feePct: 2.9, feeFixed: 0.3, baseRenewalPct: 70,
  laterRetentionPct: 85, maxPaidMonths: 12, refundPct: 1, deliveryCost: 0,
  addonEligible: 0, addonAdoptPct: 0, addonPrice: 0, addonDeliveryCost: 0,
  questions: 120, minutesPerQuestion: 6, correctionMinutes: 8, hourlyCost: 25, paidHoursCut: 0,
  implementationFee: PILOT_OFFER.terms.feeAmount, monthlyFee: 0, apiMonthly: 10,
  setupHours: mid(EFFORT_TOTALS.customerSetup), pilotHours: mid(EFFORT_TOTALS.customerPilot),
  monthlyHours: mid(EFFORT_TOTALS.customerMonthly), ownHourValue: 50,
};

// ILLUSTRATIVE presets. Not measurements, forecasts or results from any community. Replace with your numbers.
// Cohort-level change = adoption x change among users: 0, 3 and 8 points across all new members.
export const SCENARIOS = {
  conservative: { ...COMMON, adoptionPct: 40, userChangePts: 0, laterRetentionPct: 75, maxPaidMonths: 6, resolvedPct: 20, correctedPct: 15 },
  base: { ...COMMON, adoptionPct: 50, userChangePts: 6, resolvedPct: 40, correctedPct: 10 },
  optimistic: { ...COMMON, adoptionPct: 80, userChangePts: 10, laterRetentionPct: 90, maxPaidMonths: 18, resolvedPct: 60, correctedPct: 5, paidHoursCut: 4 },
};

// The inputs shown first; the rest sit under "Advanced assumptions".
export const ESSENTIAL = ["newPaid", "price", "baseRenewalPct", "adoptionPct", "userChangePts", "implementationFee"];
// A change among users above this is called large in the plain-language result: one more renewal for every
// ten members who use the pack. A judgement for readability, not a benchmark.
export const LARGE_CHANGE_PTS = 10;

// ---------------------------------------------------------------- validation

export function validate(raw) {
  const errors = {};
  const v = {};
  for (const [, key, label, , , kind] of FIELDS) {
    const text = raw[key];
    const x = typeof text === "number" ? text : text === "" || text == null ? NaN : Number(text);
    if (!Number.isFinite(x)) {
      errors[key] = `${label}: enter a number.`;
      continue;
    }
    v[key] = x;
    if (kind === "pct" && (x < 0 || x > 100)) errors[key] = "Must be between 0 and 100.";
    else if (kind !== "change" && kind !== "pct" && x < 0) errors[key] = "Can't be negative.";
  }
  if (!errors.horizonMonths && (!Number.isInteger(v.horizonMonths) || v.horizonMonths < 1 || v.horizonMonths > 60)) {
    errors.horizonMonths = "Whole months from 1 to 60.";
  }
  if (!errors.maxPaidMonths && (!Number.isInteger(v.maxPaidMonths) || v.maxPaidMonths < 1)) {
    errors.maxPaidMonths = "Whole months, at least 1.";
  }
  if (!errors.userChangePts && !errors.baseRenewalPct) {
    const after = v.baseRenewalPct + v.userChangePts;
    if (after < 0 || after > 100) {
      errors.userChangePts = `With a ${v.baseRenewalPct}% baseline the change must be between ${-v.baseRenewalPct} and ${100 - v.baseRenewalPct} points.`;
    }
  }
  // The model works with the change across all new members.
  if (!errors.adoptionPct && !errors.userChangePts) v.renewalChangePts = (v.adoptionPct * v.userChangePts) / 100;
  if (!errors.resolvedPct && !errors.correctedPct && v.resolvedPct + v.correctedPct > 100) {
    errors.correctedPct = "Resolved and corrected answers together can't exceed 100%.";
  }
  if (!errors.feePct && !errors.refundPct && v.feePct + v.refundPct > 100) {
    errors.refundPct = "Fees and refunds together can't exceed 100%.";
  }
  return { values: v, errors };
}

// ---------------------------------------------------------------- model

function cashFlows(i) {
  const H = i.horizonMonths;
  const months = Array.from({ length: H }, (_, m) => ({
    month: m, renewal: 0, addon: 0, supportCash: 0, costs: 0, net: 0, cumulative: 0,
  }));
  const netPayment = i.price * (1 - i.feePct / 100 - i.refundPct / 100) - i.feeFixed - i.deliveryCost;
  const gainedPerCohort = (i.newPaid * i.renewalChangePts) / 100; // negative when renewals fall
  const keep = i.laterRetentionPct / 100;
  let future = 0;
  for (let cohort = 0; cohort < H; cohort++) {
    for (let k = 1; k < i.maxPaidMonths; k++) {
      const amount = gainedPerCohort * keep ** (k - 1) * netPayment;
      if (cohort + k < H) months[cohort + k].renewal += amount;
      else future += amount;
    }
  }
  const buyers = (i.addonEligible * i.addonAdoptPct) / 100;
  const perBuyer = i.addonPrice * (1 - i.feePct / 100 - i.refundPct / 100) - i.feeFixed - i.addonDeliveryCost;
  months[0].addon = buyers * perBuyer;

  // Support: correction time is subtracted from the time the tutor saves, so nothing is counted twice.
  const savedHours = (i.questions * (i.resolvedPct / 100) * i.minutesPerQuestion) / 60;
  const correctionHours = (i.questions * (i.correctedPct / 100) * i.correctionMinutes) / 60;
  const netFreedHours = savedHours - correctionHours; // can be negative: the tutor costs staff time
  const cashHours = Math.min(i.paidHoursCut, Math.max(netFreedHours, 0));
  const capacityHours = netFreedHours - cashHours;

  let cumulative = 0;
  for (const m of months) {
    m.supportCash = cashHours * i.hourlyCost;
    m.costs = i.monthlyFee + i.apiMonthly + (m.month === 0 ? i.implementationFee : 0);
    m.net = m.renewal + m.addon + m.supportCash - m.costs;
    cumulative += m.net;
    m.cumulative = cumulative;
  }
  return { months, future, buyers, perBuyer, netPayment, gainedPerCohort, savedHours, correctionHours,
           netFreedHours, cashHours, capacityHours };
}

function paybackInfo(months) {
  let firstBreakEven = null;
  let fallsBelowAfter = null;
  for (const m of months) {
    if (firstBreakEven === null && m.cumulative >= 0) firstBreakEven = m.month;
    else if (firstBreakEven !== null && fallsBelowAfter === null && m.cumulative < 0) fallsBelowAfter = m.month;
  }
  // Sustained payback: the first month after which cumulative cash never goes negative again in the period.
  let sustained = null;
  for (let t = months.length - 1; t >= 0 && months[t].cumulative >= 0; t--) sustained = months[t].month;
  return { firstBreakEven, fallsBelowAfter, sustained };
}

const cashIn = (i) => cashFlows(i).months.reduce((t, m) => t + m.net, 0);

export function compute(raw) {
  const { values: i, errors } = validate(raw);
  if (Object.keys(errors).length) return { ok: false, errors };
  const f = cashFlows(i);
  const horizonCash = f.months.reduce((t, m) => t + m.net, 0);
  const sumOf = (k) => f.months.reduce((t, m) => t + m[k], 0);

  // Break-even renewal change: horizon cash is linear in the change, so solve from two points.
  const at0 = cashIn({ ...i, renewalChangePts: 0 });
  const perPoint = cashIn({ ...i, renewalChangePts: 1 }) - at0;
  let changeNeeded;
  if (at0 >= 0) changeNeeded = { status: "not needed", points: 0 };
  else if (perPoint <= 0) changeNeeded = { status: "not reachable", points: null };
  else {
    const pts = -at0 / perPoint;
    const users = i.adoptionPct > 0 ? (pts * 100) / i.adoptionPct : null;
    changeNeeded = users === null || users > 100 - i.baseRenewalPct
      ? { status: "not reachable", points: pts, userPoints: users }
      : { status: "needed", points: pts, userPoints: users };
  }
  // Add-on buyers needed to cover what the period is short of without any add-on.
  const withoutAddon = horizonCash - f.months[0].addon;
  let buyersNeeded;
  if (withoutAddon >= 0) buyersNeeded = { status: "not needed", buyers: 0 };
  else if (f.perBuyer <= 0) buyersNeeded = { status: "not reachable", buyers: null };
  else {
    const n = Math.ceil(-withoutAddon / f.perBuyer - 1e-9);
    buyersNeeded = { status: n > i.addonEligible ? "more than offered" : "needed", buyers: n };
  }

  const ownHours = i.setupHours + i.pilotHours + i.monthlyHours * i.horizonMonths;
  return {
    ok: true,
    errors: {},
    inputs: i,
    months: f.months,
    renewalCash: sumOf("renewal"),
    addonCash: f.months[0].addon,
    supportCashAvoided: sumOf("supportCash"),
    cashCosts: sumOf("costs"),
    horizonCash,
    futureContribution: f.future,
    gainedPerCohort: f.gainedPerCohort,
    netPayment: f.netPayment,
    payback: paybackInfo(f.months),
    changeNeeded,
    buyersNeeded,
    maxOneOff: Math.max(horizonCash + i.implementationFee, 0),
    support: {
      savedHoursMonthly: f.savedHours, correctionHoursMonthly: f.correctionHours, netFreedHoursMonthly: f.netFreedHours,
      cashHoursMonthly: f.cashHours, capacityHoursMonthly: f.capacityHours,
    },
    time: {
      ownHours,
      ownTimeValue: ownHours * i.ownHourValue,
      capacityHours: f.capacityHours * i.horizonMonths,
      capacityValue: f.capacityHours * i.horizonMonths * i.hourlyCost,
    },
  };
}

export function paybackText(p) {
  if (p.sustained === null && p.firstBreakEven === null) return "not reached within the modeled period";
  if (p.sustained === null) return `reached in month ${p.firstBreakEven}, then falls below zero again in month ${p.fallsBelowAfter}`;
  if (p.fallsBelowAfter !== null) return `month ${p.sustained} (first reached in month ${p.firstBreakEven}, dipped below zero in month ${p.fallsBelowAfter})`;
  return p.sustained === 0 ? "launch month" : `month ${p.sustained}`;
}
