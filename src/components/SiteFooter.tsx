import Link from "next/link";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={`shrink-0 border-t border-stone-200 px-4 ${
        compact
          ? "pt-3 pb-16 sm:pt-5 sm:pb-16"
          : "pt-8 pb-28 sm:pt-10 sm:pb-32"
      }`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2 text-center text-xs text-stone-500 sm:flex-row sm:justify-between sm:gap-3 sm:text-left">
        <p>© 2026 Friendly Chinese Culture</p>
        <nav aria-label="Legal" className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/privacy"
            className="underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            Terms of Service
          </Link>
        </nav>
        <p>
          Contact:{" "}
          <a
            href="mailto:z.pengjun@163.com"
            className="text-amber-800 underline-offset-4 transition hover:underline"
          >
            z.pengjun@163.com
          </a>
        </p>
      </div>
    </footer>
  );
}
