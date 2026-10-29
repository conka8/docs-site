import React from "react";
import { SUITE, TOOLS } from "../data/tools.js";
import { CATALOG } from "../data/catalog.js";
import { DOWNLOADS, sizeLabel } from "../data/downloads.js";
import { Callout, CodeBlock, DefTable, RouteLink, Section, Tabs } from "../components/ui.jsx";

function name(d) {
  return d.tool === "builder-commons-starter" ? "Starter bundle (skool-owner-kit, skillport, skillkit + guides)" : d.tool;
}

export default function GettingStarted() {
  const rows = [...DOWNLOADS]
    .sort((a, b) => (a.tool === "builder-commons-starter" ? -1 : b.tool === "builder-commons-starter" ? 1 : 0))
    .map((d) => [
      <a href={"./downloads/" + d.file} download>
        {name(d)}
      </a>,
      d.version,
      sizeLabel(d.bytes),
      <code className="hash">{d.sha256.slice(0, 16)}…</code>,
    ]);

  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Guide</p>
        <h1>Install &amp; downloads</h1>
        <p className="lede">Download, install into a private environment, and check it worked. About five minutes.</p>
      </header>

      <Section id="downloads" title="Downloads">
        <p>
          Each zip holds one tool with its sample files, README and LICENSE. Most admins want the starter bundle. The tools
          aren't on PyPI: don't <code>pip install</code> them by name, because those names may belong to someone else.
        </p>
        <DefTable head={["Download", "Version", "Size", "SHA-256"]} rows={rows} monoFirst={false} />
        <p className="muted">
          Full checksums are in <a href="./downloads/manifest.json">manifest.json</a>.
        </p>
      </Section>

      <Section id="python" title="1. Get Python">
        <p>
          Every tool needs Python {SUITE.python}. Check with the command below. If it's missing or older, install it from{" "}
          <a href="https://www.python.org/downloads/">python.org/downloads</a>. On Windows, tick "Add python.exe to PATH".
        </p>
        <Tabs
          label="Check Python"
          tabs={[
            { label: "macOS / Linux", content: <CodeBlock code="python3 --version" /> },
            { label: "Windows PowerShell", content: <CodeBlock code="py --version" /> },
          ]}
        />
      </Section>

      <Section id="install" title="2. Install in a private environment">
        <p>
          Unzip the download and open a terminal in the unzipped folder. A virtual environment keeps the tools separate from
          everything else on your computer.
        </p>
        <Tabs
          label="Install"
          tabs={[
            {
              label: "macOS / Linux",
              content: (
                <>
                  <CodeBlock label="Starter bundle" code={"python3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install ./skool-owner-kit ./skillport ./skillkit"} />
                  <CodeBlock label="A single tool (run inside its folder)" code={"python3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install ."} />
                </>
              ),
            },
            {
              label: "Windows PowerShell",
              content: (
                <>
                  <CodeBlock label="Starter bundle" code={"py -m venv .venv\n.venv\\Scripts\\Activate.ps1\npython -m pip install .\\skool-owner-kit .\\skillport .\\skillkit"} />
                  <CodeBlock label="A single tool (run inside its folder)" code={"py -m venv .venv\n.venv\\Scripts\\Activate.ps1\npython -m pip install ."} />
                  <p className="muted">
                    "Running scripts is disabled"? Run <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>{" "}
                    once (<a href="https://docs.python.org/3/library/venv.html">Python docs</a>).
                  </p>
                </>
              ),
            },
          ]}
        />
        <p className="muted">
          Each new terminal: activate again (the second line). pipx also works for single tools:{" "}
          <code>pipx install .</code> inside the tool's folder (
          <a href="https://packaging.python.org/en/latest/guides/installing-stand-alone-command-line-tools/">guide</a>).
          Commands from the Python packaging docs, checked 2026-10-29.
        </p>
      </Section>

      <Section id="check" title="3. Check it worked">
        <p>
          Each tool prints its version (<code>skillport --version</code>), then runs its first example on the files that
          ship in its folder. No account or API key needed.
        </p>
        <DefTable
          monoFirst={false}
          head={["Tool", "First run (inside the tool's folder)", "You should see"]}
          rows={TOOLS.map((t) => [
            <RouteLink to={t.id + "/quickstart"}>{t.name}</RouteLink>,
            <code className="pre-line">{CATALOG[t.id].firstRun.code.replace(/ \\\n\s*/g, " ")}</code>,
            CATALOG[t.id].firstRun.expect,
          ])}
        />
      </Section>

      <Section id="upgrade" title="Upgrade or remove">
        <p>
          Download the new zip, unzip it, activate the same environment and install again: <code>python -m pip install .</code>{" "}
          replaces the old version. Your own files are untouched. Remove a tool with{" "}
          <code>python -m pip uninstall &lt;name&gt;</code>, or delete the <code>.venv</code> folder to remove everything.
          What changed: <RouteLink to="releases">Release notes</RouteLink>.
        </p>
      </Section>

      <Section id="codes" title="Exit codes">
        <Callout tone="note" title="The same in every tool">
          <p>
            <code>0</code> OK. <code>1</code> the tool found something you asked it to fail on (a critical finding, a score
            under the bar, a failed conversation, lint errors). <code>2</code> bad input or a missing key. That makes the
            tools usable in a GitHub Action or a scheduled job.
          </p>
        </Callout>
      </Section>
    </div>
  );
}
