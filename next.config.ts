import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/model",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
