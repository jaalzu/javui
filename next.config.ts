import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.100.*"],
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/docs/components/Radio",
        destination: "/docs/components/RadioGroup",
        permanent: true,
      },
      {
        source: "/docs/components/Dialog",
        destination: "/docs/components/Modal",
        permanent: true,
      },
      {
        source: "/docs/components/AlertDialog",
        destination: "/docs/components/Modal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
