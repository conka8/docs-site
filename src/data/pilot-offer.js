// The scoped paid pilot. Single source for the site's "Scoped pilot" page and ../PILOT-OFFER.md
// (regenerate with `npm run offer-docs`). The only published price and support commitment are in `terms`, as decided
// by the maintainer; `npm test` blocks price text in every other site file. No deadlines or guarantees.

export const PILOT_OFFER = {
  name: "Scoped member-kit pilot",
  summary:
    "A reviewed AI member kit built from your community's lessons. One community, one member outcome, one cohort: " +
    "we turn a set of your lessons into a tutor and up to 2 guided tasks, deliver them as a Claude Project or as " +
    "Claude skills, test them where your members use Claude, help you launch them to new members, and give you the " +
    "kit and a report to judge whether it helped.",
  scope: [
    ["Community", "One community whose members use the Claude app (claude.ai on the web or desktop)"],
    ["Member outcome", "One clearly defined first outcome with a deadline (for example: offer posted and 20 messages sent within 14 days)"],
    ["Lessons", "Up to 10 lessons you choose, as text or transcripts"],
    ["Tasks", "One tutor grounded in those lessons, and up to 2 guided tasks that complete the steps of the outcome"],
    ["Format", "One Claude Project (our default for members on their own Claude plans) or Claude skills (for Claude Code users, or a Team or Enterprise organisation). Both are built from the same reviewed files; you choose one before acceptance"],
    ["Pilot", "One cohort of new paid members (one calendar month), compared with an earlier baseline month"],
  ],
  // 1. What we commit to produce. Acceptance and payment depend only on these and their criteria.
  deliverables: [
    ["Member kit, in your name", "A tutor and up to 2 guided tasks, named for your community, built from your lessons with your rules, examples and checks, in the format you chose", "Builds from the approved spec with no errors; skills pass skillkit lint and fit the Claude app's limits; a Project's instructions and files are all present"],
    ["Supported tasks", "A written list of exactly which member tasks the kit supports, what each produces, and what it doesn't do", "You approve the list in the spec"],
    ["Reviewed lesson references", "Every step and rule tied to a named lesson; rules that aren't word for word in a lesson listed on a one-page approval sheet next to the closest lesson sentence; answers that quote the lesson sentence they rely on", "You confirm each listed rule; every quoted sentence in the acceptance outputs is found in the lesson it names"],
    ["Acceptance record", "At least 6 acceptance cases run in the Claude app in the chosen format, with outputs saved. They cover lesson questions, a topic the lessons don't cover, each task over several turns, member input that contradicts a lesson, missing facts, and a quote used for the wrong conclusion or without its qualification", "Every case passes its automatic checks (skool-kit check-answer) and a person's answers to its review questions; results in acceptance.csv"],
    ["Member onboarding", "What members receive in the chosen format (the project files and instructions, or the skill zips), a start guide with copyable setup steps and a first-task walkthrough, and a launch post draft", "You approve the wording; the setup steps work as written in the Claude app"],
    ["Pilot measurement process", "Pilot plan with your baseline, thresholds and observation windows set before launch, empty logs, and an operating checklist", "Thresholds agreed in writing before the first pilot member joins"],
    ["Decision report", "The pilot report on product quality, member outcomes and economics, with a short read-out", "Delivered once the cohort's outcome window has closed"],
    ["Handover", "Everything in your own files: the spec, the kit, the logs, and how to rebuild, re-test and share an update without losing your edits", "You can rebuild the kit yourself with one command"],
  ],
  // What we add beyond "upload your lessons to a Claude Project and write instructions". Not every owner needs all of
  // it. [customer problem, our deliverable, how it's accepted, effort or cost it affects]. Hours are estimates.
  contributions: [
    ["The method lives in videos and your head, not in steps a model can follow", "Supported tasks: inputs, steps, rules and the deliverable, drafted from your lessons", "You approve the task list", "Writing instructions yourself: est. 2-6 h and some prompt-writing skill"],
    ["Instructions drift from what the lessons say", "A one-page approval sheet: every rule tied to a lesson, and the ones not word for word shown next to the closest lesson sentence", "You confirm each listed rule", "Your review: est. 1-1.5 h including the call, instead of reading every file"],
    ["Nobody knows how it behaves until members complain", "At least 6 acceptance cases over several turns in the Claude app, including the ways a well-sourced answer can still be wrong", "Every case passes its checks and review", "Correction and support time later (not measured yet)"],
    ["Answers sound sure but can't be checked", "Answers quote the lesson sentence they rely on. A checker confirms each quote exists, is in the lesson named and keeps its qualifications; a person judges whether it supports the point", "Every quote in the acceptance outputs passes the checker, and the review questions are answered", "Time to verify an answer (not measured yet)"],
    ["Members don't set it up or don't know what to ask", "Start guide with copyable setup, a first-task walkthrough and a launch post", "Setup steps work as written", "Your onboarding: est. 0.25-0.5 h"],
    ["Lesson changes break what you customised", "Rebuild that keeps your edits, and versioned updates", "You rebuild with one command", "Maintenance: est. 1-2 h a month"],
    ["You can't tell whether it helped", "Pilot plan, joins imported from member exports, minimal logs and a decision report", "Thresholds agreed before launch", "Your logging: est. 2-3 h"],
  ],
  // [activity, doing it yourself, the paid pilot: you, the paid pilot: us]. All estimates; nothing here is timed yet.
  diy: [
    ["Prepare lessons", "Export them (est. 2-4 h)", "Choose up to 10 and send them as they are, with 2-3 member examples (est. 1-2 h)", "Convert and organise them, draft the spec (est. 5-7 h)"],
    ["Turn the method into instructions", "Write the project instructions and tasks (est. 2-6 h)", "A 30-minute call, then approve one page (est. 1-1.5 h)", "Included above"],
    ["Review", "Your own judgement", "Only what changed (est. 0-0.5 h)", "Up to two rounds of changes (est. 1-2 h)"],
    ["Test", "Usually skipped", "Set it up, try one task, decide the cases we flag (est. 0.75-1 h)", "Package it; run and check every acceptance case in the Claude app (est. 3-4 h)"],
    ["Onboard members", "Write a post (est. 0.5-1 h)", "Post our draft (est. 0.25-0.5 h)", "Start guide and launch draft (est. 1 h)"],
    ["Measure", "Nothing", "Member exports, first outcomes, corrected answers and renewals (est. 2-3 h)", "Check the logs, record costs, write the report (est. 3-4 h)"],
    ["Maintain", "Edit the project when lessons change", "Rebuild with one command (est. 1-2 h a month)", "Optional, quoted after the report"],
  ],

  diyVerdict:
    "On these estimates your setup time is similar to doing it yourself (about 3-5.5 hours against 4.5-11), plus 2-3 " +
    "hours of pilot logging. None of it is timed yet, so don't count on a saving. What you pay for is the work you'd " +
    "otherwise skip: tasks with a fixed deliverable, rules checked against your lessons, acceptance testing in the " +
    "Claude app, onboarding and a measured decision. In our simulated test, a well-instructed Project with the same " +
    "lessons made the same judgement calls; the kit's advantage was the finished deliverable, traceable citations and " +
    "the coach route. If you only want members to have your lessons in Claude, a Claude Project you set up yourself is " +
    "cheaper.",
  paymentBasis:
    "Acceptance and payment depend only on the deliverables and acceptance criteria above. They never depend on member " +
    "behaviour, renewals or revenue.",
  // 2. What we can observe during the pilot (logged by you; reported, not promised).
  observe: [
    "How many new members set up the kit",
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
    "Two rounds of changes to the kit after your first review.",
    "Lesson additions or replacements within the 10-lesson scope during the build.",
    "One rebuild after the pilot, based on what the report shows.",
  ],
  customerInputs: [
    "Up to 10 lessons as you have them (exports, transcripts or notes), and two or three examples of good member work",
    "Your definition of the first outcome and how members report it",
    "A 30-minute specification call, and approval of one page (see the effort breakdown)",
    "Your baseline numbers: first outcomes and first renewals for an earlier month of new members",
    "A Claude account on the plan your members use, for acceptance testing in the Claude app",
    "Member exports for the joins, first outcomes and corrected answers during the pilot, and renewals or cancellations from your payment history once they're due",
  ],
  customerResponsibilities: [
    "Approving every task and rule before members see them; the lessons' accuracy",
    "Member support beyond the tutor, and answering questions it escalates",
    "Deciding pilot thresholds before the pilot starts",
    "Anything members send to their own clients",
  ],
  dependencies: [
    "Members use Claude. A Claude Project works on every plan (Free accounts can have up to 5 projects); skills are listed for every plan and need code execution turned on. Members on ChatGPT can't use the kit",
    "Lessons exist as text, or you can provide transcripts",
    "Enough new paid members per month for a pilot to say anything (about 20 or more)",
    "Platform behaviour (Claude's projects, skill upload, model updates) can change; acceptance is re-run if it does during the pilot",
  ],
  exclusions: [
    "Any guarantee of member results, renewals or revenue",
    "Building or running automations, n8n workflows or integrations for members",
    "Video transcription",
    "Ongoing member support or community management",
    "Changes to your community platform, payments or pricing",
    "Legal, tax or financial advice in the kit",
  ],
  acceptanceFails: [
    "We fix the kit and re-run the failed cases, within the revision rounds above.",
    "If a case still fails because of a limit of the platform or the lessons (for example a topic the lessons don't cover), we document it and agree with you whether to remove that case, change the scope, or stop.",
    "Members don't get the kit until every case you approved passes in the Claude app in the chosen format, or you accept a documented exception in writing.",
  ],
  maintenance: [
    "Rebuild when lessons change (your edits to generated files are kept)",
    "Re-run the acceptance cases after a lesson change or a Claude model change",
    "Review answers members flag, and adjust rules or lessons",
  ],
  // Steps, in order. No dates: they depend on when your cohort month starts.
  process: [
    ["Fit check", "Answer the fit questions; we confirm or decline"],
    ["Specification", "We draft the spec from your lessons before a 30-minute call; you choose the format and approve one page (APPROVAL.md)"],
    ["Build and review", "We build the kit and make the changes you asked for; up to two rounds"],
    ["Acceptance", "We run and check the acceptance cases in the Claude app in the chosen format; you set the kit up yourself, try one task and decide the cases we flag"],
    ["Baseline and thresholds", "You fill in the baseline month; we agree thresholds in writing"],
    ["Launch", "New paid members in the pilot month get the kit and the start guide"],
    ["Pilot logging", "You log first outcomes, corrected answers and renewals, and send member exports; we import them, record costs and check the logs halfway"],
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
      ["Payment", "Half when you approve the spec; half when the acceptance cases pass and the kit is handed over for launch. If we stop at acceptance (see below), the second half isn't due"],
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
