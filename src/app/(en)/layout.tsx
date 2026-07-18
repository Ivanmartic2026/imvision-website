import "lenis/dist/lenis.css";
import "../globals.css";
import { bodyFont, headingFont, monoFont } from "../fonts";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata, rootViewport } from "@/lib/root-metadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

// Root layout for the English site (URLs at "/"). One of two per-locale root
// layouts — this one statically declares <html lang="en"> at SSR (no client-side
// lang patching needed), which the previous single-root layout could not do.
export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <RootShell locale="en">{children}</RootShell>
      </body>
    </html>
  );
}
