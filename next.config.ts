import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only the Stayfinder brand mark in /public/companies is served as SVG -
    // it's our own static asset, not user-uploaded, so this is safe to enable.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
