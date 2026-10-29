import React from "react";
import { Callout, CodeBlock, DefTable, RouteLink, Section, Tabs } from "../components/ui.jsx";

export default function Members() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Guide · for members</p>
        <h1>Member guide</h1>
        <p className="lede">
          You got a skill or a tool from your community. Here's how to install it, connect what it needs, and fix the
          usual problems. No coding needed.
        </p>
      </header>

      <Section id="which" title="What did you get?">
        <DefTable
          monoFirst={false}
          head={["You got", "What it is", "Go to"]}
          rows={[
            ["A .zip, or a folder with a SKILL.md inside", "A skill: instructions Claude follows", <a href="#members/skill">Install a skill</a>],
            ["A plugin name and a /plugin marketplace add line", "A Claude Code plugin: several skills in one package", <a href="#members/plugin">Install a plugin</a>],
            ["A tool zip like shipsafe-0.1.1.zip", "A command-line tool (Python) you run in a terminal", <RouteLink to="start">Install &amp; downloads</RouteLink>],
          ]}
        />
        <p className="muted">None of these are websites or hosted apps: they run on your computer or inside your own Claude account.</p>
      </Section>

      <Section id="skill" title="Install a skill">
        <Tabs
          label="Where you use Claude"
          tabs={[
            {
              label: "Claude app",
              content: (
                <ol className="list">
                  <li>
                    Settings &gt; Capabilities: turn on <strong>Code execution and file creation</strong>.
                  </li>
                  <li>
                    Customize &gt; Skills &gt; <strong>+</strong> &gt; <strong>Create skill</strong> &gt;{" "}
                    <strong>Upload a skill</strong>, and choose the .zip.
                  </li>
                  <li>Start a new chat and ask for the job in plain words, e.g. "Use the my-community-tutor skill: how do I price my first offer?"</li>
                  <li>
                    On Team or Enterprise plans an owner may need to allow skills first. If they uploaded the skill for
                    everyone, it's already there.
                  </li>
                </ol>
              ),
            },
            {
              label: "Claude Code (macOS / Linux)",
              content: (
                <>
                  <p>Put the skill folder (the one with SKILL.md in it, not the zip) here:</p>
                  <CodeBlock code="~/.claude/skills/<skill-name>/" />
                  <p>Claude Code notices new skills without a restart. If the skills folder didn't exist when you started, type /reload-skills.</p>
                </>
              ),
            },
            {
              label: "Claude Code (Windows)",
              content: (
                <>
                  <p>Put the skill folder (the one with SKILL.md in it, not the zip) here:</p>
                  <CodeBlock code={"%USERPROFILE%\\.claude\\skills\\<skill-name>\\"} />
                  <p>Claude Code notices new skills without a restart. If the skills folder didn't exist when you started, type /reload-skills.</p>
                </>
              ),
            },
            {
              label: "OpenClaw",
              content: (
                <p>
                  Put the skill folder in <code>~/.openclaw/skills/</code> (all workspaces) or <code>&lt;workspace&gt;/skills/</code>.
                </p>
              ),
            },
          ]}
        />
        <p className="muted">
          Checked 2026-10-29 against <a href="https://support.claude.com/en/articles/12512180-use-skills-in-claude">Use skills in Claude</a>,{" "}
          <a href="https://code.claude.com/docs/en/skills">Claude Code skills</a> and <a href="https://docs.openclaw.ai/tools/skills">OpenClaw skills</a>. Menu names can change.
        </p>
      </Section>

      <Section id="plugin" title="Install a plugin (Claude Code)">
        <p>Type the two lines your community gave you, for example:</p>
        <CodeBlock code={"/plugin marketplace add your-community/skills\n/plugin install your-community-skills@your-community-skills-marketplace"} />
        <p>
          <strong>Updates:</strong> type <code>/plugin marketplace update</code>, pick the marketplace, choose "Update
          marketplace". Source: <a href="https://code.claude.com/docs/en/discover-plugins">Discover and install plugins</a> (checked 2026-10-29).
        </p>
      </Section>

      <Section id="keys" title="Connections and API keys">
        <p>
          Look in the skill's README.md, or the <strong>Required credentials / accounts</strong> section of its SKILL.md.
        </p>
        <ul className="list">
          <li><strong>None listed:</strong> nothing to set up.</li>
          <li>
            <strong>A service listed</strong> (Slack, Google Sheets…): Claude needs a way to use it. The easiest is a
            connector or MCP server for that service. Otherwise the skill names an environment variable for a key.
          </li>
          <li>
            <strong>Bridge skills</strong> ("runs in n8n") only need the webhook address from your community
            (N8N_WEBHOOK_URL) and sometimes a header (N8N_WEBHOOK_HEADER).
          </li>
        </ul>
        <Callout tone="warn" title="Never paste keys into the chat">
          <p>Set them in your terminal before you start Claude Code or the tool:</p>
        </Callout>
        <Tabs
          label="Set a key"
          tabs={[
            { label: "macOS / Linux", content: <CodeBlock code={'export SLACK_TOKEN="your-key"'} /> },
            { label: "Windows PowerShell", content: <CodeBlock code={'$env:SLACK_TOKEN="your-key"'} /> },
          ]}
        />
        <p className="muted">
          Some services charge for API use: see <RouteLink to="trust/data">Data and costs</RouteLink>.
        </p>
      </Section>

      <Section id="result" title="Understand the result">
        <ul className="list">
          <li>
            <strong>Converted skills</strong> (from n8n or Make.com) are written instructions. Claude follows them with its
            own tools and the original automation doesn't run, so results can differ. See the Conversion check in SKILL.md.
          </li>
          <li>
            <strong>Reports marked "Demo data"</strong> use made-up answers. They show what a report looks like, nothing more.
          </li>
          <li>
            <strong>Scores and grades</strong> come from a fixed set of checks explained in each report: a starting point for
            a human decision, not a verdict.
          </li>
        </ul>
      </Section>

      <Section id="trouble" title="Troubleshooting">
        <DefTable
          monoFirst={false}
          head={["You see", "Do this"]}
          rows={[
            ["command not found / is not recognized", "Activate the environment again (Install, step 2), or reinstall inside it"],
            ["python3: command not found (Windows)", "Use py instead of python3"],
            ["PowerShell: running scripts is disabled on this system", "Run Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser once, then activate again"],
            ["externally-managed-environment (from pip)", "You're outside a virtual environment. Do Install step 2 first"],
            ["The skill zip upload fails", "Ask for the pack --format claude-app zip: the skill folder must be at the top of the zip and named like the skill"],
            ["Claude doesn't use the skill", "Name it in your request, check it's switched on in Customize > Skills, start a new chat"],
            ["… is not set (an API key)", "Set the key in the same terminal, then start Claude Code or the tool again"],
            ["Bridge skill: HTTP 404", "The workflow is off, or it's a test URL (/webhook-test/). Ask for the production URL"],
            ["Bridge skill: only \"Workflow was started\"", "Your community needs to change the n8n Webhook node's Respond setting"],
            ["Exit code 2 from a tool", "Bad input or a missing key. The error line says which"],
          ]}
        />
        <p>
          Still stuck? Send your community the exact command and the full error text, with any keys removed.
        </p>
      </Section>
    </div>
  );
}
