import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { SUITE, TOOLS } from "./data/tools.js";
import Sidebar from "./components/Sidebar.jsx";
import { RouteLink } from "./components/ui.jsx";
import Home from "./pages/Home.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import GettingStarted from "./pages/GettingStarted.jsx";
import Trust from "./pages/Trust.jsx";
import "./styles.css";

const ROUTES = new Set(["home", "start", "trust", ...TOOLS.map((t) => t.id)]);

function currentRoute() {
  const h = location.hash.slice(1);
  return ROUTES.has(h) ? h : "home";
}

function App() {
  const [route, setRoute] = useState(currentRoute);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(currentRoute());
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const tool = TOOLS.find((t) => t.id === route);
  let page;
  if (tool) page = <ToolPage key={tool.id} tool={tool} />;
  else if (route === "start") page = <GettingStarted />;
  else if (route === "trust") page = <Trust />;
  else page = <Home />;

  return (
    <div className="shell">
      <header className="topbar">
        <RouteLink to="home" className="brand">
          <span className="brand__mark" aria-hidden="true">
            BC
          </span>
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
        <main className="layout__main">
          {page}
          <footer className="footer">
            <span>
              {SUITE.name} · {SUITE.license} licensed · Python {SUITE.python}
            </span>
            <span>Tested {SUITE.testedOn}</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
