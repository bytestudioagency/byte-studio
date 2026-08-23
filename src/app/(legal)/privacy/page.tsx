import type { Metadata } from "next";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Byte Studio collects, uses, and protects information from visitors to this site.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Who we are",
    body: (
      <>
        Byte Studio (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
        software design and development studio. This policy explains how we
        handle information collected through this website
        (&quot;Site&quot;) - it does not cover the products or client
        websites we build, which may have their own privacy policies.
      </>
    ),
  },
  {
    heading: "2. Information we collect",
    body: (
      <>
        We collect information in a few limited ways:
        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>
            <Text as="span" variant="bodyStrong">
              Booking information.
            </Text>{" "}
            When you book a call with us, you&apos;re taken to our
            scheduling tool, which collects your name, email, and any
            details you choose to share about your project.
          </li>
          <li>
            <Text as="span" variant="bodyStrong">
              Usage data.
            </Text>{" "}
            Standard technical information such as browser type, device
            type, pages visited, and approximate location, collected
            automatically as you browse the Site.
          </li>
          <li>
            <Text as="span" variant="bodyStrong">
              Information you send us directly.
            </Text>{" "}
            Anything you share with us over email, call, or messaging apps
            when discussing a project.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How we use this information",
    body: (
      <>
        We use the information we collect to respond to inquiries, schedule
        and prepare for calls, scope and deliver projects, and understand how
        people use this Site so we can improve it. We do not sell your
        information to anyone.
      </>
    ),
  },
  {
    heading: "4. Third-party services",
    body: (
      <>
        This Site relies on a small number of third-party services to
        function - among them, a scheduling tool for booking calls, our
        hosting provider, and web fonts served from Google Fonts. Each of
        these providers processes some data (such as IP address or booking
        details) under their own privacy terms in order to provide their
        service to us.
      </>
    ),
  },
  {
    heading: "5. Cookies",
    body: (
      <>
        The Site may use minimal cookies or similar local storage required
        for basic functionality and to understand aggregate traffic. We do
        not use these to build advertising profiles.
      </>
    ),
  },
  {
    heading: "6. Data retention",
    body: (
      <>
        We keep project- and booking-related information for as long as
        it&apos;s reasonably needed to deliver work, maintain records, and
        meet any legal or accounting obligations, and delete or anonymize it
        afterward.
      </>
    ),
  },
  {
    heading: "7. Your rights",
    body: (
      <>
        You can ask us what information we hold about you, request a copy of
        it, or ask us to correct or delete it, subject to any legal or
        contractual obligations that require us to keep certain records. Get
        in touch using the details below to make a request.
      </>
    ),
  },
  {
    heading: "8. Changes to this policy",
    body: (
      <>
        We may update this policy from time to time as the Site or our
        practices change. The &quot;last updated&quot; date at the top of
        this page reflects the most recent revision.
      </>
    ),
  },
  {
    heading: "9. Contact",
    body: (
      <>
        Questions about this policy, or requests about your information, can
        be sent to us by{" "}
        <a
          href={MEETING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lavender hover:underline underline-offset-4"
        >
          booking a call
        </a>{" "}
        or through any contact method listed elsewhere on this Site.
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="text-white py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Heading className="mb-2">Privacy Policy</Heading>
          <Text variant="muted" className="mb-10 md:mb-14">
            Last updated August 22, 2026
          </Text>

          <div className="space-y-8 md:space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <Heading as="h2" variant="subtitle" className="mb-3">
                  {section.heading}
                </Heading>
                <Text variant="gray" className="leading-relaxed">
                  {section.body}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
