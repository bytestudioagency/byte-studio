import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

const SITE_NAME = "Byte Studio";
const SITE_DESCRIPTION =
  "Byte Studio builds websites with a working back office - admin dashboards for leads, orders, and registrations, not just the public-facing page.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Byte Studio — Websites With a Working Back Office",
    template: "%s | Byte Studio",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Byte Studio — Websites With a Working Back Office",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Studio — Websites With a Working Back Office",
    description: SITE_DESCRIPTION,
    site: "@bytestudiohq",
    creator: "@bytestudiohq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.linkedin.com/in/byte-studio/",
    "https://x.com/bytestudiohq",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased font-heading">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
