import { defineConfig } from "tsup";
import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

const entries: string[] = [];
const collect = (dir: string) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) collect(path);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.(stories|test|examples)\./i.test(entry.name) && !entry.name.endsWith(".fixtures.ts")) entries.push(relative(process.cwd(), path));
  }
};
collect("src");

export default defineConfig({
  entry: entries,
  format: ["esm"],
  outDir: "dist",
  bundle: false,
  splitting: false,
  dts: true,
  sourcemap: false,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom", "@base-ui/react", "shiki", "server-only"],
});
