import React from "react";
import { SUITE, TOOLS, TOTAL_TESTS } from "../data/tools.js";
import { Callout, DefTable, RouteLink, Section } from "../components/ui.jsx";

const DATA_HANDLING = [
  ["skillport", "Reads workflow files you export. Removes keys and account IDs from its output."],
  ["shipsafe", "Folder scan is fully local. URL mode sends ordinary GET requests to a site you own."],
  ["geo-audit", "Sends customer-style questions to the AI providers you choose, with your keys."],
  ["ghl-agency-kit", "Talks only to GoHighLevel with the token you provide."],
  ["voice-qa", "Sends test conversations to your agent and, if you choose, an AI provider."],
  ["skillkit", "Lint and pack are local. eval sends test cases to the provider you choose."],
  ["skool-owner-kit", "Reads CSV exports and Zapier events you send it. No scraping, no Skool login."],
  ["career-labs", "Fully local."],
  ["vertical-packs", "Fully local. No external lookups."],
];

export default function Trust() {
  const max = Math.max(...TOOLS.map((t) => t.tests));
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Reference</p>
        <h1>Data, testing &amp; limits</h1>
        <p className="lede">What each tool touches, how it was tested, and what to check before you rely on it.</p>
      </header>

      <Section id="tests" title="Automated tests">
        <p>
          {TOTAL_TESTS.toLocaleString("en-US")} tests across the nine projects, all passing on {SUITE.testedOn}. Tests run with
          no network access and no API keys: outside services are replaced by fakes, and web features are tested against a
          local server.
        </p>
        <div className="bars" role="table" aria-label="Tests per tool">
          {TOOLS.map((t) => (
            <div key={t.id} className="bar" role="row">
              <span className="bar__label" role="cell">
                <RouteLink to={t.id}>{t.name}</RouteLink>
              </span>
              <span className="bar__track" role="cell">
                <span className="bar__fill" style={{ width: (t.tests / max) * 100 + "%" }} />
              </span>
              <span className="bar__value" role="cell">
                {t.tests}
              </span>
            </div>
          ))}
        </div>
        <ul className="list">
          <li>Every report format is tested to make sure secrets are never printed in full and user content is escaped.</li>
          <li>Every command-line tool is tested for its exit codes and error messages.</li>
          <li>The career labs are tested so each reference solution scores 100% and each starter scores below it.</li>
        </ul>
      </Section>

      <Section id="data" title="What each tool touches">
        <DefTable head={["Tool", "Data handling"]} rows={DATA_HANDLING} />
      </Section>

      <Section id="verify" title="Before production use">
        <Callout tone="warn" title="Third-party formats are not yet checked against live accounts">
          <p>
            API paths, export column names and platform limits were written from public documentation and tested against
            fakes. They are kept in one constants file per project so they are quick to confirm or update.
          </p>
        </Callout>
        <DefTable head={["Tool", "Confirm against current docs"]} rows={TOOLS.map((t) => [t.name, t.verify.join("; ")])} />
      </Section>

      <Section id="license" title="License">
        <p>
          All nine projects are released under the MIT license. You can use them with members and clients, fork them, and
          rename them for your community.
        </p>
      </Section>
    </div>
  );
}
