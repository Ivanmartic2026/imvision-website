import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { bodyFont, headingFont, monoFont } from "./fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://imvision.se"),
  title: {
    default: "IMvision - LED Display Solutions",
    template: "%s | IMvision",
  },
  description:
    "Premium LED display solutions for retail, events, and digital out-of-home. Designed, engineered, and installed across Europe.",
  keywords: [
    "LED displays",
    "LED walls",
    "digital signage",
    "retail LED",
    "event LED rental",
    "DOOH",
    "Scandinavia",
  ],
  authors: [{ name: "IMvision" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imvision.se",
    siteName: "IMvision",
    title: "IMvision - LED Display Solutions",
    description:
      "Premium LED display solutions for retail, events, and digital out-of-home.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMvision - LED Display Solutions",
    description:
      "Premium LED display solutions for retail, events, and digital out-of-home.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[12px_4px_12px_12px] focus:bg-accent focus:px-4 focus:py-3 focus:text-background"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
