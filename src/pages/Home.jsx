import React from "react";
import { SUITE } from "../data/tools.js";
import { EVIDENCE, EVIDENCE_TONE } from "../data/evidence.js";
import { EFFORT_TOTALS, rangeText } from "../data/effort.js";
import { BENCHMARK } from "../data/benchmark.js";
import { downloadFor } from "../data/downloads.js";
import { PILOT_OFFER as P } from "../data/pilot-offer.js";
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
          Claude skills built from your lessons that help each new member draft their first real work your way: a priced
          offer for one niche, then their first outreach.
        </p>
        <p className="lede lede--sub">
          Members install one kit. Each task skill asks only for what's missing, follows the rules in your lessons, drafts
          an editable deliverable, checks it against your criteria, and lists the gaps and claims to verify. When the
          lessons don't cover something, it drafts a question for the member to post in your Help channel. The check is
          Claude reviewing its own draft, so members still review what they send.
        </p>
        <div className="hero__actions">
          <RouteLink to="pilot" className="btn btn--primary">
            See the {P.terms.fee} pilot
          </RouteLink>
          <DownloadLink file={kit}>Try it free</DownloadLink>
        </div>
        <p className="muted">
          Or first: <RouteLink to="example">inspect a real run and a fair comparison</RouteLink>.
        </p>
      </header>

      <EvalPath />

      <Section id="outcome" title="What members can finish">
        <DefTable
          monoFirst={false}
          head={["Task", "What the member ends up with"]}
          rows={[
            ["Build your one-page offer", "A draft offer page in your formula: the niche scored with your filters (unconfirmed filters marked, not passed), a price from your ladder, then a check, the gaps to fill and a next step"],
            ["Write your first outreach", "Draft first messages in your script for each prospect with a real observation, both follow-ups, a tracking sheet, and the prospects skipped and why"],
            ["Ask the tutor", "Answers from your lessons with the lesson named; for anything not covered, a question the member can post for a coach"],
          ]}
        />
        <p className="muted">
          These are the tasks in the worked example, a synthetic AI-agency community. Your pack follows your own first
          outcome and lessons. Members edit and send everything themselves.
        </p>
      </Section>

      <Section id="receive" title={`What you get for ${P.terms.fee}`}>
        <DefTable monoFirst={false} rows={P.deliverables.map(([name, what]) => [name, what])} />
        <p>{P.paymentBasis} {P.terms.rows.find((r) => r[0] === "Payment")[1]}.</p>
        <p className="muted">
          Design-partner terms for the first three communities that pass the fit check.{" "}
          <RouteLink to="pilot">Scope, exclusions and what happens if acceptance fails</RouteLink>.
        </p>
      </Section>

      <Section id="verified" title="What has been shown, and what is still being tested">
        <p>
          <strong>Compared fairly</strong> (same model, same member messages, blind grading): {BENCHMARK.conclusion}{" "}
          <RouteLink to="example/fair">See the comparison</RouteLink>.
        </p>
        <EvidenceTable />
      </Section>

      <Section id="effort" title="Your effort">
        <DefTable
          monoFirst={false}
          rows={[
            ["Before launch (estimate)", `${rangeText(t.customerSetup)}: lessons as text, a 60-minute spec call, review, a test install, the launch post`],
            ["During the pilot (estimate)", `${rangeText(t.customerPilot)} of logging spread over the cohort`],
            ["After (estimate)", `${rangeText(t.customerMonthly)} a month, if you keep it`],
            ["Stays with you", "Approving the skills, keeping lessons accurate, answering what members post in Help, and anything members send to clients"],
            ["Members need", "Claude with skills turned on (listed for Free, Pro, Max, Team and Enterprise). Members who only use ChatGPT can't use it"],
          ]}
        />
        <p className="muted">
          Not yet timed with a real community. Breakdown: <RouteLink to="pilot/effort">effort</RouteLink>.
        </p>
      </Section>

      <Section id="money" title="Will it pay for itself?">
        <p>
          Nobody knows yet. The main way it could is more new members making their first renewal because more of them
          reach your first outcome; that is unmeasured. Whether the {P.terms.fee} would pay back depends on your price, how
          many new members join, how many use the pack, your renewals today and your costs, not on size alone.
        </p>
        <p>
          <RouteLink to="value">The calculator</RouteLink> shows, with your numbers, how large a change would have to be,
          and says so plainly when it's unlikely. Support time freed is capacity, not cash, unless you cut paid hours.
        </p>
      </Section>

      <Section id="enquire" title="How to enquire, or try it free">
        <DefTable
          monoFirst={false}
          rows={[
            ["Enquire about the pilot", `Through ${P.enquiry.label}. ${P.enquiry.requirements}`],
            ["Try it yourself, free", "Everything on this site is MIT licensed: the member-pack builder, member kit, acceptance checks and pilot report"],
            ["Third-party costs", "Your members' Claude plans; optional API usage"],
          ]}
        />
        <p>
          <RouteLink to="pilot/enquire" className="btn">Enquire about the pilot</RouteLink>{" "}
          <DownloadLink file={kit}>Download skool-owner-kit</DownloadLink>
        </p>
      </Section>
    </div>
  );
}
