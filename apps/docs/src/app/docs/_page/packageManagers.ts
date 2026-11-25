/** The package managers offered by every install block, in display order. */
export const PACKAGE_MANAGERS = ["npm", "pnpm", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export type PackageCommand = Record<PackageManager, string>;

/**
 * Translates one canonical `npm` command into the equivalent pnpm and bun commands.
 *
 * Only three shapes are supported, so the docs never invent a command:
 * `npm install X` -> `pnpm add X` / `bun add X`, `npm run X` -> `pnpm X` /
 * `bun run X`, and `npx X` -> `pnpm dlx X` / `bunx X`. Lines that do not
 * belong to a package manager (`cd`, `mkdir`, ...) are copied verbatim.
 *
 * @throws When the command does not match one of those shapes.
 */
export function translatePackageCommand(command: string): PackageCommand {
  const line = command.trim();

  // Package-manager agnostic shell lines (cd, mkdir, ...) stay as they are in every tab.
  if (/^(?:cd|mkdir|pwd|echo)\s+\S/.test(line)) {
    return { npm: line, pnpm: line, bun: line };
  }

  const install = line.match(/^npm\s+install\s+(\S.*)$/);
  if (install) {
    return {
      npm: `npm install ${install[1]}`,
      pnpm: `pnpm add ${install[1]}`,
      bun: `bun add ${install[1]}`,
    };
  }

  const run = line.match(/^npm\s+run\s+(\S.*)$/);
  if (run) {
    return {
      npm: `npm run ${run[1]}`,
      pnpm: `pnpm ${run[1]}`,
      bun: `bun run ${run[1]}`,
    };
  }

  const npx = line.match(/^npx\s+(\S.*)$/);
  if (npx) {
    return {
      npm: `npx ${npx[1]}`,
      pnpm: `pnpm dlx ${npx[1]}`,
      bun: `bunx ${npx[1]}`,
    };
  }

  throw new Error(
    `PackageManagerCode cannot translate "${line}". Use "npm install <packages>", ` +
      `"npm run <script>" or "npx <command>", or render a plain CodeBlock instead.`,
  );
}
