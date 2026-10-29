// Paid help is a business decision for the maintainer. Until `enabled` is true and `contact` is set,
// the site shows only the free software and no services section. Never add prices, guarantees or
// testimonials here unless they are real and approved (npm test rejects price-like text).
export const SERVICES = {
  enabled: false,
  contact: "", // e.g. "mailto:hello@example.com" or "https://example.com/contact"
  intro: "The software is free. If you'd rather not do the setup yourself, these are available as paid help:",
  items: [
    ["Setup for your community", "We build your tutor skill and convert your templates, run the checks and fix what they flag."],
    ["Branded member pack", "Skill zips or a Claude Code plugin under your community's name, plus a member guide with your links."],
    ["Onboarding session", "A live walkthrough for your members: installing, connecting accounts, first run."],
    ["Updates", "Rebuilds when your lessons or templates change, with release notes for members."],
  ],
};
