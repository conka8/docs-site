import React from "react";
import { SUITE, TOOLS } from "../data/tools.js";
import { Callout, CodeBlock, DefTable, RouteLink, Section } from "../components/ui.jsx";

const STEPS = [
  {
    title: "Check Python",
    body: `Every tool needs Python ${SUITE.python}. macOS and Linux usually have it; on Windows, install it from python.org and tick “Add to PATH”.`,
    code: "python3 --version",
  },
  {
    title: "Install a tool from its folder",
    body: "The tools are not on PyPI yet. Open a terminal inside the tool's folder and install it. pipx keeps each tool separate; plain pip works too.",
    code: "cd shipsafe\npython3 -m pip install .",
  },
  {
    title: "Run the demo",
    body: "Every tool that calls an outside service has a demo mode, so the first run needs no account or API key.",
    code: "shipsafe scan ./my-app --format html -o report.html",
  },
];

export default function GettingStarted() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Guide</p>
        <h1>Getting started</h1>
        <p className="lede">From zero to a first report in about five minutes.</p>
      </header>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step__num">{i + 1}</span>
            <div className="step__body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <CodeBlock code={s.code} />
            </div>
          </li>
        ))}
      </ol>

      <Section id="skills" title="Use the tools from Claude">
        <p>
          Most tools ship a ready-made skill in their <code>skills/</code> folder. Copy that folder into{" "}
          <code>~/.claude/skills/</code> for Claude Code, upload it as a skill in the Claude app, or place it in your
          OpenClaw skills folder. Members can then ask in plain words, for example “audit my app before launch”.
        </p>
        <CodeBlock code="cp -r shipsafe/skills/shipsafe-audit ~/.claude/skills/" />
      </Section>

      <Section id="demo-commands" title="Demo commands, no keys needed">
        <DefTable
          head={["Tool", "Try this first"]}
          rows={TOOLS.map((t) => [t.name, t.quickstart.find((q) => /demo|fake|scripted|inspect|lint|list|scan|rental/i.test(q.label + q.code))?.code.split("\n")[0] || t.quickstart[0].code.split("\n")[0]])}
        />
      </Section>

      <Section id="keys" title="API keys, when you need them">
        <p>Four tools can call AI providers, and only when you leave demo mode. Keys are read from environment variables and are never written into reports.</p>
        <DefTable
          head={["Variable", "Used by"]}
          rows={[
            ["ANTHROPIC_API_KEY", "geo-audit, voice-qa, skillkit eval, skool-kit --llm"],
            ["OPENAI_API_KEY", "geo-audit, voice-qa, skillkit eval, skool-kit --llm"],
            ["PERPLEXITY_API_KEY", "geo-audit"],
            ["GEMINI_API_KEY", "geo-audit"],
            ["GHL_TOKEN, GHL_LOCATION_ID", "ghl-kit (a private integration token from the client's sub-account)"],
          ]}
        />
      </Section>

      <Callout tone="note" title="Exit codes are consistent">
        <p>
          <code>0</code> means OK. <code>1</code> means the tool found something you asked it to fail on (a critical finding,
          a score under the bar, a changed configuration). <code>2</code> means bad input or a missing key. That makes every
          tool safe to drop into a GitHub Action or a cron job.
        </p>
      </Callout>

      <p className="muted next-hint">
        Next: pick a tool from the sidebar, or read <RouteLink to="trust">how the tools are tested</RouteLink>.
      </p>
    </div>
  );
}
