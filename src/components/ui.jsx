import React, { useState, useRef } from "react";
import { STATUSES } from "../data/readiness.js";
import { sizeLabel } from "../data/downloads.js";

export function CodeBlock({ code, label, compact }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  function selectText() {
    const range = document.createRange();
    range.selectNodeContents(preRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function copy() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    try {
      navigator.clipboard.writeText(code).then(done, () => {
        selectText();
        done();
      });
    } catch (e) {
      selectText();
      done();
    }
  }

  return (
    <figure className={"code" + (compact ? " code--compact" : "")}>
      {label ? <figcaption className="code__label">{label}</figcaption> : null}
      <div className="code__body">
        <pre ref={preRef}>
          <code>{code}</code>
        </pre>
        <button type="button" className="code__copy" onClick={copy} aria-label="Copy to clipboard">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </figure>
  );
}

export function DefTable({ head, rows, monoFirst = true }) {
  return (
    <div className="table-wrap">
      <table>
        {head ? (
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === 0 && monoFirst ? "mono" : j === r.length - 1 && typeof c === "number" ? "num" : ""}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({ tone = "note", title, children }) {
  return (
    <aside className={"callout callout--" + tone}>
      {title ? <p className="callout__title">{title}</p> : null}
      {children}
    </aside>
  );
}

export function currentPage() {
  return location.hash.slice(1).split("/")[0] || "home";
}

// Every section gets a deep link (#page/section) next to its heading.
export function Section({ id, title, children }) {
  return (
    <section className="section" id={"s-" + id} aria-labelledby={"h-" + id}>
      <h2 id={"h-" + id} className="section__title" tabIndex={-1}>
        {title}
        <a className="anchor" href={`#${currentPage()}/${id}`} aria-label={`Link to this section: ${title}`}>
          #
        </a>
      </h2>
      {children}
    </section>
  );
}

export function Video({ src, poster, label, description }) {
  return (
    <figure className="video">
      {label ? <figcaption className="code__label">{label}</figcaption> : null}
      <video className="video__player" src={src} poster={poster} controls muted playsInline preload="metadata" aria-label={description} />
      {description ? <p className="video__note">{description}</p> : null}
    </figure>
  );
}

export function Badge({ status }) {
  const s = STATUSES[status];
  return (
    <span className={"badge badge--" + s.tone} title={s.text}>
      {s.label}
    </span>
  );
}

export function ReadinessTable({ rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Integration</th>
            <th>Status</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, status, evidence, live]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <Badge status={status} />
              </td>
              <td>{live ? `${evidence} Live check: ${live.date}, ${live.version}.` : evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DownloadLink({ file, primary, children }) {
  if (!file) return null;
  return (
    <a className={"btn" + (primary ? " btn--primary" : "")} href={"./downloads/" + file.file} download>
      {children || "Download"} <span className="btn__meta">{file.file} · {sizeLabel(file.bytes)}</span>
    </a>
  );
}

// Platform-specific instructions. Buttons are real tabs: arrow keys move between them.
export function Tabs({ tabs, label }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  function onKey(e) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  }
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active}>
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function Chip({ children, tone }) {
  return <span className={"chip" + (tone ? " chip--" + tone : "")}>{children}</span>;
}

export function go(route) {
  if (location.hash.slice(1) === route) {
    const [, section] = route.split("/");
    const el = section && document.getElementById("s-" + section);
    if (el) el.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  } else location.hash = route;
}

export function RouteLink({ to, className, children }) {
  return (
    <a
      href={"#" + to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        go(to);
      }}
    >
      {children}
    </a>
  );
}
