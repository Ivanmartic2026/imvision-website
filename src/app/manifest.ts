import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

// Web App Manifest (served at /manifest.webmanifest). Next auto-injects
// <link rel="manifest">. Enables "Add to Home Screen", the correct theme/splash
// colours, and completes the mobile/PWA signals Google looks for.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — LED display solutions across Europe`,
    short_name: SITE_NAME,
    description:
      "Buy, rent, install and service premium LED displays — one accountable partner across Europe.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#070807",
    theme_color: "#070807",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
