import React from "react";
import Image from "next/image";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";

const Hero: React.FC = () => {
  return (
    <section
      className="relative text-white overflow-hidden min-h-screen flex items-center justify-center pt-16 pb-32 px-6 md:px-12 lg:px-24"
      id="home"
    >
      {/* Blue Background at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-180 md:h-120">
        <Image
          src="/design.png"
          alt=""
          role="presentation"
          fill
          sizes="100vw"
          className="object-cover object-top select-none pointer-events-none"
        />
      </div>

      <Reveal
        className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto"
        initial={{
          opacity: 0,
          scale: 0.9,
          translateZ: -50,
        }}
        animate={{ opacity: 1, scale: 1, z: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        {/* Badge */}
        <div className="mb-8 md:mb-10 lg:mb-12">
          <span className="glass-btn">10+ Systems Shipped</span>
        </div>

        {/* Heading */}
        <Heading as="h1" variant="display">
          A Website That Works With Your Business
        </Heading>

        <Heading as="h2" variant="accent" className="mt-3 md:mt-4 lg:mt-5">
          Not One That Just Sits in a Browser Tab
        </Heading>

        {/* Supporting text */}
        <Text variant="gray" className="mt-8 max-w-prose md:max-w-2xl">
          Leads, orders, registrations - tracked and managed, not lost in an
          inbox.
        </Text>

        {/* CTA */}
        <div className="mt-10 relative">
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
