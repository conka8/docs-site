import React, { useMemo } from "react";
import { TOOLS } from "../data/tools.js";
import { PAGES, PAGE_GROUPS } from "../data/nav.js";
import { STARTER } from "../data/catalog.js";
import { RouteLink } from "./ui.jsx";

const TOOL_SECTIONS = [
  ["quickstart", "Quickstart"],
  ["readiness", "Readiness"],
  ["commands", "Commands"],
  ["limits", "Limits"],
];

// One flat index: pages, their sections, tools and tool sections. Each entry links to #route or #route/section.
const INDEX = [
  ...PAGES.flatMap((p) => [
    { to: p.id, label: p.label, kind: "Page", text: p.label },
    ...p.sections.map(([id, label, words]) => ({ to: `${p.id}/${id}`, label, kind: p.label, text: `${label} ${words}` })),
  ]),
  ...TOOLS.flatMap((t) => [
    {
      to: t.id,
      label: t.name,
      kind: "Tool",
      text: [t.name, t.cli, t.tagline, t.summary, ...t.audience, ...t.commands.map((c) => c[0])].join(" "),
    },
    ...TOOL_SECTIONS.map(([id, label]) => ({ to: `${t.id}/${id}`, label: `${t.name}: ${label}`, kind: "Tool", text: `${t.name} ${label}` })),
    ...t.limits.map((l, i) => ({ to: `${t.id}/limits`, label: `${t.name}: ${l.slice(0, 60)}…`, kind: "Limit", text: `${t.name} ${l}`, key: `${t.id}-l${i}` })),
  ]),
];

function search(q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = INDEX.filter((e) => words.every((w) => e.text.toLowerCase().includes(w)));
  // Exact label matches first, then pages and tools before sections.
  const rank = (e) => (e.label.toLowerCase().includes(q.toLowerCase()) ? 0 : 1) * 10 + (e.kind === "Page" || e.kind === "Tool" ? 0 : 1);
  return hits.sort((a, b) => rank(a) - rank(b)).slice(0, 12);
}

function NavItem({ to, route, onNavigate, children, tool }) {
  return (
    <li onClick={onNavigate}>
      <RouteLink to={to} className={"nav-link" + (tool ? " nav-link--tool" : "") + (route === to ? " is-active" : "")}>
        <span>{children}</span>
      </RouteLink>
    </li>
  );
}

export default function Sidebar({ route, query, setQuery, open, onNavigate }) {
  const results = useMemo(() => (query.trim() ? search(query.trim()) : []), [query]);
  const starter = STARTER.map((id) => TOOLS.find((t) => t.id === id));
  const more = TOOLS.filter((t) => !STARTER.includes(t.id));

  return (
    <nav className={"sidebar" + (open ? " sidebar--open" : "")} aria-label="Documentation">
      <label className="search" htmlFor="doc-search">
        <span className="visually-hidden">Search the docs</span>
        <input
          id="doc-search"
          type="search"
          placeholder="Search guides, tools, errors"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-controls="search-results"
        />
      </label>

      {query.trim() ? (
        <div id="search-results" aria-live="polite">
          <p className="nav-group__label">{results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "No results"}</p>
          {results.length ? (
            <ul className="nav-list">
              {results.map((r) => (
                <li key={r.key || r.to + r.label} onClick={() => { onNavigate(); setQuery(""); }}>
                  <RouteLink to={r.to} className="nav-link nav-link--result">
                    <span>{r.label}</span>
                    <span className="nav-link__kind">{r.kind}</span>
                  </RouteLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="nav-empty">Nothing matches “{query}”. Try a command like “pack”, an error like “PowerShell”, or a tool name.</p>
          )}
        </div>
      ) : (
        <>
          {PAGE_GROUPS.map((g) => (
            <div key={g} className="nav-group">
              <p className="nav-group__label">{g}</p>
              <ul className="nav-list">
                {PAGES.filter((p) => p.group === g).map((p) => (
                  <NavItem key={p.id} to={p.id} route={route} onNavigate={onNavigate}>
                    {p.label}
                  </NavItem>
                ))}
              </ul>
            </div>
          ))}
          <div className="nav-group">
            <p className="nav-group__label">Starter tools</p>
            <ul className="nav-list">
              {starter.map((t) => (
                <NavItem key={t.id} to={t.id} route={route} onNavigate={onNavigate} tool>
                  {t.name}
                </NavItem>
              ))}
            </ul>
          </div>
          <div className="nav-group">
            <p className="nav-group__label">More tools</p>
            <ul className="nav-list">
              {more.map((t) => (
                <NavItem key={t.id} to={t.id} route={route} onNavigate={onNavigate} tool>
                  {t.name}
                </NavItem>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}
