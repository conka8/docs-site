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
    "A general assistant without the lessons broke the lessons' rules in every case. Given the same lessons and a " +
    "clear instruction, the same assistant scored higher on following them than the skill (2.00 against 1.43) and " +
    "was preferred in 4 of 6 cases. The skill made the fewest unsupported claims. Re-inspection traced its lower " +
    "rule score to three defects in the pack (fixed since) and one O3 case counted twice; it had one wrong citation.",
  effort: [
    ["Member, first time", "nothing", "find and attach the right lessons, write the instruction", "install 3 zips (about 5 minutes)"],
    ["Member, each later task", "type the request", "re-attach lessons and repeat the instruction, or set up a Claude Project once", "paste the starter message, or just ask"],
    ["Admin, first time", "nothing", "share lesson text and a recommended instruction (est. 1-2 h)", "send lessons, approve one page, test once (est. 3-5.5 h)"],
    ["When a lesson changes", "nothing", "re-share files; members re-attach", "rebuild, re-test, share a new version; members replace 3 skills"],
  ],
};

// The latest comparison: the same reviewed pack as skills vs as one Claude Project, several turns.
// skool-owner-kit/examples/agency-lab/comparison/. tests/offer.test.mjs recomputes these from the saved grades.
export const COMPARISON = {
  date: "2026-10-30",
  setup: "Claude Code subagents, model claude-sonnet-5-5 for every conversation, 8 cases (4 regression, 4 held out), 1 to 3 turns with the member's later turns scripted in advance, graded blind by claude-opus-5-5 with a fixed rubric",
  conditions: [
    ["Claude Project (simulated)", "Project-like context, not a Claude Project in the app: the project's instructions in the prompt and its 15 files (all 8 lessons, one task guide per task, the examples) to read"],
    ["Skill kit (simulated)", "Skill-like loading, not the app's: the 3 installed skills' names and descriptions; the model chose a skill itself, then read its files"],
  ],
  results: [
    ["Lesson rules applied correctly (0-2)", "1.88", "1.75"],
    ["Unknown facts shown as unknown (0-2)", "1.75", "2.00"],
    ["Lessons, member and own suggestions kept apart (0-2)", "1.88", "2.00"],
    ["Usable deliverable by the end (0-2)", "2.00", "1.88"],
    ["Citations judged supported", "58 of 61", "43 of 45"],
    ["Unsupported claims (total)", "1", "2"],
    ["Grader's preferred conversation (of 8)", "5", "2"],
  ],
  conclusion:
    "Given the same reviewed lessons and instructions, the Project-like setup did at least as well as the skills and was " +
    "preferred in 5 of 8 cases (1 tie). The skills' lower scores came from the format: a task skill carries only its " +
    "own task's lessons. Every quoted lesson passage was found in the lesson it named. This is 8 cases in one " +
    "synthetic community: exploratory, not a general benchmark.",
  formats: [
    ["Member setup (steps in the guide; not timed)", "Create a project, paste the instructions, upload 15 files", "Turn on code execution, upload and switch on 3 skills"],
    ["Plans", "Every plan (Free: up to 5 projects)", "Every plan, with code execution on"],
    ["Each later task", "Open the project", "Any chat"],
    ["Lesson update", "Replace the instructions and changed files", "Delete and re-upload changed skills"],
    ["Team or Enterprise", "Share the project inside the organisation", "Owner provisions skills to everyone; updates reach them automatically"],
  ],
};

// The offer task against the simplest strong alternative: the same 8 lessons in a Claude Project with a short,
// competent instruction. skool-owner-kit/examples/agency-lab/offer-task-comparison/.
export const OFFER_TASK = {
  date: "2026-10-30",
  setup: "Claude Code subagents (claude-sonnet-5-5), Project-like context in both conditions (not the Claude app), 6 cases, one run each; deterministic checks by skool-kit check-answer; semantic review by the developer who built the kit (not independent)",
  rows: [
    ["Judgement calls (price floor, refund qualification, conflicts, missing facts)", "Correct in every case", "Correct in every case"],
    ["Finished one-page offer with check, gaps and next step", "3 of 3 runs that called for one", "0 of 3 (one draft without those sections; one asked to check filters first)"],
    ["Citations traceable to the named lesson", "40 of 40", "21 of 36"],
    ["Drafted coach question when the topic isn't covered", "Yes", "No (told the member to ask)"],
  ],
  conclusion:
    "No difference in judgement. The kit's advantage is the preparation: a fixed deliverable, citations a checker " +
    "can trace, and the escalation step. A better DIY instruction could close some of the gap.",
};
