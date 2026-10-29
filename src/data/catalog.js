// Buyer-facing facts per tool: where it sits in the offer, what it needs, what it costs to run and the first
// command to try with the files that ship in its download. `npm test` checks the example paths exist.

export const STARTER = ["skool-owner-kit", "skillport", "skillkit"];

export const CATALOG = {
  "skool-owner-kit": {
    tier: "starter",
    version: "0.2.0",
    useCase: "Turn your classroom into a tutor skill; welcome and re-engage members",
    needs: "Python 3.10+. Your lesson text and Skool CSV exports. Zapier (Skool Pro plan) only for automatic welcomes",
    cost: "Free. Optional AI-written messages use your Anthropic or OpenAI key",
    produces: "Tutor skill folder, welcome messages, HTML dashboard",
    firstRun: {
      code: 'skool-kit classroom-to-skill examples/classroom --name ai-builders-tutor \\\n  --community-name "AI Builders" -o my-skills',
      expect: "Created my-skills/ai-builders-tutor: 5 lessons in 3 modules, 7 reference files.",
    },
  },
  skillport: {
    tier: "starter",
    version: "0.2.0",
    useCase: "Turn n8n / Make.com templates into skills members can use in Claude",
    needs: "Python 3.10+. Exported workflow JSON files",
    cost: "Free. Converted skills may need the same services the workflow used",
    produces: "One skill folder (and zip) per workflow, with a Conversion check list",
    firstRun: {
      code: "skillport batch examples -o my-skills",
      expect: "A table with 3 rows marked OK, then: 3 skill(s) written to …/my-skills.",
    },
  },
  skillkit: {
    tier: "starter",
    version: "0.2.0",
    useCase: "Check, test and package a skill library for members",
    needs: "Python 3.10+. A folder of skills",
    cost: "Free. eval with a real model costs a few API calls per test case",
    produces: "Lint report, eval report, Claude Code plugin or Claude app upload zips",
    firstRun: {
      code: "skillkit lint examples/skills\nskillkit pack examples/skills -o dist --name demo-skills --author \"Your Community\" --format claude-app",
      expect: "Checked 2 skills: 0 errors, 0 warnings. Then: 2 upload zip(s), one per skill.",
    },
  },
  shipsafe: {
    tier: "more",
    version: "0.1.1",
    useCase: "Pre-launch check of an AI-built app for common mistakes",
    needs: "Python 3.10+. The app's source folder",
    cost: "Free",
    produces: "Graded findings with fix prompts (text, HTML, JSON, Markdown)",
    firstRun: {
      code: "python examples/make_demo_app.py demo-app\nshipsafe scan demo-app",
      expect: "Grade: F on the deliberately leaky demo app, with numbered findings and fix prompts.",
    },
  },
  "geo-audit": {
    tier: "more",
    version: "0.1.1",
    useCase: "Show a local business how AI assistants answer about it",
    needs: "Python 3.10+. For real runs: a key for at least one of OpenAI, Anthropic, Perplexity, Gemini",
    cost: "Demo free. Real runs: questions × providers API calls",
    produces: "White-label AI-visibility report (HTML, JSON, Markdown, CSV)",
    firstRun: {
      code: 'geo-audit run --business "Smile Dental" --city "Fresno, CA" --category dentist \\\n  --website smiledental.com --providers fake,fake-gemini,fake-claude -o demo.html',
      expect: "Smile Dental: 58.3% AI visibility (grade B) … Report saved to demo.html (marked demo data).",
    },
  },
  "ghl-agency-kit": {
    tier: "more",
    version: "0.1.1",
    useCase: "Weekly client reports, onboarding and config backups on GoHighLevel",
    needs: "Python 3.10+. For real runs: a GoHighLevel private integration token and location ID",
    cost: "Free (uses your GoHighLevel plan)",
    produces: "Client report, onboarding checklist, configuration snapshots",
    firstRun: {
      code: 'ghl-kit --fake-api demo report --from 2026-10-01 --to 2026-10-07 --compare-previous \\\n  --client-name "Bright Smile Dental" -o report.html',
      expect: "report.html with the demo-data banner and week-over-week numbers.",
    },
  },
  "voice-qa": {
    tier: "more",
    version: "0.1.1",
    useCase: "Test an AI receptionist's answers with simulated text conversations",
    needs: "Python 3.10+. For real runs: your agent's prompt, export or webhook, and an AI key for the simulated caller",
    cost: "Demo free. Real runs: several API calls per conversation",
    produces: "Scorecard (HTML), results.json, JUnit XML",
    firstRun: {
      code: "voice-qa run --agent scripted --pack dental -o out/",
      expect: "A pass/fail summary and out/scorecard.html marked as demo data.",
    },
  },
  "career-labs": {
    tier: "more",
    version: "0.1.1",
    useCase: "Graded practice labs for data, security, SRE and MLOps careers",
    needs: "Python 3.10+",
    cost: "Free",
    produces: "A score with a hint for every failed check",
    firstRun: {
      code: "labgrade list\nlabgrade run de-01-orders-pipeline",
      expect: "The six labs, then a low score for the untouched starter code with a hint per failed check.",
    },
  },
  "vertical-packs": {
    tier: "more",
    version: "0.1.1",
    useCase: "Calculators and checks for Airbnb, landlord, investor, freight and KDP communities",
    needs: "Python 3.10+",
    cost: "Free",
    produces: "Results in text, Markdown or JSON, plus five skills",
    firstRun: {
      code: "vpacks rei rental --input examples/rei/rental.json",
      expect: "NOI, cash flow, cap rate 7.20%, DSCR 1.25 and the 1% rule check.",
    },
  },
};
