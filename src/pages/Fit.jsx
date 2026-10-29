import React from "react";
import { DefTable, RouteLink, Section } from "../components/ui.jsx";

export const DISCOVERY = [
  ["What outcome do you promise new members in their first weeks, and how do you know when someone reaches it?", "No clear first outcome, or no way to see it: the pack has nothing to aim at and nothing to measure."],
  ["How many new paid members join per month, at what price, and what share make their first renewal?", "Under about 20 a month, a pilot takes months to say anything. Whether the fee can pay back depends on price, adoption, baseline and costs together: run the calculator with your numbers. Renewal above 90%: little room to improve."],
  ["Do your lessons contain a method members can follow step by step (scripts, templates, rules, price ranges)?", "Mostly motivation, or video with no transcripts: there's little for a task skill to follow."],
  ["Which AI tools do most of your members use today?", "Mostly ChatGPT and unwilling to use Claude: members can't use these skills."],
  ["How many hours a week do you or your team spend answering the same questions?", "Under an hour: the support side won't matter."],
  ["Who would review the skills, and keep them updated when lessons change?", "Nobody: the pack will drift out of date and give wrong answers."],
  ["Can you log first outcomes and first renewals per member, for a pilot month and an earlier month?", "No: you can still try the pack, but you won't learn whether it worked."],
  ["Would you include the pack in membership, or sell it as an add-on?", "Add-on: there's no public evidence yet that members pay extra for AI tools; test that separately."],
];

export default function Fit() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 3 · Fit</p>
        <h1>Is this a fit?</h1>
        <p className="lede">
          Answer these before anything else. If several point to a poor fit, don't pay for a pilot: try the free tools
          yourself, or skip it.
        </p>
      </header>

      <Section id="questions" title="Fit questions">
        <DefTable monoFirst={false} head={["Question", "Answer that signals a poor fit"]} rows={DISCOVERY} />
      </Section>

      <Section id="good" title="A good fit looks like">
        <ul className="list">
          <li>A paid community with a concrete early outcome members should reach, and a written or transcribed method for it.</li>
          <li>Enough new paid members, at a high enough price, that a small change in first renewals would cover the cost (check in the calculator).</li>
          <li>Members who use Claude, or will.</li>
          <li>Someone who can spend the estimated setup and logging time, and review the skills.</li>
        </ul>
        <p className="muted">
          Next: <RouteLink to="value">estimate the economics</RouteLink> with your own numbers.
        </p>
      </Section>
    </div>
  );
}
