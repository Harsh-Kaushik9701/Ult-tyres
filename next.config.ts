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
    ],
  },
};

export default nextConfig;
