import Link from "next/link";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";

const Footer = () => {
  return (
    <footer
      className="relative bg-gradient-to-b from-[#02061B] to-[#0B1D81] text-white text-center py-12 px-6 md:py-16 md:px-10 lg:px-16"
      id="footer"
    >
      <Reveal
        className="mx-auto w-full max-w-6xl"
        initial={{
          opacity: 0,
          scale: 0.9,
          translateZ: -50,
        }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Main Heading */}
        <Heading variant="sectionCompact" className="mb-6 md:mb-8">
          Let&apos;s Go Further - Together
        </Heading>

        {/* Subtext */}
        <Text variant="gray" className="mb-8">
          Your website should do more than look good - it should run part of
          your day.
        </Text>

        {/* CTA Button */}
        <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
          <button className="pushable mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front"> Book a Call </span>
          </button>
        </a>

        {/* Divider Space */}
        <div className="mt-12 pt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* Left Section */}
          <Text as="div" variant="link" className="order-1">
            ©2026 Byte Studio, All Rights Reserved
          </Text>

          {/* Middle Links */}
          <Text
            as="div"
            variant="link"
            className="order-2 flex flex-wrap items-center justify-center gap-x-3 md:justify-start md:gap-x-4 gap-y-2"
          >
            <Link
              href="/privacy"
              className="hover:underline underline-offset-4 decoration-1 px-1 py-1 rounded"
            >
              Privacy policies
            </Link>
            <span className="hidden md:inline">|</span>
            <Link
              href="/terms"
              className="hover:underline underline-offset-4 decoration-1 px-1 py-1 rounded"
            >
              Terms & Conditions
            </Link>
          </Text>

          {/* Social Links */}
          <Text
            as="div"
            variant="link"
            className="order-3 flex items-center justify-center gap-x-3 md:justify-start md:gap-x-4"
          >
            <a
              href="https://x.com/bytestudiohq"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline underline-offset-4 decoration-1 px-1 py-1 rounded"
            >
              X
            </a>
            <span className="hidden md:inline">|</span>
            <a
              href="https://www.linkedin.com/in/byte-studio/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline underline-offset-4 decoration-1 px-1 py-1 rounded"
            >
              Linkedin
            </a>
          </Text>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
