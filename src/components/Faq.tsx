"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How big is your team and what experience do you have?",
    answer:
      "We are a team of six. Five developers have at least 5 years of experience and have shipped over 20 products. Our UI/UX lead has 8 years of experience and has delivered more than 1,000 screens.",
  },
  {
    question: "Do I need technical knowledge to work with you?",
    answer:
      "No. We act as your fractional co founder on the technical side. If you want more detail we will explain the architecture and key decisions.",
  },
  {
    question: "How involved will I be in the development process?",
    answer:
      "You will have full visibility. We track work in Notion with daily updates and hold a weekly video call to review priorities, demos, and risks.",
  },
  {
    question: "How does pricing work?",
    answer:
      "A flat project fee based on scope - Launch, Operate, or Platform. No hourly billing, no surprise invoices.",
  },
  {
    question: "Do you sign a contract?",
    answer:
      "Yes - every project starts with a short scope and payment terms agreement before work begins.",
  },
  {
    question: "How do I pay?",
    answer:
      "UPI or bank transfer.",
  },
  {
    question: "What's included after launch?",
    answer:
      "15 days of support to fix bugs and handle small tweaks.",
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-16 lg:px-24"
      id="faq"
    >
      {/* Label */}
      <motion.div
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
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <Heading className="text-center mb-8 md:mb-10 lg:mb-12">
            Frequently Asked Questions
          </Heading>

          {/* Accordion */}
          <div className="max-w-prose md:max-w-2xl lg:max-w-3xl mx-auto space-y-4 md:space-y-5">
            {faqs.map((faq, index) => (
              <div key={index} className="gradient-box">
                <button
                  type="button"
                  className="w-full text-left flex justify-between items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <Text as="h3" variant="body">
                    {faq.question}
                  </Text>
                  <div className="flex items-center justify-center w-7 h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border border-white/80">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-white cursor-pointer" />
                    </motion.div>
                  </div>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  aria-label={`faq-trigger-${index}`}
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index
                    ? "max-h-64 md:max-h-80 opacity-100 mt-2 md:mt-3 pt-2 md:pt-3 gradient-top-border"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <Text variant="gray">{faq.answer}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Faq;
