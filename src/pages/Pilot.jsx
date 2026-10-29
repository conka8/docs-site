import React from "react";
import { CodeBlock, DefTable, RouteLink, Section } from "../components/ui.jsx";

export const DISCOVERY = [
  ["What outcome do you promise new members in their first weeks, and how do you know when someone reaches it?", "No clear first outcome, or no way to see it: the pack has nothing to aim at and nothing to measure."],
  ["How many new paid members join per month, and what share renew after month 1?", "Under about 20 a month, a pilot takes several months to say anything. Renewal already above 90%: little room to improve."],
  ["Do your lessons contain a method members can follow step by step (scripts, templates, rules, price ranges)?", "Mostly motivation or video with no transcripts: there's little for a task skill to follow."],
  ["Which AI tools do most of your members use today?", "Mostly ChatGPT and unwilling to use Claude: members can't use these skills (skills on ChatGPT personal plans are unconfirmed)."],
  ["How many hours a week do you or your team spend answering the same questions?", "Under an hour: the support side won't matter."],
  ["Who would review the generated skills and keep them updated when lessons change?", "Nobody: the pack will drift out of date and give wrong answers."],
  ["Would you include the pack in membership, or sell it as an add-on?", "Add-on: there's no public evidence yet that members pay extra for AI tools; test it separately."],
  ["Can you log first outcomes and renewals per member for two cohorts?", "No: you can still try the pack, but you won't learn whether it worked."],
];

export default function Pilot() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Decide</p>
        <h1>Pilot and fit</h1>
        <p className="lede">
          A pilot that can tell you whether the member pack earned its keep, and the questions to answer before you start.
        </p>
      </header>

      <Section id="discovery" title="Questions to answer first">
        <p>If several of these point to "poor fit", don't buy implementation help: try the free tools on your own first, or skip it.</p>
        <DefTable monoFirst={false} head={["Question", "Answer that signals a poor fit"]} rows={DISCOVERY} />
      </Section>

      <Section id="design" title="Pilot design">
        <DefTable
          monoFirst={false}
          head={["Part", "What to do"]}
          rows={[
            ["Primary outcome", "Share of new paid members who reach your first outcome (for example: offer posted and 20 messages sent) within 14 days of joining"],
            ["Pilot cohort", "Every new paid member who joins in one calendar month gets the pack on day 1"],
            ["Baseline", "Members who joined in an earlier month without the pack. Choose a month without a launch, sale or price change"],
            ["Baseline period", "Collect the baseline before the pilot starts: first outcomes from your #wins posts, first renewals from your platform's payment history"],
            ["Adoption", "Share of pilot members who install, and who report using a skill"],
            ["Quality", "Tutor answers reviewed, and the share someone had to correct; manual acceptance runs before launch"],
            ["Money", "First renewal rate per cohort (Skool's dashboard shows retention and churn); refunds"],
            ["Costs", "Every cash cost (implementation, API) and every hour you and your team spend"],
            ["Problems", "Anything that went wrong goes in the note column of the logs: wrong answers, install trouble, member complaints"],
            ["Length", "One cohort month, plus 14 days for the outcome, plus the first renewal date: about 2 months"],
          ]}
        />
        <p>
          <code>skool-kit pack-build</code> writes the plan and empty logs into <code>member-pack/pilot/</code>. When the
          pilot ends:
        </p>
        <CodeBlock code="skool-kit pilot member-pack/pilot/pilot.yaml --format md -o pilot-report.md" />
      </Section>

      <Section id="decide" title="Deciding what to do next">
        <DefTable
          monoFirst={false}
          head={["Result", "Suggestion", "Why"]}
          rows={[
            ["Fewer than 20 members in either cohort", "Not enough data", "Run another month before deciding"],
            ["Fewer than 40% of pilot members installed", "Change", "Fix onboarding first: an unused pack can't move the outcome"],
            ["Outcome rate 10+ points above baseline", "Continue", "If the 95% ranges overlap, run a second cohort before treating it as settled"],
            ["Between 0 and 10 points", "Extend", "Run another cohort"],
            ["No better than baseline", "Stop or change", "Change the tasks or onboarding, or stop paying for it"],
            ["More than 10% of reviewed tutor answers needed correcting", "Fix before scaling", "Wrong answers cost trust and staff time"],
          ]}
        />
        <p>
          The thresholds are yours to set in <code>pilot.yaml</code> before you start, not after you see the numbers.
        </p>
      </Section>

      <Section id="limits" title="What a pilot can and can't tell you">
        <ul className="list">
          <li>It compares two months of members. It can't prove the pack caused a difference: season, marketing and who joined also change.</li>
          <li>With 30 to 50 members per cohort, only large differences stand out from chance. The report shows 95% ranges so you can see this.</li>
          <li>Self-reported outcomes undercount. Log the same way for both cohorts.</li>
          <li>Renewal is a later and noisier signal than the first outcome. Treat a renewal difference as a clue, not proof of revenue earned.</li>
          <li>Support time freed is capacity, not cash, unless you actually reduce paid hours.</li>
        </ul>
        <p className="muted">
          Turn measured numbers into money with <RouteLink to="value">Estimate value</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
