// The fair comparison: skool-owner-kit/examples/agency-lab/benchmark/. tests/offer.test.mjs recomputes these numbers
// from the saved blind grades, so the site can't drift from the evidence.

export const BENCHMARK = {
  date: "2026-10-29",
  setup: "Claude Code subagents, model alias \"sonnet\", same member message for every condition, 6 cases (3 held out from development), graded blind by a model with a fixed rubric",
  conditions: [
    ["A", "General assistant", "The member's request only"],
    ["B", "Same assistant + the lessons", "The same lesson files the skill ships, attached, with a clear instruction to follow them, cite them, ask for what's missing and flag conflicts"],
    ["C", "Packaged member skill", "The installed skill from the member kit"],
  ],
  // Means over the 7 graded replies per condition (O3 ran twice); totals are sums.
  results: [
    ["Lesson rules applied correctly (0-2)", "0.00", "2.00", "1.43"],
    ["Usable with light edits (0-2)", "0.14", "1.71", "1.86"],
    ["Clarification quality (0-2)", "0.43", "1.71", "1.71"],
    ["Unsupported claims (total)", "60", "5", "2"],
    ["Conflicts with the lessons named", "0 of 4", "4 of 4", "4 of 4"],
    ["Grader's preferred reply (of 6 cases)", "0", "4", "2"],
  ],
  conclusion:
    "A general assistant without the lessons broke the lessons' rules in every case. Given the same lessons and a good " +
    "instruction, the same assistant followed them as well as the skill, and the grader preferred it in 4 of 6 cases. " +
    "The skill made the fewest unsupported claims and gave every member the same structure. What it saves is the " +
    "member's effort and the admin's control, not better answers.",
  effort: [
    ["Member, first time", "nothing", "find and attach the right lessons, write the instruction", "install 3 zips (about 5 minutes)"],
    ["Member, each later task", "type the request", "re-attach lessons and repeat the instruction, or set up a Claude Project once", "paste the starter message, or just ask"],
    ["Admin, first time", "nothing", "share lesson text and a recommended instruction (est. 1-2 h)", "spec, review, acceptance (est. 6.5-11.5 h)"],
    ["When a lesson changes", "nothing", "re-share files; members re-attach", "rebuild, re-test, share a new version; members replace 3 skills"],
  ],
};
