import React from "react";
import { SUITE } from "../data/tools.js";
import { EVIDENCE, EVIDENCE_TONE } from "../data/evidence.js";
import { EFFORT_TOTALS, rangeText } from "../data/effort.js";
import { downloadFor } from "../data/downloads.js";
import { PILOT_OFFER } from "../data/pilot-offer.js";
import { DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";

export const PATH = [
  ["1", "See the outcome", "home/outcome"],
  ["2", "Inspect a real run", "example"],
  ["3", "Check fit", "fit"],
  ["4", "Estimate economics", "value"],
  ["5", "Scoped pilot", "pilot"],
];

export function EvidenceTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Status</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          {EVIDENCE.map((e) => (
            <tr key={e.level}>
              <td>{e.level}</td>
              <td>
                <span className={"badge badge--" + EVIDENCE_TONE[e.status]}>{e.status}</span>
              </td>
              <td>{e.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EvalPath() {
  return (
    <nav className="path" aria-label="Evaluate Builder Commons">
      {PATH.map(([n, label, to]) => (
        <RouteLink key={to} to={to} className="path__step">
          <span className="path__num">{n}</span>
          {label}
        </RouteLink>
      ))}
    </nav>
  );
}

export default function Home() {
  const kit = downloadFor("skool-owner-kit");
  const t = EFFORT_TOTALS;
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">For owners of paid AI-automation and AI-agency communities</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">
          Skills built from your lessons that help each new member finish their first real work, using your method:
          their niche, a priced offer, their first outreach.
        </p>
        <p className="lede lede--sub">
          Your classroom tells members how. A member pack does the first tasks <em>with</em> them, checks the result
          against your rules, flags what's missing, and sends what your lessons don't cover to your Help channel. You
          get a pilot kit to see whether more new members get there.
        </p>
        <div className="hero__actions">
          <RouteLink to="example" className="btn btn--primary">
            Inspect a real run
          </RouteLink>
          <RouteLink to="pilot" className="btn">
            The scoped pilot
          </RouteLink>
          <DownloadLink file={kit}>Try it free</DownloadLink>
        </div>
      </header>

      <EvalPath />

      <Section id="outcome" title="What members complete">
        <DefTable
          monoFirst={false}
          head={["Task", "What the member ends up with"]}
          rows={[
            ["Build your one-page offer", "A niche scored with your filters, a headline in your formula, every section of your offer page, a price from your ladder, plus a pass/fail check, the gaps to fill and the next step"],
            ["Write your first outreach", "First messages in your script for each prospect with a real observation, both follow-ups, a tracking sheet, and the prospects skipped and why"],
            ["Ask the tutor", "Answers from your lessons with the lesson cited; for anything not covered, a ready-to-post question for a coach"],
          ]}
        />
        <p className="muted">
          These are the tasks in the worked example (a synthetic AI-agency community). Your pack follows your own first
          outcome and lessons.
        </p>
      </Section>

      <Section id="better" title="Why this beats the lessons alone or a general AI assistant">
        <DefTable
          monoFirst={false}
          head={["", "Lessons alone", "A general AI assistant", "Member pack"]}
          rows={[
            ["Uses your method", "Yes, if the member applies it", "No: general advice", "Yes: each step follows a named lesson"],
            ["Finishes the work", "No", "Partly", "Yes: an editable deliverable"],
            ["Keeps your rules", "If remembered", "No", "Yes: conflicts are named, e.g. a price below your minimum"],
            ["Flags gaps and unsupported claims", "No", "Rarely", "Yes: a Gaps and assumptions section"],
            ["Routes to your team", "Member must ask", "No", "Yes: a ready-to-post question for a coach"],
          ]}
        />
        <p className="muted">
          In the recorded runs, a member asked for an offer priced below the lesson's minimum, with a guaranteed 20% lift. The skill named both
          conflicts with the lessons and asked only for the missing input: <RouteLink to="example/runs">see the run</RouteLink>.
          The "general AI assistant" column is our judgement, not a measured comparison.
        </p>
      </Section>

      <Section id="receive" title="What you receive, and what stays with you">
        <DefTable
          monoFirst={false}
          rows={[
            ["You receive", "A tutor and task skills from your lessons, acceptance cases, a member start guide, an admin review checklist and a pilot kit. Free to build yourself, or as a paid scoped pilot"],
            ["Your time (estimate)", `${rangeText(t.customerSetup)} before launch, ${rangeText(t.customerPilot)} of logging during a pilot, ${rangeText(t.customerMonthly)} a month after. Not yet measured with a real community`],
            ["Stays with you", "Approving the skills, keeping lessons accurate, member support beyond the tutor, and anything members send to clients"],
            ["Members need", "Claude with skills turned on. Anthropic's pages differ on the Free plan; Pro is listed. Members who only use ChatGPT can't use it"],
          ]}
        />
        <p className="muted">
          Full breakdown: <RouteLink to="pilot/effort">effort</RouteLink>.
        </p>
      </Section>

      <Section id="verified" title="What has actually been verified">
        <EvidenceTable />
      </Section>

      <Section id="money" title="How it might earn or save money">
        <ul className="list">
          <li><strong>More first renewals</strong>, if more new members reach their first outcome. This is the main possible effect, and it is unmeasured.</li>
          <li><strong>Less repeat support</strong>: time freed is capacity unless you cut paid hours, and correcting wrong answers costs time back.</li>
        </ul>
        <p>
          <RouteLink to="value">The calculator</RouteLink> shows month by month what has to be true for a pilot to pay for
          itself. Small communities (around 15 new paid members a month at lower prices) usually can't justify a paid
          pilot; they should use the free tools.
        </p>
      </Section>

      <Section id="free" title="Free software, paid pilot">
        <DefTable
          monoFirst={false}
          head={["", "Terms"]}
          rows={[
            ["The software", "Free, MIT license: the member-pack builder, acceptance checks, pilot report and everything else on this site"],
            ["Scoped pilot (paid)", "We build, test and launch a pack with you and run the pilot report. Scope, deliverables and exclusions are published. Design-partner fee for the first 3 communities: " + PILOT_OFFER.terms.fee + " fixed"],
            ["Maintenance (optional, paid)", "Rebuilds and acceptance re-runs, quoted only after a pilot report says continue"],
            ["Third-party costs", "Your members' Claude plans; optional API usage"],
          ]}
        />
        <p>
          <RouteLink to="pilot" className="btn">See the scoped pilot</RouteLink>
        </p>
      </Section>
    </div>
  );
}
