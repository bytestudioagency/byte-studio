export interface CaseStudyFeatureGroup {
  group?: string;
  items: string[];
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
  gallery?: string[];
  stack: string[];
  keyFeatures: CaseStudyFeatureGroup[];
  highlight?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "apna-store",
    title: "Apna Store",
    tagline: "Replacing spreadsheet-run store operations with one connected system.",
    summary: {
      problem:
        "A store owner needed two things: a way for customers to browse products online, and a back-office system to actually run the store - stock, suppliers, sales, and bills. The biggest risk was confirming a sale for something the store didn't really have enough raw material to make, because there was no easy way to check raw stock before the sale went through.",
      build:
        "A system with two sides. One side is a public shop page where customers can browse, search, and filter products. The other side is an admin area, behind a login, where staff manage categories, suppliers, items, stock, sales, bills, and reports. Before any sale is confirmed, the system checks if there's enough raw material across all suppliers, uses up the oldest stock first, and writes down exactly what was used and why. It also handles small everyday problems: bringing back a deleted item under the same name, letting staff reset their own password without calling a developer, and printing a correct tax invoice right away instead of by hand.",
      outcome:
        "One system that replaces messy, manual store work with a single place to manage stock, sales, and reports - the owner can always see where stock went instead of guessing, and customers can check what's available without calling the store.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/apna-store/1.png" },
    gallery: [
      "/portfolio/apna-store/2.png",
      "/portfolio/apna-store/3.png",
      "/portfolio/apna-store/4.png",
      "/portfolio/apna-store/5.png",
    ],
    stack: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS"],
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
          "Every sale checks raw material across all suppliers first, uses up the oldest stock automatically, and logs exactly what was used",
          "Bundle raw items into sellable products with set pricing",
          "A POS-style billing flow that auto-updates stock and generates a PDF invoice",
          "A sales analytics dashboard with date-range revenue charts",
          "Self-service password reset, so a locked-out staff member isn't stuck waiting on IT",
        ],
      },
    ],
    highlight:
      "The invoice generator builds proper tax invoices from scratch - right down to spelling out amounts in words, the way local accounting expects.",
  },
  {
    slug: "elevate-developers",
    title: "Elevate Developers",
    tagline: "A credible public presence for a real-estate brand, with lead capture built in from the start.",
    summary: {
      problem:
        "A real-estate developer had no real online presence for their flagship project - anyone interested had to call or visit in person just to see the floor plans or ask a question, a slow way to sell homes.",
      build:
        "A marketing website that shows off the project - specs, amenities, location, and two floor-plan options - plus a company and team section, a blog, and several ways to leave contact details. It's built as ten hand-made pages with no website builder or database behind it, each keeping the same interactive touches working: accordions, a mobile menu, a room-type toggle, smooth scrolling, and scroll-in animations that respect a visitor's reduced-motion setting and keep working even if the page's JavaScript partially fails. Every \"get in touch\" button on the site, from the nav bar to a \"Schedule a Tour\" link on the project page, leads into one shared contact form.",
      outcome:
        "A credible public presence and a structured way to capture buyer inquiries directly from project and floor-plan pages, instead of routing everything through phone calls or in-person visits.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/elevate/1.png" },
    gallery: ["/portfolio/elevate/2.png", "/portfolio/elevate/3.png"],
    stack: ["HTML/CSS", "JavaScript", "Bootstrap", "Lenis"],
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
    highlight:
      "Every page quietly pings the developer the moment someone opens the live site - a simple way to know the instant a prospect or client is actually looking.",
  },
  {
    slug: "turant",
    title: "Turant",
    tagline: "An end-to-end citizen-news platform - from posting to moderation to ad-driven monetization.",
    summary: {
      problem:
        "A citizen-journalism idea needed a full social platform, not just a place to read news - people had to be able to post, follow, comment, and share; moderators needed a way to catch bad behavior; and the business needed a way to make money from ads, all at once.",
      build:
        "A mobile app where anyone can publish a news post as text, a photo set, or a video, and other people can follow, like, comment, save, and share it. Content and ads are matched to each person's language and location, which first-time users pick when they open the app. Each visitor's feed blends posts from people they follow with other trending posts, and daily posting limits plus temporary or permanent bans keep spam and abuse in check. Uploaded video is automatically compressed and given a thumbnail through a custom transcoding pipeline, not an off-the-shelf service. Behind it sits an admin dashboard where staff review users, manage a network of field reporters, and run ad campaigns.",
      outcome:
        "An end-to-end platform - not a demo - covering the full loop from citizen content creation through moderation to ad-driven monetization, with operational control living in one admin surface.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/turant/1.png" },
    stack: ["React Native", "Node.js", "Prisma", "PostgreSQL", "Next.js"],
    keyFeatures: [
      {
        group: "Mobile app",
        items: [
          "OTP signup by email and phone, with first-run language and location setup",
          "Home, Search, Upload, and Profile tabs",
          "Separate upload flows for articles, photos, and video",
          "Follow, like, comment, save, and share, with in-feed ads",
          "Uploaded video is automatically compressed and given a thumbnail through a custom transcoding pipeline, not an off-the-shelf service",
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
    highlight:
      "Sign-in codes are handled separately for email, phone, and admin logins, with phone codes routed through a third-party SMS provider - video, meanwhile, runs through a custom-built streaming pipeline rather than an off-the-shelf service.",
  },
  {
    slug: "stayfinder",
    title: "StayFinder",
    tagline: "A full booking lifecycle that keeps availability honest automatically.",
    summary: {
      problem:
        "A villa rental business needed real online bookings and payments, not just a listings page. The sharpest risk: a guest could start booking a villa, walk away without paying, and tie up those dates for everyone else unless the hold was reliably released.",
      build:
        "A website where guests browse villas, hold a date while they pay, and get instant confirmation once payment clears - with unpaid holds automatically released after 5 minutes. Payment confirmation can arrive two different ways at once (a bank notification or the guest's own browser checking status), so the system is built to never double-confirm the same booking. Coupons and per-guest limits stay accurate even when a hold expires or a payment fails. Behind it sits one admin dashboard, with different access levels for different staff roles, covering every property, booking, and payment.",
      outcome:
        "A full booking journey - browse, hold, pay, confirm - with abandoned holds cleaned up automatically so availability stays accurate, plus one admin dashboard covering properties, bookings, and payments.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/stay-finder/1.png" },
    gallery: ["/portfolio/stay-finder/2.png", "/portfolio/stay-finder/3.png"],
    stack: ["Next.js", "React", "PostgreSQL", "Prisma", "PhonePe", "Inngest"],
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
    highlight:
      "Booking holds expire on their own after 5 minutes - a durable background job wakes at the exact moment to release it, with a backup sweep running every couple of minutes just in case.",
  },
  {
    slug: "keanas-skin-clinic",
    title: "Keanas Skin Clinic",
    tagline: "A fast landing page built to convert paid social traffic.",
    summary: {
      problem:
        "A skin clinic needed a simple, credible website to show off its treatments and doctors and support patients arriving from social media ads - most visitors would judge the clinic in the first few seconds of the page loading.",
      build:
        "A single fast-loading page, with no framework or build tools, covering treatments, doctors, a photo gallery, and a contact form. Trust is built the way an ad-click visitor needs it - doctor credentials, press mentions, a Google rating, and a \"Launch Day\" event - rather than long clinical write-ups. The large treatment list (7 categories, 40+ named treatments) is shown as flip cards so it stays easy to browse instead of overwhelming, and a custom photo carousel gives the gallery some depth without needing any outside library. Photos are organized and pre-optimized by category to keep the page fast without any build tooling, and Facebook Pixel tracking is wired in throughout so ad performance can be measured.",
      outcome:
        "A lightweight, fast-loading site that doubles as a landing destination for paid social traffic, with Pixel tracking in place to measure ad performance rather than running ads blind.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/keanas/1.png" },
    gallery: ["/portfolio/keanas/2.png", "/portfolio/keanas/3.png"],
    stack: ["HTML/CSS", "Tailwind CSS", "JavaScript"],
    keyFeatures: [
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
    highlight:
      "Ad tracking is only halfway wired up - it logs page views today, but not the actual leads (form fills, WhatsApp taps) ads are meant to drive, which is the easiest next win.",
  },
  {
    slug: "booking-badhao",
    title: "Booking Badhao",
    tagline: "One shared data model, two purpose-built apps for staff and customers.",
    summary: {
      problem:
        "A restaurant needed both an internal system to run day-to-day operations and a separate, lighter app for customers to order food - without keeping two disconnected copies of the same menu and pricing data.",
      build:
        "Two apps sharing one underlying database: a full management app for staff, covering the menu, tables, kitchen order tickets, purchasing from vendors, and marketing campaigns, and a newer, simpler ordering app for customers to browse the menu and its options. Because both apps share the same underlying data and validation rules, a menu change made in one place shows up correctly everywhere.",
      outcome:
        "A single coherent data model serving two very different audiences - staff and customers - through purpose-built apps, with shared code keeping the menu and rules from drifting apart as both apps evolve. Still mid-development, with a few known gaps, like a missing automated test suite, tracked openly in the project's own notes rather than papered over.",
    },
    heroMedia: { kind: "photo", src: "/portfolio/booking-badhao/1.png" },
    gallery: ["/portfolio/booking-badhao/2.png", "/portfolio/booking-badhao/3.png"],
    stack: ["Turborepo", "React", "Next.js", "Express", "Prisma", "PostgreSQL"],
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
    highlight:
      "Add-ons like \"extra cheese\" are defined once and reused across every location and menu item - a more sophisticated setup than the simple idea suggests.",
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

// Real screenshots make a better social-share/structured-data preview than
// the site default; brandmark/placeholder hero media falls back to it.
export function getOgImage(study: CaseStudy): string {
  return study.heroMedia.kind === "photo" ? study.heroMedia.src : "/og.png";
}
