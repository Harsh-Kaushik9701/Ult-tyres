import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tyre photos imported with `npm run tyre-images` (public/tyres/…). No query strings.
    localPatterns: [{ pathname: '/tyres/**', search: '' }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Temporary stock photos listed in src/data/media.ts. Remove once real photos are in /public/media.
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
