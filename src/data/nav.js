// Pages, their sections and search keywords. Section ids are used for deep links: #page/section.
export const PAGES = [
  { id: "home", group: "Evaluate", label: "1. The outcome", sections: [
    ["outcome", "What members complete", "tasks offer outreach tutor deliverable"],
    ["better", "Why this beats the lessons alone or a general AI assistant", "chatgpt general ai comparison"],
    ["receive", "What you receive, and what stays with you", "deliverables time effort responsibility claude plan"],
    ["verified", "What has actually been verified", "evidence verified live run"],
    ["money", "How it might earn or save money", "renewal support money roi"],
    ["free", "Free software, paid pilot", "license mit price paid maintenance"],
  ] },
  { id: "example", group: "Evaluate", label: "2. A real run", sections: [
    ["content", "The admin's content", "lessons pack.yaml"],
    ["runs", "The runs", "claude code runs results acceptance"],
    ["offer", "The offer task, after the fix", "offer niche price gaps"],
    ["defect", "The defect we found and fixed", "defect unsupported claim fix"],
    ["conflict", "Conflicting member input", "conflict price guarantee"],
    ["escalation", "When the lessons don't cover it", "not covered coach escalation"],
    ["evidence", "What this does and doesn't show", "evidence limits"],
    ["try", "Try it yourself", "download sample"],
  ] },
  { id: "fit", group: "Evaluate", label: "3. Check fit", sections: [
    ["questions", "Fit questions", "fit discovery questions poor fit"],
    ["good", "A good fit looks like", "good fit"],
  ] },
  { id: "value", group: "Evaluate", label: "4. Estimate economics", sections: [
    ["inputs", "Your numbers", "calculator roi renewal price members support validation"],
    ["results", "What it adds up to", "payback break-even net cash future"],
    ["monthly", "Cumulative cash, month by month", "cohort monthly cash flow"],
    ["how", "How it's calculated", "formula model cohort"],
  ] },
  { id: "pilot", group: "Evaluate", label: "5. Scoped pilot", sections: [
    ["scope", "Scope", "scope lessons skills cohort"],
    ["deliverables", "Deliverables and acceptance criteria", "deliverables acceptance revisions"],
    ["you", "What you provide and what stays yours", "inputs responsibilities"],
    ["effort", "Effort (estimates)", "hours effort time"],
    ["limits", "Dependencies, exclusions and failures", "exclusions dependencies maintenance fail"],
    ["process", "How it runs", "process steps"],
    ["measure", "How the pilot is measured", "pilot baseline cohort thresholds report"],
    ["enquire", "Enquire about a scoped pilot", "contact enquire buy"],
  ] },
  { id: "admins", group: "Use it", label: "Admin guide", sections: [
    ["choose", "1. Choose what to build", "lessons classroom n8n make bridge claude code claude app team enterprise openclaw"],
    ["build", "2. Build", "classroom-to-skill batch convert"],
    ["brand", "3. Brand", "name logo footer license notice rename"],
    ["check", "4. Check before you share", "lint needs-review eval upload key"],
    ["ship", "5. Ship to members", "pack plugin marketplace zip upload organization"],
    ["update", "6. Update", "version marketplace update release"],
    ["support", "What members trip on", "support problems faq"],
  ] },
  { id: "members", group: "Use it", label: "Member guide", sections: [
    ["which", "What did you get?", "skill plugin tool zip"],
    ["skill", "Install a skill", "claude app upload claude code skills folder openclaw windows"],
    ["plugin", "Install a plugin", "marketplace plugin install update"],
    ["keys", "Connections and API keys", "api key environment variable connector mcp slack google"],
    ["result", "Understand the result", "demo data conversion check grade"],
    ["trouble", "Troubleshooting", "error command not found powershell execution policy pip externally-managed 404"],
  ] },
  { id: "start", group: "Use it", label: "Install & downloads", sections: [
    ["downloads", "Downloads", "zip download sha256 checksum version"],
    ["python", "1. Get Python", "python install windows mac linux"],
    ["install", "2. Install in a private environment", "venv activate pip powershell"],
    ["check", "3. Check it worked", "version first run"],
    ["upgrade", "Upgrade or remove", "upgrade uninstall update"],
    ["codes", "Exit codes", "exit code ci github action"],
  ] },
  { id: "compare", group: "Reference", label: "Compare tools", sections: [
    ["table", "Tools side by side", "prerequisites cost output readiness use case"],
  ] },
  { id: "trust", group: "Reference", label: "Readiness & data", sections: [
    ["evidence", "Member pack: evidence by level", "evidence verified claude code app"],
    ["readiness", "Integration readiness", "live verified fakes fixtures unverified"],
    ["data", "Data and costs", "privacy data api cost keys"],
    ["tests", "Automated tests", "tests pytest"],
    ["license", "License", "mit license notice rebrand"],
  ] },
  { id: "releases", group: "Reference", label: "Release notes", sections: [
    ["latest", "Latest release", "changelog what changed"],
    ["upgrading", "Upgrading", "upgrade reinstall"],
  ] },
];

export const PAGE_IDS = PAGES.map((p) => p.id);
export const PAGE_GROUPS = [...new Set(PAGES.map((p) => p.group))];
