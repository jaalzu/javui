import { CodeBlock } from "@javui/ui/server";
import {
  PACKAGE_MANAGERS,
  translatePackageCommand,
  type PackageManager,
} from "./packageManagers";

type PackageManagerCodeProps = {
  /** The canonical command, as written for npm: `npm install X`, `npm run X` or `npx X`. */
  npm: string;
  /** Accessible name of the block, for example `Install`. @default "Install" */
  label?: string;
};

/**
 * One install command shown as npm, pnpm and bun tabs, built on `CodeBlock`'s native tabs.
 * The input is always the npm line; the other two are derived, so the docs cannot drift.
 */
export function PackageManagerCode({ npm, label = "Install" }: PackageManagerCodeProps) {
  const lines = npm
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    throw new Error("PackageManagerCode needs at least one npm command.");
  }

  const translated = lines.map(translatePackageCommand);
  const code = Object.fromEntries(
    PACKAGE_MANAGERS.map((manager) => [
      manager,
      translated.map((command) => command[manager]).join("\n"),
    ]),
  ) as Record<PackageManager, string>;

  return (
    <CodeBlock
      language="bash"
      label={label}
      tabs={PACKAGE_MANAGERS.map((manager) => ({
        label: manager,
        code: code[manager],
      }))}
    />
  );
}

/**
 * Whether a README code block is an install block: a ```sh block whose non-empty lines are all
 * `npm ...` / `npx ...` commands or package-manager agnostic shell lines (`cd ...`). Those are
 * rendered with `PackageManagerCode`; every other block stays a plain `CodeBlock`.
 */
export function isPackageManagerBlock(language: string, code: string): boolean {
  if (language !== "sh") return false;
  const lines = code.split(/\r?\n/).filter((line) => line.trim());
  return (
    lines.length > 0 &&
    lines.every(
      (line) =>
        /^npm\s/.test(line.trim()) ||
        /^npx\s/.test(line.trim()) ||
        /^(?:cd|mkdir|pwd|echo)\s+\S/.test(line.trim()),
    )
  );
}
