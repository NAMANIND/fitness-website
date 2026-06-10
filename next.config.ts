import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagesplashh.vercel.app",
      },
    ],
  },
};

export default nextConfig;
