// What has actually been verified for the member pack, by level. One level never stands in for another.
// Update only with real runs; record dates. Shown on the home page, the demonstration and Readiness.

export const EVIDENCE = [
  {
    level: "Package and install (local)",
    status: "done",
    detail: "From the released download: install, build, lint, share the member kit, install it with START-HERE.md's commands into a sandboxed Claude Code folder, then update and reinstall. 45 scripted checks (scripts/acceptance_journey.py).",
  },
  {
    level: "Replay of saved outputs",
    status: "done",
    detail: "The acceptance checks re-run on outputs saved from earlier model runs: 6 of 6 pass. This tests the checks and those outputs, not a new run: a replay passing is no evidence that a new model run will pass.",
  },
  {
    level: "Model runs in Claude Code",
    status: "partial",
    detail: "Actual runs in Claude Code subagents. 2026-10-29: 8 first runs, a blind comparison of 21 replies, 9 runs after fixes, all single turn with the skill supplied. 2026-10-30 (claude-sonnet-5-5): 16 conversations of 1 to 3 turns comparing the pack as skills and as a Claude Project, the model choosing the skill itself from names and descriptions; graded blind. Not the Claude app's own skill loading.",
  },
  {
    level: "Member-work review on synthetic submissions",
    status: "partial",
    detail: "skool-kit review on 8 hand-written offers with 17 known problems: 11 mechanical ones found, 4 judgement ones handed to the coach, 2 missed (one check added since), 0 false flags. A simulated Claude Project with the same lessons found 17, with 31 false flags. No coach's time measured.",
  },
  {
    level: "Coach time saved",
    status: "not done",
    detail: "Needs a real coach and their own baseline: the review pilot measures it. Research on AI feedback drafts suggests time savings aren't assured.",
  },
  {
    level: "Claude app (claude.ai, desktop)",
    status: "not done",
    detail: "Upload, switching skills on, Claude choosing the skill, and multi-turn use are untested. Needs a Claude account; the steps are written down.",
  },
  {
    level: "API instruction evaluation",
    status: "not done",
    detail: "skillkit eval with a real provider needs an API key; none was used.",
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

// How each piece of content on the site was produced. Used as labels on the demonstration page.
export const CONTENT_KINDS = [
  ["Actual model execution", "A complete, unedited reply from a model run, saved in the download"],
  ["Excerpt", "A verbatim part of an actual model reply; the full reply is in the download"],
  ["Illustration", "Written by us to explain something, such as the synthetic lessons and the calculator presets"],
  ["Replay", "Saved outputs re-checked by the acceptance checks; no model is called"],
  ["Citation check", "skool-kit check-citations: each quoted lesson sentence exists in the lesson it names. It doesn't judge whether the sentence supports the point"],
  ["Real customer outcome", "None yet"],
];
