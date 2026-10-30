import React from "react";
import { CodeBlock, RouteLink, Section } from "../components/ui.jsx";

// Keep in step with ../CHANGELOG.md (the repository copy has the full list).
const RELEASE = {
  date: "2026-10-30",
  title: "Checkable citations, skills or a Claude Project, a draft spec from your lessons",
  groups: [
    ["skool-owner-kit 0.6.0", [
      "Every skill quotes the lesson sentence it relies on; check-citations confirms each quoted sentence is in the lesson it names.",
      "Skills keep lessons, the member's words and their own suggestions apart, show unknown facts as \"?\" or [brackets], and ask for what the deliverable can't be right without.",
      "pack-share also writes the same reviewed pack as one Claude Project: instructions to paste, the lessons and a task guide per skill.",
      "pack-draft: a first pack.yaml from your lessons, with rules copied word for word and every owner decision marked TODO (owner); pack-share refuses a pack that still has one.",
      "Fixes from the comparisons: the offer check accepts a pending niche check, the next step resolves pending items first, and task skills say when something is outside their own lessons.",
      "A blind comparison of the pack as skills and as a Claude Project over several turns (examples/agency-lab/comparison/), and a re-inspection of the earlier benchmark.",
    ]],
    ["Site (2026-10-30)", [
      "The comparison page leads with skills vs a Claude Project; the earlier comparison is kept as history with how to read it.",
      "The calculator also shows the renewal change needed to cover the fee plus your time, and which inputs move the answer most.",
      "One compatibility statement from the current help-centre pages; page title and description describe the pilot.",
    ]],
    ["skool-owner-kit 0.5.0 (2026-10-29)", [
      "pack-share: one member kit with START-HERE.md (copyable install steps, a check, a first-task walkthrough), an upload zip per skill and a draft launch post. Refuses unmerged updates and descriptions the Claude app would reject.",
      "Skill descriptions fit the Claude app's 200-character limit; the tutor's description now covers questions the lessons don't answer.",
      "Task skills read the relevant lessons before asking for missing input, mark unconfirmed niche filters instead of passing them, and still give a draft with [brackets].",
      "Every pack gets pilot/CHECKLIST.md; acceptance.csv records where each run happened.",
      "A blind comparison with a general assistant, with and without the lessons, and a member journey from download to update.",
    ]],
    ["skillkit 0.3.1 (2026-10-29)", ["lint warns when a description is too long for the Claude app; pack --format claude-app refuses it."]],
    ["skillport 0.2.1 (2026-10-29)", ["Generated descriptions fit 200 characters and keep the \"Use when\" sentence."]],
    ["Site (2026-10-29)", [
      "The calculator starts from the published fee, separates adoption from the effect among users, puts advanced inputs behind an expander, and says in words what would have to be true.",
      "The enquiry form asks only for public information; a private route can be switched on with one setting.",
      "Evidence labels: actual model execution, excerpt, illustration, replay, real customer outcome.",
    ]],
    ["skool-owner-kit 0.4.0 (earlier the same day)", [
      "Task skills finish the work: minimum questions, rules tied to lessons, conflicts named, and a deliverable ending in a pass/fail check, gaps and assumptions, a next step and a question for a coach.",
      "Unsupported money, number and customer-behaviour claims are flagged \"verify before use\" (a defect found in a real run).",
      "Pilot report: observation windows, completed tasks, acceptance results, and separate quality, outcome and economics verdicts.",
      "8 recorded runs of the example pack in Claude Code; example outputs are now actual outputs.",
    ]],
    ["Site (earlier the same day)", [
      "Month-by-month value calculator with input validation and payback from cumulative cash.",
      "A published scope for a paid pilot, and one effort breakdown used everywhere.",
    ]],
    ["Earlier the same day: member pack and pilot (starter bundle 0.3.0)", []],
    ["skool-owner-kit 0.3.0", [
      "pack-build: a member pack from your lessons: a tutor that cites lessons and routes what isn't covered to your support channel, task skills for your first-win steps, acceptance checks, member and admin guides, and a pilot kit. Rebuilds keep your edits.",
      "pilot: compares a pilot cohort with a baseline (first-outcome rate with 95% ranges, adoption, first renewal, answer corrections, costs) and suggests what to do next.",
      "A synthetic worked example in examples/agency-lab.",
    ]],
    ["skillkit 0.3.0", [
      "eval --include-references also sends the lesson and example files each skill points to.",
    ]],
    ["Earlier the same day: starter bundle 0.2.0, other tools 0.1.1", []],
    ["Downloads", [
      "Every tool and a starter bundle can now be downloaded from this site, with checksums. Each download is install-tested in a fresh environment.",
      "Every quickstart starts with sample files that ship in the download.",
    ]],
    ["skillport 0.2.0", [
      "Every converted skill has a Conversion check: code steps, schedules, AI steps, loops, logic in expressions, retries, error handling and sub-workflows that don't carry over.",
      "Bridge skills check the webhook's reply mode, auth header, test URL and network access.",
      "Fields that are only a reference (like {{ $json.text }}) now read \"the value of text\" instead of looking like literal text.",
      "Sample workflows in examples/.",
    ]],
    ["skillkit 0.2.0", [
      "pack --format claude-app: one upload zip per skill for the Claude app, plus INSTALL.md.",
      "New lint warnings: needs-review (unreviewed converted skill) and frontmatter-upload-key (header keys the Claude app rejects).",
      "eval reports say they are instruction-only tests, list files not sent to the model, and mark fake-provider runs as DEMO DATA.",
      "Sample library and cases in examples/.",
    ]],
    ["skool-owner-kit 0.2.0", [
      "Dashboard: \"Inactivity risk\" and \"Cohort activity\" replace churn and retention wording, with a how-to-read section.",
      "Zapier setup uses Skool's real triggers (Answered Membership Questions, New Paid Member; Skool Pro plan).",
      "Webhook drops connections that stall for 30 seconds.",
    ]],
    ["Other tools 0.1.1", [
      "shipsafe: an empty folder stops with exit 2 instead of grade A; scoped verdicts and a scope line in every report; secret values in evidence are masked; new check for API keys in browser code; no more pip install shipsafe in the skill.",
      "geo-audit: demo banner; reports explain that API answers differ from the consumer apps; Excel CSVs work; missing keys stop before any call.",
      "voice-qa: says \"simulated text conversations\"; demo banner; errored conversations fail the run; secrets in webhook errors are hidden.",
      "ghl-agency-kit: demo banner on every output; creates are no longer retried on server errors; onboard says before it writes.",
      "vertical-packs: maintenance triage escalates CO, gas, smoke, burning and burst pipes, and flags them for a human.",
      "career-labs: the installed labgrade command finds the labs; pyyaml is installed with it.",
    ]],
  ],
};

export default function Releases() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Reference</p>
        <h1>Release notes</h1>
        <p className="lede">What changed, and how to upgrade.</p>
      </header>

      <Section id="latest" title={`${RELEASE.date}: ${RELEASE.title}`}>
        {RELEASE.groups.map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            <ul className="list" hidden={!items.length}>
              {items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="upgrading" title="Upgrading">
        <p>
          Download the new zip, unzip it, activate the environment you installed into and install again. The new version
          replaces the old one.
        </p>
        <CodeBlock code={"source .venv/bin/activate            # Windows: .venv\\Scripts\\Activate.ps1\npython -m pip install ./skool-owner-kit ./skillport ./skillkit"} />
        <ul className="list">
          <li>
            Converted skills made with skillport 0.1 have no Conversion check. Convert them again to get it, then review
            each list.
          </li>
          <li>
            Scripts that read skool-owner-kit's JSON keep working: the cohort field is still called retention_pct, only the
            dashboard wording changed.
          </li>
          <li>
            voice-qa now exits 1 when any conversation errors. If a CI job relied on exit 0 in that case, fix the agent or
            the URL.
          </li>
          <li>
            geo-audit now exits 2 when a selected provider's key is missing, before calling anything.
          </li>
        </ul>
        <p className="muted">
          Full list in the repository's CHANGELOG.md. Install steps: <RouteLink to="start">Install &amp; downloads</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
