import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Terms of Service · Friendly Chinese Culture",
  description:
    "The terms that govern your use of Friendly Chinese Culture’s I Ching lesson website.",
};

export default function TermsOfService() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-8 sm:py-16">
        <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
          Friendly Chinese Culture
        </p>
        <h1 className="mt-3 font-serif text-3xl text-stone-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-xs text-stone-500">
          Last updated: October 23, 2026
        </p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-stone-700 sm:text-base sm:leading-8">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of
            our I Ching lesson website (the “Service”) operated by Friendly
            Chinese Culture (“we,” “us,” or “our”). By accessing or using the
            Service, you agree to these Terms. If you do not agree, please do not
            use the Service.
          </p>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              1. Educational purpose
            </h2>
            <p className="mt-2">
              The Service is an educational resource that introduces the I Ching
              and related Chinese cultural traditions. All content is provided
              for general informational and educational purposes only. It does
              not constitute professional advice of any kind, including legal,
              financial, medical, psychological, or business advice, and should
              not be relied upon as a substitute for consultation with a
              qualified professional. You are solely responsible for any
              decisions you make based on the content.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              2. Intellectual property and copyright
            </h2>
            <p className="mt-2">
              All content on the Service, including lessons, text, diagrams,
              illustrations, design, logos, and underlying code, is owned by or
              licensed to Friendly Chinese Culture and is protected by copyright
              and other intellectual-property laws.
            </p>
            <p className="mt-2">
              We grant you a limited, personal, non-exclusive, non-transferable,
              revocable license to access and use the Service for personal,
              non-commercial learning. You may not copy, reproduce, republish,
              distribute, sell, modify, create derivative works from, or
              commercially exploit any part of the Service without our prior
              written permission. You may share links to the Service and brief
              quotations with clear attribution, provided they do not imply
              endorsement or replace the original content.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              3. Acceptable use
            </h2>
            <p className="mt-2">
              You agree not to use the Service in any unlawful or harmful way,
              including by: (a) interfering with the operation or security of the
              website; (b) attempting to gain unauthorized access to any system
              or data; (c) using automated tools to scrape or copy content at
              scale; (d) uploading malicious code; or (e) impersonating another
              person or entity. We may suspend or restrict access if we believe
              these rules have been violated.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              4. Email communications
            </h2>
            <p className="mt-2">
              If you submit your email address, you consent to receive
              course-related communications from Friendly Chinese Culture. You
              may opt out at any time by using the unsubscribe link in our emails
              or by writing to{" "}
              <a
                href="mailto:z.pengjun@163.com"
                className="text-amber-800 underline-offset-4 hover:underline"
              >
                z.pengjun@163.com
              </a>
              . Opting out will not affect your ability to access the educational
              content on the website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              5. Disclaimer of warranties
            </h2>
            <p className="mt-2">
              The Service is provided on an “as is” and “as available” basis. To
              the fullest extent permitted by law, we disclaim all warranties,
              express or implied, including warranties of merchantability,
              fitness for a particular purpose, accuracy, completeness, and
              non-infringement. We do not warrant that the Service will be
              uninterrupted, error-free, or free of harmful components, or that
              the content will always be current or complete.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              6. Limitation of liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by applicable law, Friendly
              Chinese Culture and its operators shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              or for any loss of profits, data, goodwill, or opportunity,
              arising out of or related to your use of, or inability to use, the
              Service. Because the Service is provided free of charge, our total
              aggregate liability for any claim relating to the Service shall
              not exceed the total amount you have paid us, if any, during the
              twelve months preceding the claim. Nothing in these Terms limits
              any liability that cannot be limited or excluded under applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              7. Third-party links
            </h2>
            <p className="mt-2">
              The Service may contain links to third-party websites or resources.
              We do not control and are not responsible for their content,
              policies, or practices. Accessing third-party sites is at your own
              risk, and their own terms and privacy policies apply.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              8. Changes to these terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. The revised version
              will be posted on this page with a new “Last updated” date. Your
              continued use of the Service after changes are posted constitutes
              acceptance of the revised Terms. If you do not agree, please stop
              using the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              9. Governing law
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws applicable in the jurisdiction
              where Friendly Chinese Culture operates, without regard to
              conflict-of-law principles. Any dispute arising from these Terms or
              the Service shall be subject to the jurisdiction of the competent
              courts in that location.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-stone-900 sm:text-xl">
              10. Contact
            </h2>
            <p className="mt-2">
              If you have questions about these Terms, contact Friendly Chinese
              Culture at{" "}
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
