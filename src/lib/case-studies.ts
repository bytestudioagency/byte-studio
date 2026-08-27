export interface CaseStudyFeatureGroup {
  group?: string;
  items: string[];
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export type CaseStudyHeroMedia =
  | { kind: "photo"; src: string }
  | { kind: "brandmark"; src: string }
  | { kind: "placeholder"; monogram: string };

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  summary: {
    problem: string;
    build: string;
    outcome: string;
  };
  heroMedia: CaseStudyHeroMedia;
  meta: {
    role: string;
    stack: string[];
  };
  challenge: string;
  keyFeatures: CaseStudyFeatureGroup[];
  stats: CaseStudyStat[];
  highlight?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "apna-store",
    title: "Apna Store",
    tagline: "Replacing spreadsheet-run store operations with one connected system.",
    summary: {
      problem: "Manual, disconnected operations",
      build: "Storefront + admin back office",
      outcome: "One system, real-time reporting",
    },
    heroMedia: { kind: "brandmark", src: "/works/apna-store-icon.png" },
    meta: {
      role: "Full-stack build",
      stack: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS"],
    },
    challenge:
      "A retail business needed both a customer-facing way to browse products and a back-office system to actually run the store - stock, suppliers, sales, and invoicing weren't the kind of thing you can bolt onto a spreadsheet indefinitely.",
    keyFeatures: [
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
          "Categories, suppliers, and stock — all managed with image upload and low-stock alerts",
          "Bundle raw items into sellable products with set pricing",
          "A POS-style billing flow that auto-updates stock and generates a PDF invoice",
          "A sales analytics dashboard with date-range revenue charts",
        ],
      },
    ],
    stats: [
      { value: "10", label: "Data models powering inventory" },
      { value: "23", label: "Backend endpoints" },
      { value: "9", label: "Admin pages" },
    ],
    highlight:
      "The invoice generator builds proper tax invoices from scratch - right down to spelling out amounts in words, the way local accounting expects.",
  },
  {
    slug: "elevate-developers",
    title: "Elevate Developers",
    tagline: "A credible public presence for a real-estate brand, with lead capture built in from the start.",
    summary: {
      problem: "No web presence or lead pipeline",
      build: "Marketing site + multi-channel forms",
      outcome: "A credible brand presence and a structured intake",
    },
    heroMedia: { kind: "photo", src: "/works/elevate.png" },
    meta: {
      role: "Marketing site",
      stack: ["HTML/CSS", "JavaScript", "Bootstrap"],
    },
    challenge:
      "A real-estate developer needed a public-facing site to showcase projects and capture buyer interest - the kind of brand-and-lead-gen presence expected of any serious property developer.",
    keyFeatures: [
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
    stats: [
      { value: "10", label: "Pages" },
      { value: "2", label: "Floor-plan configurations" },
      { value: "27+25", label: "Photos and icons" },
    ],
    highlight:
      "Every page quietly pings the developer the moment someone opens the live site - a simple way to know the instant a prospect or client is actually looking.",
  },
  {
    slug: "turant",
    title: "Turant",
    tagline: "An end-to-end citizen-news platform - from posting to moderation to ad-driven monetization.",
    summary: {
      problem: "Needed social mechanics, not just a feed",
      build: "Mobile app + admin & moderation dashboard",
      outcome: "Content, moderation & ads in one loop",
    },
    heroMedia: { kind: "photo", src: "/works/turant.png" },
    meta: {
      role: "Mobile app + backend + admin dashboard",
      stack: ["React Native", "Node.js", "PostgreSQL", "Next.js"],
    },
    challenge:
      "Building a full community-news platform is a different order of problem from a marketing site - it needed real social mechanics, moderation, and monetization, not just content display.",
    keyFeatures: [
      {
        group: "Mobile app",
        items: [
          "OTP signup by email and phone, with first-run language and location setup",
          "Home, Search, Upload, and Profile tabs",
          "Separate upload flows for articles, photos, and video",
          "Follow, like, comment, save, and share, with in-feed ads",
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
    stats: [
      { value: "4", label: "Admin dashboard sections" },
      { value: "2,000", label: "Followers to earn a verified badge" },
      { value: "3", label: "Post types: text, image, video" },
    ],
    highlight:
      "The ad-targeting tools are fully built on the admin side - hooking them up to live placements in the app is the next step.",
  },
  {
    slug: "stayfinder",
    title: "StayFinder",
    tagline: "A full booking lifecycle that keeps availability honest automatically.",
    summary: {
      problem: "Unpaid holds locking up inventory",
      build: "Booking site + auto-expiring holds",
      outcome: "Accurate availability, zero manual cleanup",
    },
    heroMedia: { kind: "photo", src: "/works/stayfinder.png" },
    meta: {
      role: "Full-stack build",
      stack: ["Next.js", "React", "PostgreSQL", "PhonePe"],
    },
    challenge:
      "A villa/property rental business needed a real booking platform with proper payment handling and protection against unpaid holds tying up inventory indefinitely - not just a listings page.",
    keyFeatures: [
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
    stats: [
      { value: "19", label: "Admin dashboard pages" },
      { value: "13", label: "Public pages" },
      { value: "5 min", label: "Before an unpaid hold releases" },
    ],
    highlight:
      "Booking holds expire on their own after 5 minutes, so a guest who starts checkout and never pays can't lock up a date - with a backup check running every couple of minutes just in case.",
  },
  {
    slug: "keanas-skin-clinic",
    title: "Keanas Skin Clinic",
    tagline: "A fast landing page built to convert paid social traffic.",
    summary: {
      problem: "No ad-ready web presence",
      build: "Single-page site + Pixel tracking",
      outcome: "Measurable ad spend, not blind spend",
    },
    heroMedia: { kind: "photo", src: "/works/keanas.webp" },
    meta: {
      role: "Landing page",
      stack: ["HTML/CSS", "Tailwind CSS", "JavaScript"],
    },
    challenge:
      "A skin clinic needed a simple, credible web presence to showcase treatments and doctors and support ad-driven patient acquisition.",
    keyFeatures: [
      {
        items: [
          "A sticky header and a directors hero section",
          "7 flip-card treatment categories covering 40+ treatments",
          "A hover-reveal grid of clinic technology",
          "A custom depth-stack photo gallery carousel",
          "WhatsApp, Instagram, and Facebook contact tiles, plus a modal contact form",
        ],
      },
    ],
    stats: [
      { value: "7", label: "Treatment categories" },
      { value: "40+", label: "Named treatments" },
      { value: "7", label: "Technology highlights" },
    ],
    highlight:
      "Ad tracking is only halfway wired up - it logs page views today, but not the actual leads (form fills, WhatsApp taps) ads are meant to drive, which is the easiest next win.",
  },
  {
    slug: "booking-badhao",
    title: "Booking Badhao",
    tagline: "One shared data model, two purpose-built apps for staff and customers.",
    summary: {
      problem: "Internal ops and customer ordering needed separate apps, one data source",
      build: "One admin/vendor app, one customer ordering app, one shared database",
      outcome: "No drift between staff and customer data",
    },
    heroMedia: { kind: "placeholder", monogram: "BB" },
    meta: {
      role: "Full-stack monorepo",
      stack: ["Next.js", "React", "Express", "PostgreSQL"],
    },
    challenge:
      "A restaurant operation needed both an internal management system and a separate, lighter customer ordering experience, sharing the same underlying data without duplicating it.",
    keyFeatures: [
      {
        group: "Admin / vendor app",
        items: [
          "Menu, category, and add-on management with a kitchen order board",
          "Table and room booking alongside area management",
          "Vendor and raw-material purchasing with pricing",
          "A 7-type marketing suite — loyalty, referral, birthday, and re-engagement campaigns",
        ],
      },
      {
        group: "Customer app",
        items: ["A landing page and a browsable, filterable menu"],
      },
    ],
    stats: [
      { value: "~49", label: "Admin screens" },
      { value: "28", label: "Reusable UI components" },
      { value: "7", label: "Marketing campaign types" },
    ],
    highlight:
      "Still actively being built - the team has been upfront about what's not done yet, like a missing test suite, rather than papering over it.",
  },
  {
    slug: "bowling-gaming-bar",
    title: "Bowling & Gaming Bar Template",
    tagline: "One template, two distinctly branded venues - proof of a repeatable productization pattern.",
    summary: {
      problem: "Bespoke builds for every venue client are slow and repetitive",
      build: "One base template, re-skinned per client",
      outcome: "Two live-feeling, distinctly branded sites off one codebase",
    },
    heroMedia: { kind: "placeholder", monogram: "BG" },
    meta: {
      role: "Template & re-skin system",
      stack: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    },
    challenge:
      "Building a bespoke site from scratch for every bowling/gaming-bar-style venue client is slow and repetitive when the underlying page structure - hero, attractions, dining, offers, parties, reviews, stats, footer - is the same across clients.",
    keyFeatures: [
      {
        items: [
          "A glassmorphism navbar with multi-location select",
          "A video hero with a live booking form",
          "A pinned, animated showcase of attractions",
          "A staggered dining gallery and a parallax offers section",
          "A curved party-photo carousel and animated stats and reviews",
        ],
      },
    ],
    stats: [
      { value: "1", label: "Shared template" },
      { value: "2", label: "Distinctly branded venues launched from it" },
      { value: "8", label: "Page sections reused across both" },
    ],
    highlight:
      "The exact same template was reused for a completely different business - a bowling bar's \"Attractions\" section became a boutique hotel's amenities, and the booking form became room reservations.",
  },
  {
    slug: "vision-guru",
    title: "Vision Guru & Dristikon",
    tagline: "Two purpose-built lead pipelines instead of one overloaded admissions site.",
    summary: {
      problem: "Year-round admissions leads and a flagship event needed separate pipelines",
      build: "Companion sites sharing an OTP-verified registration flow",
      outcome: "Vetted, centralized leads on both sites",
    },
    heroMedia: { kind: "placeholder", monogram: "VG" },
    meta: {
      role: "Two full-stack lead-gen sites",
      stack: ["Next.js", "React", "MongoDB"],
    },
    challenge:
      "A business-education brand needed to convert public interest into verified, actionable leads for its admissions team year-round, plus a dedicated way to promote and run its flagship conclave without leaning on the always-on admissions site.",
    keyFeatures: [
      {
        items: [
          "A long-scroll marketing page with programme/event details and testimonials",
          "A registration form with phone verification and a searchable city dropdown",
          "An admin dashboard with a searchable, filterable registrant table",
          "A photo lightbox and event stat badges on the conclave site",
        ],
      },
    ],
    stats: [
      { value: "2", label: "Companion sites, one shared pattern" },
      { value: "WhatsApp", label: "OTP delivery channel" },
    ],
    highlight:
      "This build is a template ahead of real content - it still shows a few placeholder names, which is expected before it goes live for an actual client.",
  },
  {
    slug: "career-charcha",
    title: "Career Charcha",
    tagline: "Leads that land directly in a spreadsheet the consultancy already knows how to work with.",
    summary: {
      problem: "No budget or need for a full CRM at this scale",
      build: "Landing page + leads written straight to a spreadsheet",
      outcome: "A live, familiar lead list with no hosting or admin UI to maintain",
    },
    heroMedia: { kind: "placeholder", monogram: "CC" },
    meta: {
      role: "Landing page + lead-capture API",
      stack: ["HTML/CSS", "JavaScript", "Node.js"],
    },
    challenge:
      "A college-admission and career-consultancy business needed to capture and centralize leads from its marketing site without standing up a full backend or database system for what is fundamentally a small lead-gen operation.",
    keyFeatures: [
      {
        items: [
          "A single-page site with a lead-capture form, About section, and courses carousel",
          "A 7-university \"Consultancy Services\" listing",
          "A live registration form with a thank-you confirmation",
        ],
      },
    ],
    stats: [
      { value: "7", label: "Partner universities listed" },
      { value: "8", label: "Fields captured per lead" },
    ],
    highlight:
      "Instead of building a full CRM the business didn't need yet, leads land straight into a spreadsheet the team already knows how to use - no extra software, no hosting cost.",
  },
  {
    slug: "equitracers",
    title: "EquiTracers",
    tagline: "A search-optimized, trust-building presence for a niche, compliance-adjacent financial service.",
    summary: {
      problem: "Needed credibility and search visibility for a niche service",
      build: "Single-page site with a credibility-first layout",
      outcome: "A search-first presence built for a trust-sensitive service",
    },
    heroMedia: { kind: "placeholder", monogram: "ET" },
    meta: {
      role: "Marketing site + SEO",
      stack: ["HTML/CSS", "JavaScript"],
    },
    challenge:
      "A financial services firm specializing in investor share and dividend recovery needed a credible, search-visible site to generate leads for a niche, trust-sensitive service.",
    keyFeatures: [
      {
        items: [
          "8 service cards covering the firm's full recovery offering",
          "A hero slideshow and a credibility stats bar",
          "A \"Why Choose Us\" checklist and a testimonials carousel",
          "A lead-capture popup form",
        ],
      },
    ],
    stats: [
      { value: "8", label: "Service cards" },
      { value: "14", label: "Testimonial images" },
    ],
    highlight:
      "A couple of small fixes are on the list for this one - a few icons aren't loading correctly, an easy cleanup pass for a future update.",
  },
  {
    slug: "playlog",
    title: "PlayLog",
    tagline: "A self-serve, shareable gaming-history tool - and a demonstration of product thinking beyond client work.",
    summary: {
      problem: "No single place to track games, hours, and a backlog",
      build: "A dashboard with public share pages and SEO-aware marketing",
      outcome: "Auth, sharing, and search hygiene handled as one coherent product",
    },
    heroMedia: { kind: "placeholder", monogram: "PL" },
    meta: {
      role: "Personal product",
      stack: ["Next.js", "React", "Supabase"],
    },
    challenge:
      "No single place existed to track games played, hours invested, and a backlog, with public share pages to show it off - a personal itch project, not a client build.",
    keyFeatures: [
      {
        items: [
          "Google sign-in gating a private dashboard",
          "A logging drawer for hours, status, rating, and platform",
          "A library grid with search, filters, and sorting",
          "A stats page with most-played games, averages, and trends",
          "One-click export and always-on public share pages",
        ],
      },
    ],
    stats: [
      { value: "9", label: "Pages" },
      { value: "4", label: "Play statuses tracked" },
      { value: "6", label: "Platforms supported" },
    ],
    highlight:
      "Games without cover art get a unique gradient tile instead of a generic placeholder - a small touch that makes an empty library still look intentional.",
  },
  {
    slug: "tier-list",
    title: "Tier List",
    tagline: "A polished, autosaving, shareable ranking tool built outside of agency-directed work.",
    summary: {
      problem: "Wanted proper accounts and shareable results, not a generic third-party tool",
      build: "Drag-and-drop ranking with autosave and public share links",
      outcome: "Full-stack product skills shown end-to-end: auth, UX, sharing",
    },
    heroMedia: { kind: "placeholder", monogram: "TL" },
    meta: {
      role: "Personal product",
      stack: ["Next.js", "React", "PostgreSQL"],
    },
    challenge:
      "Wanted a TierMaker-style tool for ranking anything - games, movies, whatever - with proper accounts and shareable results, rather than reaching for a generic third-party tool.",
    keyFeatures: [
      {
        items: [
          "Google sign-in with a personal dashboard of tier lists",
          "Custom tiers and colors with auto-readable text",
          "Multi-image upload and drag-and-drop ranking with autosave",
          "A public, read-only share link for finished lists",
        ],
      },
    ],
    stats: [
      { value: "4", label: "Commits to ship it" },
      { value: "5", label: "Default tiers, fully customizable" },
    ],
    highlight:
      "Text color on each tier is picked automatically to stay readable against whatever background color you choose - a small accessibility touch most tools skip.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  const next = caseStudies[(index + 1) % caseStudies.length];
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  return { prev, next };
}
