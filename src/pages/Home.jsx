import React from "react";
import { SUITE } from "../data/tools.js";
import { EVIDENCE, EVIDENCE_TONE } from "../data/evidence.js";
import { EFFORT_TOTALS, rangeText } from "../data/effort.js";
import { downloadFor } from "../data/downloads.js";
import { PILOT_OFFER as P } from "../data/pilot-offer.js";
import { REVIEW_CASES, reviewEconomics } from "../data/review-model.js";
import { DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";

export const PATH = [
  ["1", "See a review draft", "home/outcome"],
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
  const cases = Object.values(REVIEW_CASES).map((c) => [c.label, reviewEconomics(c)]);
  const money = (x) => Math.round(x).toLocaleString("en-US");
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">For paid communities whose coaches review members' work against a method</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">
          Your coaches spend hours reviewing members' offers, scripts and pages against your method. We turn the method
          into a review rubric quoted from your lessons and set up a first pass that checks the mechanical points and
          drafts the feedback. Then we measure with you whether reviews get faster without missing problems. A coach
          approves every word.
        </p>
        <div className="hero__actions">
          <RouteLink to="pilot" className="btn btn--primary">
            See the {P.terms.fee} pilot
          </RouteLink>
          <DownloadLink file={kit}>Try it free</DownloadLink>
        </div>
      </header>

      <EvalPath />

      <Section id="outcome" title="The first useful result: a review draft in seconds">
        <p>A member posts an offer that undercharges. Before the coach reads it, the draft already says:</p>
        <DefTable
          monoFirst={false}
          head={["Criterion", "Status", "From your lesson"]}
          rows={[
            ["Monthly fee at least 300", "Missing: monthly 200 is below 300", "\"Never go below 300 a month.\""],
            ["Founding setup fee 500 to 1,000", "Missing: setup 400 is outside 500-1,000", "the pricing ladder"],
            ["One niche and one outcome", "You judge", "\"Sell one outcome to one niche.\""],
            ["Sections, length, tool names, guarantees, pilot metric", "Met", "the one-outcome offer lesson"],
          ]}
        />
        <p className="muted">
          From the worked example (a synthetic AI-agency community). The draft also lists claims that need a source, a
          checklist for the member and a reply to edit. Nothing is sent without the coach, and no AI service sees member
          work.
        </p>
      </Section>

      <Section id="receive" title={`What you get for ${P.terms.fee}`}>
        <ul className="list">
          {P.deliverables.map(([name, what]) => (
            <li key={name}><strong>{name}</strong>: {what}</li>
          ))}
        </ul>
        <p className="muted">
          {P.paymentBasis} Design-partner terms for the first three communities that pass the fit check.{" "}
          <RouteLink to="pilot">Scope, acceptance criteria and terms</RouteLink>.
        </p>
      </Section>

      <Section id="remains" title="What work and costs stay with you">
        <ul className="list">
          <li>Your coaches still read each submission, decide the questions flagged for them and send the reply.</li>
          <li>
            Setup: about {rangeText(t.customerSetup)} of your time (send lessons and 5 past reviews, approve one page, one
            walkthrough), then {rangeText(t.customerPilot)} logging three numbers per review during the pilot. Estimates.
          </li>
          <li>No software cost: the review runs on your coach's computer. Rubric upkeep is about {rangeText(t.customerMonthly)} a month when lessons change.</li>
        </ul>
      </Section>

      <Section id="money" title={`Is it worth ${P.terms.fee} to you?`}>
        <p>
          Only if your coaches do enough reviews, and only if the time saved is real. Over 12 months, with no renewal
          change counted at all:
        </p>
        <DefTable
          monoFirst={false}
          head={["Case", "Paid review time avoided", "Time freed (not cash)", "Fee + your time", "Benefit ÷ cost"]}
          rows={cases.map(([label, r]) => [label, money(r.cashAvoided), `${Math.round(r.capacityHours)} h`,
            money(r.cashCosts + r.timeCosts), `${r.totalMultiple.toFixed(1)}x`])}
        />
        <p>
          Below about 40 reviews a month, or if nobody is paid for review time, the fee won't come back: use the free
          tool or a Claude Project with your lessons. The pilot measures the saving against your own coach's baseline
          within three to four weeks. These figures are assumptions until it does.{" "}
          <RouteLink to="value">The calculators</RouteLink>.
        </p>
      </Section>

      <Section id="verified" title="What has been shown so far">
        <ul className="list">
          <li>
            On 8 synthetic offers with 17 known problems, the review tool found all 11 mechanical ones with no false
            flags and handed the 4 judgement ones to the coach. It missed 2 the rubric didn't cover; one check has been
            added since.
          </li>
          <li>
            A well-instructed Claude Project with the same lessons found all 17, but also raised 31 points that weren't
            problems and misstated a lesson 3 times, so a coach would have to check everything it says.
          </li>
          <li>
            <strong>Not yet shown:</strong> any coach's time saved, any real community, or use in the Claude app. Those
            tests were synthetic, and the Project was simulated in Claude Code. The pilot's first job is measuring
            minutes against your own baseline, and "no saving" is a possible answer.
          </li>
        </ul>
        <details className="calc__more">
          <summary>Evidence by level</summary>
          <EvidenceTable />
        </details>
      </Section>

      <Section id="free" title="Free, and still available">
        <p>
          Everything is MIT licensed: the review tool, the member kit builder (tasks and a tutor from your lessons, as a
          Claude Project or skills), the answer checker and the pilot report.{" "}
          <RouteLink to="admins">Admin guide</RouteLink> · <RouteLink to="members">Member guide</RouteLink>.
        </p>
      </Section>

      <Section id="enquire" title="Next step">
        <DefTable
          monoFirst={false}
          rows={[
            ["Enquire about the pilot", P.enquiry.privateDestination
              ? `Privately (${P.enquiry.privateLabel}), or publicly through ${P.enquiry.label}.`
              : `Through ${P.enquiry.label}. ${P.enquiry.requirements} A private route isn't set up yet.`],
            ["Or do it yourself, free", "Install skool-owner-kit and run skool-kit review with your own rubric"],
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
