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
      // Official product photos listed in src/data/brandImages.json. `npm run brand-images` saves
      // local copies, which take over automatically; these can then be removed.
      { protocol: "https", hostname: "ralsonglobal.com", pathname: "/storage/products/**" },
      { protocol: "https", hostname: "www.blackliontires.com.cn", pathname: "/uploads/**" },
      { protocol: "https", hostname: "en.triangle.com.cn", pathname: "/Public/Uploads/**" },
    ],
  },
};

export default nextConfig;
