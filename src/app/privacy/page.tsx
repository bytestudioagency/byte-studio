import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: privacy.description,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <LegalPage doc={privacy} />;
}
