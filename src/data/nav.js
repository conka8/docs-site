// Pages, their sections and search keywords. Section ids are used for deep links: #page/section.
export const PAGES = [
  { id: "home", label: "Overview", sections: [
    ["how", "How it works", "build check ship update"],
    ["starter", "Starter bundle", "skool skillport skillkit download"],
    ["members", "What members get", "member install"],
    ["more", "More tools", "shipsafe geo ghl voice career vertical"],
    ["free", "Free and open source", "license mit price paid services"],
  ] },
  { id: "admins", label: "Admin guide", sections: [
    ["choose", "1. Choose what to build", "lessons classroom n8n make bridge claude code claude app team enterprise openclaw"],
    ["build", "2. Build", "classroom-to-skill batch convert"],
    ["brand", "3. Brand", "name logo footer license notice rename"],
    ["check", "4. Check before you share", "lint needs-review eval upload key"],
    ["ship", "5. Ship to members", "pack plugin marketplace zip upload organization"],
    ["update", "6. Update", "version marketplace update release"],
    ["support", "What members trip on", "support problems faq"],
  ] },
  { id: "members", label: "Member guide", sections: [
    ["which", "What did you get?", "skill plugin tool zip"],
    ["skill", "Install a skill", "claude app upload claude code skills folder openclaw windows"],
    ["plugin", "Install a plugin", "marketplace plugin install update"],
    ["keys", "Connections and API keys", "api key environment variable connector mcp slack google"],
    ["result", "Understand the result", "demo data conversion check grade"],
    ["trouble", "Troubleshooting", "error command not found powershell execution policy pip externally-managed 404"],
  ] },
  { id: "start", label: "Install & downloads", sections: [
    ["downloads", "Downloads", "zip download sha256 checksum version"],
    ["python", "1. Get Python", "python install windows mac linux"],
    ["install", "2. Install in a private environment", "venv activate pip powershell"],
    ["check", "3. Check it worked", "version first run"],
    ["upgrade", "Upgrade or remove", "upgrade uninstall update"],
    ["codes", "Exit codes", "exit code ci github action"],
  ] },
  { id: "compare", label: "Compare tools", sections: [
    ["table", "Tools side by side", "prerequisites cost output readiness use case"],
  ] },
  { id: "trust", label: "Readiness & data", sections: [
    ["readiness", "Integration readiness", "live verified fakes fixtures unverified"],
    ["data", "Data and costs", "privacy data api cost keys"],
    ["tests", "Automated tests", "tests pytest"],
    ["license", "License", "mit license notice rebrand"],
  ] },
  { id: "releases", label: "Release notes", sections: [
    ["latest", "Latest release", "changelog what changed"],
    ["upgrading", "Upgrading", "upgrade reinstall"],
  ] },
];

export const PAGE_IDS = PAGES.map((p) => p.id);
