// Pages, their sections and search keywords. Section ids are used for deep links: #page/section.
export const PAGES = [
  { id: "home", group: "Evaluate", label: "The offer", sections: [
    ["offer", "The offer", "who problem receive members accomplish pay"],
    ["costs", "Effort, costs and limits", "time claude plan chatgpt cost limits"],
    ["free", "What's free, what's paid", "license mit price paid services implementation support"],
    ["evidence", "What's verified so far", "evidence verified results"],
    ["tools", "The tools behind it", "skool skillport skillkit download starter"],
  ] },
  { id: "example", group: "Evaluate", label: "Worked example", sections: [
    ["content", "1. The admin's own content", "lessons classroom"],
    ["problem", "2. Where members get stuck", "problem stuck questions"],
    ["produced", "3. What Builder Commons produces", "pack.yaml pack-build tutor offer outreach"],
    ["member", "4. How a member installs and uses it", "install upload"],
    ["output", "5. A completed task", "offer output result"],
    ["review", "6. What the admin must review", "review acceptance"],
    ["measure", "7. What gets measured in a pilot", "pilot measure"],
    ["try", "Try it yourself", "download sample"],
  ] },
  { id: "value", group: "Evaluate", label: "Estimate value", sections: [
    ["inputs", "Your numbers", "calculator roi renewal price members support"],
    ["results", "What it adds up to", "payback break-even net cash"],
    ["how", "How it's calculated", "formula model"],
  ] },
  { id: "pilot", group: "Evaluate", label: "Pilot and fit", sections: [
    ["discovery", "Questions to answer first", "fit discovery questions"],
    ["design", "Pilot design", "cohort baseline outcome adoption"],
    ["decide", "Deciding what to do next", "continue stop change thresholds"],
    ["limits", "What a pilot can and can't tell you", "causal evidence sample size"],
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
