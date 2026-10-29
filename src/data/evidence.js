// What has actually been verified for the member pack, by level. One level never stands in for another.
// Update only with real runs; record dates. Shown on the home page, the demonstration and Readiness.

export const EVIDENCE = [
  {
    level: "Packaging and lint",
    status: "done",
    detail: "The worked example builds from a fresh install of the download, passes skillkit lint with no errors or warnings, and packs into Claude app upload zips.",
  },
  {
    level: "Acceptance checks on actual outputs",
    status: "done",
    detail: "Six acceptance cases replayed against the saved outputs of real runs: 6 of 6 pass. This checks the outputs, not the model.",
  },
  {
    level: "API instruction evaluation",
    status: "not done",
    detail: "skillkit eval with a real provider needs an API key; none was used.",
  },
  {
    level: "Skill execution in Claude",
    status: "partial",
    detail: "8 runs in Claude Code on 2026-10-29 (model alias \"sonnet\"): lesson questions, an uncovered question, the offer task, the outreach task and conflicting input. One defect found and fixed. Not yet run in the Claude app.",
  },
  {
    level: "Real member outcomes",
    status: "not done",
    detail: "No real community or member has used a pack.",
  },
  {
    level: "Financial outcomes",
    status: "not done",
    detail: "No pilot has been run. Every money figure on this site is a model input or an illustration.",
  },
];

export const EVIDENCE_TONE = { done: "ok", partial: "warn", "not done": "danger" };
