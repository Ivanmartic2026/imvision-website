import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/privacy/",
  title: "Privacy Policy",
  description:
    "How IM Vision collects, uses and protects personal data when you visit our website or contact us about LED display solutions.",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Legal"
          title="Privacy policy."
          description="How we handle personal data and respect your privacy."
        />

        <section className="section section-space">
          <div className="section-inner max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
              <h2 className="text-2xl font-medium text-text-primary">1. Data controller</h2>
              <p>
                IM Vision AB (”IM Vision”, ”we”, ”us”) is the data controller for the personal data
                processed through this website and in connection with enquiries about our LED
                display solutions.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">2. What data we collect</h2>
              <p>
                We only collect personal data that is necessary for the purpose. This typically
                includes your name, company, email address, phone number, and the contents of your
                message when you use our contact form or correspond with us.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">3. Why we process your data</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>To respond to enquiries and provide quotes.</li>
                <li>To plan, deliver and support LED installations.</li>
                <li>To comply with legal or contractual obligations.</li>
              </ul>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">4. Legal basis</h2>
              <p>
                Processing is based on our legitimate interest to communicate with potential and
                existing customers, or on the contractual necessity to fulfil an agreement with you.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">5. How long we keep your data</h2>
              <p>
                We keep personal data only as long as necessary for the purposes stated above, or
                as required by applicable law.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">6. Cookies and analytics</h2>
              <p>
                This website does not use third-party analytics or advertising cookies. Any cookies
                used are strictly necessary for the technical operation of the site.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">7. Your rights</h2>
              <p>
                You have the right to access, correct, delete, or restrict processing of your
                personal data. You may also object to processing or request data portability.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">8. Contact</h2>
              <p>
                Questions about privacy can be sent to{" "}
                <a href="mailto:sales@imvision.se" className="text-accent hover:underline">
                  sales@imvision.se
                </a>{" "}
                or by post to IM Vision, Spånga, Sweden.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
