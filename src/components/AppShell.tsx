import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { SmoothScroll } from "./ui/smooth-scroll";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <SmoothScroll>
        <ShootingStars />
        <StarsBackground starDensity={0.00002} />
        {children}
      </SmoothScroll>
    </>
  );
}
