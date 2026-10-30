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
  // 1. What we commit to produce. Acceptance and payment depend only on these and their criteria.
  deliverables: [
    ["Member pack, in your name", "A tutor and up to 2 task skills, named for your community, built from your lessons with your rules, examples and checks", "Passes skillkit lint with no errors or warnings, and each skill's description fits the Claude app's limit"],
    ["Supported tasks", "A written list of exactly which member tasks the pack supports, what each produces, and what it doesn't do", "You approve the list in the spec"],
    ["Reviewed lesson references", "Every step and rule in the task skills tied to a named lesson, and a lesson index for the tutor", "You confirm each reference points at the right lesson"],
    ["Acceptance record", "At least 6 acceptance cases (lesson questions, an uncovered question, each task, conflicting input) run in your members' Claude surface, with outputs saved", "Every case passes the criteria you approved; results in acceptance.csv"],
    ["Member kit and onboarding", "One kit for members: the upload zips, a start guide with copyable install steps and a first-task walkthrough, and a launch post draft", "You approve the wording; the install steps work as written in the Claude app"],
    ["Pilot measurement process", "Pilot plan with your baseline, thresholds and observation windows set before launch, empty logs, and an operating checklist", "Thresholds agreed in writing before the first pilot member joins"],
    ["Decision report", "The pilot report on product quality, member outcomes and economics, with a short read-out", "Delivered once the cohort's outcome window has closed"],
    ["Handover", "Everything in your own files: the spec, the pack, the logs, and how to rebuild, re-test and share an update without losing your edits", "You can rebuild the pack yourself with one command"],
  ],
  paymentBasis:
    "Acceptance and payment depend only on the deliverables and acceptance criteria above. They never depend on member " +
    "behaviour, renewals or revenue.",
  // 2. What we can observe during the pilot (logged by you; reported, not promised).
  observe: [
    "How many new members install the pack",
    "Which tasks they complete, and what they produce",
    "How many reach your first outcome within its window",
    "Which tutor answers someone had to correct, and staff minutes spent",
  ],
  // 3. What the pilot tests and can't promise.
  testing: [
    "Whether more new members make their first renewal than in your baseline month",
    "Whether support hours you actually pay for go down",
    "Whether that is worth the fee and your time (the calculator shows what would have to be true)",
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
    "Members use Claude with code execution turned on, which skills need (skills are listed for Free, Pro, Max, Team and Enterprise). Members on ChatGPT can't use the pack",
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
    feeAmount: 500,
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
    // A private route (a monitored mailto: address or booking page) is preferred. None is configured, so it stays
    // empty and the site doesn't show it. To activate: set privateDestination and privateLabel, then run
    // `npm run offer-docs` and rebuild. Nothing else changes.
    privateDestination: "",
    privateLabel: "",
    // The public route that exists today: an issue form in the site's own repository, .github/ISSUE_TEMPLATE/.
    destination: "https://github.com/conka8/docs-site/issues/new?template=pilot-enquiry.yml",
    label: "a GitHub issue form",
    requirements:
      "You need a GitHub account, and the issue is public: anyone can read it. The form asks only for information " +
      "that is already public on your community's page.",
    // Must match the form's field labels exactly (a test checks it).
    fields: [
      "Community link",
      "Monthly membership price (as shown on your public page)",
      "First outcome you promise new members (as described on your public page)",
      "Do your lessons exist as text or transcripts?",
      "Which AI tool do most of your members use?",
    ],
    privateLater: [
      "New paid members per month and first-renewal rates",
      "Lesson files or transcripts",
      "Your contact details",
    ],
    privateNote:
      "Don't post these in the issue. We reply on the issue within 2 business days and agree a private channel for them.",
  },
};
