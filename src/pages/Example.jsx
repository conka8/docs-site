import React from "react";
import { downloadFor } from "../data/downloads.js";
import { Callout, CodeBlock, DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";

// Excerpts from skool-owner-kit/examples/agency-lab. tests/offer.test.mjs checks each one still appears in its file.
export const EXCERPTS = {
  lesson: {
    file: "skool-owner-kit/examples/agency-lab/classroom/02-your-offer/01-pick-a-niche-with-the-3-filter-test.md",
    text: `1. **Money leak:** the business loses real money when a lead goes unanswered (a missed call, a slow reply,
   a no-show).`,
  },
  spec: {
    file: "skool-owner-kit/examples/agency-lab/pack.yaml",
    text: `  - name: offer-builder
    title: Build your one-page offer
    outcome: A one-page offer for one niche, priced, ready to post in Wins`,
  },
  skill: {
    file: "skool-owner-kit/examples/agency-lab/member-pack/skills/northwind-offer-builder/SKILL.md",
    text: `1. Score each niche against the three filters. Show the score per filter and pick one niche that scores 3/3. If none does, stop and help the member find one.
   - Lesson: "Pick a niche with the 3-filter test" ([pick-a-niche-with-the-3-filter-test.md](references/your-offer/pick-a-niche-with-the-3-filter-test.md))`,
  },
  output: {
    file: "skool-owner-kit/examples/agency-lab/examples/offer-builder-output.md",
    text: `## Headline

We reply to every missed call within 60 seconds for dental clinics in Leeds, without hiring a receptionist.`,
  },
  pilot: {
    file: "skool-owner-kit/examples/agency-lab/pilot-sample/pilot-report.md",
    text: `| Pilot (got the pack) | 40 | 16/40 = 40% (95% range 26-55%) |
| Baseline (earlier members) | 38 | 9/38 = 24% (95% range 13-39%) |`,
  },
};

export default function Example() {
  const kit = downloadFor("skool-owner-kit");
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">See it work</p>
        <h1>Worked example</h1>
        <p className="lede">
          One paid AI-agency community, from its own lessons to a member with a finished, priced offer, and what the
          admin measures afterwards.
        </p>
      </header>

      <Callout tone="warn" title="Synthetic example">
        <p>
          "Northwind Agency Lab", its lessons, members, businesses and pilot numbers are invented to show the workflow.
          The member outputs were written by hand to show the expected shape; they were not produced by a live Claude run.
          Nothing here is a customer result.
        </p>
      </Callout>

      <Section id="content" title="1. The admin's own content">
        <p>
          Eight lessons in four modules: picking a niche, the one-outcome offer, pricing, a 3-line outreach script, follow-ups,
          discovery calls and one n8n template. The community promises new members a "First win" in 14 days: an offer
          posted and 20 outreach messages sent.
        </p>
        <CodeBlock label={EXCERPTS.lesson.file.split("/").slice(-1)[0]} code={EXCERPTS.lesson.text} />
      </Section>

      <Section id="problem" title="2. Where members get stuck">
        <ul className="list">
          <li>They watch the lessons but don't turn them into an offer: "which niche?", "what do I charge?"</li>
          <li>They ask the same questions in the Help channel, and coaches answer them again and again.</li>
          <li>Members who haven't produced anything by the time of their first renewal are the easiest to lose. This is the pain the pack targets; whether it moves renewals has to be measured.</li>
        </ul>
      </Section>

      <Section id="produced" title="3. What Builder Commons produces">
        <p>
          The admin writes one spec (<code>pack.yaml</code>): the member outcome, the tasks, which lesson each step follows,
          the rules and the checks. About two hours the first time.
        </p>
        <CodeBlock label="pack.yaml (excerpt)" code={EXCERPTS.spec.text} />
        <CodeBlock label="One command" code={"skool-kit pack-build pack.yaml -o member-pack"} />
        <DefTable
          monoFirst={false}
          head={["Output", "What it is"]}
          rows={[
            ["northwind-tutor", "Answers questions from all eight lessons, cites the lesson, and routes anything not covered to the Help channel"],
            ["northwind-offer-builder", "Walks a member through niche scoring, the offer page and founding-client pricing, each step tied to a lesson"],
            ["northwind-outreach-sprint", "Turns a list of prospects into first messages, both follow-ups and a tracking sheet"],
            ["evals/cases.yaml", "Five acceptance checks: two lesson questions, one off-topic question, one per task"],
            ["MEMBER-START.md", "The member's first-days guide: install, tasks, how to report the First win"],
            ["ADMIN-REVIEW.md", "What the admin must check, with a manual acceptance table"],
            ["pilot/", "Pilot plan and empty logs"],
          ]}
        />
        <CodeBlock label="From the generated northwind-offer-builder skill" code={EXCERPTS.skill.text} />
      </Section>

      <Section id="member" title="4. How a member installs and uses it">
        <ol className="list">
          <li>The admin packs the skills as upload zips (<code>skillkit pack ... --format claude-app</code>) and posts them with MEMBER-START.md.</li>
          <li>The member uploads each zip in the Claude app (Customize &gt; Skills), or copies the folders into Claude Code.</li>
          <li>They ask: "Use the northwind-offer-builder skill." Claude asks for their niches, area and what they can deliver, one question at a time.</li>
        </ol>
      </Section>

      <Section id="output" title="5. A completed task">
        <p>
          Input: "Niches: dental clinics, restaurants. Area: Leeds. I can set up a missed-call text-back with n8n and SMS."
          The skill scores both niches (dental 3/3, restaurants 1/3), then writes the offer page with a founding-client price
          from the lesson's ladder.
        </p>
        <CodeBlock label="Expected result (hand-written illustration)" code={EXCERPTS.output.text} />
        <p className="muted">
          Full file: <code>examples/agency-lab/examples/offer-builder-output.md</code>. The acceptance checks pass on it
          (<code>skillkit eval ... --provider fake</code>), which shows the checks work. It doesn't show the skill produces it:
          that needs the manual run below.
        </p>
      </Section>

      <Section id="review" title="6. What the admin must review">
        <ul className="list">
          <li>Each step points at the right lesson, and the rules match how the community teaches it.</li>
          <li>Nothing promises results members can't control (the offer-builder checks for "guaranteed").</li>
          <li>
            <strong>Manual acceptance</strong>: install each skill in the Claude surface members use, paste the test input
            from ADMIN-REVIEW.md, and record pass or fail in <code>pilot/acceptance.csv</code>. Not yet done for this
            example: there is no live run behind it.
          </li>
          <li>Optional: <code>skillkit eval skills --cases evals/cases.yaml --provider anthropic --include-references</code> sends each skill, its lesson files and the test inputs to the model and checks the answers (a few API calls).</li>
        </ul>
      </Section>

      <Section id="measure" title="7. What gets measured in a pilot">
        <p>
          New paid members who join in the pilot month get the pack; an earlier month is the baseline. The admin logs joins,
          installs, #firstwin posts, first renewals, tutor answers that needed correcting, and every hour and dollar spent.
        </p>
        <CodeBlock label="pilot-report.md from the synthetic logs (invented numbers)" code={EXCERPTS.pilot.text} />
        <p>
          The synthetic report suggests "continue" but warns that the 95% ranges overlap: with 40 members a cohort, a
          16-point difference could still be chance. That is the honest answer a real pilot would give at this size.
        </p>
      </Section>

      <Section id="try" title="Try it yourself">
        <p>Everything above is in the skool-owner-kit download, under <code>examples/agency-lab/</code>.</p>
        <CodeBlock
          code={"cd examples/agency-lab\nskool-kit pack-build pack.yaml -o my-pack\nskool-kit pilot pilot-sample/pilot.yaml"}
        />
        <div className="hero__actions">
          <DownloadLink file={kit} primary>
            Download skool-owner-kit
          </DownloadLink>
          <RouteLink to="value" className="btn">
            Estimate value
          </RouteLink>
        </div>
      </Section>
    </div>
  );
}
