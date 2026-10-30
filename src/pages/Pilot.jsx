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
  const priv = P.enquiry.privateDestination;
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 5 · Paid option</p>
        <h1>{P.name}</h1>
        <p className="lede">{P.summary}</p>
        <p className="muted">
          The software is free (MIT) and you can do all of this yourself with the guides. This is the paid option for owners
          who want it built, tested and measured with them. Design-partner fee: {P.terms.fee} fixed. No results are
          guaranteed.
        </p>
      </header>

      <Section id="terms" title="Design-partner terms">
        <DefTable monoFirst={false} rows={P.terms.rows} />
      </Section>

      <Section id="scope" title="Scope">
        <DefTable monoFirst={false} rows={P.scope} />
      </Section>

      <Section id="deliverables" title="What you get for the fee, and what is only being tested">
        <h3>1. What we commit to produce</h3>
        <DefTable monoFirst={false} head={["Deliverable", "What it is", "Accepted when"]} rows={P.deliverables} />
        <p><strong>{P.paymentBasis}</strong></p>
        <h3>2. What you'll be able to observe</h3>
        <List items={P.observe} />
        <h3>3. What the pilot tests, and nobody can promise</h3>
        <List items={P.testing} />
        <h3>Included revisions</h3>
        <List items={P.revisions} />
      </Section>

      <Section id="diy" title="Doing it yourself, or paying us">
        <p>
          The realistic alternative: you upload your lessons to a Claude Project and write clear instructions. Here is
          what we add, and what it changes. Not every community needs all of it.
        </p>
        <DefTable monoFirst={false} head={["Your problem", "What we deliver", "Accepted when", "Effort it affects"]} rows={P.contributions} />
        <DefTable monoFirst={false} head={["", "Doing it yourself", "Paid pilot: you", "Paid pilot: us"]} rows={P.diy} />
        <p><strong>{P.diyVerdict}</strong></p>
        <p className="muted">
          All hours are estimates; none has been timed with a real community. Both sides log their minutes during the
          pilot (time rows in pilot/costs.csv), and the first three pilots replace these estimates.
        </p>
      </Section>

      <Section id="you" title="What you provide and what stays yours">
        <h3>You provide</h3>
        <List items={P.customerInputs} />
        <h3>Stays your responsibility</h3>
        <List items={P.customerResponsibilities} />
      </Section>

      <Section id="effort" title="Effort (estimates)">
        <p>
          Estimates: no customer engagement has been timed yet, and only the tool steps have been measured (seconds each).
          Your side follows five steps: send lessons and examples, approve one page, test the finished kit, share the
          start guide, record essential events. That is {rangeText(t.customerSetup)} before launch and{" "}
          {rangeText(t.customerPilot)} of logging during the pilot. Ours: {rangeText(t.ourOneOff)}.
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
          <li><strong>Logged, essentials only</strong>: joins come from member exports you download (imported without contact details); you log first outcomes and corrected answers as they happen, and renewals or cancellations from your payment history once due; we record hours and costs. Installs and completed tasks only when you can see them without asking. Nothing is tracked automatically or in members' chats.</li>
          <li><strong>Thresholds</strong> are agreed in writing before the first pilot member joins.</li>
          <li><strong>One operating checklist</strong>, <code>pilot/CHECKLIST.md</code> in every pack: fit and scope, content intake, pack construction, acceptance and installation, onboarding, adoption, completed tasks, answer corrections, staff effort and cash, renewal follow-up and the final report.</li>
          <li><strong>The report</strong> judges product quality, member outcomes and economics separately. A good outcome result is held back if quality fails or the economics are negative or over budget.</li>
          <li>Small observational cohorts can't establish cause; the report shows 95% ranges and says when there isn't enough data.</li>
        </ul>
        <CodeBlock label="Read a sample report (synthetic logs)" code={"skool-kit pilot examples/agency-lab/pilot-sample/pilot.yaml"} />
      </Section>

      <Section id="enquire" title="Enquire about a pilot">
        {priv ? (
          <p>
            <a className="btn btn--primary" href={priv}>
              Enquire privately
            </a>{" "}
            {P.enquiry.privateLabel}
          </p>
        ) : null}
        <p>
          {priv ? "Or use " : "Enquiries go through "}
          {P.enquiry.label}. {P.enquiry.requirements}
        </p>
        <h3>The public form asks only for</h3>
        <List items={P.enquiry.fields} />
        <h3>Kept for a private follow-up</h3>
        <List items={P.enquiry.privateLater} />
        <p className="muted">{P.enquiry.privateNote}</p>
        <p>
          <a className={priv ? "btn" : "btn btn--primary"} href={dest}>
            Open the public enquiry form (GitHub)
          </a>
        </p>
        <p className="muted">
          Before you enquire: <RouteLink to="fit">fit questions</RouteLink> and <RouteLink to="value">the calculator</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
