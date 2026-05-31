import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles its own serverless output — no standalone needed
  // If self-hosting, add: output: "standalone"

  images: {
    unoptimized: false, // Vercel optimizes images automatically
  },

  // Allow external images if needed
  // images: {
  //   remotePatterns: [{ protocol: "https", hostname: "**" }],
  // },

  // Experimental features (stable in Next.js 16)
  experimental: {
    // serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
