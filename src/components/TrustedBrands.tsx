"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading } from "@/components/ui/heading";

const brands = [
  { name: "Keanas Clinic", logo: "/companies/keanas.png" },
  { name: "Streeya", logo: "/companies/streeya.png" },
  { name: "Webyapar", logo: "/companies/webyapar.png" },
  { name: "Stayfinder", logo: "/companies/stayfinder.svg" },
];

const TrustedBrands = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(1024);
  const quantity = brands.length;
  const baseDuration = 20; // seconds
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animationsRef = useRef<Animation[]>([]);

  // Derive responsive brand dimensions based on viewport without nested ternaries
  const getBrandSize = (vw: number) => {
    if (vw < 768) {
      return { width: 100, height: 50 };
    }
    if (vw < 1024) {
      return { width: 120, height: 60 };
    }
    return { width: 140, height: 70 };
  };

  const { width: brandWidth, height: brandHeight } =
    getBrandSize(viewportWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Cancel any previous animations to avoid duplicates
    animationsRef.current.forEach((a) => a.cancel());
    animationsRef.current = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      el.style.left = "100%";
      const anim = el.animate(
        [{ left: "100%" }, { left: `${-brandWidth}px` }],
        {
          duration: baseDuration * 1000,
          easing: "linear",
          iterations: Infinity,
          delay: ((baseDuration / quantity) * index - baseDuration) * 1000,
        }
      );
      animationsRef.current.push(anim);
    });

    return () => {
      animationsRef.current.forEach((a) => a.cancel());
      animationsRef.current = [];
    };
  }, [brandWidth, baseDuration, quantity]);

  useEffect(() => {
    const rate = isHovering ? 0.3 : 1;
    animationsRef.current.forEach((anim) => {
      try {
        anim.playbackRate = rate;
      } catch {
        // ignore
      }
    });
  }, [isHovering]);

  return (
    <section
      className="relative text-white py-8 px-6 md:py-10 md:px-12 lg:py-12 lg:px-24 overflow-hidden"
      id="trusted-brands"
    >
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center"
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
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Heading */}
        <Heading className="mb-8 md:mb-10 lg:mb-12">Happy Clients</Heading>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div
            className="absolute left-0 top-0 w-16 md:w-24 lg:w-32 h-full z-10"
            style={{
              background: "linear-gradient(to right, #000000, transparent)",
            }}
          ></div>
          <div
            className="absolute right-0 top-0 w-16 md:w-24 lg:w-32 h-full z-10"
            style={{
              background: "linear-gradient(to left, #000000, transparent)",
            }}
          ></div>

          {/* Slider Container */}
          <div
            className="relative overflow-hidden group"
            style={{
              height: `${brandHeight}px`,
              maskImage:
                "linear-gradient(to right, transparent, #000 10% 90%, transparent)",
            }}
            aria-hidden="true"
          >
            {/* Scrolling List */}
            <div
              className="flex relative"
              style={{
                width: "100%",
                minWidth: `${brandWidth * quantity}px`,
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="absolute transition-all duration-500 grayscale invert brightness-90 opacity-90"
                  style={{
                    width: `${brandWidth}px`,
                    height: `${brandHeight}px`,
                    left: "100%",
                  }}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="140px"
                    className="object-contain"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedBrands;
