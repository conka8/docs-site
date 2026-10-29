import React, { useState, useRef } from "react";

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

export function Section({ id, title, children }) {
  return (
    <section className="section" id={"s-" + id}>
      <h2>{title}</h2>
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

export function Chip({ children, tone }) {
  return <span className={"chip" + (tone ? " chip--" + tone : "")}>{children}</span>;
}

export function go(route) {
  if (location.hash.slice(1) === route) window.scrollTo(0, 0);
  else location.hash = route;
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
