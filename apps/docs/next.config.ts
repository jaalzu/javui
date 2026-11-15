import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@javui/ui"],
  /* config options here */
  allowedDevOrigins: ["192.168.100.*"],
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Set by `next upgrade --agent=security`: the upgrade fixes a published advisory.
    agentUpgrade: "security",
  },
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
      {
        source: "/docs/components/ButtonGroupText",
        destination: "/docs/components/ButtonGroup",
        permanent: true,
      },
      { source: "/docs/utilities", destination: "/docs/layout", permanent: true },
      { source: "/docs/alignment", destination: "/docs/layout", permanent: true },
      { source: "/docs/box", destination: "/docs/layout", permanent: true },
      { source: "/docs/margin", destination: "/docs/layout", permanent: true },
      { source: "/docs/padding", destination: "/docs/layout", permanent: true },
      { source: "/docs/position", destination: "/docs/layout", permanent: true },
      { source: "/docs/sizing", destination: "/docs/layout", permanent: true },
      { source: "/docs/truncation", destination: "/docs/layout", permanent: true },
      { source: "/docs/visibility", destination: "/docs/layout", permanent: true },
    ];
  },
};

export default nextConfig;
