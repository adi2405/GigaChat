import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qum0wighs3.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
