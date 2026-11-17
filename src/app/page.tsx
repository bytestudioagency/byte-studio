import type { Metadata } from "next";
import { Estimator } from "@/components/Estimator";
import { JsonLd, homeJsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Contact, Footer, Pricing, Process, Work } from "@/components/Sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Nav />
      <main>
        <Hero />
        <Work />
        <WhyUs />
        <Services />
        <Marquee />
        <Process />
        <Pricing />
        <Estimator />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
