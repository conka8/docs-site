import React from "react";
import { TOOLS } from "../data/tools.js";
import { CATALOG, STARTER } from "../data/catalog.js";
import { READINESS } from "../data/readiness.js";
import { Badge, RouteLink, Section } from "../components/ui.jsx";

const ORDER = ["live", "local", "fixture", "experimental"];

export default function Compare() {
  const tools = [...STARTER.map((id) => TOOLS.find((t) => t.id === id)), ...TOOLS.filter((t) => !STARTER.includes(t.id))];
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Reference</p>
        <h1>Compare tools</h1>
        <p className="lede">What each tool is for, what it needs, what it can cost to run, and how far it has been tested.</p>
      </header>

      <Section id="table" title="Tools side by side">
        <div className="table-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Tool</th>
                <th scope="col">Use it to</th>
                <th scope="col">Needs</th>
                <th scope="col">Running costs</th>
                <th scope="col">You get</th>
                <th scope="col">Readiness</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => {
                const c = CATALOG[t.id];
                const statuses = ORDER.filter((s) => READINESS[t.id].some((r) => r[1] === s));
                return (
                  <tr key={t.id}>
                    <th scope="row">
                      <RouteLink to={t.id}>{t.name}</RouteLink>
                      <span className="compare__tier">{c.tier === "starter" ? "Starter bundle" : "More tools"} · v{c.version}</span>
                    </th>
                    <td>{c.useCase}</td>
                    <td>{c.needs}</td>
                    <td>{c.cost}</td>
                    <td>{c.produces}</td>
                    <td>
                      <span className="card__badges">
                        {statuses.map((s) => (
                          <Badge key={s} status={s} />
                        ))}
                      </span>
                      <RouteLink to={t.id + "/readiness"} className="compare__more">
                        Details
                      </RouteLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="muted">
          All tools are command-line programs (Python {">="}3.10) and most also ship a Claude skill that runs them. None is a
          hosted app. Badges are explained on <RouteLink to="trust/readiness">Readiness &amp; data</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
