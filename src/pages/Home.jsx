import React from "react";
import { SUITE } from "../data/tools.js";
import { EVIDENCE, EVIDENCE_TONE } from "../data/evidence.js";
import { EFFORT_TOTALS, rangeText } from "../data/effort.js";
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
        <p className="eyebrow">For owners of paid communities that teach a method, such as AI automation or agency courses</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">
          A reviewed AI member kit built from your community's lessons. New members use it in Claude to draft their
          first real work your way, and bring you the questions your lessons don't answer.
        </p>
        <div className="hero__actions">
          <RouteLink to="pilot" className="btn btn--primary">
            See the {P.terms.fee} pilot
          </RouteLink>
          <DownloadLink file={kit}>Try it free</DownloadLink>
        </div>
      </header>

      <EvalPath />

      <Section id="outcome" title="What members produce">
        <DefTable
          monoFirst={false}
          head={["Task", "What the member ends up with"]}
          rows={[
            ["Build your one-page offer", "A draft offer in your formula: a niche checked against your filters, a price from your ladder, what's still missing, and the next step"],
            ["Write your first outreach", "Draft first messages in your script, both follow-ups, a tracking sheet, and which prospects to skip and why"],
            ["Ask the tutor", "Answers from your lessons that say which lesson they come from, so members and you can check them; anything not covered becomes a question for your coaches"],
          ]}
        />
        <p className="muted">
          From the worked example, a synthetic AI-agency community. Your kit follows your own first outcome and lessons.
          Members review and send everything themselves.
        </p>
      </Section>

      <Section id="receive" title={`What you get for ${P.terms.fee}`}>
        <ul className="list">
          {P.deliverables.map(([name, what]) => (
            <li key={name}><strong>{name}</strong>: {what}</li>
          ))}
        </ul>
        <p>
          Delivered as one Claude Project (our default) or as Claude skills, built from the same reviewed files.{" "}
          {P.paymentBasis}
        </p>
        <p className="muted">
          Design-partner terms for the first three communities that pass the fit check.{" "}
          <RouteLink to="pilot">Scope, acceptance criteria and terms</RouteLink>.
        </p>
      </Section>

      <Section id="diy" title="What we do that you'd otherwise do yourself">
        <p>
          You could upload your lessons to a Claude Project and write instructions yourself. Here is what we add:
        </p>
        <DefTable monoFirst={false} head={["Your problem", "What we deliver"]} rows={P.contributions.map(([a, b]) => [a, b])} />
        <p>{P.diyVerdict}</p>
        <p className="muted">
          Your time, estimated: {rangeText(t.customerSetup)} before launch and {rangeText(t.customerPilot)} of pilot
          logging. Side by side with doing it yourself: <RouteLink to="pilot/diy">the comparison</RouteLink>.
        </p>
      </Section>

      <Section id="verified" title="What has been shown so far">
        <ul className="list">
          <li>
            In tests on a synthetic community, the kit's drafts followed the lessons, named requests that conflict with
            them, and marked what it didn't know instead of guessing. Every lesson sentence it quoted was found in that
            lesson. That check proves a quote exists, is in the lesson named and keeps its qualifications. Whether it
            supports the point is judged by a person in acceptance.
          </li>
          <li>
            On the offer task, a well-instructed Project with the same lessons made the same judgement calls. The kit's
            advantage was the finished deliverable, citations that can be checked and a drafted question for a coach,
            not smarter answers.{" "}
            <RouteLink to="example/offer-diy">How we tested it</RouteLink>.
          </li>
          <li>
            Given the same reviewed lessons and instructions, a Claude Project did at least as well as skills
            (preferred in 5 of 8 cases), so we deliver either. Neither gave better answers than Claude with the same
            lessons and instructions; what you pay for is the work above.{" "}
            <RouteLink to="example/fair">The comparison</RouteLink>.
          </li>
          <li>
            <strong>Not yet shown:</strong> use in the Claude app, any real community, member result or renewal
            change. Those runs were model tests in Claude Code. Your pilot's acceptance runs are the first in the app,
            and members get nothing until they pass.
          </li>
        </ul>
        <details className="calc__more">
          <summary>Evidence by level</summary>
          <EvidenceTable />
        </details>
      </Section>

      <Section id="money" title="Will it pay for itself?">
        <p>
          Nobody knows yet. The likeliest way is more new members renewing because more reach your first outcome; that
          is unmeasured. <RouteLink to="value">The calculator</RouteLink> shows, with your numbers, the renewal change
          needed to cover the fee, and to cover the fee plus your time, and says plainly when that's unlikely.
        </p>
      </Section>

      <Section id="enquire" title="Next step">
        <DefTable
          monoFirst={false}
          rows={[
            ["Enquire about the pilot", P.enquiry.privateDestination
              ? `Privately (${P.enquiry.privateLabel}), or publicly through ${P.enquiry.label}.`
              : `Through ${P.enquiry.label}. ${P.enquiry.requirements} A private route isn't set up yet.`],
            ["Or do it yourself, free", "Everything here is MIT licensed: the kit builder, the member kit, the acceptance checks and the pilot report"],
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
