import React, { useState } from "react";
import { FIELDS, SCENARIOS, compute } from "../data/value-model.js";
import { Callout, RouteLink, Section } from "../components/ui.jsx";

const NAMES = { conservative: "Conservative", base: "Base", optimistic: "Optimistic" };
const money = (x) => (x === null ? "n/a" : (x < 0 ? "−" : "") + Math.round(Math.abs(x)).toLocaleString("en-US"));
const hours = (x) => `${(Math.round(x * 10) / 10).toLocaleString("en-US")} h`;

const ROWS = [
  ["Cash", [
    ["Extra renewal revenue per month of new members", (r) => money(r.renewalCashMonthly), "Extra renewing members × net price × further months"],
    ["Add-on revenue (one-off)", (r) => money(r.addonCashOneOff), "After fees and refunds"],
    ["Support cash actually avoided per month", (r) => money(r.cashAvoidedMonthly), "Only when you cut paid support hours"],
    ["Your cash costs per month", (r) => money(-r.cashCostMonthly), "Maintenance fee + API and software"],
    ["Net cash per month", (r) => money(r.netCashMonthly), ""],
    ["Net cash over 12 months (after the one-off price)", (r) => money(r.net12), ""],
    ["Payback", (r, i) => (+i.implementationFee ? (r.paybackMonths === null ? "never" : `${Math.ceil(r.paybackMonths)} months`) : "enter a quote"), ""],
  ]],
  ["Break-even", [
    ["Renewal lift needed to cover cash costs and the one-off over 12 months", (r) => (r.liftNeededPts === null ? "n/a" : `${r.liftNeededPts.toFixed(1)} points`), ""],
    ["Add-on buyers needed to cover the one-off", (r) => (r.addonBuyersNeeded === null ? "n/a" : String(r.addonBuyersNeeded)), ""],
    ["Most you could pay one-off and break even within 12 months", (r) => money(r.maxOneOffFor12mPayback), "Cash only, before your time"],
  ]],
  ["Time (not cash)", [
    ["Support capacity freed per month", (r) => hours(r.capacityHoursMonthly), "After time spent correcting answers"],
    ["Your setup time (one-off) / per month", (r) => `${hours(r.timeCostOneOffHours)} / ${hours(r.timeCostMonthlyHours)}`, ""],
    ["12-month view counting hours at your hourly value", (r) => money(r.net12WithTime), "Cash net + capacity freed − your time"],
  ]],
];

export default function Value() {
  const [inputs, setInputs] = useState(() => structuredClone(SCENARIOS));
  const results = Object.fromEntries(Object.keys(inputs).map((k) => [k, compute(inputs[k])]));
  const set = (scenario, key, value) => setInputs((s) => ({ ...s, [scenario]: { ...s[scenario], [key]: value } }));
  let group = "";

  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Decide</p>
        <h1>Estimate value</h1>
        <p className="lede">
          Would the member pack earn or save more than it costs you? Enter your own numbers. The model keeps new cash,
          cash you actually stop spending, and staff time apart, so nothing is counted twice.
        </p>
      </header>

      <Callout tone="warn" title="A decision aid, not a forecast">
        <p>
          The starting numbers are illustrations, not measurements or results from any community. The renewal lift is the
          biggest unknown: nobody has measured it for this product yet. That's what the <RouteLink to="pilot">pilot</RouteLink> is for.
        </p>
      </Callout>

      <Section id="inputs" title="Your numbers">
        <div className="table-wrap">
          <table className="calc">
            <thead>
              <tr>
                <th scope="col">Input</th>
                {Object.keys(inputs).map((k) => (
                  <th key={k} scope="col">{NAMES[k]}</th>
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
                      {Object.keys(inputs).map((k) => (
                        <td key={k}>
                          <input
                            className="calc__input"
                            type="number"
                            inputMode="decimal"
                            step="any"
                            aria-label={`${label}, ${NAMES[k]}`}
                            value={inputs[k][key]}
                            onChange={(e) => set(k, key, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="muted">
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
                {Object.keys(inputs).map((k) => (
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
                      {Object.keys(inputs).map((k) => (
                        <td key={k} className="num">{fn(results[k], inputs[k])}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="how" title="How it's calculated">
        <ul className="list">
          <li><strong>Extra renewal revenue</strong> = new paid members × renewal lift × price after fees × further paid months. It is credited to each month of new members, so read it as "per month of new members", not as revenue that appears next month.</li>
          <li><strong>Support cash avoided</strong> = (questions resolved × minutes − time spent correcting answers) × hourly cost, and only when you set "reduce paid support hours" to 1. Otherwise the same hours appear as capacity freed.</li>
          <li><strong>Your time</strong> is never subtracted from cash. The last row shows a wider view that does count it.</li>
          <li>Members' own Claude subscriptions are their cost, not yours, but a member without one can't use the pack. Skills are listed on Claude's Free and Pro plans (claude.com/pricing, checked 2026-10-29).</li>
        </ul>
        <p className="muted">
          Same formulas in code: <code>src/data/value-model.js</code>. Next step: <RouteLink to="pilot">measure it in a pilot</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
