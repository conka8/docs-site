import React from "react";
import { DefTable, RouteLink, Section } from "../components/ui.jsx";

export const DISCOVERY = [
  ["How many member submissions (offers, scripts, pages, builds) did your coaches review last month?", "Fewer than about 40: the time saved won't cover the fee. Use the free tool or a Claude Project with your lessons."],
  ["Who reviews them, and are they paid by the hour, by the month, or not at all?", "Nobody paid: any saving is your own time back, not cash. That can still matter, but the fee is harder to justify."],
  ["How long does one review take, and have you ever timed it?", "Under 5 minutes: there's little to save."],
  ["What do coaches check every time? Could you write it as a list?", "Mostly taste and judgement: the tool can only take the mechanical part, so it won't save much."],
  ["Is the method written down in lessons (scripts, templates, rules, price ranges)?", "Video only, with no transcripts: there's nothing to quote the rubric from."],
  ["What happens to submissions nobody gets to?", "Nothing, and nobody minds: review isn't a costly job for you."],
  ["Have you tried Claude or ChatGPT for this, and what happened?", "It already works well enough: keep using it."],
  ["If reviews took half the time, what would you do with the hours?", "Nothing: then there's no economic value, only convenience."],
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
          <li>Coaches (or you) already review members' work of one kind against your method: about 40 or more a month.</li>
          <li>Review time is paid for, or is your own time that you would use for something specific.</li>
          <li>At least half of what a coach checks can be written down as a rule: sections, ranges, banned wording, length.</li>
          <li>A coach who can run a command on their own computer, or who will forward submissions to us during the pilot.</li>
        </ul>
        <p className="muted">
          Next: <RouteLink to="value">estimate the economics</RouteLink> with your own numbers.
        </p>
      </Section>
    </div>
  );
}
