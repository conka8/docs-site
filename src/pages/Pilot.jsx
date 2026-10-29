import React from "react";
import { PILOT_OFFER as P } from "../data/pilot-offer.js";
import { EFFORT, EFFORT_TOTALS, rangeText } from "../data/effort.js";
import { CodeBlock, DefTable, RouteLink, Section } from "../components/ui.jsx";

const h = (r) => (r[0] === 0 && r[1] === 0 ? "-" : rangeText(r, "h"));
const List = ({ items }) => (
  <ul className="list">
    {items.map((x) => (
      <li key={x}>{x}</li>
    ))}
  </ul>
);

export default function Pilot() {
  const t = EFFORT_TOTALS;
  const dest = P.enquiry.destination;
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 5 · Paid option</p>
        <h1>{P.name}</h1>
        <p className="lede">{P.summary}</p>
        <p className="muted">
          The software is free (MIT) and you can do all of this yourself with the guides. This is the paid option for owners
          who want it built, tested and measured with them. Price agreed per community; no results are guaranteed.
        </p>
      </header>

      <Section id="scope" title="Scope">
        <DefTable monoFirst={false} rows={P.scope} />
      </Section>

      <Section id="deliverables" title="Deliverables and acceptance criteria">
        <DefTable monoFirst={false} head={["Deliverable", "What it is", "Accepted when"]} rows={P.deliverables} />
        <h3>Included revisions</h3>
        <List items={P.revisions} />
      </Section>

      <Section id="you" title="What you provide and what stays yours">
        <h3>You provide</h3>
        <List items={P.customerInputs} />
        <h3>Stays your responsibility</h3>
        <List items={P.customerResponsibilities} />
      </Section>

      <Section id="effort" title="Effort (estimates)">
        <p>
          From building the synthetic example; no customer engagement has been timed yet. Your side: {rangeText(t.customerSetup)} before
          launch and {rangeText(t.customerPilot)} of logging during the pilot. Ours: {rangeText(t.ourOneOff)}.
        </p>
        <DefTable
          monoFirst={false}
          head={["Activity", "What it involves", "You, one-off", "We, one-off", "You, per month after"]}
          rows={[
            ...EFFORT.map(([, name, what, c1, w1, cm]) => [name, what, h(c1), h(w1), h(cm)]),
            ["Total", "", rangeText(t.customerOneOff), rangeText(t.ourOneOff), rangeText(t.customerMonthly)],
          ]}
        />
      </Section>

      <Section id="limits" title="Dependencies, exclusions and failures">
        <h3>Assumptions and dependencies</h3>
        <List items={P.dependencies} />
        <h3>Not included</h3>
        <List items={P.exclusions} />
        <h3>If acceptance checks fail</h3>
        <List items={P.acceptanceFails} />
        <h3>Optional maintenance after handover</h3>
        <List items={P.maintenance} />
      </Section>

      <Section id="process" title="How it runs">
        <ol className="list">
          {P.process.map(([a, b]) => (
            <li key={a}>
              <strong>{a}</strong>: {b}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="measure" title="How the pilot is measured">
        <ul className="list">
          <li><strong>Baseline</strong>: new paid members from an earlier month, logged the same way, before launch.</li>
          <li><strong>Cohort</strong>: everyone who joins in the pilot month gets the pack on day 1. Members whose outcome window or renewal date hasn't arrived yet are left out, not counted as failures.</li>
          <li><strong>Logged</strong>: installs, completed tasks, the first outcome, first renewals, reviewed tutor answers, and every hour and cost. Nothing is tracked automatically; you log it.</li>
          <li><strong>Thresholds</strong> are agreed in writing before the first pilot member joins.</li>
          <li><strong>The report</strong> judges product quality, member outcomes and economics separately. A good outcome result is held back if quality fails or the economics are negative or over budget.</li>
          <li>Small observational cohorts can't establish cause; the report shows 95% ranges and says when there isn't enough data.</li>
        </ul>
        <CodeBlock label="Read a sample report (synthetic logs)" code={"skool-kit pilot examples/agency-lab/pilot-sample/pilot.yaml"} />
      </Section>

      <Section id="enquire" title="Enquire about a scoped pilot">
        <p>
          {dest
            ? "Send the following, and we'll reply to arrange the fit check:"
            : "Enquiries open once a contact address is published here. Until then, prepare:"}
        </p>
        <List items={P.enquiry.prepare} />
        {dest ? (
          <p>
            <a className="btn btn--primary" href={dest}>
              Enquire about a pilot
            </a>
          </p>
        ) : null}
        <p className="muted">
          Before you enquire: <RouteLink to="fit">fit questions</RouteLink> and <RouteLink to="value">the calculator</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
