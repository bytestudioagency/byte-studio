import Footer from "@/components/Footer";
import { SimpleHeader } from "@/components/SimpleHeader";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SimpleHeader />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
