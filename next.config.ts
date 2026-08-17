import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
