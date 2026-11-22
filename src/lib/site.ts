// All copy, prices and contact details live here. Edit this file to change the page.

export const site = {
  name: "Byte Studio",
  tagline: "Web & app studio",
  year: 2026,
  url: "https://www.bytestudio.website", // used for the sitemap, robots.txt and share previews
  email: "bytestudioagency@gmail.com", // shown in the contact section, menu, footer, legal pages and structured data. Leave empty to hide it.
  bookingUrl: "https://links.sohailcodes.xyz/meeting", // the "Book a call" buttons appear once this is set
  socials: [
    // They also go into the search-engine structured data (sameAs), which helps Google tie the profiles to the brand.
    { label: "X", href: "https://x.com/bytestudiohq" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/byte-studio/" },
  ] as { label: string; href: string }[],
  city: "", // TODO: optional, the city you work from, e.g. "Bengaluru". Added to the structured data when set.
  updated: "2026-11-21", // the "last modified" date in the sitemap. Change it when the page copy changes.
};

// Search-engine copy for the home page.
export const seo = {
  title: "Byte Studio | A Website That Works With Your Business",
  description: "A website that works with your business, not just sits in a browser tab.",
};

// The hero headline. `accent` is set in the italic serif with the drawn underline.
export const hero = {
  lines: ["A website that", "works with"],
  accent: "your business.",
  sub: "Not one that just sits in a browser tab.",
};

// Words on the spinning ring in the hero.
export const heroBadge = ["Leads", "Orders", "Bookings", "Dashboards"];

export const container = "mx-auto w-full max-w-[80rem] px-5 sm:px-8 md:px-10";

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Why us", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const promises = [
  { value: "10+", label: "Systems shipped" },
  { value: "1 wk", label: "To launch a business site" },
  { value: "Weekly", label: "Video call to review progress" },
  { value: "Flat", label: "Project fee, no hourly billing" },
];

export const marquee = ["DREAM.", "BUILD.", "LAUNCH.", "THINK.", "DESIGN.", "CODE.", "SHIP.", "HUSTLE.", "MVP.", "VISION."];

// Real clients. `logo` is a file in /public; without one the name shows as a text mark.
export const clients: { name: string; logo?: string }[] = [
  { name: "Keanas Clinic", logo: "/companies/keanas.png" },
  { name: "Streeya", logo: "/companies/streeya.png" },
  { name: "Webyapar", logo: "/companies/webyapar.png" },
  { name: "Stayfinder", logo: "/companies/stayfinder.svg" },
];

export const whyUs = {
  them: "Typical agency",
  rows: [
    { topic: "Price", them: "Hourly billing that balloons with the project", us: "One flat project fee, agreed before work begins" },
    { topic: "Timeline", them: "“It depends.”", us: "A week for a business site, three to four for one with a dashboard" },
    { topic: "Updates", them: "Radio silence until you chase them", us: "Daily updates in Notion and a weekly video call" },
    { topic: "Who builds it", them: "Account managers and handoffs", us: "You talk to the person writing the code" },
    { topic: "Ownership", them: "Code held hostage until the final invoice", us: "Your repo, your accounts, from day one" },
    { topic: "After launch", them: "A fresh invoice for every bug", us: "15 days of fixes and small tweaks, on us" },
  ],
};

// The "why us" points, shown right after the work section.
export const whyPoints = {
  title: "Your website should do more",
  accent: "than just look good.",
  body: "It should run part of your business.",
  points: [
    { title: "We think with you", body: "We question, suggest and push back, not just code what you say." },
    { title: "Backend, not just frontend", body: "The dashboard to manage what comes in, built from day one." },
    { title: "Scalable architecture", body: "Clean code that grows with you, so you never rebuild from scratch." },
    { title: "Talk to the builder", body: "No account managers, no handoffs. Just the person writing the code." },
    { title: "Modern stack", body: "Next.js, Express, PostgreSQL and Prisma. Proven tools, built to last." },
    { title: "Full transparency", body: "Weekly updates and calls, so you never wonder what's happening." },
  ],
};

export const services = [
  {
    id: "web",
    title: "Web development",
    body: "From marketing sites to full-stack platforms, we architect and build production-ready web apps that scale with your business.",
    deliveredFor: "Elevate Developers",
    points: ["Marketing sites and landing pages", "Admin dashboards for leads and orders", "API and database design"],
    file: "app/api/leads/route.ts",
    code: [
      "export async function POST(req: Request) {",
      "  const lead = await db.lead.create({",
      "    data: await req.json(),",
      "  });",
      "  await notifyTeam(lead);",
      "  return Response.json(lead, { status: 201 });",
      "}",
    ],
  },
  {
    id: "mobile",
    title: "Mobile app development",
    body: "Native-feel apps built with React Native and Expo, shipped to the Play Store with a working admin dashboard behind them.",
    deliveredFor: "Turant News",
    points: ["React Native and Expo", "OTP sign-in and push", "Admin dashboard included"],
    file: "screens/Feed.tsx",
    code: [
      "export function Feed() {",
      "  const { posts, loadMore } = useFeed(language, city);",
      "  return (",
      "    <PostList",
      "      posts={posts}",
      "      onEndReached={loadMore}",
      "    />",
      "  );",
      "}",
    ],
  },
  {
    id: "ai",
    title: "AI & automation",
    body: "Assistants, smart search and automations wired into your product, with the guardrails real production demands.",
    deliveredFor: "",
    points: ["LLM integrations", "Workflow automation", "Background jobs"],
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
    title: "MVP development",
    body: "Turn your idea into a working product real users can sign up for, so you can test the market and pitch investors with something that runs, not slides.",
    deliveredFor: "",
    points: ["Scoped to the features that matter", "Sign-up, payments and admin built in", "Code that grows past version one"],
    file: "app/onboarding/page.tsx",
    code: [
      "export default async function Onboarding() {",
      "  const user = await requireUser();",
      "  return <Checkout plan={user.plan} />;",
      "}",
      "",
      "// ship the core, learn, then build the rest",
    ],
  },
];

type Project = {
  id: string;
  name: string;
  kind: string;
  industry: string;
  accent: string;
  href: string;
  summary: string;
  highlights: string[];
  tags: string[];
  image: string;
  gallery: string[];
  challenge: string;
  solution: string;
  features: { group?: string; items: string[] }[];
  outcome: string;
  note: string;
  results: { value: string; label: string }[];
};

// Each project gets a case study page at /portfolio/<id>. Screenshots live in /public/portfolio.
export const projects: Project[] = [
  {
    id: "apna-store",
    name: "Apna Store",
    kind: "Web app",
    industry: "Retail",
    accent: "#c6ff3a",
    href: "",
    summary: "Replacing spreadsheet-run store operations with one connected system.",
    highlights: [
      "Storefront with live search and filters",
      "Raw stock checked before every sale",
      "POS billing with PDF tax invoices",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    image: "/portfolio/apna-store/1.webp",
    gallery: ["/portfolio/apna-store/2.webp", "/portfolio/apna-store/3.webp", "/portfolio/apna-store/4.webp", "/portfolio/apna-store/5.webp"],
    challenge:
      "A store owner needed two things: a way for customers to browse products online, and a back-office system to actually run the store - stock, suppliers, sales, and bills. The biggest risk was confirming a sale for something the store didn't really have enough raw material to make, because there was no easy way to check raw stock before the sale went through.",
    solution:
      "A system with two sides. One side is a public shop page where customers can browse, search, and filter products. The other side is an admin area, behind a login, where staff manage categories, suppliers, items, stock, sales, bills, and reports. Before any sale is confirmed, the system checks if there's enough raw material across all suppliers, uses up the oldest stock first, and writes down exactly what was used and why.",
    features: [
      {
        group: "Storefront",
        items: [
          "Live search, category filters, and price sorting",
          "Category browsing on desktop and a slide-in filter on mobile",
          "Click-to-zoom product images and a contact page with a map",
        ],
      },
      {
        group: "Back office",
        items: [
          "Categories, suppliers, and stock - all managed with image upload and low-stock alerts",
          "Every sale checks raw material across all suppliers first, uses up the oldest stock automatically, and logs exactly what was used",
          "Bundle raw items into sellable products with set pricing",
          "A POS-style billing flow that auto-updates stock and generates a PDF invoice",
          "A sales analytics dashboard with date-range revenue charts",
          "Self-service password reset, so a locked-out staff member isn't stuck waiting on IT",
        ],
      },
    ],
    outcome:
      "One system that replaces messy, manual store work with a single place to manage stock, sales, and reports - the owner can always see where stock went instead of guessing, and customers can check what's available without calling the store.",
    note: "The invoice generator builds proper tax invoices from scratch - right down to spelling out amounts in words, the way local accounting expects.",
    results: [
      { value: "2", label: "Sides: storefront and back office" },
      { value: "FIFO", label: "Oldest stock used first, automatically" },
      { value: "PDF", label: "Tax invoice on every sale" },
    ],
  },
  {
    id: "elevate-developers",
    name: "Elevate Developers",
    kind: "Website",
    industry: "Real estate",
    accent: "#8fa2ff",
    href: "",
    summary: "A credible public presence for a real-estate brand, with lead capture built in from the start.",
    highlights: ["Ten hand-built pages", "3BHK / 4BHK floor-plan toggle", "Every CTA feeds one lead form"],
    tags: ["HTML/CSS", "JavaScript", "Bootstrap", "Lenis"],
    image: "/portfolio/elevate/1.webp",
    gallery: ["/portfolio/elevate/2.webp", "/portfolio/elevate/3.webp"],
    challenge:
      "A real-estate developer had no real online presence for their flagship project - anyone interested had to call or visit in person just to see the floor plans or ask a question, a slow way to sell homes.",
    solution:
      "A marketing website that shows off the project - specs, amenities, location, and two floor-plan options - plus a company and team section, a blog, and several ways to leave contact details. It's built as ten hand-made pages with no website builder or database behind it, with scroll-in animations that respect a visitor's reduced-motion setting. Every \"get in touch\" button on the site, from the nav bar to a \"Schedule a Tour\" link on the project page, leads into one shared contact form.",
    features: [
      {
        items: [
          "Home page with a specs teaser, a 3BHK/4BHK toggle, and blog preview",
          "A project page with amenities and an embedded map",
          "Two floor-plan pages with specs and a virtual-tour CTA",
          "Company, team, blog, FAQ, and contact pages",
          "A single popup lead form fed by every CTA on the site",
        ],
      },
    ],
    outcome:
      "A credible public presence and a structured way to capture buyer inquiries directly from project and floor-plan pages, instead of routing everything through phone calls or in-person visits.",
    note: "Every page quietly pings the developer the moment someone opens the live site - a simple way to know the instant a prospect or client is actually looking.",
    results: [
      { value: "10", label: "Hand-built pages" },
      { value: "2", label: "Floor-plan options" },
      { value: "1", label: "Lead form behind every CTA" },
    ],
  },
  {
    id: "turant",
    name: "Turant",
    kind: "Mobile app",
    industry: "Media",
    accent: "#ff5a6e",
    href: "",
    summary: "An end-to-end citizen-news platform - from posting to moderation to ad-driven monetization.",
    highlights: ["Text, photo and video posts", "Feeds matched to language and location", "Moderation and ads in one admin"],
    tags: ["React Native", "Node.js", "Prisma", "PostgreSQL"],
    image: "/portfolio/turant/1.webp",
    gallery: [],
    challenge:
      "A citizen-journalism idea needed a full social platform, not just a place to read news - people had to be able to post, follow, comment, and share; moderators needed a way to catch bad behavior; and the business needed a way to make money from ads, all at once.",
    solution:
      "A mobile app where anyone can publish a news post as text, a photo set, or a video, and other people can follow, like, comment, save, and share it. Content and ads are matched to each person's language and location. Each feed blends posts from people you follow with trending posts, and daily posting limits plus temporary or permanent bans keep spam in check. Behind it sits an admin dashboard where staff review users, manage a network of field reporters, and run ad campaigns.",
    features: [
      {
        group: "Mobile app",
        items: [
          "OTP signup by email and phone, with first-run language and location setup",
          "Home, Search, Upload, and Profile tabs",
          "Separate upload flows for articles, photos, and video",
          "Follow, like, comment, save, and share, with in-feed ads",
          "Uploaded video is automatically compressed and given a thumbnail through a custom transcoding pipeline",
        ],
      },
      {
        group: "Admin dashboard",
        items: [
          "A moderation panel for warnings, post removal, and timed bans",
          "Ad scheduling with view/click performance",
          "A geo-targeted ad creation form",
          "Field-reporter management",
        ],
      },
    ],
    outcome:
      "An end-to-end platform - not a demo - covering the full loop from citizen content creation through moderation to ad-driven monetization, with operational control living in one admin surface.",
    note: "Sign-in codes are handled separately for email, phone, and admin logins, and video runs through a custom-built streaming pipeline rather than an off-the-shelf service.",
    results: [
      { value: "3", label: "Post formats: text, photo, video" },
      { value: "2", label: "Apps: mobile and admin" },
      { value: "1", label: "Loop from posting to ad revenue" },
    ],
  },
  {
    id: "stayfinder",
    name: "StayFinder",
    kind: "Web app",
    industry: "Hospitality",
    accent: "#ff9a3c",
    href: "",
    summary: "A full booking lifecycle that keeps availability honest automatically.",
    highlights: ["Browse, hold, pay, confirm", "Unpaid holds released after 5 minutes", "Role-based admin for every booking"],
    tags: ["Next.js", "PostgreSQL", "Prisma", "PhonePe", "Inngest"],
    image: "/portfolio/stay-finder/1.webp",
    gallery: ["/portfolio/stay-finder/2.webp", "/portfolio/stay-finder/3.webp"],
    challenge:
      "A villa rental business needed real online bookings and payments, not just a listings page. The sharpest risk: a guest could start booking a villa, walk away without paying, and tie up those dates for everyone else unless the hold was reliably released.",
    solution:
      "A website where guests browse villas, hold a date while they pay, and get instant confirmation once payment clears - with unpaid holds automatically released after 5 minutes. Payment confirmation can arrive two different ways at once, so the system is built to never double-confirm the same booking. Coupons and per-guest limits stay accurate even when a hold expires or a payment fails. Behind it sits one admin dashboard, with different access levels for different staff roles.",
    features: [
      {
        group: "Public site",
        items: [
          "Villa listings with filtering, galleries, and a live price breakdown",
          "Coupon codes, phone+OTP auth, and booking history with reviews",
          "Owner-onboarding and corporate-offsite inquiry forms",
        ],
      },
      {
        group: "Admin dashboard",
        items: [
          "Property management with drag-and-drop photo ordering",
          "Booking management, refunds, KYC checks, and owner payouts",
          "Occupancy and revenue reports plus a full activity log",
          "Role-based access across admin, operations, and sales",
        ],
      },
    ],
    outcome:
      "A full booking journey - browse, hold, pay, confirm - with abandoned holds cleaned up automatically so availability stays accurate, plus one admin dashboard covering properties, bookings, and payments.",
    note: "Booking holds expire on their own after 5 minutes - a durable background job wakes at the exact moment to release it, with a backup sweep running every couple of minutes just in case.",
    results: [
      { value: "5 min", label: "Until an unpaid hold is released" },
      { value: "3", label: "Staff roles: admin, ops, sales" },
      { value: "1", label: "Dashboard for every booking" },
    ],
  },
  {
    id: "keanas-skin-clinic",
    name: "Keanas Skin Clinic",
    kind: "Landing page",
    industry: "Healthcare",
    accent: "#ff7ab6",
    href: "",
    summary: "A fast landing page built to convert paid social traffic.",
    highlights: ["40+ treatments as flip cards", "Doctor credentials and Google rating up front", "Facebook Pixel tracking built in"],
    tags: ["HTML/CSS", "Tailwind CSS", "JavaScript"],
    image: "/portfolio/keanas/1.webp",
    gallery: ["/portfolio/keanas/2.webp", "/portfolio/keanas/3.webp"],
    challenge:
      "A skin clinic needed a simple, credible website to show off its treatments and doctors and support patients arriving from social media ads - most visitors would judge the clinic in the first few seconds of the page loading.",
    solution:
      "A single fast-loading page, with no framework or build tools, covering treatments, doctors, a photo gallery, and a contact form. Trust is built the way an ad-click visitor needs it - doctor credentials, press mentions, a Google rating, and a \"Launch Day\" event. The large treatment list is shown as flip cards so it stays easy to browse, and Facebook Pixel tracking is wired in throughout so ad performance can be measured.",
    features: [
      {
        items: [
          "A sticky header and a directors hero section",
          "7 flip-card treatment categories covering 40+ treatments",
          "A hover-reveal grid of clinic technology",
          "A custom depth-stack photo gallery carousel",
          "WhatsApp, Instagram, and Facebook contact tiles, plus a modal contact form",
          "Photos organized and pre-optimized by category to keep the page fast without any build tooling",
        ],
      },
    ],
    outcome:
      "A lightweight, fast-loading site that doubles as a landing destination for paid social traffic, with Pixel tracking in place to measure ad performance rather than running ads blind.",
    note: "Ad tracking logs page views today, but not yet the leads (form fills, WhatsApp taps) the ads are meant to drive - the easiest next win.",
    results: [
      { value: "40+", label: "Treatments, easy to browse" },
      { value: "7", label: "Treatment categories" },
      { value: "0", label: "Frameworks or build tools" },
    ],
  },
  {
    id: "booking-badhao",
    name: "Booking Badhao",
    kind: "Platform",
    industry: "Restaurants",
    accent: "#a66bff",
    href: "",
    summary: "One shared data model, two purpose-built apps for staff and customers.",
    highlights: ["Staff app: menu, tables, kitchen, vendors", "Customer ordering app", "One database behind both"],
    tags: ["Turborepo", "Next.js", "Express", "Prisma", "PostgreSQL"],
    image: "/portfolio/booking-badhao/1.webp",
    gallery: ["/portfolio/booking-badhao/2.webp", "/portfolio/booking-badhao/3.webp"],
    challenge:
      "A restaurant needed both an internal system to run day-to-day operations and a separate, lighter app for customers to order food - without keeping two disconnected copies of the same menu and pricing data.",
    solution:
      "Two apps sharing one underlying database: a full management app for staff, covering the menu, tables, kitchen order tickets, purchasing from vendors, and marketing campaigns, and a simpler ordering app for customers to browse the menu and its options. Because both apps share the same data and validation rules, a menu change made in one place shows up correctly everywhere.",
    features: [
      {
        group: "Admin / vendor app",
        items: [
          "Menu, category, and add-on management with a kitchen order board",
          "Table and room booking alongside area management",
          "Vendor and raw-material purchasing with pricing",
          "A 7-type marketing suite - loyalty, referral, birthday, and re-engagement campaigns",
        ],
      },
      {
        group: "Customer app",
        items: ["A landing page and a browsable, filterable menu"],
      },
    ],
    outcome:
      "A single coherent data model serving two very different audiences - staff and customers - through purpose-built apps, with shared code keeping the menu and rules from drifting apart. Still mid-development, with known gaps tracked openly in the project's own notes.",
    note: "Add-ons like \"extra cheese\" are defined once and reused across every location and menu item - a more sophisticated setup than the simple idea suggests.",
    results: [
      { value: "2", label: "Apps: staff and customer" },
      { value: "1", label: "Shared database and rules" },
      { value: "7", label: "Marketing campaign types" },
    ],
  },
];

export const process = [
  { step: "01", title: "Discovery calls", body: "We dig into your idea, goals and challenges so we're aligned from day one." },
  { step: "02", title: "Design & development", body: "Wireframes first, then real builds you can see early." },
  { step: "03", title: "Roadmap & sprints", body: "Clear milestones and sprints, so progress stays predictable." },
  { step: "04", title: "Build & support", body: "We ship it, then cover 15 days of fixes and tweaks for free." },
];

export const pricing = [
  {
    name: "Launch",
    bestFor: "For businesses that need a fast, credible site that captures leads.",
    price: "₹10k–15k",
    prefix: "",
    suffix: "",
    note: "Delivery in 1 week",
    featured: false,
    cta: "Get started",
    book: false,
    points: ["5-8 page responsive site", "Lead capture form", "Basic SEO setup"],
  },
  {
    name: "Operate",
    bestFor: "For businesses that need to manage the leads and orders coming in.",
    price: "₹25k–30k",
    prefix: "",
    suffix: "",
    note: "Delivery in 3-4 weeks",
    featured: true,
    cta: "Get started",
    book: false,
    points: ["Admin dashboard to manage leads & orders", "OTP-verified forms", "Basic analytics", "15 days of support"],
  },
  {
    name: "Platform",
    bestFor: "For products with payments, automation and more than one app.",
    price: "Custom",
    prefix: "",
    suffix: "",
    note: "Scoped and quoted on a call",
    featured: false,
    cta: "Book a call",
    book: true,
    points: ["Payment integration (Razorpay/PhonePe)", "Background jobs & automation", "Multi-app architecture"],
  },
];

export const pricingIncludes = ["Flat project fee", "Signed scope up front", "Daily updates in Notion", "Weekly video call"];

export const faqs = [
  {
    q: "How big is your team and what experience do you have?",
    a: "We are a team of six. Five developers have at least 5 years of experience and have shipped over 20 products. Our UI/UX lead has 8 years of experience and has delivered more than 1,000 screens.",
  },
  {
    q: "Do I need technical knowledge to work with you?",
    a: "No. We act as your fractional co-founder on the technical side. If you want more detail we will explain the architecture and key decisions.",
  },
  {
    q: "How involved will I be in the development process?",
    a: "You will have full visibility. We track work in Notion with daily updates and hold a weekly video call to review priorities, demos, and risks.",
  },
  {
    q: "How does pricing work?",
    a: "A flat project fee based on scope - Launch, Operate, or Platform. No hourly billing, no surprise invoices.",
  },
  {
    q: "Do you sign a contract?",
    a: "Yes - every project starts with a short scope and payment terms agreement before work begins.",
  },
  {
    q: "How do I pay?",
    a: "UPI or bank transfer.",
  },
  {
    q: "What's included after launch?",
    a: "15 days of support to fix bugs and handle small tweaks.",
  },
];
