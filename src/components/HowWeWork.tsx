import Image from "next/image";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    image: "/how-we-work/how-1.avif",
    title: "Discovery Calls",
    desc: "We start with an in-depth discussion to understand your idea, goals, and challenges. This ensures we're aligned before moving forward.",
  },
  {
    image: "/how-we-work/how-2.avif",
    title: "Design & Development",
    desc: "We turn the agreed scope into wireframes and start building right after, so you're seeing real progress early instead of waiting until the end.",
  },
  {
    image: "/how-we-work/how-3.avif",
    title: "Roadmap & Sprints",
    desc: "We create a clear development roadmap and sprint plan, breaking your project into milestones for smooth and predictable progress.",
  },
  {
    image: "/how-we-work/how-4.avif",
    title: "Build & Support",
    desc: "Development begins, followed by deployment. After launch, we provide 30 days of free maintenance support to ensure everything runs seamlessly.",
  },
];

const HowWeWork = () => {
  return (
    <section
      className="bg-black text-white py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative"
      id="how-we-work"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24">
          <Heading>How we work</Heading>
          <Text variant="gray" className="max-w-2xl mx-auto mt-4 md:mt-6">
            No surprises. No scope creep. Just clear milestones.
          </Text>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-700/0 via-blue-600 to-blue-700/0" />

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;

              return (
                <Reveal
                  key={i}
                  className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full border border-blue-600/60" />
                    <span className="relative block w-3.5 h-3.5 rounded-full bg-blue-600 shadow-[0_0_30px_10px_rgba(37,99,235,0.7)]" />
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "md:order-2 md:text-right" : "md:text-left"
                    } text-left`}
                  >
                    <div className="inline-block glass-btn mb-4">
                      Step {i + 1}
                    </div>
                    <Heading as="h3" variant="lg" className="mb-3">
                      {step.title}
                    </Heading>
                    <Text
                      variant="muted"
                      className={`max-w-md ${isEven ? "md:ml-auto" : ""}`}
                    >
                      {step.desc}
                    </Text>
                  </div>

                  {/* Illustration */}
                  <div
                    className={`${
                      isEven ? "md:order-1 md:justify-start" : "md:justify-end"
                    } flex justify-start`}
                  >
                    <div className="relative w-40 h-40 md:w-56 md:h-56">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(min-width: 768px) 224px, 160px"
                        className="object-contain select-none pointer-events-none"
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 md:mt-20 text-center">
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
