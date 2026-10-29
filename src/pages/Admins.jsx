import React from "react";
import { Callout, CodeBlock, DefTable, RouteLink, Section } from "../components/ui.jsx";

const CHECKED = "checked 2026-10-29";

export default function Admins() {
  return (
    <div className="page">
      <header className="tool__head">
        <p className="eyebrow">Guide · for admins</p>
        <h1>Admin guide</h1>
        <p className="lede">
          Build skills from what you already have, check them, ship them to members and keep them up to date. Install the
          starter bundle first (<RouteLink to="start">Install &amp; downloads</RouteLink>).
        </p>
      </header>

      <Section id="choose" title="1. Choose what to build">
        <DefTable
          monoFirst={false}
          head={["You already have", "Tool", "You get"]}
          rows={[
            ["Classroom lessons (text, Markdown or HTML)", "skool-kit classroom-to-skill", "A tutor skill that answers from your lessons, cites lesson titles and links to your classroom"],
            ["n8n workflows or Make.com scenarios you share as templates", "skillport batch", "One skill per workflow, with member setup steps and a Conversion check for you"],
            ["A live n8n workflow members should keep using", "skillport convert --mode bridge", "A small skill that calls the workflow's webhook and shows the result"],
            ["Skills you write by hand", "skillkit new", "A skill that already passes the checks"],
          ]}
        />
        <p>What members need depends on where they use Claude:</p>
        <DefTable
          monoFirst={false}
          head={["Members use", "They need", "You ship"]}
          rows={[
            ["Claude Code", "Claude Code installed", "One plugin (skillkit pack --marketplace)"],
            ["Claude app (claude.ai, desktop): Free, Pro, Max", "Code execution turned on in Settings", "One zip per skill (skillkit pack --format claude-app)"],
            ["Claude app on your Team or Enterprise organization", "Nothing: an owner uploads once for everyone", "The same zips, uploaded in Organization settings"],
            ["OpenClaw", "OpenClaw installed", "The skill folders (ClawHub layout from pack --format clawhub is unverified)"],
          ]}
        />
        <p className="muted">
          Sources ({CHECKED}): <a href="https://code.claude.com/docs/en/skills">Claude Code skills</a>,{" "}
          <a href="https://code.claude.com/docs/en/discover-plugins">Claude Code plugins</a>,{" "}
          <a href="https://support.claude.com/en/articles/12512180-use-skills-in-claude">Use skills in Claude</a>,{" "}
          <a href="https://support.claude.com/en/articles/13119606-provisioning-and-managing-skills-for-your-organization">
            Provisioning skills for an organization
          </a>
          , <a href="https://docs.openclaw.ai/tools/skills">OpenClaw skills</a>.
        </p>
      </Section>

      <Section id="build" title="2. Build">
        <CodeBlock
          label="Classroom tutor: one folder per module, numbers set the order"
          code={'skool-kit classroom-to-skill lessons --name my-community-tutor --community-name "My Community" \\\n  --classroom-url "https://www.skool.com/my-community/classroom" -o my-skills'}
        />
        <CodeBlock label="Automation templates" code={'skillport batch my-blueprints -o my-skills --brand-name "My Community" --brand-url "https://example.com"'} />
        <p className="muted">Videos aren't transcribed: paste a transcript or notes into the lesson file.</p>
      </Section>

      <Section id="brand" title="3. Brand">
        <DefTable
          monoFirst={false}
          head={["What", "How", "Rules that stay"]}
          rows={[
            ["Skill names and descriptions", "Edit the name: and description: lines at the top of each SKILL.md", "Lowercase letters, digits and hyphens, max 64 characters, no \"claude\" or \"anthropic\""],
            ["Footer in member READMEs", "--brand-name and --brand-url", "Optional: you may remove it"],
            ["Tutor wording", "--community-name, --classroom-url, or edit SKILL.md", ""],
            ["Welcome messages", "skool-kit rules -o rules.yaml, edit, then --rules rules.yaml", ""],
            ["Reports and dashboards", "--community-name, --brand-color and similar options", ""],
            ["The tools themselves", "Rename and redistribute (MIT)", "Keep each tool's LICENSE file and copyright line in copies of the code"],
          ]}
        />
      </Section>

      <Section id="check" title="4. Check before you share">
        <CodeBlock code="skillkit lint my-skills" />
        <ul className="list">
          <li>
            <strong>Errors</strong> (broken links, leaked keys, invalid names) must be fixed. <code>pack</code> refuses a
            library with errors.
          </li>
          <li>
            <strong>needs-review</strong> warnings come from skillport. Read the skill's <em>Conversion check</em> (code
            steps, schedules, AI steps, loops, error handling that didn't carry over), fix what matters, then delete the{" "}
            <code>&lt;!-- skillport: needs-review --&gt;</code> line.
          </li>
          <li>
            <strong>frontmatter-upload-key</strong> warnings mean the Claude app would reject the skill. Remove the key.
          </li>
        </ul>
        <p>
          Then install each skill (step 5) and ask Claude to do the job on test data. That is the only check of the real
          thing.
        </p>
        <Callout tone="note" title="Optional: answers to sample inputs (costs a few API calls per case)">
          <p>
            <code>skillkit eval my-skills --cases cases.yaml --provider anthropic</code> sends each skill's instructions
            and one sample message to the model and checks the answer. It doesn't run tools, scripts or reference files.
            Save a baseline and re-run after model updates. Reports from <code>--provider fake</code> are marked demo data.
          </p>
        </Callout>
      </Section>

      <Section id="ship" title="5. Ship to members">
        <h3>Claude Code members: one plugin</h3>
        <CodeBlock code={'skillkit pack my-skills -o dist --name my-community-skills --version 1.0.0 \\\n  --author "My Community" --marketplace'} />
        <p>Push the dist folder to a GitHub repository members can read. Members then type:</p>
        <CodeBlock code={"/plugin marketplace add your-org/your-repo\n/plugin install my-community-skills@my-community-skills-marketplace"} />
        <h3>A member pack: one kit for members</h3>
        <CodeBlock code={"skool-kit pack-share member-pack -o share --version 1.0.0"} />
        <p>
          Send every member <code>share/&lt;prefix&gt;-member-kit-1.0.0.zip</code>: START-HERE.md with copyable install
          steps and a first-task walkthrough, plus one upload zip per skill. Keep <code>member-pack/</code> to yourself.
          It refuses unmerged updates and descriptions over the Claude app's 200 characters.
        </p>
        <h3>Other skills, Claude app members: one zip per skill</h3>
        <CodeBlock code={'skillkit pack my-skills -o dist --name my-community-skills --version 1.0.0 \\\n  --author "My Community" --format claude-app'} />
        <p>
          Share the zips and the generated <code>INSTALL.md</code>. Each member uploads each zip: Customize &gt; Skills
          &gt; + &gt; Create skill &gt; Upload a skill, with code execution on in Settings &gt; Capabilities.
        </p>
        <h3>Team or Enterprise organization</h3>
        <p>
          An owner uploads each zip once in Organization settings &gt; Plugins &amp; skills &gt; Add &gt; Upload a skill.
          Everyone in the organization gets it; members can turn it off but not delete it.
        </p>
        <p>
          Send members the <RouteLink to="members">Member guide</RouteLink>.
        </p>
      </Section>

      <Section id="update" title="6. Update">
        <ol className="list">
          <li>Change the source (lessons, workflows) and rebuild, or edit the skill.</li>
          <li>
            Run <code>skillkit lint</code> again.
          </li>
          <li>
            Pack with a higher <code>--version</code>, for example 1.1.0.
          </li>
          <li>
            Claude Code: push the new dist folder. Members open <code>/plugin marketplace update</code>, pick your
            marketplace and choose "Update marketplace". Claude app: members delete the old skill and upload the new zip.
            Organization owners upload the new version.
          </li>
          <li>Post a short "what changed" note for members.</li>
        </ol>
        <p className="muted">
          Updating the tools themselves: <RouteLink to="releases/upgrading">Release notes</RouteLink>.
        </p>
      </Section>

      <Section id="support" title="What members trip on">
        <DefTable
          monoFirst={false}
          head={["Problem", "Prevent it by"]}
          rows={[
            ["\"The skill doesn't show up\"", "Say which surface you support (Claude Code or the app) and link the matching steps in the member guide"],
            ["Upload rejected in the Claude app", "Run skillkit lint; fix frontmatter-upload-key and description-too-long-for-app warnings (the app accepts 200 characters); ship pack-share or pack --format claude-app zips"],
            ["\"It asks for an API key\"", "Converted skills list the accounts they need. Say which ones are required before members start"],
            ["Converted skill behaves differently from the original", "Review the Conversion check before sharing. Use a bridge skill for workflows that must stay exact"],
            ["Bridge skill shows only \"Workflow was started\"", "Set the n8n Webhook node to respond when the last node finishes, or use a Respond to Webhook node"],
          ]}
        />
      </Section>
    </div>
  );
}
