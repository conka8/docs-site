// One effort breakdown for a scoped member-pack pilot, used by the site, the calculator defaults and EFFORT.md
// (regenerate with `npm run offer-docs`). These are ESTIMATES: no customer engagement has been timed yet. Local
// tool steps were timed on the synthetic example (OBSERVED-TIMINGS.md); human hours weren't. The rows follow the
// five-step customer workflow (numbered); unnumbered rows are ours or after handover.
//
// [id, activity, what it involves, customer one-off [low, high], our one-off [low, high],
//  customer per month [low, high], our per month [low, high]]

export const EFFORT = [
  ["content", "1. Send lessons and examples", "Choose up to 10 lessons and send them as they are (exports, transcripts or notes); add 2-3 pieces of good member work. We convert and organise them",
    [1, 2], [2, 3], [0, 0], [0, 0]],
  ["spec", "2. Approve the specification", "We draft tasks and rules from the lessons before a 30-minute call; you approve one page (APPROVAL.md), starting with the rules it lists for you to confirm",
    [1, 1.5], [3, 4], [0, 0], [0, 0]],
  ["review", "Changes after approval", "Up to two rounds; you check only what changed",
    [0, 0.5], [1, 2], [0, 0], [0, 0]],
  ["install", "3. Test the finished kit", "We package it in the chosen format; you set it up from the start guide and try one task, which also checks the guide",
    [0.5, 0.5], [1, 1], [0, 0], [0, 0]],
  ["acceptance", "Acceptance testing", "We run every acceptance case in the Claude app, check each reply (check-answer) and review it; you decide only the cases we flag",
    [0.25, 0.5], [2, 3], [0, 0], [0, 0]],
  ["onboarding", "4. Share the start guide", "Post our launch draft and send new members the start guide",
    [0.25, 0.5], [1, 1], [0, 0], [0, 0]],
  ["pilot", "5. Record essential events", "Send member exports for the joins (pilot-import), log first outcomes and corrected answers as they happen, and note renewals and cancellations from your payment history once due; we import, check the logs, record costs and write the report",
    [2, 3], [3, 4], [0, 0], [0, 0]],
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
