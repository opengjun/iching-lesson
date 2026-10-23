import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Privacy Policy · Friendly Chinese Culture",
  description:
    "How Friendly Chinese Culture collects, uses, and protects the email address you share when using our I Ching lessons.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-8 sm:py-16">
        <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
          Friendly Chinese Culture
        </p>
        <h1 className="mt-3 font-serif text-3xl text-stone-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs text-stone-500">
          Last updated: October 23, 2026
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-stone-700 sm:text-base sm:leading-8">
          <p>
            This Privacy Policy explains how Friendly Chinese Culture (“we,”
            “us,” or “our”) handles personal information when you visit our I
            Ching lesson website (the “Service”). We keep the Service
            intentionally simple: the only personal information we ask you to
            provide is your email address.
          </p>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              1. Information we collect
            </h2>
            <p className="mt-2">
              We collect only the email address you voluntarily enter at the end
              of a lesson. We do not request your name, payment information,
              postal address, phone number, or any other personal details. If
              you choose not to submit an email address, you may still use the
              lesson; you simply will not receive course notifications.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              2. How we use your email
            </h2>
            <p className="mt-2">
              Your email address is used solely to send the course materials you
              requested and to notify you about related lessons, updates, and
              occasional information about Friendly Chinese Culture’s
              educational content. We do not use your email for advertising
              unrelated to the course, and we do not use it for profiling or
              automated decision-making.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              3. Sharing and disclosure
            </h2>
            <p className="mt-2">
              We do not sell, rent, trade, or otherwise disclose your email
              address to third parties for their own purposes. We will never
              share your email with advertisers, data brokers, or marketing
              partners. Your email may be processed by service providers that
              host and maintain the Service on our behalf, such as our database
              provider; these providers act under our instructions, are bound by
              confidentiality obligations, and may not use your information for
              any other purpose.
            </p>
            <p className="mt-2">
              We may also disclose information if required by applicable law or
              if necessary to protect the rights, safety, or property of
              Friendly Chinese Culture or others.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              4. Data retention
            </h2>
            <p className="mt-2">
              We retain your email address only for as long as needed to provide
              the course communications you requested. If you unsubscribe or ask
              us to delete your email, we will remove it from our active records
              within 30 days, unless we are required by law to retain it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              5. Security
            </h2>
            <p className="mt-2">
              We take reasonable technical and organizational measures to protect
              the email addresses we hold. However, no method of transmission
              over the internet or electronic storage is completely secure, and
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              6. Your rights
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your email
              address, and you may withdraw your consent to receive
              communications at any time. To make a request, email{" "}
              <a
                href="mailto:z.pengjun@163.com"
                className="text-amber-800 underline-offset-4 hover:underline"
              >
                z.pengjun@163.com
              </a>
              . We will respond within a reasonable period, normally within 30
              days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              7. Children’s privacy
            </h2>
            <p className="mt-2">
              The Service is intended for a general audience and is not directed
              to children under 13, or the minimum age required in your
              jurisdiction. We do not knowingly collect personal information from
              children. If you believe that a child has submitted an email
              address, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              8. Changes to this policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. The revised
              version will be posted on this page with a new “Last updated”
              date. Material changes will be highlighted on the website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              9. Contact
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, contact Friendly
              Chinese Culture at{" "}
              <a
                href="mailto:z.pengjun@163.com"
                className="text-amber-800 underline-offset-4 hover:underline"
              >
                z.pengjun@163.com
              </a>
              .
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-stone-600 underline-offset-4 transition hover:text-stone-900 hover:underline"
        >
          ← Back to Lesson 1
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
