import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    remotePatterns: [
      {
        hostname: "images.apollo247.in",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname:"shorturl.at"
      }
    ],
  },
};

export default nextConfig;
