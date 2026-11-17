import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of service",
  description: terms.description,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return <LegalPage doc={terms} />;
}
