import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, pageBreadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  locale: "en",
  path: "/terms/",
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of the IM Vision website and our LED display services.",
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          label="Legal"
          title="Terms of service."
          description="The terms that apply when you use our website and services."
        />

        <section className="section section-space">
          <div className="section-inner max-w-3xl">
            <div className="prose prose-lg prose-invert max-w-none text-text-secondary">
              <h2 className="text-2xl font-medium text-text-primary">1. General</h2>
              <p>
                These terms apply to your use of the IM Vision website and to any information or
                services provided through it. By using the website you accept these terms.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">2. Use of the website</h2>
              <p>
                You may use the website for lawful purposes only. You may not attempt to damage,
                disable, or interfere with the website or its content.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">3. Quotes and agreements</h2>
              <p>
                Information on the website is for general guidance. Quotes, project specifications,
                delivery terms and prices are confirmed in separate written agreements.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">4. Intellectual property</h2>
              <p>
                All content on this website, including text, images, graphics, and trademarks, is
                owned by IM Vision or its licensors and is protected by copyright and other
                intellectual property laws.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">5. Liability</h2>
              <p>
                IM Vision is not liable for indirect damages or losses arising from the use of the
                website. Our liability for delivered products and services is governed by the
                applicable agreement.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">6. Links to third-party sites</h2>
              <p>
                The website may contain links to external websites. IM Vision is not responsible for
                the content or practices of those sites.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">7. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. The current version is always available
                on this page.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">8. Governing law</h2>
              <p>
                These terms are governed by the laws of Sweden. Any disputes shall be resolved by
                the courts of Sweden.
              </p>

              <h2 className="mt-12 text-2xl font-medium text-text-primary">9. Contact</h2>
              <p>
                For questions about these terms, please contact{" "}
                <a href="mailto:info@imvision.se" className="text-accent hover:underline">
                  info@imvision.se
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={pageBreadcrumbLd("en", "/terms/", "Terms of Service")} />
    </>
  );
}
