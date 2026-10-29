// All tool content lives here. Facts come from each project's README and test run.
// Change SUITE to rename the collection everywhere.

export const SUITE = {
  name: "Builder Commons",
  tagline: "Free, open-source tools for people who teach AI automation, run agencies and lead online communities.",
  license: "MIT",
  python: "3.10+",
  testedOn: "October 28, 2026",
};

export const GROUPS = [
  { id: "skills", label: "Automation & skills" },
  { id: "apps", label: "App builders" },
  { id: "agency", label: "Agencies" },
  { id: "community", label: "Community owners" },
  { id: "careers", label: "Careers & niche markets" },
];

export const TOOLS = [
  {
    id: "skillport",
    name: "skillport",
    cli: "skillport",
    group: "skills",
    tests: 238,
    tagline: "Turn n8n workflows and Make.com scenarios into Claude skills.",
    audience: ["Automation educators", "n8n / Make template libraries"],
    summary:
      "Point skillport at one blueprint or a folder of 300 and get one skill folder per workflow. Each folder works in Claude Code, the Claude app and OpenClaw, lists the accounts it needs, and includes a README your members can follow.",
    why:
      "Blueprint libraries are locked in n8n and Make format while members are moving to Claude skills. skillport converts the whole library in one run and strips API keys and account IDs on the way.",
    highlights: [
      "Branches, merges and loops written out as plain numbered steps",
      "Bridge mode keeps the workflow running in n8n and lets Claude call its webhook",
      "Batch mode with a summary table; one bad file never stops the run",
      "A browser page converts n8n JSON with nothing uploaded",
    ],
    quickstart: [
      { label: "See what's inside a workflow (writes nothing)", code: "skillport inspect my-workflow.json" },
      { label: "Make a skill folder, plus a zip to share", code: "skillport convert my-workflow.json -o skills --zip" },
      { label: "Convert a whole folder of blueprints", code: "skillport batch blueprints/ -o skills" },
      {
        label: "Bridge skill: Claude calls your live n8n webhook",
        code: "skillport convert my-workflow.json -o skills --mode bridge \\\n  --webhook-url https://your-n8n.example.com/webhook/lead-capture",
      },
    ],
    commands: [
      ["skillport inspect FILE", "Prints steps, branches, accounts, inputs and warnings. Add --format json for machines."],
      ["skillport convert FILE -o OUT", "Writes OUT/<skill-name>/ with SKILL.md, README.md and source/workflow.json."],
      ["skillport batch DIR -o OUT", "Converts every .json under DIR, prints a summary, exits 1 if any file failed."],
    ],
    options: [
      ["--zip", "Also write <skill-name>.zip"],
      ["--mode skill", "Default. Claude does the steps itself with its own tools"],
      ["--mode bridge", "Claude calls your existing n8n webhook instead (workflow must start with a Webhook node)"],
      ["--webhook-url URL", "Bridge mode: the production webhook URL. Without it, members set N8N_WEBHOOK_URL"],
      ["--brand-name, --brand-url", "Replace the \"Converted with skillport\" footer with your community's name and link"],
    ],
    example: {
      title: "Converting one workflow",
      code: `$ skillport convert lead_capture.json -o skills --zip
Converted "Lead Capture → AI Scoring 🚀" (n8n) -> skills/lead-capture-ai-scoring/
  Files: README.md, SKILL.md, source/workflow.json
  7 steps, 4 account(s) needed: OPENAI_API_KEY, SLACK_TOKEN, GMAIL_OAUTH_TOKEN, GOOGLE_SHEETS_OAUTH_TOKEN
  Zip: skills/lead-capture-ai-scoring.zip`,
    },
    example2: {
      title: "Part of the generated SKILL.md",
      code: `## Steps

3. **Score Lead**: Ask OpenAI (model GPT-4O-MINI) to write a reply.
   - System message: "You are a sales assistant. Score leads from 0 to 100. ..."
4. **Hot Lead?**: Check whether \`message.content.score\` is greater than \`70\`.
   - If \`message.content.score\` is greater than \`70\` → go to step 5 (Notify Sales)
   - Otherwise → go to step 6 (Send Nurture Email)`,
    },
    outputs: [
      ["SKILL.md", "What it does, accounts needed, inputs, numbered steps with branches, and the workflow's sticky notes"],
      ["README.md", "Setup steps in plain English for members"],
      ["source/workflow.json", "The original workflow with account IDs, pinned test data and secrets removed"],
      ["scripts/call_webhook.py", "Bridge mode only: sends JSON to your n8n webhook and prints the reply"],
    ],
    owners: [
      "Run skillport batch on your blueprint folder to get a ready skill library, then check it with skillkit lint before sharing.",
      "Treat converted skills as a starting point and test each one, especially workflows with Code nodes.",
      "Bridge skills give members something that works today, because the workflow keeps running in n8n.",
    ],
    limits: [
      "About 45 common n8n node types get a plain-English description; others get a generic line and a note to check the original.",
      "Make.com error handlers and scenario schedules are not converted.",
      "Secret removal is pattern-based. Look over the output before you publish it.",
      "Environment variable names for accounts are suggestions. Google services work best through a connected app or MCP server.",
    ],
    verify: ["n8n export field names and per-node parameters", "Make.com blueprint fields", "Where the Claude app and OpenClaw expect uploaded skills", "n8n webhook URL format"],
  },
  {
    id: "shipsafe",
    name: "shipsafe",
    cli: "shipsafe",
    group: "apps",
    tests: 350,
    tagline: "The safety check to run before a vibe-coded app goes live.",
    audience: ["Vibe-coding communities", "MVP agencies", "No-code SaaS founders"],
    summary:
      "shipsafe checks apps built with Lovable, Bolt, Cursor or Claude Code for the mistakes that hurt beginners: leaked API keys, database tables anyone can read, open Firebase rules, AI endpoints anyone can run on your bill, and admin pages with no login.",
    why:
      "Members ship real apps with real users' data. One leaked key or a surprise AI bill becomes a refund request and a bad review for the community. Every finding comes with a plain-English reason and a fix prompt to paste back into the AI coding tool.",
    highlights: [
      "36 checks across secrets, Supabase, Firebase, env files, AI endpoints and admin pages",
      "Folder scan runs fully on your computer; nothing is uploaded",
      "Secrets are never printed in full in any report format",
      "A–F grade and white-label HTML report for courses and clients",
    ],
    quickstart: [
      { label: "Check a project folder", code: "shipsafe scan ./my-app" },
      { label: "Shareable HTML report", code: "shipsafe scan ./my-app --format html -o report.html" },
      { label: "Check the live site (only sites you own)", code: "shipsafe url https://my-app.vercel.app" },
      { label: "List every check", code: "shipsafe rules" },
    ],
    commands: [
      ["shipsafe scan DIR", "Scans a local project. Skips node_modules, .git, build folders, binaries and files over 2 MB."],
      ["shipsafe url URL", "Outside-in check of a deployed app: bundled JavaScript, exposed files, security headers."],
      ["shipsafe rules", "Lists every rule with its severity."],
    ],
    options: [
      ["--format text|json|md|html", "Report format (default text)"],
      ["-o FILE", "Write the report to a file"],
      ["--fail-on critical|high|medium|low|never", "Exit code 1 when a finding this bad or worse exists (default critical). Useful in CI"],
      ["--ignore-rule ID", "Hide a rule; repeatable"],
      ["--brand-name, --brand-color, --logo-url", "White-label the HTML report"],
      ["--include-build", "scan only: also scan dist/, build/, .next/, out/"],
      ["--probe-supabase", "url only, off by default: test which Supabase tables the public key can read"],
    ],
    example: {
      title: "A leaky app",
      code: `shipsafe 0.1.0 - launch safety check
Target: ./my-app
Grade:  F  (score 0/100)  Do not launch yet: fix the critical items first.
Found:  3 critical, 4 high, 2 medium, 1 low, 1 info

1. [CRITICAL] Secret key in a public environment variable: NEXT_PUBLIC_OPENAI_API_KEY  (SS-PUBLIC-ENV-SECRET)
   Where: .env.local:4
   Found: NEXT_PUBLIC_OPENAI_API_KEY=sk-p…
   Why it matters: Variables starting with NEXT_PUBLIC_, VITE_, REACT_APP_ or EXPO_PUBLIC_ are
   copied into the JavaScript every visitor downloads, so this secret is visible to the whole internet.
   Fix prompt (copy the next line and paste it into your AI coding tool):
     The environment variable NEXT_PUBLIC_OPENAI_API_KEY (in .env.local:4) holds a secret, ...`,
    },
    ruleTable: [
      ["Secrets", "OpenAI, Anthropic, Stripe, AWS, GitHub, Google, Slack, SendGrid, Twilio, private keys, hard-coded passwords"],
      ["Supabase", "service_role key in client code, tables without Row Level Security, open policies, public storage buckets"],
      ["Environment & git", "Secrets in NEXT_PUBLIC_ / VITE_ variables, .env files not in .gitignore, missing .gitignore"],
      ["AI & admin", "AI endpoints with no login or rate limit, AI APIs called from the browser, admin pages with no auth"],
      ["Firebase", "Rules that allow writes or reads to everyone, expiring test-mode rules"],
      ["Web", "Wildcard CORS with credentials, innerHTML with dynamic values"],
      ["Live URL", "Downloadable .env or .git/config, missing security headers, tables readable with the anon key"],
    ],
    outputs: [
      ["Text", "Terminal output with numbered findings and fix prompts"],
      ["HTML", "One self-contained, print-friendly, white-label report with grade and severity counts"],
      ["JSON / Markdown", "For CI pipelines, issue trackers and course material"],
    ],
    owners: [
      "Add \"run shipsafe before you launch\" as a lesson; it fits in five minutes.",
      "Copy skills/shipsafe-audit into .claude/skills and members can say \"audit my app before launch\".",
      "Run python examples/make_demo_app.py ./demo to create a deliberately leaky app for a video.",
    ],
    limits: [
      "A fast pattern-based checklist, not a full security audit. A clean report does not prove an app is safe.",
      "Login and rate-limit detection is keyword-based, so unusual helper names can cause false alarms.",
      "SQL parsing is regex-based; tables created in the Supabase dashboard are only seen with --probe-supabase.",
      "URL mode reads scripts linked from the homepage only.",
      "Run --probe-supabase only on apps you own or have written permission to test.",
    ],
    verify: ["Supabase REST paths and key prefixes"],
  },
  {
    id: "geo-audit",
    name: "geo-audit",
    cli: "geo-audit",
    group: "agency",
    tests: 276,
    tagline: "Does ChatGPT recommend this business? A white-label AI-visibility report.",
    audience: ["SEO / GEO educators", "Local-business agencies"],
    summary:
      "geo-audit asks ChatGPT, Claude, Perplexity and Gemini the questions a customer would ask, like \"best dentist in Fresno?\", and reports whether the business is named, which competitors are named instead, and which websites the AIs trust.",
    why:
      "AI search visibility is the newest question local businesses ask. Agency members need a door-opener they can send to prospects, and the batch mode finds the businesses that need help most.",
    highlights: [
      "Four AI providers, any one is enough; free demo mode with no API keys",
      "Strict name matching: \"Smile\" alone never counts for \"Smile Dental\"",
      "Competitor leaderboard, cited websites and plain-English next steps",
      "Batch 50 prospects from a CSV, lowest visibility first",
    ],
    quickstart: [
      {
        label: "Free demo report (no API keys)",
        code: 'geo-audit run --business "Smile Dental" --city "Fresno, CA" --category dentist \\\n  --website smiledental.com --providers fake,fake-gemini,fake-claude -o demo.html',
      },
      {
        label: "Real audit with your branding",
        code: 'export OPENAI_API_KEY=sk-...   # and/or ANTHROPIC_, PERPLEXITY_, GEMINI_API_KEY\ngeo-audit run --business "Smile Dental" --city "Fresno, CA" --category dentist \\\n  --website smiledental.com -o report.html \\\n  --brand-name "Your Agency" --brand-color "#0f766e" --agency-contact "you@agency.com"',
      },
      { label: "Preview the questions before paying for anything", code: 'geo-audit questions --business "Smile Dental" --city "Fresno, CA" --category dentist' },
      { label: "A whole prospect list", code: 'geo-audit batch prospects.csv -o reports/ --brand-name "Your Agency"' },
    ],
    commands: [
      ["geo-audit run", "Audits one business and writes HTML, JSON, Markdown or CSV."],
      ["geo-audit batch CSV -o DIR", "One report per row plus summary.csv sorted by lowest visibility."],
      ["geo-audit questions", "Shows the questions without calling any AI."],
      ["geo-audit report audit.json -o FILE", "Re-brands a saved audit without asking the AIs again."],
    ],
    options: [
      ["--providers openai,anthropic,perplexity,gemini", "Choose AIs; by default every one with a key set is used"],
      ["--competitor NAME", "A competitor you already know; repeatable"],
      ["--question TEXT / --questions-file FILE", "Add your own questions or replace the built-in ones"],
      ["--web-search", "Let Claude and Gemini search the web before answering (Perplexity always does)"],
      ["--brand-name, --brand-color, --logo-url, --agency-contact", "White-label the report"],
      ["--threshold 0.9", "How strict name matching is (0.5 to 1.0)"],
    ],
    example: {
      title: "Demo run",
      code: `Asking Demo AI (fake) (10 questions)...
Asking Demo AI (gemini) (10 questions)...
Asking Demo AI (claude) (10 questions)...
Smile Dental: 58.3% AI visibility (grade B), mentioned in 14 of 24 answers. Report saved to demo.html`,
    },
    outputs: [
      ["Headline score", "Share of customer questions where the AI named the business, with an A–F grade"],
      ["Per-AI scores", "ChatGPT vs Claude vs Perplexity vs Gemini"],
      ["What to do next", "Plain-English steps such as getting listed on the review sites the AIs cite"],
      ["Who AI recommends", "Competitor leaderboard with average list position"],
      ["Question by question", "Each answer, shortened, with whether and where the business appeared"],
    ],
    owners: [
      "Give agency members the batch command and a prospect CSV template; the summary is a call list.",
      "Use the fake providers to film a demo without spending on API calls.",
    ],
    limits: [
      "AI answers change by day, account and location. A report is a snapshot, not a ranking guarantee.",
      "API answers are not identical to the consumer ChatGPT or Gemini apps.",
      "Very generic business names can match other businesses; check the question-by-question section.",
      "Competitors written in plain sentences are only found when passed with --competitor.",
    ],
    verify: ["OpenAI, Anthropic, Perplexity and Gemini endpoints, citation fields and default model names"],
  },
  {
    id: "ghl-agency-kit",
    name: "ghl-agency-kit",
    cli: "ghl-kit",
    group: "agency",
    tests: 107,
    tagline: "Onboarding, weekly client reports and config backups for GoHighLevel agencies.",
    audience: ["AI agency owners on GoHighLevel"],
    summary:
      "The delivery layer agencies are missing: set up a new client from a plan file, send a white-label weekly results report, and back up and compare a client's configuration. It works next to the GHL MCP servers you may already use.",
    why:
      "Agencies lose clients after the sale when nobody shows the results. An automatic report that says \"your AI assistant booked 14 appointments, up 40%\" is the proof that keeps them paying.",
    highlights: [
      "Safe to re-run onboarding: existing fields and tags are left alone",
      "Checklist marks pipelines, calendars and workflows as verified, partial or not found",
      "Weekly report with week-over-week change, in HTML, Markdown or JSON",
      "Built-in demo clinic account, so nothing needs a real login to try",
    ],
    quickstart: [
      {
        label: "Try the weekly report on demo data",
        code: 'ghl-kit --fake-api demo report --from 2026-10-01 --to 2026-10-07 --compare-previous \\\n  --brand-name "Peak AI Agency" --client-name "Bright Smile Dental" -o report.html',
      },
      { label: "Connect a real sub-account", code: "export GHL_TOKEN=paste-the-token-here\nexport GHL_LOCATION_ID=paste-the-location-id-here" },
      { label: "Preview a client onboarding", code: "ghl-kit onboard plan.yaml --dry-run" },
      { label: "Back up and compare a configuration", code: "ghl-kit snapshot export -o before.json\nghl-kit snapshot export -o after.json\nghl-kit snapshot diff before.json after.json" },
    ],
    commands: [
      ["ghl-kit report --from --to", "Client results for a date range, with --compare-previous for change vs the prior period."],
      ["ghl-kit onboard plan.yaml", "Creates custom fields, tags and custom values; checks the rest as a checklist."],
      ["ghl-kit snapshot export / diff", "JSON backup of pipelines, fields, tags, values, calendars and workflows, and a readable diff."],
      ["ghl-kit demo-data DIR", "Writes the demo account to a folder so you can edit it."],
    ],
    options: [
      ["--fake-api demo|DIR", "Run any command against demo data; nothing is sent anywhere"],
      ["--brand-name, --brand-color, --logo-url, --client-name", "White-label the report"],
      ["--assistant-name, --currency-symbol, --timezone", "Change report wording and formatting"],
      ["--dry-run", "onboard: show what would happen without changing anything"],
      ["--strict", "onboard: exit 1 while checklist items are still open"],
      ["--exit-code", "snapshot diff: exit 1 when something changed (for cron or CI)"],
    ],
    example: {
      title: "Report highlights (demo data)",
      code: `- Your AI assistant booked 14 appointments, up 40% vs last week.
- 25 new leads came in, up 39% vs last week.
- 10 of 13 finished appointments showed up (77% show rate).
- You won 3 deals worth $5,480, up 99% vs last week.
- There is $15,000 in open pipeline across 6 opportunities.
- 42 conversations had activity, up 35% vs last week.`,
    },
    example2: {
      title: "Configuration diff",
      code: `Pipelines:
  ~ Patient Pipeline
      stage 'Showed Up' name: 'Showed' -> 'Showed Up'
Tags:
  + no-show-follow-up
Calendars:
  - Cleaning
Workflows:
  ~ Missed Call Text Back
      status: 'draft' -> 'published'

1 added, 1 removed, 2 changed.`,
    },
    outputs: [
      ["report.html", "Email-friendly, white-label client report"],
      ["onboarding.html", "What was created, what already existed, and the open checklist"],
      ["snapshot JSON", "A comparison backup (not a GHL Snapshot you can load back)"],
    ],
    owners: [
      "Ship the two included Claude skills so members can say \"send this week's report for Bright Smile\".",
      "Compare a client account against your template account to catch drift.",
    ],
    limits: [
      "Tested against the built-in fake API only, not a live account yet.",
      "Phone numbers, A2P registration and AI agent setup cannot be read through the API and stay manual checks.",
      "Pipeline value is a current number, so it has no week-over-week change.",
      "Very large accounts take longer, because reports page through all records.",
    ],
    verify: ["Every GHL API v2 path, query parameter and field name (kept in one endpoints file)"],
  },
  {
    id: "voice-qa",
    name: "voice-qa",
    cli: "voice-qa",
    group: "agency",
    tests: 191,
    tagline: "Test an AI phone receptionist before it answers a client's calls.",
    audience: ["Voice AI agencies", "AI sales-rep builders"],
    summary:
      "voice-qa plays ten realistic callers per industry, from the angry customer to the \"are you a robot?\" caller and the prompt-injection prank, and produces a pass/fail scorecard a client can read, plus JSON and JUnit XML for CI.",
    why:
      "A receptionist that gives medical advice or lies about being human loses the client on day one. A scorecard also shows the client exactly what was fixed, which supports a higher price.",
    highlights: [
      "Six industry packs: dental, HVAC, law firm, restaurant, med spa, real estate",
      "Works with a prompt file, Vapi or Retell exports, or any webhook",
      "Critical checks for emergencies, honesty, injection, advice and prices",
      "Before/after comparison shows the client what improved",
    ],
    quickstart: [
      { label: "List the industry packs", code: "voice-qa packs" },
      { label: "Demo run, no API key", code: "voice-qa run --agent scripted --pack dental -o out/" },
      {
        label: "Your agent's prompt, played by Claude or OpenAI",
        code: 'export ANTHROPIC_API_KEY=sk-ant-...\nvoice-qa run --agent prompt --prompt-file my_prompt.txt \\\n  --pack dental --business-name "Smile Dental" -o out/',
      },
      { label: "A Vapi assistant export", code: "voice-qa run --agent vapi-config --config-file assistant.json --pack dental -o out/" },
      { label: "In CI: fail below 85%", code: 'voice-qa run --agent http --url "$AGENT_URL" --pack dental -o qa/ --fail-under 85' },
    ],
    commands: [
      ["voice-qa run", "Runs a pack against an agent and writes scorecard.html, results.json and junit.xml."],
      ["voice-qa report results.json -o FILE", "Re-creates a report, optionally with --compare."],
      ["voice-qa packs", "Lists bundled packs."],
      ["voice-qa validate-pack FILE", "Checks a custom pack."],
    ],
    options: [
      ["--agent prompt|vapi-config|retell-config|http|scripted", "How to reach the agent under test"],
      ["--knowledge-file FILE", "The business's real prices and facts; amounts in it are allowed in replies"],
      ["--compare previous.json", "Show regressions and fixes since the last run"],
      ["--caller llm", "Let an AI improvise the caller instead of the fixed script"],
      ["--judge-provider", "Turn on AI-reviewer checks"],
      ["--brand-name, --brand-color, --logo-url, --agency-contact", "White-label the scorecard"],
    ],
    example: {
      title: "A receptionist that is not ready",
      code: `Voice QA for Smile Dental  (pack: dental, agent: Demo receptionist (bad) (scripted))

  PASS   100%  Books an appointment
  FAIL    20%  Calms an angry customer
               -> The agent never said any of: "sorry", "apologize", ...
  FAIL    20%  Handles an emergency correctly
               -> The agent never said any of: "911", "emergency room", "er", "emergency". ...
  ...
Overall: 35% (grade F), 2 of 10 calls passed.`,
    },
    outputs: [
      ["scorecard.html", "Client-facing, print-friendly, white-label; includes a \"What to fix\" section"],
      ["results.json", "Keep it for --compare next time"],
      ["junit.xml", "For GitHub Actions, GitLab or Jenkins"],
    ],
    owners: [
      "Teach the before/after scorecard as part of the agency delivery process.",
      "Write a pack for your niche in YAML and check it with validate-pack.",
    ],
    limits: [
      "Text only: no speech recognition, voices, latency, interruptions or real phone lines.",
      "Transfers, bookings and other tool calls are not simulated.",
      "Rule checks look for phrases; language detection knows English and Spanish.",
    ],
    verify: ["OpenAI and Anthropic endpoints", "Vapi and Retell export field names"],
  },
  {
    id: "skillkit",
    name: "skillkit",
    cli: "skillkit",
    group: "skills",
    tests: 247,
    tagline: "Lint, test and package a library of Claude skills.",
    audience: ["Communities that sell skill and prompt libraries"],
    summary:
      "skillkit checks every skill for mistakes, tests skills on sample inputs so you notice when a model update breaks them, and packages the whole library as one installable Claude Code plugin.",
    why:
      "The library is the product. A skill with a broken link, a leaked key or a name Claude refuses to load is a support ticket, and a recipe that quietly stops working after a model update is a cancellation.",
    highlights: [
      "21 lint rules with file, line and a plain-English fix",
      "Safe auto-fix for names, whitespace and missing headers",
      "Regression testing against a saved baseline after model updates",
      "Packs a Claude Code plugin with marketplace file and zip",
    ],
    quickstart: [
      { label: "Check a whole library", code: "skillkit lint my-skills" },
      { label: "Fix the safe things automatically", code: "skillkit lint my-skills --fix" },
      { label: "Test skills without an API key", code: "skillkit eval my-skills --cases cases.yaml --provider fake" },
      {
        label: "Package as a Claude Code plugin",
        code: 'skillkit pack my-skills -o dist --name my-skills --version 1.0.0 \\\n  --author "Your Community" --marketplace --zip',
      },
    ],
    commands: [
      ["skillkit lint PATH", "Checks one skill or a library. Exit 1 on errors."],
      ["skillkit eval PATH --cases FILE", "Runs test cases and checks answers against assertions."],
      ["skillkit pack LIBRARY -o OUT", "Builds a plugin; refuses to pack a library with lint errors."],
      ["skillkit new NAME", "Creates a skill that already passes the checks."],
    ],
    options: [
      ["--format text|json|github", "lint: github prints annotations on pull requests"],
      ["--strict", "lint: warnings count as errors"],
      ["--provider anthropic|openai|fake", "eval: which AI answers the test cases"],
      ["--baseline FILE", "eval: list cases that passed before and fail now"],
      ["--format clawhub", "pack: flat folder per skill plus index.json"],
    ],
    example: {
      title: "Lint output",
      code: `my-skills/claude-helper/SKILL.md:2: error [name-reserved] Name "claude-helper" contains the reserved word "claude". Pick another name.
my-skills/blog/SKILL.md:8: error [broken-link] "references/guide.md" is referenced but does not exist in the skill folder.
my-skills/blog/SKILL.md:3: warning [description-no-when] The description should say when to use the skill (e.g. "Use when ...").

Checked 12 skills: 2 errors, 1 warning.`,
    },
    example2: {
      title: "A test case file",
      code: `cases:
  - skill: summarize-email
    id: three-bullets
    input: "Hi team, the launch moves to Friday ..."
    assert:
      - contains: "Summary:"
      - not_contains: "As an AI"
      - max_chars: 400
      - llm_rubric: "Has three bullet points and a reply."`,
    },
    outputs: [
      ["Lint report", "Text, JSON or GitHub annotations"],
      ["Eval report", "Text, JSON or a single HTML file to share with members"],
      ["Plugin", "plugin.json, skills/, optional marketplace.json and zip"],
    ],
    owners: [
      "Put skillkit lint skills --format github in a GitHub Action so every change is checked.",
      "Run eval after each model release and share the HTML report as proof the library still works.",
    ],
    limits: [
      "The \"when to use\" check is a simple word check.",
      "Secret detection covers common key formats only.",
      "eval sends one message per case, so it tests the instructions, not the full agent loop.",
    ],
    verify: ["Claude Code plugin and marketplace fields", "SKILL.md limits", "ClawHub bundle format"],
  },
  {
    id: "skool-owner-kit",
    name: "skool-owner-kit",
    cli: "skool-kit",
    group: "community",
    tests: 153,
    tagline: "Welcome messages, churn-risk dashboard and a classroom tutor for Skool owners.",
    audience: ["Every Skool community owner"],
    summary:
      "Personalised first-week paths for new members, a dashboard that shows who is going quiet before they cancel, and a Claude or OpenClaw tutor skill built from your own lessons.",
    why:
      "Retention is revenue. The kit uses only your own data: CSV exports you download and Zapier events you send it. It never scrapes Skool, never logs in as you, and never needs your password or cookies.",
    highlights: [
      "Reads Skool exports with loose column matching and any date format",
      "Join answers decide the segment, goal, lessons and first action",
      "Zapier webhook for automatic welcomes",
      "Lessons become a tutor skill that cites lesson titles",
    ],
    quickstart: [
      { label: "Check your export", code: "skool-kit inspect members.csv" },
      { label: "Welcome messages for new members", code: 'skool-kit onboard members.csv --since 2026-10-14 --community-name "AI Builders" -o messages.md' },
      { label: "Churn-risk dashboard", code: "skool-kit health members.csv --activity activity.csv -o dashboard.html --at-risk at_risk.csv" },
      {
        label: "Classroom to tutor skill",
        code: 'skool-kit classroom-to-skill lessons/ --name ai-builders-tutor --community-name "AI Builders" \\\n  --classroom-url "https://www.skool.com/your-community/classroom" -o skills-out/',
      },
    ],
    commands: [
      ["skool-kit inspect CSV", "Shows which columns were detected and which rows were skipped."],
      ["skool-kit onboard CSV", "Writes a welcome message and first-week path per new member."],
      ["skool-kit webhook", "Receives Zapier new-member events and returns or forwards the message."],
      ["skool-kit health CSV", "Engagement KPIs and a 0–100 churn-risk score per member."],
      ["skool-kit classroom-to-skill DIR", "Builds a tutor skill with a lesson index and references."],
      ["skool-kit rules -o rules.yaml", "Writes the default rules so you can use your own lesson names."],
    ],
    options: [
      ["--map \"Column=field\"", "Point a column the tool missed at the right field"],
      ["--rules rules.yaml", "Your keywords, lesson titles and message wording"],
      ["--llm anthropic|openai", "Optional AI personalisation; falls back to the template on any error"],
      ["--secret, --forward-url", "webhook: shared secret and where to forward each message"],
      ["--threshold", "health: the at-risk cut-off"],
    ],
    example: {
      title: "A generated welcome",
      code: `Hey Ana, welcome to AI Builders! Since you want to land your first client, here's your first week:
1. Start Here: How This Community Works
2. The AI Agency Offer That Sells
3. Finding Your First Client in 7 Days
Your first action: Write down 10 local businesses you could help and share your niche in the wins channel.
Reply here if you get stuck. Happy to help!`,
    },
    example2: { title: "Dashboard summary", code: "36 members, 77.8% active in 30 days, 15 at risk (8 paying)." },
    outputs: [
      ["messages.csv / .md", "One message per new member, ready to review and send"],
      ["dashboard.html", "Active %, new members per week, cohort retention, risk bands, top contributors"],
      ["at_risk.csv", "At-risk members with a suggested re-engagement message"],
      ["Tutor skill", "SKILL.md plus references/<module>/<lesson>.md"],
    ],
    owners: [
      "Export members weekly and stack the files to unlock posting trends in the risk score.",
      "Review messages before sending; the rules are simple and transparent.",
    ],
    limits: [
      "Skool's export columns and Zapier field names are not publicly documented; run inspect first.",
      "An export lists current members only, so retention means activity by join month, not cancellations.",
      "Classroom videos are not transcribed; paste transcripts into lesson files.",
    ],
    verify: ["Skool export column names", "Zapier new-member field names"],
  },
  {
    id: "career-labs",
    name: "career-labs",
    cli: "python -m labgrade",
    group: "careers",
    tests: 72,
    tagline: "Auto-graded hands-on labs for data, security, SRE and MLOps careers.",
    audience: ["Career-coaching communities", "Bootcamps"],
    summary:
      "Six realistic work tasks with starter code. Members fill them in, run one command, and get a score with a hint for every failed check. Works locally or with GitHub Classroom.",
    why:
      "Members in career communities are paid by outcomes. A graded lab is both practice for the interview and a portfolio piece worth showing.",
    highlights: [
      "Every reference solution scores 100%; every starter scores 0–10%",
      "The security lab runs real exploits against the member's code",
      "Deterministic data with generators and an independent answer check",
      "GitHub Classroom workflow and autograding file included",
    ],
    labs: [
      ["de-01-orders-pipeline", "Data engineering", "Messy CSVs into SQLite: dedupe, FX conversion, daily revenue, customer LTV, SCD type 2", 9],
      ["de-02-sql-interview", "Data engineering", "8 interview SQL questions: windows, top-N, cohorts, gaps and islands", 8],
      ["sec-01-log-forensics", "Cybersecurity", "SSH brute force, compromised account, SQLi and path traversal, incident timeline", 10],
      ["sec-02-secure-code-review", "Cybersecurity", "Fix SQL injection, path traversal, weak hashing, unsafe pickle and YAML", 10],
      ["ops-01-incident-drill", "DevOps / SRE", "Error budget and burn rate, spike detection, deploy correlation, postmortem, config fix", 9],
      ["ml-01-mlops-basics", "MLOps", "Logistic regression from scratch, ROC-AUC, PSI drift detection, model card", 9],
    ],
    quickstart: [
      { label: "Install the grader's requirements", code: "python -m pip install pytest pyyaml" },
      { label: "List labs", code: "python -m labgrade list" },
      { label: "Grade your work", code: "python -m labgrade run de-01-orders-pipeline" },
    ],
    commands: [
      ["python -m labgrade list", "Lists the labs (--json for machines)."],
      ["python -m labgrade run LAB", "Grades the starter folder, or another copy with --solution PATH."],
      ["python -m labgrade classroom", "Prints a GitHub Classroom autograding.json."],
    ],
    options: [
      ["--solution starter|reference|PATH", "Which copy to grade (default starter)"],
      ["--json", "Score, percent and per-check results"],
      ["--fail-under PCT", "Exit 1 below this percentage"],
      ["--test NAME", "Run one check"],
    ],
    example: {
      title: "The untouched code-review starter",
      code: `Lab: sec-02-secure-code-review   (solution: starter)

  PASS    5/5   test_find_user_normal                  normal behaviour: create_user + find_user work
  FAIL    0/15  test_find_user_sql_injection           SQL injection: must use parameters, not string formatting
            -> AssertionError: login bypass: ' OR '1'='1 returned a user
  ...
Score: 10/100 points (10%)  - 2/10 checks passed`,
    },
    outputs: [
      ["Terminal score", "Points per check with a hint line for each failure"],
      ["JSON", "For dashboards and leaderboards"],
      ["Classroom config", "Workflow and autograding.json for assignments"],
    ],
    owners: [
      "Hand out one lab a week; members post their 100/100 screenshot.",
      "Fork and rebrand freely; the labs are MIT licensed.",
      "Delete reference/ before giving a lab to members.",
    ],
    limits: [
      "No .NET lab yet, and no Docker or cloud labs.",
      "Graders are visible to members by design; keep them private for assessed use.",
      "Security numbers such as PBKDF2 iterations follow common guidance; check current OWASP advice.",
    ],
    verify: ["GitHub Classroom action names and inputs"],
  },
  {
    id: "vertical-packs",
    name: "vertical-packs",
    cli: "vpacks",
    group: "careers",
    tests: 305,
    tagline: "Calculators and Claude skills for five niche business communities.",
    audience: ["Airbnb hosts", "Property managers", "Real estate investors", "Freight brokers", "Self-published authors"],
    summary:
      "Each pack is a calculator or checker you run from the command line, plus a Claude skill that tells Claude how to run it and explain the results in plain English. No API keys, works offline.",
    why:
      "Niche communities want tools that speak their numbers: cap rate, DSCR, rate per mile, KDP keyword limits. Each pack answers one real question in seconds.",
    highlights: [
      "Hand-checked math: $300k at 7% over 30 years = $1,995.91 a month",
      "Maintenance triage understands negation (\"no leak\") and emergencies",
      "Text, Markdown or JSON output for Skool posts and automations",
      "Clear errors for impossible inputs like 120% occupancy",
    ],
    packs: [
      ["str", "Airbnb / short-term rental hosts", "listing, revenue, message"],
      ["pm", "Landlords and property managers", "triage (one request or a CSV queue)"],
      ["rei", "Real estate investors", "rental, flip, brrrr"],
      ["freight", "Freight brokers, small carriers", "load, carrier"],
      ["kdp", "Self-published authors", "check"],
    ],
    quickstart: [
      { label: "Analyse a rental", code: "vpacks rei rental --purchase-price 300000 --down-payment-pct 0 --interest-rate-pct 7 --monthly-rent 2500" },
      { label: "Triage a maintenance request", code: 'vpacks pm triage --text "No leak, but I smell gas near the stove" --emergency-phone "555-0100"' },
      { label: "Check a freight load", code: "vpacks freight load --input examples/freight/load.json" },
      { label: "Check book metadata", code: "vpacks kdp check examples/kdp/book.json" },
    ],
    commands: [
      ["vpacks str listing | revenue | message", "Listing score and fixes, 12-month P&L, guest message templates."],
      ["vpacks pm triage", "Category, urgency, safety instructions, vendor type and response target."],
      ["vpacks rei rental | flip | brrrr", "Cash flow and ratios, 70% rule offer, refinance outcome."],
      ["vpacks freight load | carrier", "Go/no-go on a load, carrier vetting risk score."],
      ["vpacks kdp check", "Title, keyword, description, category and series checks."],
    ],
    options: [
      ["--format text|json|md", "Terminal, automations, or paste into Skool and Notion"],
      ["--input FILE", "Read inputs from JSON; flags override file values"],
      ["--strict", "kdp: exit 1 when there are errors"],
    ],
    example: {
      title: "Rental analysis",
      code: `$ vpacks rei rental --input examples/rei/rental.json
Returns & ratios
----------------
NOI (annual)        $14,400.00
Cash flow (annual)  $2,888.63
Cap rate            7.20%
Cash-on-cash        6.42%
DSCR                1.25
1% rule             1.00% -> pass`,
    },
    example2: {
      title: "Emergency triage",
      code: `EMERGENCY maintenance request
Urgency             EMERGENCY
Emergency type      gas smell
Call 911 first      YES
Tell the tenant now
- Leave the home now. Don't flip light switches, light flames or use your phone inside.
- Once you are safe, call our emergency maintenance line: 555-0100.`,
    },
    outputs: [
      ["Claude skills", "skills/vpacks-str, -pm, -rei, -freight, -kdp"],
      ["Examples", "Sample input files for every command"],
    ],
    owners: [
      "Copy one skill into Claude and members can just ask \"Analyze this rental: 200k, 20% down, 6%, rent 2,000\".",
      "Use --format md to post results straight into a community thread.",
    ],
    limits: [
      "Platform limits (Airbnb, KDP, insurance minimums) are kept in one constants dict per pack; check them against current guidelines.",
      "Carrier vetting does not query FMCSA; you enter what the record shows.",
      "Results are screening estimates, not financial, tax or legal advice. Triage is not a substitute for calling 911.",
    ],
    verify: ["Airbnb title limit and host fee", "KDP metadata limits", "Carrier insurance minimums"],
  },
];

export const TOTAL_TESTS = TOOLS.reduce((sum, t) => sum + t.tests, 0);
