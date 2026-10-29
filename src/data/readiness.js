// What each integration has been tested against. Single source for the site and ../READINESS.md
// (regenerate that file with `npm run readiness`). Never mark an integration "live" without a date,
// the version or plan you checked, and what you ran.

export const STATUSES = {
  local: { label: "Works locally", tone: "ok", text: "Runs end to end on a local machine with the bundled sample data. No outside service involved." },
  fixture: { label: "Fakes only", tone: "warn", text: "Tested against fakes, fixtures or a local test server built from public docs. Not yet run against the real service." },
  live: { label: "Live verified", tone: "info", text: "Run against the real service on the date and version shown." },
  experimental: { label: "Unverified", tone: "danger", text: "Best guess from public information, or not supported. Check before relying on it." },
};

// [integration, status, evidence or what is missing, live check {date, version, what} or null]
export const READINESS = {
  skillport: [
    ["n8n workflow JSON import", "fixture", "Fixtures modelled on public exports. Top-level fields (nodes, connections keyed by node name) match n8n's API schema, checked 2026-10-29; per-node parameters are not verified.", null],
    ["Make.com blueprint import", "fixture", "Fixtures modelled on public blueprints. No official schema found.", null],
    ["Bridge skill calling an n8n webhook", "fixture", "Tested against a local test server. Webhook auth options match n8n docs (checked 2026-10-29). Not run against a real n8n instance.", null],
    ["Generated skill loads in Claude Code / Claude app", "fixture", "Output passes skillkit lint, whose rules follow the official skill limits (checked 2026-10-29). Not loaded in a live session.", null],
    ["Browser converter (web/index.html)", "local", "Its JavaScript runs under the test suite with Node.", null],
  ],
  skillkit: [
    ["lint, new, pack (files on disk)", "local", "Runs on the bundled sample library.", null],
    ["eval with Anthropic Messages API", "fixture", "Request and response shapes tested against fakes.", null],
    ["eval with OpenAI-compatible APIs", "fixture", "Request and response shapes tested against fakes.", null],
    ["Claude Code plugin + marketplace from pack", "fixture", "Layout follows Claude Code plugin docs (checked 2026-10-29). Not installed in a live session.", null],
    ["Claude app upload zips from pack --format claude-app", "fixture", "Zip layout follows the Claude help center (checked 2026-10-29). Not uploaded to a live account.", null],
    ["ClawHub bundle from pack --format clawhub", "experimental", "Layout is a best guess.", null],
  ],
  "skool-owner-kit": [
    ["Classroom files to tutor skill", "local", "Runs on the bundled sample classroom.", null],
    ["Welcome messages and dashboard from CSV", "local", "Runs on the bundled sample export.", null],
    ["Real Skool member export columns", "experimental", "Skool doesn't document its export columns. Columns are matched loosely; run skool-kit inspect first.", null],
    ["Zapier webhook receiver", "fixture", "Tested with a local HTTP server. Trigger names (Answered Membership Questions, New Paid Member) checked against Skool and Zapier pages 2026-10-29; field names in real Zap payloads not seen.", null],
    ["AI-personalised messages (Anthropic / OpenAI)", "fixture", "Tested against fakes. Falls back to the template message on any failure.", null],
  ],
  shipsafe: [
    ["Folder scan (secrets, config, code checks)", "local", "Runs on the bundled demo app.", null],
    ["URL scan and Supabase checks", "fixture", "Tested against a local test server and fakes.", null],
  ],
  "geo-audit": [
    ["Demo provider", "local", "Runs offline with canned answers (reports are marked demo data).", null],
    ["OpenAI", "fixture", "Tested against saved response fixtures.", null],
    ["Anthropic (web search tool)", "fixture", "Tested against saved response fixtures.", null],
    ["Perplexity", "fixture", "Tested against saved response fixtures.", null],
    ["Gemini", "fixture", "Tested against saved response fixtures.", null],
  ],
  "ghl-agency-kit": [
    ["Demo account (fake API)", "local", "Runs offline (reports are marked demo data).", null],
    ["GoHighLevel API v2", "fixture", "Tested against a built-in fake API and a local server. Endpoint versions not checked against a live sub-account.", null],
  ],
  "voice-qa": [
    ["Scripted demo receptionist", "local", "Runs offline (reports are marked demo data).", null],
    ["Your agent over an HTTP webhook", "fixture", "Tested against a local test server.", null],
    ["Simulated caller via OpenAI / Anthropic", "fixture", "Tested against fakes.", null],
    ["Vapi / Retell assistant import", "fixture", "Tested against hand-written export files.", null],
    ["Audio or phone calls", "experimental", "Not supported: voice-qa tests text conversations only.", null],
  ],
  "career-labs": [
    ["Labs and local grader", "local", "Every reference solution scores 100%; starters score lower.", null],
    ["GitHub Classroom autograding workflow", "experimental", "Not run on GitHub.", null],
  ],
  "vertical-packs": [
    ["Calculators and checks", "local", "Run offline on the bundled examples.", null],
    ["Platform limits (Airbnb, KDP, carrier insurance)", "experimental", "Kept in one constants file per pack; not checked against current platform rules.", null],
  ],
};

export function readinessSummary() {
  const counts = { local: 0, fixture: 0, live: 0, experimental: 0 };
  for (const rows of Object.values(READINESS)) for (const r of rows) counts[r[1]] += 1;
  return counts;
}
