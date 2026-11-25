import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const here = path.dirname(fileURLToPath(import.meta.url));
const uiSrc = path.resolve(here, "../../packages/ui/src");
// Turbopack on Windows rejects absolute alias targets ("windows imports are
// not implemented yet"), so express them relative to this config file with
// forward slashes.
const src = (...segments: string[]) =>
  path.relative(here, path.join(uiSrc, ...segments)).replaceAll("\\", "/");

// Source mode: `next dev` resolves @javui/ui to packages/ui/src so edits show up
// without rebuilding dist. `next build` keeps consuming dist through the package
// exports, and JAVUI_SOURCE=0 forces dist even in dev.
const sourceMode =
  process.env.NODE_ENV !== "production" && process.env.JAVUI_SOURCE !== "0";

/**
 * CSS entry points cannot resolve through the `@javui/ui` package alias above,
 * so each public stylesheet gets its own alias. Both Turbopack and webpack read
 * these absolute paths.
 */
const sourceAliases: Record<string, string> = {
  "@javui/ui": src("index.ts"),
  "@javui/ui/server": src("server.ts"),
  "@javui/ui/tokens.css": src("tokens/tokens.css"),
  "@javui/ui/tailwind.css": src("tokens/tailwind.css"),
};

const nextConfig: NextConfig = {
  transpilePackages: ["@javui/ui"],
  /* config options here */
  allowedDevOrigins: ["192.168.100.*"],
  cacheComponents: true,
  partialPrefetching: true,
  ...(sourceMode
    ? {
        turbopack: { resolveAlias: sourceAliases },
        webpack(config) {
          config.resolve.alias = { ...config.resolve.alias, ...sourceAliases };
          return config;
        },
      }
    : {}),
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
      { source: "/docs/usage", destination: "/docs/installation", permanent: true },
      { source: "/docs/agents", destination: "/docs/installation", permanent: true },
      { source: "/docs/utilities", destination: "/docs/layout", permanent: true },      { source: "/docs/alignment", destination: "/docs/layout", permanent: true },
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
