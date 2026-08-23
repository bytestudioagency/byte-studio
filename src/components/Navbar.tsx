"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MEETING_LINK } from "@/lib/config";
import { Wordmark } from "@/components/ui/wordmark";
import { useSmoothScrollSupported } from "@/components/ui/smooth-scroll";

// Initial width of the progress bar as a percentage (e.g., 20% of full width)
const INITIAL_WIDTH = 0.2;

const sections = [
  { id: "home", name: "Home" },
  { id: "why-byte-studio", name: "Why Us" },
  { id: "portfolio", name: "Portfolio" },
  { id: "how-we-work", name: "How we work" },
  { id: "services", name: "Services" },
  { id: "pricing-plans", name: "Pricing Plans" },
  { id: "faq", name: "FAQ" },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const smoothScrollSupported = useSmoothScrollSupported();

  // Same spring the page's scroll-smoothing uses, so the bar tracks the
  // eased scroll position rather than the raw (jumpier) one.
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    mass: 0.5,
  });
  const progressScale = useTransform(
    smoothProgress,
    (p) => INITIAL_WIDTH + (1 - INITIAL_WIDTH) * p
  );

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const updateActiveSection = () => {
      if (sectionElements.length === 0) return;

      // Find which section is currently in view (closest to top of viewport)
      let closestSection = sectionElements[0];
      let closestDistance = Math.abs(
        sectionElements[0].getBoundingClientRect().top
      );

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        // Consider sections that are visible or just above the viewport
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      });

      setActiveSection(closestSection.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);

    if (target) {
      // Offset so the fixed navbar doesn't cover the section heading
      const navbarHeight = 88;
      const targetY = Math.max(
        target.getBoundingClientRect().top + window.scrollY - navbarHeight,
        0
      );
      // When the spring-smoothed scroll is active it already provides the
      // easing, so jump the underlying scroll position instantly and let it
      // animate the visual catch-up; otherwise fall back to native smooth
      // scrolling.
      window.scrollTo({
        top: targetY,
        behavior: smoothScrollSupported ? "auto" : "smooth",
      });
    }

    // Update active section immediately for better UX
    setActiveSection(sectionId);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    const baseClasses = "transition-all text-sm font-medium";

    if (isActive) {
      return `${baseClasses} text-white`;
    }
    return `${baseClasses} opacity-70 hover:opacity-100 hover:text-blue-400`;
  };

  // Helper function to get mobile nav link classes
  const getMobileNavLinkClasses = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    const baseClasses = "block py-2 text-sm font-medium transition-colors";

    if (isActive) {
      return `${baseClasses} text-white`;
    }
    return `${baseClasses} text-typo-gray-300 hover:text-blue-400`;
  };

  return (
    <motion.nav
      className="bg-black text-white w-full fixed top-0 left-0 z-50 p-4"
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Wordmark className="text-xl md:text-2xl" />
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden xl:flex space-x-8">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={getNavLinkClasses(section.id)}
            >
              {section.name}
            </a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden xl:block">
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable transition-colors">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="space-y-1.5">
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden absolute top-full left-0 w-full bg-black transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible transform translate-y-0"
            : "opacity-0 invisible transform -translate-y-2"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleNavClick(e, section.id)}
              className={getMobileNavLinkClasses(section.id)}
            >
              {section.name}
            </a>
          ))}
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="w-full mt-4 pushable transition-colors">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </div>
      </div>

      {/* Gradient Progress Bar (center grow) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black overflow-hidden">
        <motion.div
          className="h-full origin-center"
          style={{
            position: "absolute",
            left: "50%",
            x: "-50%",
            transformOrigin: "center",
            width: "100%",
            scaleX: progressScale,
            background:
              "linear-gradient(90deg, #000000 -25%, #112CC6 54.33%, #000000 125%)",
          }}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
