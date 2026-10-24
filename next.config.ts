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
    ];
  },
};

export default nextConfig;
