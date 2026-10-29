// The value model behind the "Estimate value" page. Pure functions, so tests and docs use the same maths.
// It is a decision aid: every output is only as good as the inputs, and the defaults are illustrations.
//
// Three kinds of benefit are kept apart and never added together blindly:
//   1. incremental cash contribution (more members renewing, optional add-on sales)
//   2. cash costs actually avoided (only if paid support hours really go down)
//   3. staff capacity freed (hours; valued separately, never counted as cash)

export const FIELDS = [
  // group, key, label, unit, help
  ["Members and revenue", "newPaid", "New paid members per month", "members", "From your platform's dashboard."],
  ["Members and revenue", "price", "Membership price per month", "money", "What a member pays you each month."],
  ["Members and revenue", "feePct", "Platform and payment fees", "%", "Skool Pro is 2.9% + 30c per transaction (help.skool.com, Sep 2026)."],
  ["Members and revenue", "baseRenewalPct", "New members who renew after month 1 today", "%", "Your baseline, from your retention numbers."],
  ["Members and revenue", "renewalLiftPts", "Change in that renewal rate with the pack", "points", "An assumption until a pilot measures it. 0 is a valid answer."],
  ["Members and revenue", "extraMonths", "Further paid months per extra renewing member", "months", "How long a member who stays because of the lift keeps paying. Use 1 to be cautious."],
  ["Optional add-on sale", "addonEligible", "Members offered a paid add-on", "members", "Leave at 0 if you include the pack in membership."],
  ["Optional add-on sale", "addonAdoptPct", "Share who buy it", "%", "No public evidence yet that members pay extra for AI tools."],
  ["Optional add-on sale", "addonPrice", "Add-on price (one-off)", "money", ""],
  ["Optional add-on sale", "refundPct", "Refunds", "%", "Share of add-on revenue refunded."],
  ["Member questions", "questions", "Repetitive member questions per month", "questions", "Count a normal month first."],
  ["Member questions", "resolvedPct", "Share the tutor resolves without correction", "%", "Measure it in the pilot (questions.csv)."],
  ["Member questions", "correctedPct", "Share of tutor answers someone has to correct", "%", ""],
  ["Member questions", "minutesPerQuestion", "Staff minutes per question today", "minutes", ""],
  ["Member questions", "correctionMinutes", "Minutes to correct one wrong answer", "minutes", ""],
  ["Member questions", "hourlyCost", "Cost of an hour of support time", "money", "What you pay per hour, or what your hour is worth."],
  ["Member questions", "staffHoursCut", "You will actually reduce paid support hours (1 = yes, 0 = no)", "0/1", "Only then does freed time become cash."],
  ["Your costs", "implementationFee", "One-off implementation price you were quoted", "money", "Enter a real quote. Leave 0 to see the most you could pay instead."],
  ["Your costs", "monthlyFee", "Monthly maintenance or support fee", "money", ""],
  ["Your costs", "apiMonthly", "API and software costs per month", "money", "For example skill tests with an API key."],
  ["Your costs", "setupHours", "Your hours to set up and review (one-off)", "hours", "Writing the pack spec, reviewing skills, acceptance runs."],
  ["Your costs", "monthlyHours", "Your hours per month to maintain it", "hours", "Updates when lessons change, reviewing answers."],
];

// Illustrative scenarios. These are not measurements or predictions; replace them with your own numbers.
export const SCENARIOS = {
  conservative: {
    newPaid: 30, price: 97, feePct: 3.2, baseRenewalPct: 70, renewalLiftPts: 0, extraMonths: 1,
    addonEligible: 0, addonAdoptPct: 0, addonPrice: 0, refundPct: 0,
    questions: 120, resolvedPct: 20, correctedPct: 15, minutesPerQuestion: 6, correctionMinutes: 8, hourlyCost: 25,
    staffHoursCut: 0, implementationFee: 0, monthlyFee: 0, apiMonthly: 10, setupHours: 16, monthlyHours: 4,
  },
  base: {
    newPaid: 30, price: 97, feePct: 3.2, baseRenewalPct: 70, renewalLiftPts: 3, extraMonths: 3,
    addonEligible: 0, addonAdoptPct: 0, addonPrice: 0, refundPct: 0,
    questions: 120, resolvedPct: 40, correctedPct: 10, minutesPerQuestion: 6, correctionMinutes: 8, hourlyCost: 25,
    staffHoursCut: 0, implementationFee: 0, monthlyFee: 0, apiMonthly: 10, setupHours: 12, monthlyHours: 3,
  },
  optimistic: {
    newPaid: 30, price: 97, feePct: 3.2, baseRenewalPct: 70, renewalLiftPts: 8, extraMonths: 6,
    addonEligible: 0, addonAdoptPct: 0, addonPrice: 0, refundPct: 0,
    questions: 120, resolvedPct: 60, correctedPct: 5, minutesPerQuestion: 6, correctionMinutes: 8, hourlyCost: 25,
    staffHoursCut: 1, implementationFee: 0, monthlyFee: 0, apiMonthly: 10, setupHours: 10, monthlyHours: 2,
  },
};

const n = (x) => (Number.isFinite(+x) ? +x : 0);
const pct = (x) => Math.min(Math.max(n(x), 0), 100) / 100;

export function compute(raw) {
  const i = Object.fromEntries(FIELDS.map(([, key]) => [key, n(raw[key])]));
  const netPrice = i.price * (1 - pct(i.feePct));

  // 1. Incremental cash contribution, attributed to each month's new-member cohort.
  const extraRenewals = i.newPaid * (Math.min(i.renewalLiftPts, 100 - i.baseRenewalPct) / 100);
  const renewalCashMonthly = extraRenewals * netPrice * Math.max(i.extraMonths, 0);
  const addonCashOneOff = i.addonEligible * pct(i.addonAdoptPct) * i.addonPrice * (1 - pct(i.feePct) - pct(i.refundPct));

  // 2 and 3. Questions: freed time is cash only when paid hours actually fall; otherwise it's capacity.
  const resolved = i.questions * pct(i.resolvedPct);
  const hoursFreedGross = (resolved * i.minutesPerQuestion) / 60;
  const correctionHours = (i.questions * pct(i.correctedPct) * i.correctionMinutes) / 60;
  const hoursFreedNet = Math.max(hoursFreedGross - correctionHours, 0);
  const cashAvoidedMonthly = i.staffHoursCut >= 1 ? hoursFreedNet * i.hourlyCost : 0;
  const capacityHoursMonthly = i.staffHoursCut >= 1 ? 0 : hoursFreedNet;
  const capacityValueMonthly = capacityHoursMonthly * i.hourlyCost;

  // Costs
  const cashCostMonthly = i.monthlyFee + i.apiMonthly;
  const timeCostOneOffHours = i.setupHours;
  const timeCostMonthlyHours = i.monthlyHours;

  const netCashMonthly = renewalCashMonthly + cashAvoidedMonthly - cashCostMonthly;
  const oneOffCash = addonCashOneOff - i.implementationFee;
  const net12 = oneOffCash + 12 * netCashMonthly;
  const paybackMonths = oneOffCash >= 0 ? 0 : netCashMonthly > 0 ? -oneOffCash / netCashMonthly : null;

  // Break-even: what has to be true for the cash to cover the cash costs over 12 months.
  const perPointMonthly = (i.newPaid / 100) * netPrice * Math.max(i.extraMonths, 0);
  const coverMonthly = cashCostMonthly + i.implementationFee / 12;
  const liftNeededPts = perPointMonthly > 0 ? Math.max(coverMonthly - cashAvoidedMonthly, 0) / perPointMonthly : null;
  const perBuyer = i.addonPrice * (1 - pct(i.feePct) - pct(i.refundPct));
  const addonBuyersNeeded = perBuyer > 0 ? Math.ceil(i.implementationFee / perBuyer - 1e-9) : null;
  const maxOneOffFor12mPayback = Math.max(addonCashOneOff + 12 * netCashMonthly, 0);

  // A wider 12-month view that also counts hours: your time spent (a cost) and support capacity freed (a benefit).
  // Shown separately from cash because neither is money in or out of your account.
  const timeValue12 = (i.setupHours + 12 * i.monthlyHours) * i.hourlyCost;
  const capacityValue12 = 12 * capacityValueMonthly;
  const net12WithTime = net12 + capacityValue12 - timeValue12;

  return {
    timeValue12, capacityValue12, net12WithTime,
    renewalCashMonthly, addonCashOneOff, cashAvoidedMonthly, capacityHoursMonthly, capacityValueMonthly,
    hoursFreedGross, correctionHours, cashCostMonthly, timeCostOneOffHours, timeCostMonthlyHours,
    netCashMonthly, oneOffCash, net12, paybackMonths, liftNeededPts, addonBuyersNeeded, maxOneOffFor12mPayback,
    extraRenewals,
  };
}
