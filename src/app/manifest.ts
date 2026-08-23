import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Byte Studio",
    short_name: "Byte Studio",
    description:
      "Byte Studio builds websites with a working back office - admin dashboards for leads, orders, and registrations, not just the public-facing page.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#02061b",
    icons: [
      {
        src: "/logo.png",
        type: "image/png",
        sizes: "341x294",
      },
    ],
  };
}
