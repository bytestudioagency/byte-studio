import AppShell from "@/components/AppShell";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyByteStudio from "@/components/WhyByteStudio";
import Portfolio from "@/components/Portfolio";
import HowWeWork from "@/components/HowWeWork";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <TrustedBrands />
      <WhyByteStudio />
      <Portfolio />
      <HowWeWork />
      <Ticker />
      <Services />
      <Pricing />
      <Faq />
      <Footer />
    </AppShell>
  );
}
