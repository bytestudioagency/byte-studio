import React from "react";
import { CircleCheckBig } from "lucide-react";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";

const plans = [
  {
    title: "Launch",
    price: "₹10,000 - ₹15,000",
    oldPrice: "",
    discount: "",
    features: [
      "Delivery in 1 week",
      "5-8 page responsive site",
      "Lead capture form",
      "Basic SEO setup",
    ],
    highlight: false,
    showChecks: true,
    cta: "Get Started",
  },
  {
    title: "Operate",
    price: "₹25,000 - ₹30,000",
    oldPrice: "",
    discount: "",
    features: [
      "Delivery in 3-4 weeks",
      "Admin dashboard to manage leads & orders",
      "OTP-verified forms",
      "Basic analytics",
      "30 days of support",
    ],
    highlight: true, // Middle card highlighted
    showChecks: true,
    cta: "Get Started",
  },
  {
    title: "Platform",
    price: "Custom Plan",
    oldPrice: "",
    discount: "",
    features: [
      "Payment integration (Razorpay/PhonePe)",
      "Background jobs & automation",
      "Multi-app architecture",
      "Scoped and quoted on a call",
    ],
    highlight: false,
    showChecks: false,
    cta: "Book a Call",
  },
];

const Pricing: React.FC = () => {
  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-20 lg:px-24"
      id="pricing-plans"
    >
      <div>
        {/* Title */}
        <Reveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Heading className="text-center mb-2 md:mb-3">
            Pricing Plans
          </Heading>
          <Text
            variant="muted"
            className="text-center max-w-prose md:max-w-xl mx-auto my-5 md:my-6"
          >
            No mystery. No magic. Just a proven process built to deliver.
          </Text>
        </Reveal>

        {/* Cards */}
        <Reveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto lg:items-center mt-12 md:mt-16 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {plans.map((plan) => (
            <Reveal
              key={plan.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-6 md:p-7 lg:p-8 pt-8 flex flex-col justify-between min-h-[520px] md:min-h-[560px] transition-colors duration-300 ${
                plan.highlight
                  ? "pricing-highlight border border-blue-500/40 shadow-[0_0_30px_-14px_rgba(37,99,235,0.35)] lg:scale-[1.05] lg:min-h-[600px] z-10"
                  : "bg-white/[0.03] border border-white/10 hover:border-white/20"
              }`}
            >
              {/* Badge */}
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 backdrop-blur-md text-xs md:text-sm font-medium text-blue-200 whitespace-nowrap">
                  Most Popular
                </span>
              )}

              {/* Plan Title */}
              <Text as="h3" variant="body" className="mb-3 md:mb-4">
                {plan.title}
              </Text>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline flex-wrap gap-x-3 my-3 md:my-4">
                  <Heading as="span" variant="price">
                    {plan.price}
                  </Heading>
                  {plan.oldPrice && (
                    <Text as="span" variant="body" className="line-through opacity-60">
                      {plan.oldPrice}
                    </Text>
                  )}
                </div>
                {plan.discount && (
                  <Text
                    as="span"
                    variant="caption"
                    className="inline-block mt-2 md:mt-3 px-3 py-2 rounded-full border border-white"
                  >
                    {plan.discount}
                  </Text>
                )}
              </div>

              <div
                className={`w-full border-[0.5px] ${
                  plan.highlight ? "border-blue-400/30" : "border-white/15"
                }`}
              />

              {/* Features */}
              <ul className="space-y-4 md:space-y-5 my-8 md:my-10 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={`${plan.title}-${feature}`}
                    className="flex items-start gap-3"
                  >
                    {plan.showChecks && (
                      <CircleCheckBig
                        className={`shrink-0 mt-0.5 w-[18px] h-[18px] ${
                          plan.highlight ? "text-blue-400" : "text-white/50"
                        }`}
                        strokeWidth={2}
                      />
                    )}
                    <Text as="span" variant="muted">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
                <button className="pushable mt-2 md:mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl w-full">
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front"> {plan.cta} </span>
                </button>
              </a>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
