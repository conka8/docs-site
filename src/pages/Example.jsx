import React from "react";
import { downloadFor } from "../data/downloads.js";
import { CodeBlock, DefTable, DownloadLink, RouteLink, Section } from "../components/ui.jsx";
import { BENCHMARK } from "../data/benchmark.js";
import { CONTENT_KINDS } from "../data/evidence.js";
import { EvidenceTable } from "./Home.jsx";

const LAB = "skool-owner-kit/examples/agency-lab/";

// Recorded runs (see live-runs/README.md). tests/offer.test.mjs checks every file exists and every excerpt matches.
export const RUNS = [
  ["1", "Lesson question (tutor)", "What should I charge my first client? I'm setting up a missed-call text-back for a dental clinic.", "11 s", "Pass", "live-runs/round-1/1-tutor-cited.md"],
  ["6", "Lesson question (tutor)", "How do I choose a niche?", "9 s", "Pass", "live-runs/round-2/6-tutor-niche.md"],
  ["2", "Not in the lessons (tutor)", "Do I need to register as a limited company before I sign my first client? I'm based in Ireland.", "15 s", "Pass", "live-runs/round-1/2-tutor-not-covered.md"],
  ["3", "Offer task, round 1", "Dental clinics vs restaurants in Leeds; missed-call text-back with n8n + Twilio", "32 s", "Defect: one unsupported money claim not flagged", "live-runs/round-1/3-offer-builder.md"],
  ["3", "Offer task, round 2 (after fix)", "Same input", "27 s", "Pass", "live-runs/round-2/3-offer-builder.md"],
  ["4", "Outreach task, round 1", "Offer headline + 3 prospects, one with no observation", "36 s", "Defect: customer-behaviour claims stated as fact", "live-runs/round-1/4-outreach-sprint.md"],
  ["4", "Outreach task, round 2 (after fix)", "Same input", "37 s", "Pass", "live-runs/round-2/4-outreach-sprint.md"],
  ["5", "Incomplete and conflicting input", "Restaurants in Manchester, £150 a month, guarantee 20% more bookings", "11 s", "Pass", "live-runs/round-1/5-conflicting-input.md"],
];

export const EXCERPTS = {
  lesson: {
    file: LAB + "classroom/02-your-offer/01-pick-a-niche-with-the-3-filter-test.md",
    text: `1. **Money leak:** the business loses real money when a lead goes unanswered (a missed call, a slow reply,
   a no-show).`,
  },
  conflict: {
    file: LAB + "live-runs/round-1/5-conflicting-input.md",
    text: `- **£150 a month:** Northwind's pricing rule is never below £300 a month. Founding clients pay £500-£1,000 setup plus £300-£500 a month. I'll price it inside that range and explain why. *(Lesson: "Pricing your first offer")*`,
  },
  offer: {
    file: LAB + "live-runs/round-2/3-offer-builder.md",
    text: `| **Score** | **3/3** | **2/3** |

Chosen niche: dental clinics in Leeds. Restaurants fail filter 1, so no offer is written for them. Commit to dental clinics for 30 days and don't switch.`,
  },
  price: {
    file: LAB + "live-runs/round-2/3-offer-builder.md",
    text: `**Founding client offer: 1,000 setup + 500 a month.** *(Lesson: "Pricing your first offer")*`,
  },
  gaps: {
    file: LAB + "live-runs/round-2/3-offer-builder.md",
    text: `- Verify before use: the problem quote and the idea that patients ring the next clinic after a missed call are my wording, not from the lessons. Replace the quote with what Leeds clinics actually say.`,
  },
  defect: {
    file: LAB + "live-runs/round-1/3-offer-builder.md",
    text: `One lost new-patient enquiry can be worth hundreds or thousands of pounds.`,
  },
  escalation: {
    file: LAB + "live-runs/round-1/2-tutor-not-covered.md",
    text: `> Question: Do I need to register as a limited company before I sign my first client? I'm based in Ireland.`,
  },
};

export default function Example() {
  const kit = downloadFor("skool-owner-kit");
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 2 · Demonstration</p>
        <h1>A real run</h1>
        <p className="lede">
          The member pack for a synthetic AI-agency community, run by Claude on test inputs. The outputs below are actual
          and unedited.
        </p>
        <p className="muted">
          <strong>What this is:</strong> runs in Claude Code on 2026-10-29 (model alias "sonnet"), each a fresh session
          given an installed skill and one member message. <strong>What it isn't:</strong> a run in the Claude app, Claude
          choosing the skill by itself, a conversation over several turns, a real member, or a real result. The community,
          lessons and businesses are invented.
        </p>
        <DefTable monoFirst={false} head={["Label on this page", "Means"]} rows={CONTENT_KINDS} />
      </header>

      <Section id="fair" title="Compared fairly: is the skill better than Claude with the lessons?">
        <p>
          Same model, same member messages, three conditions. {BENCHMARK.setup}.
        </p>
        <DefTable monoFirst={false} head={["", "What the assistant got"]} rows={BENCHMARK.conditions.map(([k, n, d]) => [`${k}. ${n}`, d])} />
        <DefTable monoFirst={false} head={["Blind grades", "A. General", "B. + lessons", "C. Skill"]} rows={BENCHMARK.results} />
        <p><strong>What it shows:</strong> {BENCHMARK.conclusion}</p>
        <DefTable monoFirst={false} head={["Effort (counted from the guides; minutes estimated)", "A", "B", "C"]} rows={BENCHMARK.effort} />
        <p className="muted">
          Limits: 6 cases, one synthetic community, one grader per case, single turn. The skill's structure is recognisable,
          so blinding is partial. Defects the grading found, and the reruns after fixing them:{" "}
          <code>{LAB}benchmark/</code>.
        </p>
      </Section>

      <Section id="content" title="The admin's content">
        <p>
          Eight lessons in four modules (niche, offer, pricing, outreach script, follow-ups, discovery call, one n8n build)
          and one spec, <code>pack.yaml</code>, naming the member outcome ("First win": offer posted and 20 messages sent
          within 14 days), two tasks, the lesson behind every step, the rules, and the checks.
        </p>
        <CodeBlock label="From the niche lesson (illustration: synthetic lesson)" code={EXCERPTS.lesson.text} />
        <CodeBlock label="One command" code={"skool-kit pack-build pack.yaml -o member-pack"} />
      </Section>

      <Section id="runs" title="The first runs (actual model execution)">
        <DefTable
          monoFirst={false}
          head={["#", "Case", "Member input", "Time", "Result"]}
          rows={RUNS.map(([n, c, input, time, result]) => [n, c, input, time, result])}
        />
        <p className="muted">
          Full outputs and the method: <code>{LAB}live-runs/</code> in the skool-owner-kit download. The member journey
          from download to install and update: <code>{LAB}acceptance-journey/</code>.
        </p>
      </Section>

      <Section id="offer" title="The offer task, after the fix">
        <p>The member was torn between dental clinics and restaurants. The skill scored both with the lesson's filters:</p>
        <CodeBlock label="Niche check (excerpt)" code={EXCERPTS.offer.text} />
        <CodeBlock label="Price, from the lesson's ladder (excerpt)" code={EXCERPTS.price.text} />
        <CodeBlock label="Gaps it flagged for the member (excerpt)" code={EXCERPTS.gaps.text} />
        <p>
          The full output also has every offer section, a pass/fail check and a next step: "Post the offer in Wins today
          with "#firstwin", then start the outreach-sprint skill."
        </p>
      </Section>

      <Section id="defect" title="The defect we found and fixed">
        <p>In round 1 the offer included a money claim the lessons don't support, with no flag:</p>
        <CodeBlock label="Round 1 (excerpt)" code={EXCERPTS.defect.text} />
        <p>
          Every task skill now requires money amounts, numbers and claims about customer behaviour to come from the lessons
          or the member, or be listed as "verify before use". Round 2, on the same inputs, flagged them instead. The outreach
          task had the same problem and the same fix; in round 2 it left a placeholder rather than invent a second
          observation.
        </p>
      </Section>

      <Section id="conflict" title="Conflicting member input">
        <p>"Build my offer for restaurants in Manchester. I'll charge £150 a month so it's an easy yes, and I want to guarantee them 20% more bookings in the first month."</p>
        <CodeBlock label="Excerpt" code={EXCERPTS.conflict.text} />
        <p>It also asked for the one missing input, what the member can deliver, and didn't write an offer yet.</p>
      </Section>

      <Section id="escalation" title="When the lessons don't cover it">
        <p>
          Asked about registering a company in Ireland, the tutor said it isn't covered, labelled its general guidance as
          its own suggestion, and wrote a question for a coach:
        </p>
        <CodeBlock label="Excerpt" code={EXCERPTS.escalation.text} />
      </Section>

      <Section id="evidence" title="What this does and doesn't show">
        <EvidenceTable />
      </Section>

      <Section id="try" title="Try it yourself">
        <CodeBlock code={"cd examples/agency-lab\nskool-kit pack-build pack.yaml -o my-pack\nskillkit eval my-pack/skills --cases my-pack/evals/cases.yaml"} />
        <p className="muted">
          <strong>Replay:</strong> the last command re-checks saved outputs (6 of 6 pass). It doesn't call a model, so it is no
          evidence that a new run will pass. To run the skills yourself, build the member kit
          (<code>skool-kit pack-share my-pack -o share --version 1.0.0</code>), follow its START-HERE.md, and use the inputs above.
        </p>
        <div className="hero__actions">
          <DownloadLink file={kit} primary>
            Download skool-owner-kit
          </DownloadLink>
          <RouteLink to="fit" className="btn">
            Next: check fit
          </RouteLink>
        </div>
      </Section>
    </div>
  );
}
