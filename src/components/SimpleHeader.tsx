import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";

export function SimpleHeader({ backHref = "/", backLabel = "Back to home" }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="relative w-full py-6 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Wordmark className="text-xl md:text-2xl" />
        </Link>
        <Link
          href={backHref}
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
}
