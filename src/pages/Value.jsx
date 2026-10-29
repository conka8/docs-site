import React, { useState } from "react";
import { FIELDS, SCENARIOS, compute, paybackText } from "../data/value-model.js";
import { RouteLink, Section } from "../components/ui.jsx";

const NAMES = { conservative: "Conservative", base: "Base", optimistic: "Optimistic" };
const KEYS = Object.keys(NAMES);
const money = (x) => (x === null || x === undefined ? "n/a" : (x < -0.5 ? "−" : "") + Math.round(Math.abs(x)).toLocaleString("en-US"));
const hours = (x) => `${(Math.round(x * 10) / 10).toLocaleString("en-US")} h`;

function changeText(c) {
  if (c.status === "not needed") return "none: covered without it";
  if (c.status === "not reachable") return c.points === null ? "can't cover it in this period" : `would need ${c.points.toFixed(1)} points: impossible`;
  return `${c.points.toFixed(1)} points`;
}
function buyersText(b) {
  if (b.status === "not needed") return "none needed";
  if (b.status === "not reachable") return "can't (no margin per buyer)";
  return b.status === "more than offered" ? `${b.buyers} (more than you offer it to)` : String(b.buyers);
}

const ROWS = [
  ["Cash inside the period", [
    ["Extra renewal payments", (r) => money(r.renewalCash), "After payment fees, refunds and delivery costs. Negative when renewals fall."],
    ["Add-on sales", (r) => money(r.addonCash), "Launch month only."],
    ["Support spending actually avoided", (r) => money(r.supportCashAvoided), "Only the paid hours you cut."],
    ["Your cash costs", (r) => money(-r.cashCosts), "Implementation price, monthly fee, API and software."],
    ["Net cash in the period", (r) => money(r.horizonCash), ""],
    ["Payback (from cumulative cash)", (r) => paybackText(r.payback), ""],
  ]],
  ["Outside the period (not cash yet)", [
    ["Projected contribution after the period", (r) => money(r.futureContribution), "From members who joined inside the period, if they keep paying as assumed."],
  ]],
  ["What would have to be true", [
    ["Renewal change needed to break even in the period", (r) => changeText(r.changeNeeded), ""],
    ["Add-on buyers needed to break even", (r) => buyersText(r.buyersNeeded), ""],
    ["Most you could pay one-off and break even in the period", (r) => money(r.maxOneOff), "Before counting your time."],
  ]],
  ["Time (never counted as cash)", [
    ["Support capacity freed per month", (r) => hours(r.support.capacityHoursMonthly), "Tutor time saved minus correction time, minus hours turned into cash. Negative means extra staff time."],
    ["Your hours over the period", (r) => hours(r.time.ownHours), "Setup + pilot logging + maintenance."],
    ["Your hours, valued", (r) => money(r.time.ownTimeValue), "At what you said an hour is worth."],
  ]],
];

export default function Value() {
  const [inputs, setInputs] = useState(() => structuredClone(SCENARIOS));
  const [shown, setShown] = useState("base");
  const results = Object.fromEntries(KEYS.map((k) => [k, compute(inputs[k])]));
  const set = (scenario, key, value) => setInputs((s) => ({ ...s, [scenario]: { ...s[scenario], [key]: value } }));
  let group = "";

  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 4 · Economics</p>
        <h1>Estimate value</h1>
        <p className="lede">
          Would a member pack earn or save more than it costs you? A month-by-month model: payments count only in the month
          they'd arrive, and new cash, support spending you really stop, and staff time stay separate.
        </p>
        <p className="muted">
          The three presets are <strong>illustrations</strong>, not measurements or results from any community. The renewal
          change is unknown until a <RouteLink to="pilot">pilot</RouteLink> measures it; nothing here is evidence that it will happen.
        </p>
      </header>

      <Section id="inputs" title="Your numbers">
        <div className="table-wrap">
          <table className="calc">
            <thead>
              <tr>
                <th scope="col">Input</th>
                {KEYS.map((k) => (
                  <th key={k} scope="col">{NAMES[k]} <span className="calc__unit">(illustrative)</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIELDS.map(([g, key, label, unit, help]) => {
                const head = g !== group ? ((group = g), (
                  <tr key={g + "-h"} className="calc__group"><th colSpan={4} scope="colgroup">{g}</th></tr>
                )) : null;
                return (
                  <React.Fragment key={key}>
                    {head}
                    <tr>
                      <th scope="row">
                        {label} <span className="calc__unit">({unit})</span>
                        {help ? <span className="calc__help">{help}</span> : null}
                      </th>
                      {KEYS.map((k) => {
                        const err = results[k].errors[key];
                        const id = `in-${k}-${key}`;
                        return (
                          <td key={k}>
                            <input
                              id={id}
                              className={"calc__input" + (err ? " calc__input--bad" : "")}
                              type="number"
                              inputMode="decimal"
                              step="any"
                              aria-label={`${label}, ${NAMES[k]}`}
                              aria-invalid={err ? "true" : undefined}
                              aria-describedby={err ? id + "-err" : undefined}
                              value={inputs[k][key]}
                              onChange={(e) => set(k, key, e.target.value)}
                            />
                            {err ? <span id={id + "-err"} className="calc__err">{err}</span> : null}
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          <button type="button" className="btn" onClick={() => setInputs(structuredClone(SCENARIOS))}>
            Reset to the illustrations
          </button>
        </p>
      </Section>

      <Section id="results" title="What it adds up to">
        <div className="table-wrap" aria-live="polite">
          <table className="calc">
            <thead>
              <tr>
                <th scope="col">Result</th>
                {KEYS.map((k) => (
                  <th key={k} scope="col">{NAMES[k]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([g, rows]) => (
                <React.Fragment key={g}>
                  <tr className="calc__group"><th colSpan={4} scope="colgroup">{g}</th></tr>
                  {rows.map(([label, fn, help]) => (
                    <tr key={label}>
                      <th scope="row">
                        {label}
                        {help ? <span className="calc__help">{help}</span> : null}
                      </th>
                      {KEYS.map((k) => (
                        <td key={k} className="num">{results[k].ok ? fn(results[k]) : "fix inputs"}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="monthly" title="Cumulative cash, month by month">
        <div className="tabs__list" role="group" aria-label="Scenario">
          {KEYS.map((k) => (
            <button key={k} type="button" className="tabs__tab" aria-pressed={shown === k} onClick={() => setShown(k)}>
              {NAMES[k]}
            </button>
          ))}
        </div>
        {results[shown].ok ? (
          <div className="table-wrap">
            <table className="calc calc--months">
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Renewals</th>
                  <th scope="col">Add-on</th>
                  <th scope="col">Support cash</th>
                  <th scope="col">Costs</th>
                  <th scope="col">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {results[shown].months.map((m) => (
                  <tr key={m.month} className={m.cumulative < 0 ? "is-neg" : ""}>
                    <th scope="row">{m.month === 0 ? "0 (launch)" : m.month}</th>
                    <td className="num">{money(m.renewal)}</td>
                    <td className="num">{money(m.addon)}</td>
                    <td className="num">{money(m.supportCash)}</td>
                    <td className="num">{money(-m.costs)}</td>
                    <td className="num">{money(m.cumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="calc__err">Fix the highlighted inputs for this scenario.</p>
        )}
      </Section>

      <Section id="how" title="How it's calculated">
        <ul className="list">
          <li><strong>Cohorts.</strong> Each month in the period, the same number of new paid members join and get the pack. Their joining payment is unchanged.</li>
          <li><strong>The assumed effect</strong> is a change in the share who make their <em>first</em> renewal payment, one month after joining. Members gained or lost there keep paying at the later monthly retention rate, up to the cap on total paid months.</li>
          <li><strong>Each payment</strong> counts in the month it would arrive, after the percentage fee, the fixed fee, refunds and any delivery cost per member. Payments after the period are shown separately and never counted as cash.</li>
          <li><strong>Support.</strong> Tutor time saved minus time spent correcting wrong answers gives net hours freed. Only the paid hours you say you'll cut become cash; the rest is capacity.</li>
          <li><strong>Payback</strong> is the first month after which cumulative cash stays at or above zero for the rest of the period. If it reaches zero and then falls back, the result says so.</li>
          <li><strong>Members' own costs</strong> (a Claude plan with skills) are theirs, but a member without one can't use the pack.</li>
        </ul>
        <p className="muted">
          Same formulas in code: <code>src/data/value-model.js</code>, with tests. Next: <RouteLink to="pilot">the scoped pilot</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
