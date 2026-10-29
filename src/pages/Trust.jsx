import React from "react";
import { SUITE, TOOLS, TOTAL_TESTS } from "../data/tools.js";
import { READINESS, STATUSES, readinessSummary } from "../data/readiness.js";
import { Badge, Callout, DefTable, ReadinessTable, RouteLink, Section } from "../components/ui.jsx";
import { EvidenceTable } from "./Home.jsx";

const DATA = [
  ["skillport", "Workflow files you export", "Nothing. Bridge skills send member input to your own n8n webhook", "No"],
  ["skillkit", "Your skill folders and test cases", "eval only: instructions and test inputs to the AI provider you pick", "eval: one call per case, plus one per llm_rubric"],
  ["skool-owner-kit", "Member exports, lesson files, Zapier events", "--llm: a member's name and answers to the AI provider you pick", "--llm: one call per member"],
  ["shipsafe", "Your app's folder", "URL mode: ordinary GET requests to a site you own", "No"],
  ["geo-audit", "Your questions", "Each question to each AI provider you pick", "questions × providers calls"],
  ["ghl-agency-kit", "GoHighLevel data through your token", "Requests to GoHighLevel; onboard without --dry-run writes to the sub-account", "No (your GHL plan)"],
  ["voice-qa", "Your agent prompt and test packs", "Conversations to your agent's webhook and the AI caller's provider", "Several calls per conversation"],
  ["career-labs", "Lab files", "Nothing", "No"],
  ["vertical-packs", "Your inputs", "Nothing", "No"],
];

export default function Trust() {
  const max = Math.max(...TOOLS.map((t) => t.tests));
  const c = readinessSummary();
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Reference</p>
        <h1>Readiness &amp; data</h1>
        <p className="lede">How far each integration has been tested, what each tool reads and sends, and what can cost money.</p>
      </header>

      <Section id="evidence" title="Member pack: evidence by level">
        <EvidenceTable />
      </Section>

      <Section id="readiness" title="Integration readiness">
        <Callout tone="warn" title={`${c.live} of ${c.local + c.fixture + c.live + c.experimental} integrations verified against a live service so far`}>
          <p>
            Every tool runs end to end on its sample files. Connections to outside services (AI providers, GoHighLevel,
            Zapier, n8n, the Claude apps) were built from public documentation and tested against fakes. Passing those
            tests does not make an integration production ready. Try them on an account you control before you rely on them.
          </p>
        </Callout>
        <DefTable
          monoFirst={false}
          head={["Label", "Meaning"]}
          rows={Object.keys(STATUSES).map((k) => [<Badge status={k} />, STATUSES[k].text])}
        />
        {TOOLS.map((t) => (
          <div key={t.id} className="readiness-block">
            <h3>
              <RouteLink to={t.id + "/readiness"}>{t.name}</RouteLink>
            </h3>
            <ReadinessTable rows={READINESS[t.id]} />
          </div>
        ))}
      </Section>

      <Section id="data" title="Data and costs">
        <p>
          The tools run on your computer. Nothing goes to the people who made them: no account, no telemetry, no hosted
          service. Data only leaves your computer when you point a tool at an outside service with your own key or URL.
        </p>
        <DefTable head={["Tool", "Reads", "Sends", "Can cost money"]} rows={DATA} />
        <ul className="list">
          <li>Keys come from environment variables. Command-line options such as --token or --secret end up in shell history, so prefer the variables.</li>
          <li>Reports don't include your keys. Secret detection is pattern-based: look over anything before you publish it, and rotate any key that leaked.</li>
          <li>Member exports, join answers and Zapier events are personal data. Keep working files (outbox.jsonl, at_risk.csv) on your machine and delete them when done.</li>
          <li>Try demo modes first and set spending limits on the keys you use. Prices change: check your provider's pricing page.</li>
        </ul>
      </Section>

      <Section id="tests" title="Automated tests">
        <p>
          {TOTAL_TESTS.toLocaleString("en-US")} tests across the nine tools, all passing on {SUITE.testedOn}. They run with no
          network access and no API keys: outside services are replaced by fakes, and web features are tested against a
          local server.
        </p>
        <div className="bars" role="table" aria-label="Tests per tool">
          {TOOLS.map((t) => (
            <div key={t.id} className="bar" role="row">
              <span className="bar__label" role="cell">
                <RouteLink to={t.id}>{t.name}</RouteLink>
              </span>
              <span className="bar__track" role="cell">
                <span className="bar__fill" style={{ width: (t.tests / max) * 100 + "%" }} />
              </span>
              <span className="bar__value" role="cell">
                {t.tests}
              </span>
            </div>
          ))}
        </div>
        <ul className="list">
          <li>Report formats are tested for HTML escaping of user and AI content and for masking of known key formats.</li>
          <li>Command-line tools are tested for their exit codes and error messages.</li>
          <li>Each download is installed into a fresh environment and its first example is run before release.</li>
        </ul>
      </Section>

      <Section id="license" title="License">
        <p>
          All nine tools are MIT licensed. You can use them with members and clients, change them, rebrand them and
          redistribute them. Keep each tool's LICENSE file and copyright line in copies of the code you hand out. Skills and
          reports you generate from your own content are yours.
        </p>
      </Section>
    </div>
  );
}
