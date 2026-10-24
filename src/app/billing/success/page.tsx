"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Status =
  | { kind: "verifying" }
  | { kind: "unlocked" }
  | { kind: "failed"; message: string };

const buttonClass =
  "mt-8 flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition";

export default function BillingSuccessPage() {
  const [status, setStatus] = useState<Status>({ kind: "verifying" });

  useEffect(() => {
    const checkoutId = new URLSearchParams(window.location.search).get(
      "checkout_id",
    );

    if (!checkoutId) {
      setStatus({
        kind: "failed",
        message: "This link does not include a payment reference.",
      });
      return;
    }

    let active = true;

    async function verify() {
      try {
        const response = await fetch("/api/verify-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutId }),
        });

        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        if (!active) return;

        if (!response.ok) {
          setStatus({
            kind: "failed",
            message: data.error ?? "This payment could not be verified.",
          });
          return;
        }

        setStatus({ kind: "unlocked" });
      } catch {
        if (!active) return;
        setStatus({
          kind: "failed",
          message: "We could not reach the payment service. Please try again.",
        });
      }
    }

    void verify();

    return () => {
      active = false;
    };
  }, []);

  const title =
    status.kind === "unlocked"
      ? "Payment successful!"
      : status.kind === "verifying"
        ? "Confirming your payment…"
        : "We couldn’t verify this payment.";

  const description =
    status.kind === "unlocked"
      ? "Your course is now unlocked."
      : status.kind === "verifying"
        ? "This only takes a moment."
        : status.message;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.28em] text-amber-800/80">
        Billing
      </p>
      <h1 className="mt-4 max-w-xl text-balance font-serif text-3xl text-stone-900 sm:text-5xl">
        {title}
      </h1>
      <p
        role="status"
        className="mt-4 max-w-md text-pretty text-sm leading-6 text-stone-600 sm:text-base sm:leading-7"
      >
        {description}
      </p>

      {status.kind === "unlocked" ? (
        <Link
          href="/lesson-2"
          className={`${buttonClass} bg-stone-900 text-amber-50 shadow-sm hover:bg-stone-700`}
        >
          Start Lesson 2
        </Link>
      ) : null}

      {status.kind === "verifying" ? (
        <div
          aria-disabled="true"
          className={`${buttonClass} cursor-wait bg-stone-200 text-stone-500`}
        >
          Verifying…
        </div>
      ) : null}

      {status.kind === "failed" ? (
        <>
          <Link
            href="/"
            className={`${buttonClass} bg-stone-900 text-amber-50 shadow-sm hover:bg-stone-700`}
          >
            Back to Lesson 1
          </Link>
          <p className="mt-5 text-xs text-stone-500">
            Need help?{" "}
            <a
              href="mailto:z.pengjun@163.com"
              className="text-amber-800 underline-offset-4 hover:underline"
            >
              z.pengjun@163.com
            </a>
          </p>
        </>
      ) : null}
    </main>
  );
}
