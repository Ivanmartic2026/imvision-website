import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { bodyFont, headingFont, monoFont } from "./fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraphLd, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IM Vision — LED display solutions across Europe",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "IM Vision designs, engineers, installs and services premium LED displays for retail, events and digital-out-of-home — one accountable partner across Europe.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "sv_SE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "IM Vision — LED display solutions across Europe",
    description:
      "Buy, rent, install and service premium LED displays — one accountable partner across Europe.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1672, height: 941, alt: "IM Vision LED installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IM Vision — LED display solutions across Europe",
    description:
      "Buy, rent, install and service premium LED displays — one accountable partner across Europe.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#070807",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Set the document language before paint so screen readers use the
            correct pronunciation on /sv/** (the root layout can only statically
            declare one lang; a per-locale root-group layout is the fuller fix). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.lang=location.pathname.split('/')[1]==='sv'?'sv':'en';",
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[12px_4px_12px_12px] focus:bg-accent focus:px-4 focus:py-3 focus:text-background"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <JsonLd data={siteGraphLd()} />
      </body>
    </html>
  );
}
