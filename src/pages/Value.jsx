import React, { useState } from "react";
import { ESSENTIAL, FIELDS, LARGE_CHANGE_PTS, SCENARIOS, SENSITIVITY_STEP, compute, paybackText } from "../data/value-model.js";
import { PILOT_OFFER } from "../data/pilot-offer.js";
import { RouteLink, Section } from "../components/ui.jsx";

const NAMES = { conservative: "Conservative", base: "Base", optimistic: "Optimistic" };
const KEYS = Object.keys(NAMES);
const money = (x) => (x === null || x === undefined ? "n/a" : (x < -0.5 ? "−" : "") + Math.round(Math.abs(x)).toLocaleString("en-US"));
const hours = (x) => `${(Math.round(x * 10) / 10).toLocaleString("en-US")} h`;
const pts = (x) => (Math.round(x * 10) / 10).toLocaleString("en-US");

function changeText(c) {
  if (c.status === "not needed") return "none: covered without it";
  if (c.status === "not reachable") return "can't be reached in this period";
  return `${pts(c.userPoints)} points among users (${pts(c.points)} across all new members)`;
}
function sensitivityText(list) {
  if (!list.length) return "n/a";
  const label = (k) => FIELDS.find((f) => f[1] === k)[2].toLowerCase();
  return list.slice(0, 3).map((x) => `${label(x.key)}: ${pts(x.from)} → ${pts(x.to)}`).join("; ");
}
function buyersText(b) {
  if (b.status === "not needed") return "none needed";
  if (b.status === "not reachable") return "can't (no margin per buyer)";
  return b.status === "more than offered" ? `${b.buyers} (more than you offer it to)` : String(b.buyers);
}

// The answer in words: what has to be true, never a forecast.
export function verdict(r) {
  if (!r.ok) return { tone: "bad", text: "Some inputs need fixing (highlighted below)." };
  const i = r.inputs;
  const c = r.changeNeeded;
  const fee = i.implementationFee ? `the one-off price of ${money(i.implementationFee)} and the running costs` : "the running costs";
  const period = `${i.horizonMonths} months`;
  const t = r.changeNeededWithTime;
  const time = ` It would also take about ${Math.round(r.time.ownHours)} hours of your team's time` +
    (t.status === "needed" ? `; to cover that time too, at ${money(i.ownHourValue)} an hour, about ${pts(t.userPoints)} of every 100 users would need to renew.`
      : t.status === "not reachable" ? `; counting that time at ${money(i.ownHourValue)} an hour, no renewal change covers it.` : ".");
  const pilot = " A one-month pilot can show a change for one cohort; it can't show the change lasts for a year.";
  if (c.status === "not needed") {
    return { tone: "ok", text: `Even with no renewal change, cash in the period covers ${fee}, from support spending you said you'd cut or add-on sales. Check those inputs: they carry the whole result.${time}` };
  }
  if (c.status === "not reachable") {
    return { tone: "bad", text: `Unlikely to pay back: with these inputs no renewal change can cover ${fee} within ${period}${i.adoptionPct === 0 ? ", because nobody uses the pack" : ""}.${time}` };
  }
  const per100 = pts(c.userPoints);
  const large = c.userPoints > LARGE_CHANGE_PTS;
  const largeWithTime = !large && (t.status === "not reachable" || (t.status === "needed" && t.userPoints > LARGE_CHANGE_PTS));
  const now = r.horizonCash >= 0
    ? ` At the change you entered, net cash in the period is ${money(r.horizonCash)} and payback is ${paybackText(r.payback)}.`
    : ` At the change you entered, the period ends ${money(r.horizonCash)} short.`;
  return {
    tone: large || largeWithTime ? "bad" : "warn",
    text: `To cover ${fee} within ${period}, about ${per100} more of every 100 members who use the pack would need to make their first renewal.` +
      (large ? " That's a large change, and nothing so far shows a change that big: treat payback as unlikely unless your pilot measures it." : " Nobody has measured that yet; it's what a pilot would test.") +
      now + time +
      (largeWithTime ? " Counting your time, that's a large change: unlikely to be worth it unless your time is cheap or the hours fall." : "") +
      pilot,
  };
}

function Field({ field, value, err, onChange }) {
  const [, key, label, unit, help] = field;
  const id = `in-${key}`;
  return (
    <div className="calc__field">
      <label htmlFor={id}>
        {label} <span className="calc__unit">({unit})</span>
      </label>
      <input
        id={id}
        className={"calc__input" + (err ? " calc__input--bad" : "")}
        type="number"
        inputMode="decimal"
        step="any"
        aria-invalid={err ? "true" : undefined}
        aria-describedby={(err ? id + "-err " : "") + id + "-help"}
        value={value}
        onChange={(e) => onChange(key, e.target.value)}
      />
      {err ? <span id={id + "-err"} className="calc__err">{err}</span> : null}
      <span id={id + "-help"} className="calc__help">{help}</span>
    </div>
  );
}

const ROWS = [
  ["Cash inside the period", [
    ["Extra renewal payments", (r) => money(r.renewalCash), "After payment fees, refunds and delivery costs. Negative when renewals fall."],
    ["Add-on sales", (r) => money(r.addonCash), "Launch month only."],
    ["Support spending actually avoided", (r) => money(r.supportCashAvoided), "Only the paid hours you cut."],
    ["Your cash costs", (r) => money(-r.cashCosts), "Pilot price, monthly fee, API and software."],
    ["Net cash in the period", (r) => money(r.horizonCash), ""],
    ["Payback (from cumulative cash)", (r) => paybackText(r.payback), ""],
  ]],
  ["Outside the period (not cash yet)", [
    ["Projected contribution after the period", (r) => money(r.futureContribution), "From members who joined inside the period, if they keep paying as assumed."],
  ]],
  ["What would have to be true", [
    ["Renewal change needed to cover the price and running costs", (r) => changeText(r.changeNeeded), ""],
    ["Renewal change needed to cover those and your time", (r) => changeText(r.changeNeededWithTime), "Your hours below, at what you said an hour is worth."],
    ["What moves this answer most", (r) => sensitivityText(r.sensitivity), `Each essential input made ${SENSITIVITY_STEP * 100}% better for you, one at a time.`],
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
  const [inputs, setInputs] = useState(() => ({ ...SCENARIOS.base }));
  const [preset, setPreset] = useState("base");
  const r = compute(inputs);
  const v = verdict(r);
  const set = (key, value) => {
    setPreset("");
    setInputs((s) => ({ ...s, [key]: value }));
  };
  const essential = ESSENTIAL.map((k) => FIELDS.find((f) => f[1] === k));
  const advanced = FIELDS.filter((f) => !ESSENTIAL.includes(f[1]));
  const groups = [...new Set(advanced.map((f) => f[0]))];
  const presets = Object.fromEntries(KEYS.map((k) => [k, compute(SCENARIOS[k])]));

  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Step 4 · Economics</p>
        <h1>Estimate value</h1>
        <p className="lede">
          What would have to be true for the {PILOT_OFFER.terms.fee} pilot to pay for itself, with your community's numbers?
          Payments count only in the month they'd arrive, and cash, support spending you really stop, and staff time stay
          separate.
        </p>
        <p className="muted">
          It starts from an <strong>illustration</strong>, not a measurement from any community. Whether the pack changes
          renewals at all is unknown until a <RouteLink to="pilot">pilot</RouteLink> measures it.
        </p>
      </header>

      <Section id="inputs" title="Your numbers">
        <div className="tabs__list" role="group" aria-label="Start from an illustration">
          {KEYS.map((k) => (
            <button key={k} type="button" className="tabs__tab" aria-pressed={preset === k}
              onClick={() => { setInputs({ ...SCENARIOS[k] }); setPreset(k); }}>
              {NAMES[k]} illustration
            </button>
          ))}
        </div>
        <div className="calc__grid">
          {essential.map((f) => (
            <Field key={f[1]} field={f} value={inputs[f[1]]} err={r.errors[f[1]]} onChange={set} />
          ))}
        </div>
        <details className="calc__more">
          <summary>Advanced assumptions: fees, retention, support, add-ons, costs and your time</summary>
          {groups.map((g) => (
            <fieldset key={g} className="calc__set">
              <legend>{g}</legend>
              <div className="calc__grid">
                {advanced.filter((f) => f[0] === g).map((f) => (
                  <Field key={f[1]} field={f} value={inputs[f[1]]} err={r.errors[f[1]]} onChange={set} />
                ))}
              </div>
            </fieldset>
          ))}
        </details>
      </Section>

      <Section id="results" title="What it adds up to">
        <div className={"callout callout--" + v.tone} aria-live="polite">
          <p>{v.text}</p>
        </div>
        {r.ok ? (
          <div className="table-wrap">
            <table className="calc">
              <tbody>
                {ROWS.map(([g, rows]) => (
                  <React.Fragment key={g}>
                    <tr className="calc__group"><th colSpan={2} scope="colgroup">{g}</th></tr>
                    {rows.map(([label, fn, help]) => (
                      <tr key={label}>
                        <th scope="row">
                          {label}
                          {help ? <span className="calc__help">{help}</span> : null}
                        </th>
                        <td className="num">{fn(r)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Section>

      <Section id="monthly" title="Detailed calculation">
        <details>
          <summary>Cumulative cash, month by month</summary>
          {r.ok ? (
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
                  {r.months.map((m) => (
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
            <p className="calc__err">Fix the highlighted inputs.</p>
          )}
        </details>
        <details>
          <summary>The three illustrations side by side</summary>
          <div className="table-wrap">
            <table className="calc">
              <thead>
                <tr>
                  <th scope="col">Illustration (not a measurement)</th>
                  {KEYS.map((k) => <th key={k} scope="col">{NAMES[k]}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Use the pack / change among users</th>
                  {KEYS.map((k) => <td key={k} className="num">{SCENARIOS[k].adoptionPct}% / {SCENARIOS[k].userChangePts} pts</td>)}
                </tr>
                <tr>
                  <th scope="row">Net cash in {SCENARIOS.base.horizonMonths} months</th>
                  {KEYS.map((k) => <td key={k} className="num">{money(presets[k].horizonCash)}</td>)}
                </tr>
                <tr>
                  <th scope="row">Payback</th>
                  {KEYS.map((k) => <td key={k} className="num">{paybackText(presets[k].payback)}</td>)}
                </tr>
                <tr>
                  <th scope="row">Change among users needed</th>
                  {KEYS.map((k) => <td key={k} className="num">{changeText(presets[k].changeNeeded)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </Section>

      <Section id="how" title="How it's calculated">
        <ul className="list">
          <li><strong>Cohorts.</strong> Each month in the period, the same number of new paid members join and get the pack. Their joining payment is unchanged. This assumes you keep giving the pack to every new member after the pilot.</li>
          <li><strong>The assumed effect</strong> is a change in the share of members <em>who use the pack</em> that make their <em>first</em> renewal, one month after joining. Across all new members that is adoption × the change. Members who use it may differ from those who don't, so a pilot compares whole cohorts.</li>
          <li><strong>After the first renewal</strong>, members gained or lost keep paying at the later monthly retention rate, up to the cap on total paid months.</li>
          <li><strong>Each payment</strong> counts in the month it would arrive, after the percentage fee, the fixed fee, refunds and any delivery cost per member. Payments after the period are shown separately and never counted as cash.</li>
          <li><strong>Support.</strong> Tutor time saved minus time spent correcting wrong answers gives net hours freed. Only the paid hours you say you'll cut become cash; the rest is capacity.</li>
          <li><strong>Payback</strong> is the first month after which cumulative cash stays at or above zero for the rest of the period. If it reaches zero and then falls back, the result says so.</li>
          <li><strong>"Large"</strong> means more than {LARGE_CHANGE_PTS} points among users: one more renewal for every {Math.round(100 / LARGE_CHANGE_PTS)} members who use it. That's a reading aid, not a benchmark.</li>
          <li><strong>Members' own costs</strong> (a Claude plan with skills) are theirs, but a member without one can't use the pack.</li>
        </ul>
        <p className="muted">
          Same formulas in code: <code>src/data/value-model.js</code>, with tests. Next: <RouteLink to="pilot">the scoped pilot</RouteLink>.
        </p>
      </Section>
    </div>
  );
}
