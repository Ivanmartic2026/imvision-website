import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { bodyFont, headingFont, monoFont } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// With per-locale root layouts, the top-level not-found renders unwrapped, so it
// declares its own <html>/<body>. Served for unmatched routes (HTTP 404).
export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main
          id="main-content"
          className="flex flex-1 flex-col items-center justify-center py-32 text-center"
        >
          <div className="section">
            <div className="section-inner">
              <p className="font-mono text-8xl font-bold text-accent/30">404</p>
              <h1 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
                Page not found
              </h1>
              <p className="mx-auto mt-4 max-w-md text-text-secondary">
                The page you are looking for does not exist or has been moved.
              </p>
              <div className="mt-8">
                <Button href="/">Return home</Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
