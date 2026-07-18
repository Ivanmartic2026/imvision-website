import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

/**
 * Shared root metadata + viewport for the two per-locale root layouts
 * (`(en)/layout.tsx`, `(sv)/layout.tsx`). Page-level metadata (title,
 * description, canonical, hreflang, per-page OG) is set via `pageMeta()`.
 */
export const rootMetadata: Metadata = {
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
  icons: {
    // favicon.ico is auto-emitted by Next from public/ — don't re-declare it
    // here (that produced a duplicate <link rel="icon">). Add only the PNGs.
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel env to the code from
  // Search Console (HTML-tag method) — renders <meta name="google-site-verification">.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const rootViewport: Viewport = {
  themeColor: "#070807",
  colorScheme: "dark light",
};
