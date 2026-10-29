// One effort breakdown for a scoped member-pack pilot, used by the site, the calculator defaults and EFFORT.md
// (regenerate with `npm run effort`). These are ESTIMATES from building the synthetic example; no customer
// engagement has been timed yet. Replace each with measured hours after the first pilot.
//
// [id, activity, what it involves, customer one-off [low, high], our one-off [low, high],
//  customer per month [low, high], our per month [low, high]]

export const EFFORT = [
  ["content", "Content preparation", "Export the chosen lessons as text; add transcripts or notes for video-only lessons; pick 2-3 good member examples",
    [2, 4], [1, 1], [0, 0], [0, 0]],
  ["spec", "Specification", "Define the first outcome, the task, the rules and checks (pack.yaml), from a 60-minute call",
    [1, 2], [3, 4], [0, 0], [0, 0]],
  ["review", "Review", "Read the generated skills; up to two rounds of changes",
    [1, 2], [1, 2], [0, 0], [0, 0]],
  ["install", "Installation and packaging", "Package for the members' Claude surface; install on the owner's own account",
    [0.5, 0.5], [1, 1], [0, 0], [0, 0]],
  ["acceptance", "Acceptance testing", "Run the acceptance cases (at least six) in the members' Claude surface and record the results",
    [1, 1], [2, 3], [0, 0], [0, 0]],
  ["onboarding", "Member onboarding", "Launch post, member start guide, optional short Q&A call",
    [1, 2], [1, 1], [0, 0], [0, 0]],
  ["pilot", "Pilot logging and report", "Log joins, installs, completed tasks, reviewed answers and costs for one cohort; read the decision report",
    [6, 8], [2, 3], [0, 0], [0, 0]],
  ["maintenance", "Maintenance after handover", "Rebuild when lessons change, review answers members flag",
    [0, 0], [0, 0], [1, 2], [0, 0]],
];

const sum = (col, side) => EFFORT.reduce((t, row) => t + row[col][side], 0);

export const EFFORT_TOTALS = {
  customerOneOff: [sum(3, 0), sum(3, 1)],
  ourOneOff: [sum(4, 0), sum(4, 1)],
  customerMonthly: [sum(5, 0), sum(5, 1)],
  ourMonthly: [sum(6, 0), sum(6, 1)],
  // The pilot row is spread over the pilot, so it is reported separately from setup.
  customerSetup: [sum(3, 0) - EFFORT[6][3][0], sum(3, 1) - EFFORT[6][3][1]],
  customerPilot: EFFORT[6][3],
};

export const mid = ([lo, hi]) => (lo + hi) / 2;

export function rangeText([lo, hi], unit = "hours") {
  return lo === hi ? `${lo} ${unit}` : `${lo}-${hi} ${unit}`;
}
