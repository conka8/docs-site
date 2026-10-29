import React from "react";
import { SUITE, TOOLS } from "../data/tools.js";
import { CATALOG, STARTER } from "../data/catalog.js";
import { READINESS } from "../data/readiness.js";
import { SERVICES } from "../data/offer.js";
import { downloadFor } from "../data/downloads.js";
import { Badge, DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";

const PATH = [
  ["1", "Understand the offer", "home/offer"],
  ["2", "See the worked example", "example"],
  ["3", "Estimate the value", "value"],
  ["4", "Check fit and plan a pilot", "pilot"],
  ["5", "Try it on the sample", "start"],
];

function statusSummary(id) {
  const rows = READINESS[id] || [];
  return ["live", "local", "fixture", "experimental"].filter((s) => rows.some((r) => r[1] === s));
}

export default function Home() {
  const kit = downloadFor("skool-owner-kit");
  const starter = downloadFor("builder-commons-starter");
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">For owners of paid AI-automation and AI-agency communities</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">
          Turn your lessons into Claude skills that walk each new member to their first win, then measure whether more of
          them get there and stay.
        </p>
        <p className="lede lede--sub">
          Your members pay monthly to get a result, but the classroom only tells them how. A member pack does the first
          tasks <em>with</em> them, step by step, using your method: their niche, their offer, their first outreach. It
          answers questions from your lessons and sends what isn't covered to your Help channel.
        </p>
        <div className="hero__actions">
          <RouteLink to="example" className="btn btn--primary">
            See the worked example
          </RouteLink>
          <RouteLink to="value" className="btn">
            Estimate value
          </RouteLink>
          <DownloadLink file={kit}>Try it</DownloadLink>
        </div>
      </header>

      <nav className="path" aria-label="Evaluate Builder Commons">
        {PATH.map(([n, label, to]) => (
          <RouteLink key={to} to={to} className="path__step">
            <span className="path__num">{n}</span>
            {label}
          </RouteLink>
        ))}
      </nav>

      <Section id="offer" title="The offer">
        <DefTable
          monoFirst={false}
          rows={[
            ["Who it's for", "Owners of paid communities that promise members a concrete early result (a first client, a first automation), with a classroom of written or transcribed lessons and roughly 20 or more new paid members a month"],
            ["The expensive problem", "New members who pay but don't act on the lessons in their first weeks, ask the same questions again and again, and are the easiest to lose at their first renewal"],
            ["What you get", "A tutor skill grounded in your lessons, task skills for your first-win steps, acceptance checks, a member start guide, an admin review checklist, and a pilot kit"],
            ["What members accomplish", "Finished deliverables using your method: a scored niche choice, a priced one-page offer, personalised outreach with follow-ups"],
            ["How it could pay", "More new members reaching the first win could mean more first renewals. Fewer repeat questions frees coach time, which is cash only if you cut paid hours. Neither is proven yet: a pilot measures both"],
            ["What you provide", "Your lessons as text, the tasks and rules you teach, two hours to write the spec, an hour to review, and logging during the pilot"],
            ["What stays your job", "Reviewing the skills, keeping lessons current, member support beyond the tutor, and anything members send to their clients"],
          ]}
        />
      </Section>

      <Section id="costs" title="Effort, costs and limits">
        <ul className="list">
          <li><strong>Your time:</strong> our estimate from building the example is 10 to 16 hours to write the spec, review the skills and run acceptance tests, then a few hours a month to keep it current. Not yet measured with a real community.</li>
          <li><strong>Third-party costs:</strong> members need a Claude account with skills and code execution turned on. Claude's help center lists skills on the Free and Pro plans, while one Anthropic developer page says Pro or higher; check before you promise it to members (claude.com/pricing and support.claude.com, checked 2026-10-29). Optional tests with an API key are usage-billed.</li>
          <li><strong>Not yet verified live:</strong> uploading the generated skills to the Claude app and running them. Every step works locally; the live run is a manual acceptance step you do before members see it.</li>
          <li><strong>Members on ChatGPT:</strong> skills on ChatGPT personal plans are unconfirmed. If most of your members won't use Claude, this isn't for you yet.</li>
          <li><strong>No result is guaranteed.</strong> The value depends on whether your members use it; the pilot tells you.</li>
        </ul>
      </Section>

      <Section id="free" title="What's free, what's paid">
        <DefTable
          monoFirst={false}
          head={["What", "Terms"]}
          rows={[
            ["The software", "Free, MIT license. Everything on this site, including the member-pack builder and the pilot report. Keep each tool's LICENSE file in copies you hand out"],
            ["Implementation help", SERVICES.enabled && SERVICES.contact ? "Available: see below" : "Not offered through this site yet"],
            ["Maintenance and support", SERVICES.enabled && SERVICES.contact ? "Available: see below" : "Not offered through this site yet"],
            ["Third-party costs", "Paid by you or your members, only if used: Claude plans, optional API usage, your community platform"],
          ]}
        />
        {SERVICES.enabled && SERVICES.contact ? (
          <div className="services">
            <h3>Optional help</h3>
            <p>{SERVICES.intro}</p>
            <DefTable monoFirst={false} head={["Service", "What it covers"]} rows={SERVICES.items} />
            <p>
              <a className="btn" href={SERVICES.contact}>
                Ask about implementation
              </a>
            </p>
          </div>
        ) : null}
      </Section>

      <Section id="evidence" title="What's verified so far">
        <ul className="list">
          <li>The member-pack builder, acceptance checks and pilot report run end to end on the synthetic example, from a fresh install of the download.</li>
          <li>Generated skills pass skillkit's checks against the published skill format rules (Claude docs, checked 2026-10-29).</li>
          <li>Not yet: a live run in the Claude app, a real community's lessons, or any pilot with real members. There are no customer results.</li>
        </ul>
        <p className="muted">
          Full status per integration: <RouteLink to="trust/readiness">Readiness &amp; data</RouteLink>.
        </p>
      </Section>

      <Section id="tools" title="The tools behind it">
        <div className="cards">
          {STARTER.map((id) => {
            const t = TOOLS.find((x) => x.id === id);
            return (
              <RouteLink key={id} to={id} className="card">
                <span className="card__top">
                  <span className="card__name">{t.name}</span>
                  <span className="card__tests">v{CATALOG[id].version}</span>
                </span>
                <span className="card__tagline">{CATALOG[id].useCase}</span>
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
          <DownloadLink file={starter}>Download the starter bundle</DownloadLink>{" "}
          Six more free tools for specific audiences: <RouteLink to="compare">compare them</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
