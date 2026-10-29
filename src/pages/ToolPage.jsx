import React from "react";
import { SUITE, TOOLS } from "../data/tools.js";
import { CATALOG } from "../data/catalog.js";
import { READINESS } from "../data/readiness.js";
import { downloadFor } from "../data/downloads.js";
import { Callout, Chip, CodeBlock, DefTable, DownloadLink, ReadinessTable, RouteLink, Section, Video } from "../components/ui.jsx";

export default function ToolPage({ tool }) {
  const idx = TOOLS.findIndex((t) => t.id === tool.id);
  const prev = TOOLS[idx - 1];
  const next = TOOLS[idx + 1];
  const info = CATALOG[tool.id];
  const download = downloadFor(tool.id);

  const sections = [
    ["quickstart", "Quickstart"],
    ["readiness", "Readiness"],
    tool.labs ? ["labs", "Labs"] : null,
    tool.packs ? ["packs", "Packs"] : null,
    ["commands", "Commands"],
    ["options", "Options"],
    tool.ruleTable ? ["checks", "What it checks"] : null,
    ["example", "Example output"],
    ["outputs", "What you get"],
    ["owners", "For community owners"],
    ["limits", "Limits"],
  ].filter(Boolean);

  return (
    <article className="page tool">
      <header className="tool__head">
        <p className="eyebrow">{info.tier === "starter" ? "Starter bundle" : "More tools"}</p>
        <h1 className="tool__name">{tool.name}</h1>
        <p className="lede">{tool.tagline}</p>
        <div className="chips">
          <Chip>v{info.version}</Chip>
          <Chip tone="ok">{tool.tests} tests passing</Chip>
          <Chip>Python {SUITE.python}</Chip>
          <Chip>{SUITE.license}</Chip>
          <Chip>
            command: <code>{tool.cli}</code>
          </Chip>
        </div>
        <div className="hero__actions">
          <DownloadLink file={download} primary>
            Download {tool.name}
          </DownloadLink>
        </div>
      </header>

      {tool.id === "shipsafe" ? (
        <Video
          label="42-second demo"
          src="./media/shipsafe-demo.webm"
          poster="./media/shipsafe-demo-poster.jpg"
          description="No sound. shipsafe checks a sample app that has fake keys, gives it an F, explains each finding with a fix prompt, then writes a shareable HTML report. Recorded with version 0.1.0; counts in 0.1.1 differ slightly."
        />
      ) : null}

      <div className="tool__intro">
        <div className="tool__summary">
          <p>{tool.summary}</p>
          <p className="tool__why">
            <strong>Why it matters. </strong>
            {tool.why}
          </p>
          <p className="tool__audience">
            Built for: {tool.audience.join(" · ")}
          </p>
        </div>
        <ul className="highlights">
          {tool.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <nav className="toc" aria-label="On this page">
        {sections.map(([id, label]) => (
          <RouteLink key={id} to={`${tool.id}/${id}`}>
            {label}
          </RouteLink>
        ))}
      </nav>

      <Section id="quickstart" title="Quickstart">
        <p className="muted">
          Unzip the download, then install inside its folder with <code>python -m pip install .</code> in a virtual
          environment (Python {SUITE.python}): <RouteLink to="start/install">step-by-step for Windows, macOS and Linux</RouteLink>.
          Needs: {info.needs}. Running costs: {info.cost}.
        </p>
        <div className="first-run">
          <CodeBlock label="First run, with the sample files in the download" code={info.firstRun.code} />
          <p className="first-run__expect">
            <strong>You should see: </strong>
            {info.firstRun.expect}
          </p>
        </div>
        <div className="stack">
          {tool.quickstart.map((q) => (
            <CodeBlock key={q.label} label={q.label} code={q.code} />
          ))}
        </div>
      </Section>

      <Section id="readiness" title="Readiness">
        <ReadinessTable rows={READINESS[tool.id]} />
        <p className="muted">
          What the labels mean: <RouteLink to="trust/readiness">Readiness &amp; data</RouteLink>.
        </p>
      </Section>

      {tool.labs ? (
        <Section id="labs" title="Labs">
          <DefTable head={["Lab", "Track", "What members build", "Checks"]} rows={tool.labs} />
        </Section>
      ) : null}

      {tool.packs ? (
        <Section id="packs" title="Packs">
          <DefTable head={["Pack", "Who it's for", "Commands"]} rows={tool.packs} />
        </Section>
      ) : null}

      <Section id="commands" title="Commands">
        <DefTable head={["Command", "What it does"]} rows={tool.commands} />
      </Section>

      <Section id="options" title="Options">
        <DefTable head={["Option", "What it does"]} rows={tool.options} />
      </Section>

      {tool.ruleTable ? (
        <Section id="checks" title="What it checks">
          <DefTable head={["Area", "Problems found"]} rows={tool.ruleTable} monoFirst={false} />
        </Section>
      ) : null}

      <Section id="example" title="Example output">
        <div className="stack">
          <CodeBlock label={tool.example.title} code={tool.example.code} />
          {tool.example2 ? <CodeBlock label={tool.example2.title} code={tool.example2.code} /> : null}
        </div>
      </Section>

      <Section id="outputs" title="What you get">
        <DefTable head={["Output", "Description"]} rows={tool.outputs} />
      </Section>

      <Section id="owners" title="For community owners">
        <ul className="list">
          {tool.owners.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>

      <Section id="limits" title="Limits">
        <ul className="list">
          {tool.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <Callout tone="warn" title="Check before relying on it">
          <p>These third-party details were written from public documentation and have not been checked against a live account:</p>
          <ul className="list list--tight">
            {tool.verify.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p>Each one lives in a single constants file in the project, so an update is a one-line change.</p>
        </Callout>
      </Section>

      <nav className="pager" aria-label="More tools">
        {prev ? (
          <RouteLink to={prev.id} className="pager__link">
            <span className="pager__dir">Previous</span>
            <span className="pager__name">{prev.name}</span>
          </RouteLink>
        ) : (
          <span />
        )}
        {next ? (
          <RouteLink to={next.id} className="pager__link pager__link--next">
            <span className="pager__dir">Next</span>
            <span className="pager__name">{next.name}</span>
          </RouteLink>
        ) : null}
      </nav>
    </article>
  );
}
