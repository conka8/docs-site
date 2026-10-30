// One effort breakdown for a scoped member-pack pilot, used by the site, the calculator defaults and EFFORT.md
// (regenerate with `npm run offer-docs`). These are ESTIMATES: no customer engagement has been timed yet. Local
// tool steps were timed on the synthetic example (OBSERVED-TIMINGS.md); human hours weren't. The rows follow the
// four-step customer workflow (numbered); unnumbered rows are ours or after handover.
//
// [id, activity, what it involves, customer one-off [low, high], our one-off [low, high],
//  customer per month [low, high], our per month [low, high]]

export const EFFORT = [
  ["content", "1. Send lessons and 5 past reviews", "The lessons behind the submission type, and 5 submissions your coaches already reviewed, with their feedback (names removed)",
    [0.5, 1], [1, 1], [0, 0], [0, 0]],
  ["spec", "2. Approve the rubric", "We draft up to 12 criteria from the lessons and test them on your past reviews; you approve one page",
    [0.25, 0.5], [3, 4], [0, 0], [0, 0]],
  ["review", "Rubric changes", "Up to two rounds; you check only what changed",
    [0, 0.25], [1, 2], [0, 0], [0, 0]],
  ["install", "3. Walkthrough", "We set it up on a coach's computer (or agree to run it for you) and do one live review together",
    [0.5, 1], [1, 1.5], [0, 0], [0, 0]],
  ["acceptance", "Acceptance on past work", "We compare the draft with your coaches' real feedback on the 5 past submissions; you decide the differences we list",
    [0.25, 0.5], [1, 2], [0, 0], [0, 0]],
  ["onboarding", "Coach guide", "One page: review, edit, send, log three numbers",
    [0, 0], [0.5, 0.5], [0, 0], [0, 0]],
  ["pilot", "4. Log three numbers per review; read-out", "Minutes, decision and critical misses for about 25 reviews (10 baseline, 15 with the draft); we analyse and report",
    [0.5, 1], [2, 3], [0, 0], [0, 0]],
  ["maintenance", "Maintenance after handover", "Approve rubric changes when lessons change",
    [0, 0], [0, 0], [0.5, 1], [0, 0]],
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
