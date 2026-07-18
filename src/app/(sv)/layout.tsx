import "lenis/dist/lenis.css";
import "../globals.css";
import { bodyFont, headingFont, monoFont } from "../fonts";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata, rootViewport } from "@/lib/root-metadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

// Root layout for the Swedish site (URLs under "/sv/"). Statically declares
// <html lang="sv"> at SSR so crawlers and screen readers get the correct
// document language on first byte — the core reason for splitting the root
// layout per locale.
export default function SwedishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <RootShell locale="sv">{children}</RootShell>
      </body>
    </html>
  );
}
