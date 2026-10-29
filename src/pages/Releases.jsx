import React from "react";
import { CodeBlock, RouteLink, Section } from "../components/ui.jsx";

// Keep in step with ../CHANGELOG.md (the repository copy has the full list).
const RELEASE = {
  date: "2026-10-29",
  title: "Starter bundle 0.2.0, other tools 0.1.1",
  groups: [
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
            <ul className="list">
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
