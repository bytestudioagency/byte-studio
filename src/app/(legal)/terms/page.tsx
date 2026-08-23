import type { Metadata } from "next";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Byte Studio website.",
  alternates: {
    canonical: "/terms",
  },
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. Acceptance of terms",
    body: (
      <>
        By using this website (&quot;Site&quot;), you agree to these terms.
        If you don&apos;t agree with them, please don&apos;t use the Site.
      </>
    ),
  },
  {
    heading: "2. About Byte Studio",
    body: (
      <>
        Byte Studio (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
        software design and development studio. This Site exists to
        showcase our work and let prospective clients get in touch with us.
      </>
    ),
  },
  {
    heading: "3. Use of the site",
    body: (
      <>
        You agree to use this Site only for lawful purposes and not in any
        way that could damage, disable, or impair it, or interfere with
        anyone else&apos;s use of it.
      </>
    ),
  },
  {
    heading: "4. Intellectual property",
    body: (
      <>
        The content on this Site - including its design, copy, graphics,
        and the case studies describing our past work - belongs to Byte
        Studio or is used with permission, and may not be copied,
        reproduced, or reused without our consent. Project names, logos, and
        screenshots belonging to past clients remain their property and are
        shown here to illustrate work delivered, not to imply endorsement.
      </>
    ),
  },
  {
    heading: "5. Services and engagements",
    body: (
      <>
        The information on this Site - including project descriptions,
        pricing, and timelines - is provided for general guidance and does
        not itself constitute a binding offer. Any actual engagement for
        design or development work (scope, deliverables, timeline, and
        payment) is governed by the separate proposal or agreement we send
        you before work begins, which takes precedence over anything stated
        here.
      </>
    ),
  },
  {
    heading: "6. No warranties",
    body: (
      <>
        This Site is provided &quot;as is&quot;. While we try to keep it
        accurate and up to date, we make no guarantees about its
        completeness, reliability, or availability at any given time.
      </>
    ),
  },
  {
    heading: "7. Limitation of liability",
    body: (
      <>
        To the extent permitted by law, Byte Studio is not liable for any
        indirect, incidental, or consequential loss arising from your use
        of, or inability to use, this Site.
      </>
    ),
  },
  {
    heading: "8. Third-party links",
    body: (
      <>
        This Site may link to third-party tools and services, such as our
        call-scheduling tool or social profiles. We don&apos;t control these
        and aren&apos;t responsible for their content or practices.
      </>
    ),
  },
  {
    heading: "9. Changes to these terms",
    body: (
      <>
        We may revise these terms from time to time. The &quot;last
        updated&quot; date at the top of this page reflects the most recent
        revision, and continued use of the Site after a change means you
        accept the updated terms.
      </>
    ),
  },
  {
    heading: "10. Contact",
    body: (
      <>
        Questions about these terms can be sent to us by{" "}
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

export default function TermsPage() {
  return (
    <section className="text-white py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Heading className="mb-2">Terms &amp; Conditions</Heading>
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
