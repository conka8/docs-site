// The scoped paid pilot (member-work review since 2026-10-30, evening; see OFFER.md proposal 14). Single source for the site's "Scoped pilot" page and ../PILOT-OFFER.md
// (regenerate with `npm run offer-docs`). The only published price and support commitment are in `terms`, as decided
// by the maintainer; `npm test` blocks price text in every other site file. No deadlines or guarantees.

export const PILOT_OFFER = {
  name: "Member-work review pilot",
  // Shown next to the offer wherever it appears. Remove only when a real community has completed the pilot.
  experimental:
    "Experimental offer: no community has used it yet, and coach time savings haven't been measured.",
  // The job: coaches reviewing members' submitted work against the owner's method. Chosen 2026-10-30 over the member
  // kit because its cost falls on the admin, it recurs weekly, and its result is measurable within a month.
  summary:
    "Your coaches review members' work (offers, scripts, pages) against your method. We turn that method into a " +
    "review rubric quoted from your lessons, set up a first-pass review that checks the mechanical points and drafts " +
    "the feedback, and measure with you, over three to four weeks, whether reviews get faster without missing " +
    "problems. A coach approves every word before it's sent.",
  scope: [
    ["Community", "One community whose coaches (or the owner) already review members' submissions of one kind against the method in the lessons"],
    ["Submission type", "One kind of member work, for example a one-page offer or an outreach script"],
    ["Rubric", "Up to 12 criteria, each tied to a sentence in your lessons, checked automatically where the check is mechanical and left to the coach where it needs judgement"],
    ["Where it runs", "On a coach's own computer (Python 3.10 or later), or we run it on submissions you forward during the pilot. Nothing is sent to any AI service"],
    ["Pilot", "The coach's next 10 reviews done the usual way as a baseline, then at least 15 with the draft, over three to four weeks"],
  ],
  // 1. What we commit to produce. Acceptance and payment depend only on these and their criteria.
  deliverables: [
    ["Review rubric, in your words", "Up to 12 criteria for one submission type, each quoting the lesson sentence it rests on, with severity and the fix to suggest", "You approve it on one page (APPROVAL.md, \"Review rubric\"); every quote is found word for word in its lesson (pack-build refuses otherwise)"],
    ["First-pass review", "For each submission: which criteria are met, missing or uncertain, the questions left for the coach, claims that need a source, a checklist for the member and a reply draft marked DRAFT", "Runs on your coach's computer (or ours) from the released package"],
    ["Acceptance on your past work", "The rubric run on 5 submissions your coaches already reviewed, compared with what they actually said", "No critical problem your coach raised is missed by the draft or left unflagged; differences listed for you to decide"],
    ["Coach walkthrough", "One review done together, and a one-page guide: review, edit, send, log three numbers", "Your coach completes one review with it"],
    ["Pilot read-out", "Minutes per review against the coach's own baseline, drafts sent as-is or edited, critical misses, and the economics with the measured numbers", "Delivered within 10 business days of the last logged review"],
    ["Handover", "The rubric, the tool and how to change a criterion, in your files", "You can re-run a review yourself with one command"],
  ],
  // What we add beyond "ask a Claude Project with your lessons to review it". [problem, deliverable, accepted when,
  // effort it affects]. Hours are estimates.
  contributions: [
    ["What 'good' means lives in your coaches' heads", "A rubric quoted from your lessons, with severity and the fix to suggest", "You approve it", "Writing it yourself: est. 2-4 h"],
    ["Coaches re-check the same mechanical points every time", "Those points checked the same way every time, before the coach reads", "Matches your coaches on past submissions", "Coach minutes per review (measured in the pilot)"],
    ["A general AI review sounds sure and varies", "Deterministic checks, the lesson sentence behind each, and judgement left visibly to the coach", "No critical miss on past submissions", "Correction time (measured in the pilot)"],
    ["Nobody knows whether reviews got faster", "A baseline and three numbers per review", "Read-out against your baseline", "Your decision to keep, change or drop it"],
  ],
  // [activity, doing it yourself, the paid pilot: you, the paid pilot: us]. All estimates; nothing here is timed yet.
  diy: [
    ["Define the standard", "Write a review checklist from your lessons (est. 2-4 h)", "Send lessons and 5 past reviews; approve one page (est. 0.75-1.5 h)", "Draft the rubric, test it on your past reviews (est. 4-6 h)"],
    ["Review a submission", "Read it and write feedback, or paste it into a Claude Project with your lessons", "Read the draft, judge the flagged questions, edit, send", "Nothing per review"],
    ["Check it works", "Usually skipped", "One review together; decide the differences we list (est. 0.75-1.5 h)", "Acceptance on past submissions, walkthrough (est. 2-3.5 h)"],
    ["Measure", "Nothing", "Three numbers per review, about 30 seconds (est. 0.5-1 h in total)", "Read-out (est. 2-3 h)"],
    ["Maintain", "Edit the checklist", "Approve rubric changes when lessons change (est. 0.5-1 h a month)", "Optional, quoted after the read-out"],
  ],
  diyVerdict:
    "If your coaches review fewer than about 40 submissions a month, or nobody is paid for review time, use the free " +
    "tool or a Claude Project with your lessons: the fee won't come back. The pilot is for communities with real " +
    "review volume, where a consistent first pass could cut paid review time. Whether it does is what the pilot " +
    "measures. In our synthetic test the tool caught every mechanical problem we planted, but a well-instructed " +
    "Claude Project also caught problems that need judgement, which the tool leaves to the coach.",
  paymentBasis:
    "Acceptance and payment depend only on the deliverables and acceptance criteria above. They never depend on member " +
    "behaviour, renewals or revenue.",
  // 2. What we can observe during the pilot (logged by the coach in three numbers; reported, not promised).
  observe: [
    "Coach minutes per review, with and without the draft",
    "How many drafts are sent as they are, edited or rewritten",
    "Critical problems the draft missed",
    "Whether members' next versions pass the critical criteria",
  ],
  // 3. What the pilot tests and can't promise.
  testing: [
    "Whether review time falls enough to cut paid hours (cash) or only frees time (capacity)",
    "Whether that is worth the fee and your time (the review economics show what would have to be true)",
    "Renewals are not measured: three weeks is too short, and the case must stand without them",
  ],
  revisions: [
    "Two rounds of changes to the rubric after your first review.",
    "One rubric revision during the pilot, based on what coaches edited most.",
  ],
  customerInputs: [
    "The lessons behind the submission type, as you have them",
    "5 past submissions and the feedback your coaches gave (names removed)",
    "About 20 minutes to approve the rubric, and one coach for a 30-minute walkthrough",
    "The coach's minutes, decision and any critical miss for each review during the pilot (about 30 seconds each)",
  ],
  customerResponsibilities: [
    "Approving the rubric before it's used; the lessons' accuracy",
    "Every piece of feedback sent to a member: the draft is never sent without a coach",
    "Keeping member work private: share it with us only with names removed",
  ],
  dependencies: [
    "Coaches already review members' work of one kind, about 40 or more a month",
    "At least half of what coaches check can be written as mechanical criteria",
    "A coach can run a command on their own computer (Python 3.10+), or forwards submissions to us during the pilot",
    "Lessons exist as text, or you can provide transcripts",
  ],
  exclusions: [
    "Any guarantee of time saved, member results, renewals or revenue",
    "Sending feedback to members, or any access to your community platform",
    "Building or running automations for members",
    "The member kit (task skills or a Claude Project for members); the free tools build it if you want it",
    "Legal, tax or financial advice",
  ],
  acceptanceFails: [
    "We fix the rubric and re-run the past submissions, within the revision rounds above.",
    "If a criterion can't be checked reliably, it becomes a coach question instead; we agree with you whether to continue, change scope or stop.",
    "The pilot doesn't start on live submissions until acceptance passes, or you accept a documented exception in writing.",
  ],
  maintenance: [
    "Update the rubric when lessons change",
    "Add a second submission type",
    "Review the log monthly and adjust the criteria coaches edit most",
  ],
  // Steps, in order.
  process: [
    ["Fit check", "Answer the fit questions; we confirm or decline (fewer than about 40 reviews a month: we suggest the free tool)"],
    ["Intake", "You send the lessons, 5 past submissions and the feedback given"],
    ["Rubric", "We draft it and test it on your past submissions; you approve one page"],
    ["Acceptance", "The draft is compared with your coaches' real feedback on those 5; you decide the listed differences"],
    ["Walkthrough", "One live review with a coach"],
    ["Baseline", "The coach logs minutes on the next 10 reviews done the usual way"],
    ["Pilot", "At least 15 reviews with the draft, three numbers each, over three to four weeks"],
    ["Read-out", "Minutes, use, misses and economics against the decision rules agreed up front"],
    ["Handover", "The rubric and the tool in your files; optional maintenance from here"],
  ],
  // Design-partner terms, decided by the maintainer on 2026-10-29. The standard price is set after these pilots.
  terms: {
    fee: "US$500",
    feeAmount: 500,
    rows: [
      ["Who it's for", "The first 3 communities that pass the fit check"],
      ["Fee", "US$500 fixed per community, for the scope above. Not billed by the hour"],
      ["Payment", "Half when you approve the rubric; half when acceptance passes and the review workflow is handed over for the pilot. If we stop at acceptance (see below), the second half isn't due"],
      ["In return", "Permission to publish anonymised timings, acceptance results and the pilot report. Your community is named only if you agree in writing"],
      ["Replies", "We reply to enquiries and pilot questions within 2 business days. We don't support your members directly"],
      ["Maintenance", "Optional, quoted only after the pilot report says continue"],
      ["After the first 3", "The standard price is set once three design-partner pilots have finished; it isn't published yet"],
    ],
  },
  // Research call-out (discovery/DEMAND-TEST.md). No price, no service. Shown only once privateDestination is set,
  // because it asks owners for a conversation and, later, an export that must not go through a public issue.
  research: {
    title: "Run a free group that leads to a programme or call?",
    body:
      "We're studying how owners decide which new members to message. If more people join than you can message, " +
      "we'd like to ask you about last week's joins (20 minutes). If it's useful afterwards, we can sort a past " +
      "export of your join answers against who booked, at no charge, and show you where your buyers landed. " +
      "Nothing to install, and nothing is sent to your members.",
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
