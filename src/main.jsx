import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { SUITE, TOOLS } from "./data/tools.js";
import { PAGE_IDS } from "./data/nav.js";
import Sidebar from "./components/Sidebar.jsx";
import { RouteLink } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import GettingStarted from "./pages/GettingStarted.jsx";
import Trust from "./pages/Trust.jsx";
import Admins from "./pages/Admins.jsx";
import Members from "./pages/Members.jsx";
import Compare from "./pages/Compare.jsx";
import Releases from "./pages/Releases.jsx";
import Example from "./pages/Example.jsx";
import Value from "./pages/Value.jsx";
import Pilot from "./pages/Pilot.jsx";
import Fit from "./pages/Fit.jsx";
import "./styles.css";

const ROUTES = new Set([...PAGE_IDS, ...TOOLS.map((t) => t.id)]);
const PAGES = { start: GettingStarted, trust: Trust, admins: Admins, members: Members, compare: Compare, releases: Releases, example: Example, value: Value, pilot: Pilot, fit: Fit };

// "#skillport/limits" -> { route: "skillport", section: "limits" }
function currentLocation() {
  const [route, section = ""] = location.hash.slice(1).split("/");
  return ROUTES.has(route) ? { route, section } : { route: "home", section: "" };
}

function App() {
  const [{ route, section }, setLoc] = useState(currentLocation);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const onHash = () => {
      setLoc(currentLocation());
      setMenuOpen(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // After each navigation: scroll to the linked section (or the top) and move focus into the page.
  useEffect(() => {
    const el = section && document.getElementById("s-" + section);
    if (el) {
      el.scrollIntoView({ block: "start" });
      el.querySelector("h2")?.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      if (!first.current) mainRef.current?.focus({ preventScroll: true });
    }
    first.current = false;
  }, [route, section]);

  const tool = TOOLS.find((t) => t.id === route);
  const Page = PAGES[route] || Home;
  const page = tool ? <ToolPage key={tool.id} tool={tool} /> : <Page />;

  return (
    <div className="shell">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>
        Skip to content
      </a>
      <header className="topbar">
        <RouteLink to="home" className="brand">
          <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#00ff88" />
                <stop offset="1" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
            <rect x=".5" y=".5" width="31" height="31" rx="7" fill="#12121a" stroke="#2a2a35" />
            <g fill="url(#brand-grad)">
              <rect x="5" y="16.5" width="10.5" height="10.5" rx="1.5" />
              <rect x="16.5" y="16.5" width="10.5" height="10.5" rx="1.5" />
              <rect x="10.75" y="5" width="10.5" height="10.5" rx="1.5" />
            </g>
          </svg>
          <span className="brand__name">{SUITE.name}</span>
          <span className="brand__tag">docs</span>
        </RouteLink>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>
      <div className="layout">
        <div id="sidebar" className="layout__side">
          <Sidebar route={route} query={query} setQuery={setQuery} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        </div>
        <main id="main" className="layout__main" ref={mainRef} tabIndex={-1}>
          {page}
          <footer className="footer">
            <span>
              {SUITE.name} · {SUITE.license} licensed · Python {SUITE.python}
            </span>
            <span>Independent project, not affiliated with or endorsed by Skool.</span>
            <span>
              Tested {SUITE.testedOn} · <RouteLink to="releases">Release notes</RouteLink>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
