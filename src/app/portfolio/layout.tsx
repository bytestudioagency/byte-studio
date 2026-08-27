import Footer from "@/components/Footer";
import { SimpleHeader } from "@/components/SimpleHeader";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function PortfolioLayout({ children }: LayoutProps<"/portfolio">) {
  return (
    <SmoothScroll>
      <ShootingStars />
      <StarsBackground starDensity={0.00002} />
      <SimpleHeader />
      <main className="relative">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
