import React, { useMemo } from "react";
import { GROUPS, TOOLS } from "../data/tools.js";
import { RouteLink } from "./ui.jsx";

const PAGES = [
  { id: "home", label: "Overview" },
  { id: "start", label: "Getting started" },
  { id: "trust", label: "Data, testing & limits" },
];

function matches(tool, q) {
  const hay = [tool.name, tool.cli, tool.tagline, tool.summary, ...tool.audience, ...tool.commands.map((c) => c[0])]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
}

export default function Sidebar({ route, query, setQuery, open, onNavigate }) {
  const filtered = useMemo(() => TOOLS.filter((t) => matches(t, query)), [query]);

  return (
    <nav className={"sidebar" + (open ? " sidebar--open" : "")} aria-label="Documentation">
      <label className="search" htmlFor="tool-search">
        <span className="visually-hidden">Search tools</span>
        <input
          id="tool-search"
          type="search"
          placeholder="Search tools, commands, audiences"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {!query ? (
        <ul className="nav-list">
          {PAGES.map((p) => (
            <li key={p.id} onClick={onNavigate}>
              <RouteLink to={p.id} className={"nav-link" + (route === p.id ? " is-active" : "")}>
                {p.label}
              </RouteLink>
            </li>
          ))}
        </ul>
      ) : null}

      {GROUPS.map((g) => {
        const tools = filtered.filter((t) => t.group === g.id);
        if (!tools.length) return null;
        return (
          <div key={g.id} className="nav-group">
            <p className="nav-group__label">{g.label}</p>
            <ul className="nav-list">
              {tools.map((t) => (
                <li key={t.id} onClick={onNavigate}>
                  <RouteLink to={t.id} className={"nav-link nav-link--tool" + (route === t.id ? " is-active" : "")}>
                    <span>{t.name}</span>
                  </RouteLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {query && !filtered.length ? <p className="nav-empty">No tool matches “{query}”. Try a command name like “scan” or an audience like “agency”.</p> : null}
    </nav>
  );
}
