import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Marquee />
      </main>
    </>
  );
}
