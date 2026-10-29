// The scoped paid pilot. Single source for the site's "Scoped pilot" page and ../PILOT-OFFER.md
// (regenerate with `npm run offer-docs`). The only published price and support commitment are in `terms`, as decided
// by the maintainer; `npm test` blocks price text in every other site file. No deadlines or guarantees.

export const PILOT_OFFER = {
  name: "Scoped member-pack pilot",
  summary:
    "One community, one member outcome, one cohort. We build a tutor and task skills from a set of your lessons, " +
    "test them in your members' Claude surface, help you launch them to new members, and give you the kit and a " +
    "report to judge whether it helped.",
  scope: [
    ["Community", "One community whose members use the Claude app (claude.ai on the web or desktop)"],
    ["Member outcome", "One clearly defined first outcome with a deadline (for example: offer posted and 20 messages sent within 14 days)"],
    ["Lessons", "Up to 10 lessons you choose, as text or transcripts"],
    ["Skills", "One tutor grounded in those lessons, and up to 2 task skills that complete the steps of the outcome"],
    ["Pilot", "One cohort of new paid members (one calendar month), compared with an earlier baseline month"],
  ],
  deliverables: [
    ["Member pack", "Tutor and task skills built from your lessons, with your rules, examples and checks, packaged for your members' surface", "Passes skillkit lint with no errors or warnings"],
    ["Acceptance record", "At least 6 acceptance cases (lesson questions, an uncovered question, each task, conflicting input) run in your members' Claude surface, with outputs saved", "Every case passes the criteria you approved; results in acceptance.csv"],
    ["Member onboarding", "Member start guide with your names and links, and a launch post draft", "You approve the wording"],
    ["Pilot kit", "Pilot plan with your baseline, thresholds and observation windows set before launch, and empty logs", "Thresholds agreed in writing before the first pilot member joins"],
    ["Decision report", "The pilot report on product quality, member outcomes and economics, with a short read-out", "Delivered once the cohort's outcome window has closed"],
    ["Handover", "Everything in your own files: the spec, the pack, the logs, how to rebuild and update", "You can rebuild the pack yourself with one command"],
  ],
  revisions: [
    "Two rounds of changes to the skills after your first review.",
    "Lesson additions or replacements within the 10-lesson scope during the build.",
    "One rebuild after the pilot, based on what the report shows.",
  ],
  customerInputs: [
    "The lessons, as text or transcripts, and two or three examples of good member work",
    "Your definition of the first outcome and how members report it",
    "A 60-minute specification call, and review time (see the effort breakdown)",
    "Your baseline numbers: first outcomes and first renewals for an earlier month of new members",
    "A Claude account on the plan your members use, for acceptance testing in the Claude app",
    "Logging during the pilot (joins, installs, completed tasks, reviewed answers, costs)",
  ],
  customerResponsibilities: [
    "Approving every skill before members see it; the lessons' accuracy",
    "Member support beyond the tutor, and answering questions it escalates",
    "Deciding pilot thresholds before the pilot starts",
    "Anything members send to their own clients",
  ],
  dependencies: [
    "Members use Claude with skills enabled (Anthropic's pages differ on the Free plan; Pro is listed). Members on ChatGPT can't use the pack",
    "Lessons exist as text, or you can provide transcripts",
    "Enough new paid members per month for a pilot to say anything (about 20 or more)",
    "Platform behaviour (Claude's skill upload, model updates) can change; acceptance is re-run if it does during the pilot",
  ],
  exclusions: [
    "Any guarantee of member results, renewals or revenue",
    "Building or running automations, n8n workflows or integrations for members",
    "Video transcription",
    "Ongoing member support or community management",
    "Changes to your community platform, payments or pricing",
    "Legal, tax or financial advice in the skills",
  ],
  acceptanceFails: [
    "We fix the skill and re-run the failed cases, within the revision rounds above.",
    "If a case still fails because of a limit of the platform or the lessons (for example a topic the lessons don't cover), we document it and agree with you whether to remove that case, change the scope, or stop.",
    "Members don't get the pack until every case you approved passes, or you accept a documented exception in writing.",
  ],
  maintenance: [
    "Rebuild when lessons change (your edits to generated files are kept)",
    "Re-run the acceptance cases after a lesson change or a Claude model change",
    "Review answers members flag, and adjust rules or lessons",
  ],
  // Steps, in order. No dates: they depend on when your cohort month starts.
  process: [
    ["Fit check", "Answer the fit questions; we confirm or decline"],
    ["Specification", "60-minute call; we draft the pack spec; you approve it"],
    ["Build and review", "We build the pack; you review; up to two rounds of changes"],
    ["Acceptance", "We run the acceptance cases in your members' Claude surface; you approve the results"],
    ["Baseline and thresholds", "You fill in the baseline month; we agree thresholds in writing"],
    ["Launch", "New paid members in the pilot month get the pack and the start guide"],
    ["Pilot logging", "You log events, reviewed answers and costs; we check the logs halfway"],
    ["Decision report", "After the outcome window closes (and later the first renewals), we run the report together"],
    ["Handover", "Rebuild instructions and the files; optional maintenance from here"],
  ],
  // Design-partner terms, decided by the maintainer on 2026-10-29. The standard price is set after these pilots.
  terms: {
    fee: "US$500",
    rows: [
      ["Who it's for", "The first 3 communities that pass the fit check"],
      ["Fee", "US$500 fixed per community, for the scope above. Not billed by the hour"],
      ["Payment", "Half when you approve the spec; half when the acceptance cases pass and the pack is handed over for launch. If we stop at acceptance (see below), the second half isn't due"],
      ["In return", "Permission to publish anonymised timings, acceptance results and the pilot report. Your community is named only if you agree in writing"],
      ["Replies", "We reply to enquiries and pilot questions within 2 business days. We don't support your members directly"],
      ["Maintenance", "Optional, quoted only after the pilot report says continue"],
      ["After the first 3", "The standard price is set once three design-partner pilots have finished; it isn't published yet"],
    ],
  },
  enquiry: {
    // A real, monitored destination (mailto: or https:). The issue form lives in .github/ISSUE_TEMPLATE/ of the
    // site's own repository; it works once that file is pushed.
    destination: "https://github.com/conka8/docs-site/issues/new?template=pilot-enquiry.yml",
    label: "a GitHub issue form",
    privacy: "GitHub issues are public. Post only what is already public about your community; send member numbers once we have moved the conversation to a private channel.",
    prepare: [
      "Your community's link, monthly price and roughly how many new paid members join per month",
      "The first outcome you promise new members, and how you see when they reach it",
      "Which lessons it would use, and whether they exist as text",
      "Which AI tools most of your members use",
      "Your answers to the fit questions",
    ],
  },
};
