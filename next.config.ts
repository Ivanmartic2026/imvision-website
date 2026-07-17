import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server runtime (Vercel) — NOT static export — so App Router API routes
  // (e.g. /api/contact) run server-side. Do not re-add `output: "export"`.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
