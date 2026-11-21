// Copy for /privacy and /terms. This is a sensible starting template, not legal advice:
// have someone qualified read it before you rely on it.

import { site } from "./site";

export const legal = {
  entity: "Byte Studio", // TODO: your registered business name, if it differs from the brand
  courts: "India", // TODO: the city whose courts handle disputes, e.g. "Bengaluru, India"
  updated: "21 November 2026", // change this whenever the text below changes
};

/** How to reach us: the email if one is set, otherwise the social profiles. */
const reach = site.email
  ? `email ${site.email}`
  : `message us on ${site.socials.map((s) => `${s.label} (${s.href})`).join(" or ")}`;

/** A block is a paragraph (string) or a bullet list (string[]). */
export type LegalDoc = {
  title: string;
  accent: string;
  description: string;
  intro: string;
  sections: { heading: string; body: (string | string[])[] }[];
};

export const privacy: LegalDoc = {
  title: "Privacy",
  accent: "policy.",
  description: `How ${site.name} handles personal information from visitors and clients.`,
  intro: `${legal.entity} ("we", "us") builds web and mobile apps for clients. This page explains what personal information we collect through this website and during a project, and what we do with it. The short version: we collect very little, and we never sell it.`,
  sections: [
    {
      heading: "What this website collects",
      body: [
        "This site has no sign-up, no contact form, no advertising trackers and no analytics cookies.",
        "Like every website, ours is served by a hosting provider that keeps short-lived technical logs (IP address, browser type, pages requested, time) to keep the service secure and running.",
      ],
    },
    {
      heading: "When you contact us",
      body: [
        "If you email us, we receive your email address and whatever you write. If you book a call, the booking is handled by our scheduling provider, which collects your name, email address and the answers you give on the booking form, and shares them with us.",
        "We use this information only to reply, to prepare a quote and to run the project if we go on to work together.",
      ],
    },
    {
      heading: "During a project",
      body: [
        "As a client you share business information with us, and sometimes access to accounts or data belonging to your own users. We use it only to deliver the work you have asked for, keep it confidential, and work inside your own accounts and repositories wherever possible so that it stays under your control.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We do not sell or rent personal information. We share it only with the service providers we need to run the business, each limited to what their job requires:",
        ["Website hosting", "Email", "Call scheduling", "Invoicing and accounting"],
        "We may also disclose information when the law requires it.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries that do not become projects are deleted within 12 months. Project records and invoices are kept for as long as tax and accounting law requires, then deleted.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        `You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. To do this, ${reach}. We will respond within 30 days.`,
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If we change how we handle personal information, for example by adding analytics to this site, we will update this page and the date at the top before the change takes effect.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms",
  accent: "of service.",
  description: `The terms for using the ${site.name} website and the standard terms we work under.`,
  intro: `These terms cover your use of this website and summarise how ${legal.entity} ("we", "us") works with clients. Every project also has its own signed agreement with the scope, price and dates. Where that agreement and this page differ, the signed agreement applies.`,
  sections: [
    {
      heading: "Using this website",
      body: [
        "The content on this site is general information about our services. Prices shown on the site are indicative ranges and not an offer. A price is binding only once it is in a written quote that both of us have accepted.",
      ],
    },
    {
      heading: "Quotes and scope",
      body: [
        "Before work starts you receive a written scope and a flat project fee. The quote does not change unless the scope does. If you ask for something outside the agreed scope, we quote it separately and build it only once you approve.",
        "Timelines assume timely feedback, content and account access from you. If we are kept waiting, the launch date moves by the same amount.",
      ],
    },
    {
      heading: "Payment",
      body: [
        "Payment terms are set out in the scope and payment agreement we both sign before work begins. We accept UPI or bank transfer, and invoices are due within 7 days. Third-party costs such as hosting, domains, app store fees and paid services are billed to you directly by those providers and are not part of our fee.",
      ],
    },
    {
      heading: "Ownership",
      body: [
        "Work is committed to a repository in your name from the first day. Ownership of the code and designs passes to you as the agreed payments are made. If a project ends early, you keep everything you have paid for.",
        "Open-source libraries and third-party services used in your product stay under their own licences. We may reuse general know-how and non-specific utility code in other projects, but never your confidential information or anything that identifies your product.",
        "We may show the finished work in our portfolio unless you ask us not to.",
      ],
    },
    {
      heading: "After launch",
      body: [
        "Every project includes 15 days of support after launch to fix bugs and handle small tweaks. This covers defects in what we built against the agreed scope. It does not cover new features, changes of mind, or problems caused by third-party services or by changes made by others.",
      ],
    },
    {
      heading: "Confidentiality",
      body: [
        "We keep anything you share with us about your business confidential and use it only for your project. We are happy to sign a non-disclosure agreement before you share details.",
      ],
    },
    {
      heading: "Liability",
      body: [
        "We build with care and test before launch, but no software is free of defects. To the extent the law allows, our total liability for a project is limited to the fees you have paid us for it, and we are not liable for indirect losses such as lost profit or lost data.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        `These terms are governed by the laws of India, and disputes are subject to the courts of ${legal.courts}.`,
        `If you have questions about these terms, ${reach}.`,
      ],
    },
  ],
};
