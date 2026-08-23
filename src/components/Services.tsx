"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Smartphone, Palette, TrendingUp } from "lucide-react";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  deliveredFor?: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "From marketing sites to full-stack platforms, we architect and build production-ready web apps that scale with your business.",
    deliveredFor: "Elevate Developers",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native-feel apps built with React Native and Expo, shipped to the Play Store with a working admin dashboard behind them.",
    deliveredFor: "Turant News",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Interfaces designed around how people actually use your product - clear flows, fast load times, and no friction between a visitor and a customer.",
    deliveredFor: "Streeya",
  },
  {
    icon: TrendingUp,
    title: "SEO",
    description:
      "We help your site show up higher on Google and reach more of the right people, so you get more visitors and more customers without paying for ads.",
    deliveredFor: "Keanas Clinic",
  },
];

const Services: React.FC = () => {
  const [active, setActive] = useState(0);
  const activeService = services[active];
  const Icon = activeService.icon;

  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-20 lg:px-24"
      id="services"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, translateZ: -50 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Heading className="text-center mb-4 md:mb-6">Our Services</Heading>
        <Text
          variant="gray"
          className="text-center max-w-prose md:max-w-xl mx-auto mb-10 md:mb-14 lg:mb-16"
        >
          Four disciplines, one team - so nothing gets lost between design,
          code, and launch.
        </Text>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-4 lg:gap-10 items-stretch">
          {/* Service list */}
          <div className="flex flex-col lg:border-r lg:border-white/10 lg:pr-6">
            {services.map((service, index) => {
              const isActive = active === index;
              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className="relative text-left py-4 md:py-5 pl-5 md:pl-6 cursor-pointer focus-visible:outline-none group"
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-indicator"
                      className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-blue-500 shadow-[0_0_12px_2px_rgba(37,99,235,0.6)]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-xs tabular-nums transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-white/30"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <Heading
                      as="span"
                      variant="title"
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/35 group-hover:text-white/70"
                      }`}
                    >
                      {service.title}
                    </Heading>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div className="relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 p-6 md:p-8 lg:p-10 min-h-[340px] md:min-h-[380px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-2/3 h-[1px] bg-gradient-to-r from-[#A1AEF7] to-transparent pointer-events-none" />
            <span className="absolute top-6 right-6 md:top-8 md:right-8 font-heading text-[72px] md:text-[96px] leading-none text-white/[0.05] select-none pointer-events-none tabular-nums">
              0{active + 1}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
                  <Text variant="caption" className="uppercase tracking-widest text-white/40">
                    Service
                  </Text>
                </div>

                <Heading as="h3" variant="title" className="mb-4">
                  {activeService.title}
                </Heading>

                <Text variant="gray" className="max-w-md mb-8">
                  {activeService.description}
                </Text>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
                    <button className="pushable">
                      <span className="shadow"></span>
                      <span className="edge"></span>
                      <span className="front"> Book a Call </span>
                    </button>
                  </a>
                  {activeService.deliveredFor && (
                    <Text variant="gray" as="span">
                      Delivered for{" "}
                      <Text variant="bodyStrong" as="span">
                        {activeService.deliveredFor}
                      </Text>
                    </Text>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
