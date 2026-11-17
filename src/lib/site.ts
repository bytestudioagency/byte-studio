// All copy, prices and contact details live here. Edit this file to change the page.

export const site = {
  name: "Hendzen",
  tagline: "Web & app studio",
  year: 2026,
  url: "https://hendzen.com", // TODO: your live domain. Used for the sitemap, robots.txt and share previews.
  email: "hello@hendzen.com", // TODO: replace with your real inbox
  bookingUrl: "", // e.g. "https://cal.com/your-handle/intro" — the "Book a call" button appears once this is set
  socials: [
    // TODO: add your real profiles, e.g. { label: "LinkedIn", href: "https://linkedin.com/in/..." }
    // They also go into the search-engine structured data (sameAs), which helps Google tie the profiles to the brand.
  ] as { label: string; href: string }[],
  city: "", // TODO: optional, the city you work from, e.g. "Bengaluru". Added to the structured data when set.
  updated: "2026-11-17", // the "last modified" date in the sitemap. Change it when the page copy changes.
};

// Search-engine copy for the home page. India goes in the description, not the title.
export const seo = {
  title: "Hendzen — Web, Mobile App & MVP Development Studio",
  description:
    "Hendzen builds web apps, mobile apps and MVPs for founders across India. Fixed price, six-week delivery, a live demo every Friday, and you own the code.",
};

// Words that rotate in the hero headline: "Your ___, shipped in six weeks." The first is the default.
export const heroWords = ["MVP", "SaaS", "web app", "mobile app", "AI product"];

// Words on the spinning ring in the hero.
export const heroBadge = ["Fixed price", "Six weeks", "Weekly demos", "Your code"];

export const container = "mx-auto w-full max-w-[80rem] px-5 sm:px-8 md:px-10";

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Why Hendzen", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Price estimator", href: "#estimate" },
  { label: "FAQ", href: "#faq" },
];

export const promises = [
  { value: "6 wks", label: "From idea to live product" },
  { value: "Fixed", label: "Price locked before day one" },
  { value: "Weekly", label: "Live demos, every single Friday" },
  { value: "100%", label: "Your code. Your IP. Day one." },
];

export const marquee = [
  "Web apps.",
  "Mobile apps.",
  "AI that works.",
  "MVP sprints.",
  "Fixed price.",
  "Six weeks.",
  "Friday demos.",
  "Your code.",
];

// TODO: placeholder companies (invented names). Replace with your real clients.
// Set `logo` to a file in /public (e.g. "/logos/acme.svg") to show an image instead of the text mark.
export const clients: { name: string; logo?: string }[] = [
  { name: "Northpeak" },
  { name: "Orbitly" },
  { name: "Lumora" },
  { name: "Kestrel" },
  { name: "Fernway" },
  { name: "Brightloop" },
];

export const whyUs = {
  them: "Typical agency",
  rows: [
    { topic: "Price", them: "Hourly billing that balloons with the project", us: "One fixed price, locked before a line is written" },
    { topic: "Timeline", them: "\u201cIt depends.\u201d", us: "Six weeks, with a launch date on the calendar from day one" },
    { topic: "Updates", them: "Radio silence until you chase them", us: "A live demo every Friday, plus a staging link that never sleeps" },
    { topic: "Who builds it", them: "Sold by seniors, built by juniors", us: "The people on the call are the people writing the code" },
    { topic: "Ownership", them: "Code held hostage until the final invoice", us: "Your repo, your accounts, from day one" },
    { topic: "After launch", them: "A fresh invoice for every bug", us: "30 days of fixes, on us" },
  ],
};

export const services = [
  {
    id: "web",
    title: "Web apps",
    body: "SaaS products, dashboards and internal tools engineered to stay fast at ten users or ten thousand.",
    points: ["Auth, billing and roles", "Admin dashboards", "API and database design"],
    file: "app/api/invoices/route.ts",
    code: [
      "export async function POST(req: Request) {",
      "  const user = await requireUser(req);",
      "  const invoice = await db.invoice.create({",
      "    data: { ...(await req.json()), ownerId: user.id },",
      "  });",
      "  return Response.json(invoice, { status: 201 });",
      "}",
    ],
  },
  {
    id: "mobile",
    title: "Mobile apps",
    body: "One codebase. Native feel on iOS and Android. Live in both stores, submission handled.",
    points: ["React Native and Expo", "Push and offline support", "Store submission handled"],
    file: "screens/Booking.tsx",
    code: [
      "export function Booking() {",
      "  const { slots, book } = useSlots(clinicId);",
      "  return (",
      "    <SlotGrid",
      "      slots={slots}",
      "      onPick={(slot) => book(slot).then(notify)}",
      "    />",
      "  );",
      "}",
    ],
  },
  {
    id: "ai",
    title: "AI & automation",
    body: "Assistants, smart search and automations wired into your product, with the guardrails real production demands.",
    points: ["LLM integrations", "Workflow automation", "Data pipelines"],
    file: "lib/assistant.ts",
    code: [
      "const answer = await assistant.run({",
      "  question,",
      "  tools: [searchDocs, lookupOrder],",
      "  guardrails: { maxSteps: 4, citeSources: true },",
      "});",
      "",
      "// every answer links back to its source",
    ],
  },
  {
    id: "mvp",
    title: "MVP sprints",
    body: "A scoped, working first version in six weeks. Ready for real users, real feedback and real investors.",
    points: ["Fixed scope and price", "Weekly demos", "Launch and handover"],
    file: "sprint-plan.md",
    code: [
      "// six weeks, start to finish",
      "week 1     scope locked, quote fixed",
      "week 2     clickable prototype",
      "week 3-5   weekly releases to staging",
      "week 6     launch and handover",
    ],
  },
];

// TODO: placeholder products. Replace with your real projects before going live.
// Each project gets a case study page at /work/<id>. `challenge`, `solution` and `results` fill that page.
export const projects = [
  {
    id: "ledgerly",
    name: "Ledgerly",
    kind: "Web app",
    industry: "Fintech",
    accent: "#c6ff3a",
    href: "", // optional link to the live product
    summary: "Cash flow, finally in one place. Live bank feeds and investor reports in a single click.",
    highlights: ["Live bank feeds across every account", "One-click investor reports", "Role-based access for teams"],
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    timeline: "6 weeks",
    challenge:
      "The finance team tracked cash across four bank accounts in spreadsheets that were out of date by the time they were shared. Month-end reporting took days, and nobody fully trusted the runway number.",
    solution:
      "We built one dashboard that pulls every account in through bank feeds, sorts transactions automatically and turns the month into an investor-ready report in one click. Roles keep founders, finance and the accountant in the same tool, each with the right access.",
    results: [
      { value: "6 wks", label: "Kick-off to launch" },
      { value: "4", label: "Bank accounts in one view" },
      { value: "1 click", label: "Monthly investor report" },
    ],
  },
  {
    id: "pulse",
    name: "Pulse",
    kind: "Mobile app",
    industry: "Healthcare",
    accent: "#8fa2ff",
    href: "",
    summary: "Clinic booking in three taps, with reminders that keep every slot filled.",
    highlights: ["Book an appointment in three taps", "Automatic SMS and push reminders", "Works offline inside the clinic"],
    tags: ["React Native", "Expo", "Node.js"],
    timeline: "7 weeks",
    challenge:
      "The clinic took every booking by phone. The front desk spent the morning on calls, patients forgot appointments, and empty slots were found too late to fill.",
    solution:
      "We built a booking app for iOS and Android from one codebase. Patients pick a doctor and a time in three taps, reminders go out by SMS and push, and the app keeps working when the clinic's connection drops.",
    results: [
      { value: "7 wks", label: "Idea to both app stores" },
      { value: "3 taps", label: "To book an appointment" },
      { value: "1", label: "Codebase for iOS and Android" },
    ],
  },
  {
    id: "crate",
    name: "Crate",
    kind: "Storefront",
    industry: "E-commerce",
    accent: "#ff9d5c",
    href: "",
    summary: "A headless storefront for a direct-to-consumer brand that loads in under a second.",
    highlights: ["Sub-second page loads", "One-page checkout", "A CMS the marketing team can run"],
    tags: ["Next.js", "Headless CMS", "Stripe"],
    timeline: "5 weeks",
    challenge:
      "The brand had outgrown its template storefront. Pages were slow on mobile, checkout ran across several steps, and every content change needed a developer.",
    solution:
      "We rebuilt the storefront on a headless stack: pages are rendered ahead of time and served from the edge, checkout fits on one page, and the marketing team edits products and landing pages in a CMS.",
    results: [
      { value: "<1 s", label: "Page load on mobile" },
      { value: "1 page", label: "Checkout, start to finish" },
      { value: "5 wks", label: "Design to launch" },
    ],
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    when: "Week 0–1",
    body: "One working session to nail users, scope and success metrics. You walk away with a written scope and a fixed quote.",
  },
  {
    step: "02",
    title: "Design",
    when: "Week 1–2",
    body: "Flows first, then pixel-perfect screens. You click through a real prototype before a line of code is written.",
  },
  {
    step: "03",
    title: "Build",
    when: "Week 2–5",
    body: "Weekly releases to a staging link that is always live. A demo every Friday. Zero surprises.",
  },
  {
    step: "04",
    title: "Launch",
    when: "Week 6",
    body: "Production deploy, analytics, store submission and a clean handover of code, accounts and docs. You own it all.",
  },
];

// TODO: prices below are placeholders in rupees (L = lakh). Set your real numbers.
export const pricing = [
  {
    name: "MVP Sprint",
    bestFor: "For founders who need a real product in real hands, fast.",
    price: "\u20b92.5L",
    prefix: "from",
    suffix: "",
    note: "6 weeks, fixed scope",
    featured: true,
    points: ["Design and build of a core feature set", "Web or mobile", "Weekly demos", "30 days of post-launch fixes"],
  },
  {
    name: "Product Build",
    bestFor: "For teams going all-in across web and mobile.",
    price: "\u20b95L",
    prefix: "from",
    suffix: "",
    note: "8–14 weeks, milestone based",
    featured: false,
    points: ["Web and mobile together", "Payments, roles and integrations", "Admin dashboard", "Pay per milestone"],
  },
  {
    name: "Retainer",
    bestFor: "For live products that need to keep moving forward.",
    price: "\u20b91L",
    prefix: "from",
    suffix: "/mo",
    note: "Ongoing, cancel any time",
    featured: false,
    points: ["New features every month", "Bug fixes and upkeep", "Priority response", "Monthly roadmap call"],
  },
];

export const pricingIncludes = ["Fixed quote up front", "Friday demos", "Code in your repo", "Zero lock-in"];

// TODO: estimator numbers are placeholders — tune them to your real rates.
export const estimator = {
  currency: "\u20b9",
  types: [
    { id: "site", label: "Marketing site", min: 60000, max: 120000, weeks: 2 },
    { id: "web", label: "Web app", min: 250000, max: 450000, weeks: 6 },
    { id: "mobile", label: "Mobile app", min: 350000, max: 600000, weeks: 7 },
    { id: "both", label: "Web + mobile", min: 550000, max: 900000, weeks: 10 },
  ],
  features: [
    { id: "auth", label: "User accounts", min: 20000, max: 40000, weeks: 0.5 },
    { id: "pay", label: "Payments", min: 30000, max: 60000, weeks: 0.5 },
    { id: "admin", label: "Admin dashboard", min: 60000, max: 120000, weeks: 1 },
    { id: "ai", label: "AI features", min: 80000, max: 160000, weeks: 1.5 },
    { id: "chat", label: "Chat / realtime", min: 50000, max: 100000, weeks: 1 },
    { id: "integrations", label: "3rd-party integrations", min: 30000, max: 80000, weeks: 0.5 },
  ],
  pace: [
    { id: "standard", label: "Standard", cost: 1, time: 1 },
    { id: "rush", label: "Rush", cost: 1.25, time: 0.75 },
  ],
};

export const faqs = [
  {
    q: "You're a new studio. Why should I trust you?",
    a: "Fair question. We don't ask for faith, we remove the risk. You pay per milestone, you see working software every week, and the code lives in your own repo from day one. If we ever stop being useful, you walk away with everything built so far.",
  },
  {
    q: "How much will my project cost?",
    a: "Most first versions land between \u20b92.5 lakh and \u20b96 lakh. Use the estimator above for a range, then we confirm a fixed quote after a short scoping call. The quote does not change unless the scope does.",
  },
  {
    q: "Six weeks? Really?",
    a: "Really. For a focused first version, we lock a tight scope up front and park the extras until after launch. Bigger products run 8–14 weeks, split into milestones.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Code, designs, accounts and domains sit in your name, and everything is handed over with documentation at launch. No strings attached.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 30 days of fixes, on us. After that, keep shipping with a monthly retainer or hand the code to your own team. Your call.",
  },
  {
    q: "What do you build with?",
    a: "Next.js and TypeScript on the web, React Native on mobile, PostgreSQL for data. Mainstream, battle-tested tools, so any good developer can pick the project up later.",
  },
];
