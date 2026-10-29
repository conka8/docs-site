import React from "react";
import { GROUPS, SUITE, TOOLS, TOTAL_TESTS } from "../data/tools.js";
import { RouteLink, Video } from "../components/ui.jsx";

const FACTS = [
  { value: String(TOOLS.length), label: "tools" },
  { value: TOTAL_TESTS.toLocaleString("en-US"), label: "automated tests, all passing" },
  { value: SUITE.license, label: "license, free to rebrand" },
  { value: "0", label: "accounts needed to try a demo" },
];

const PRINCIPLES = [
  ["Made for members who don't code", "Plain-English output, copy-paste commands, and a fix or next step attached to every result."],
  ["White-label by default", "Reports take your community or agency name, color and logo, so a tool becomes your member bonus."],
  ["Demo mode everywhere", "Every tool that talks to an outside service has a fake or scripted mode, so you can film a walkthrough before spending on API calls."],
  ["Your data stays yours", "Nothing is uploaded to us. Tools read your own files and exports, and the ones that call AI providers use your keys."],
];

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Open-source toolkit · v0.1</p>
        <h1>{SUITE.name}</h1>
        <p className="lede">{SUITE.tagline}</p>
        <p className="lede lede--sub">
          Nine command-line tools and Claude skills that solve the problems your members hit after the lesson ends:
          moving templates to Claude, launching apps safely, proving results to clients, and keeping members engaged.
        </p>
        <div className="hero__actions">
          <RouteLink to="start" className="btn btn--primary">
            Get started
          </RouteLink>
          <RouteLink to="trust" className="btn">
            How it's tested
          </RouteLink>
        </div>
        <div className="hero__terminal">
          <Video
            label="One command, one answer · 42-second demo"
            src="./media/shipsafe-demo.webm"
            poster="./media/shipsafe-demo-poster.jpg"
            description="No sound. shipsafe checks a sample app that has fake keys, gives it an F, explains each finding with a fix prompt, then writes a shareable HTML report."
          />
        </div>
      </header>

      <dl className="facts">
        {FACTS.map((f) => (
          <div key={f.label} className="fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      {GROUPS.map((g) => {
        const tools = TOOLS.filter((t) => t.group === g.id);
        return (
          <section key={g.id} className="group">
            <h2 className="group__title">{g.label}</h2>
            <div className="cards">
              {tools.map((t) => (
                <RouteLink key={t.id} to={t.id} className="card">
                  <span className="card__top">
                    <span className="card__name">{t.name}</span>
                    <span className="card__tests">{t.tests} tests</span>
                  </span>
                  <span className="card__tagline">{t.tagline}</span>
                  <span className="card__for">Built for: {t.audience.slice(0, 2).join(", ")}</span>
                  <code className="card__cli">{t.quickstart[0].code.split("\n")[0]}</code>
                </RouteLink>
              ))}
            </div>
          </section>
        );
      })}

      <section className="principles">
        <h2>How the tools are built</h2>
        <div className="principles__grid">
          {PRINCIPLES.map(([title, body]) => (
            <div key={title} className="principle">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
