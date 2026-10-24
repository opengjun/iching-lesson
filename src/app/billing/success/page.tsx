import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.28em] text-amber-800/80">
        Billing
      </p>
      <h1 className="mt-4 max-w-xl text-balance font-serif text-3xl text-stone-900 sm:text-5xl">
        Payment successful!
      </h1>
      <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
        Your course is now unlocked.
      </p>
      <Link
        href="/"
        className="mt-8 flex h-12 items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-medium text-amber-50 shadow-sm transition hover:bg-stone-700"
      >
        Start Lesson 1
      </Link>
    </main>
  );
}
