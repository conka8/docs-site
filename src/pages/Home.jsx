import React from "react";
import { SUITE, TOOLS, TOTAL_TESTS } from "../data/tools.js";
import { CATALOG, STARTER } from "../data/catalog.js";
import { READINESS, readinessSummary } from "../data/readiness.js";
import { SERVICES } from "../data/offer.js";
import { downloadFor } from "../data/downloads.js";
import { Badge, CodeBlock, DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";

const STEPS = [
  ["Build", "Turn your classroom into a tutor skill and your n8n / Make.com templates into skills.", "skool-kit classroom-to-skill lessons -o my-skills\nskillport batch my-blueprints -o my-skills"],
  ["Check", "Catch broken links, leaked keys, names the Claude app rejects, and converted steps that need a human look.", "skillkit lint my-skills"],
  ["Ship", "One plugin for Claude Code members, or one upload zip per skill for Claude app members.", "skillkit pack my-skills -o dist --name my-skills \\\n  --author \"My Community\" --format claude-app"],
  ["Update", "Rebuild, check, pack with a new version. Members update the plugin or re-upload the zip.", "skillkit pack my-skills -o dist --name my-skills --version 1.1.0 ..."],
];

const MEMBER_GETS = [
  ["A tutor that knows your lessons", "Answers questions from your classroom, cites the lesson and links back to it, and says when something isn't covered."],
  ["Your automations as skills", "Each template as a skill with setup steps in plain English and the accounts it needs listed up front."],
  ["A two-minute install", "Upload a zip in the Claude app, or two commands in Claude Code. The member guide covers both, plus troubleshooting."],
  ["Your name on it", "Skill names, descriptions, READMEs and reports carry your community's name."],
];

function statusSummary(id) {
  const rows = READINESS[id] || [];
  const order = ["live", "local", "fixture", "experimental"];
  return order.filter((s) => rows.some((r) => r[1] === s));
}

export default function Home() {
  const starter = downloadFor("builder-commons-starter");
  const counts = readinessSummary();
  const facts = [
    { value: String(STARTER.length), label: "tools in the starter bundle" },
    { value: TOTAL_TESTS.toLocaleString("en-US"), label: "automated tests, all passing" },
    { value: SUITE.license, label: "license: free to use and rebrand" },
    { value: String(counts.live), label: "integrations verified against live services so far" },
  ];

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">For community owners and admins</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">{SUITE.tagline}</p>
        <p className="lede lede--sub">
          Free, open-source tools that run on your own computer. No account to create, nothing uploaded. Try every step
          on the sample files first: no API key needed.
        </p>
        <div className="hero__actions">
          <DownloadLink file={starter} primary>
            Download the starter bundle
          </DownloadLink>
          <RouteLink to="admins" className="btn">
            Admin guide
          </RouteLink>
          <RouteLink to="members" className="btn">
            Member guide
          </RouteLink>
        </div>
      </header>

      <dl className="facts">
        {facts.map((f) => (
          <div key={f.label} className="fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <Section id="how" title="How it works">
        <ol className="steps">
          {STEPS.map(([title, body, code], i) => (
            <li key={title} className="step">
              <span className="step__num">{i + 1}</span>
              <div className="step__body">
                <h3>{title}</h3>
                <p>{body}</p>
                <CodeBlock code={code} compact />
              </div>
            </li>
          ))}
        </ol>
        <p className="muted">
          Full walkthrough with branding, checks and updates: <RouteLink to="admins">Admin guide</RouteLink>. First
          install: <RouteLink to="start">Install &amp; downloads</RouteLink>.
        </p>
      </Section>

      <Section id="starter" title="The starter bundle">
        <p>Three tools that work together: two build skills from what you already have, one checks and packages them.</p>
        <div className="cards">
          {STARTER.map((id) => {
            const t = TOOLS.find((x) => x.id === id);
            const c = CATALOG[id];
            return (
              <RouteLink key={id} to={id} className="card">
                <span className="card__top">
                  <span className="card__name">{t.name}</span>
                  <span className="card__tests">v{c.version}</span>
                </span>
                <span className="card__tagline">{c.useCase}</span>
                <span className="card__for">You get: {c.produces}</span>
                <span className="card__badges">
                  {statusSummary(id).map((s) => (
                    <Badge key={s} status={s} />
                  ))}
                </span>
              </RouteLink>
            );
          })}
        </div>
        <p className="muted">
          The zip holds the three tools with sample files, the admin and member guides, and the readiness notes.{" "}
          Readiness labels are explained on <RouteLink to="trust/readiness">Readiness &amp; data</RouteLink>.
        </p>
      </Section>

      <Section id="members" title="What your members get">
        <div className="principles__grid">
          {MEMBER_GETS.map(([title, body]) => (
            <div key={title} className="principle">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="more" title="More tools">
        <p>Separate tools for specific audiences. Each has its own download and demo mode.</p>
        <div className="cards">
          {TOOLS.filter((t) => !STARTER.includes(t.id)).map((t) => (
            <RouteLink key={t.id} to={t.id} className="card card--quiet">
              <span className="card__top">
                <span className="card__name">{t.name}</span>
                <span className="card__tests">v{CATALOG[t.id].version}</span>
              </span>
              <span className="card__tagline">{CATALOG[t.id].useCase}</span>
              <span className="card__badges">
                {statusSummary(t.id).map((s) => (
                  <Badge key={s} status={s} />
                ))}
              </span>
            </RouteLink>
          ))}
        </div>
        <p className="muted">
          Side by side with prerequisites and costs: <RouteLink to="compare">Compare tools</RouteLink>.
        </p>
      </Section>

      <Section id="free" title="Free and open source">
        <DefTable
          monoFirst={false}
          head={["What", "Terms"]}
          rows={[
            ["All nine tools, sample files and guides", "Free, MIT license. Use with members and clients, change, rebrand, redistribute"],
            ["What you must keep", "Each tool's LICENSE file and copyright line in copies of the code you hand out"],
            ["Skills and reports you generate", "Yours. The \"Converted with skillport\" footer is optional (--brand-name)"],
            ["Outside services", "Paid by you, only if you use them (AI providers for optional features, Zapier, GoHighLevel)"],
          ]}
        />
        {SERVICES.enabled && SERVICES.contact ? (
          <div className="services">
            <h3>Optional help</h3>
            <p>{SERVICES.intro}</p>
            <DefTable monoFirst={false} head={["Service", "What it covers"]} rows={SERVICES.items} />
            <p>
              <a className="btn" href={SERVICES.contact}>
                Ask about help
              </a>
            </p>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
