import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ui";
import { seo, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `${site.name} | %s`,
  },
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip">
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          {/* Route changes are transitions, so every navigation plays the .page lift (globals.css). */}
          <ViewTransition default="page">{children}</ViewTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
