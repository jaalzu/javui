import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
rmSync(dist, { recursive: true, force: true });

for (const script of ["tokens", "icons", "agent-docs"]) {
  const result = spawnSync("bun", ["run", script], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const compile = spawnSync("bun", ["x", "tsc", "-p", "tsconfig.dist.json"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
if (compile.status !== 0) process.exit(compile.status ?? 1);

const src = join(root, "src");
const copyCss = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const from = join(dir, entry.name);
    const to = join(dist, relative(src, from));
    if (entry.isDirectory()) copyCss(from);
    else if (entry.name.endsWith(".css") && !/\.(stories|test|examples)\./i.test(entry.name)) {
      mkdirSync(resolve(to, ".."), { recursive: true });
      cpSync(from, to);
    }
  }
};
copyCss(src);
const preserveClient = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const from = join(dir, entry.name);
    if (entry.isDirectory()) preserveClient(from);
    else if (/\.(ts|tsx)$/.test(entry.name) && /^\s*["']use client["']/.test(readFileSync(from, "utf8"))) {
      const target = join(dist, relative(src, from).replace(/\.tsx?$/, ".js"));
      if (existsSync(target) && !/^\s*["']use client["']/.test(readFileSync(target, "utf8"))) writeFileSync(target, `"use client";\n${readFileSync(target, "utf8")}`);
    }
  }
};
preserveClient(src);
mkdirSync(join(dist, "agent"), { recursive: true });
cpSync(join(root, "agent"), join(dist, "agent"), { recursive: true });
const cssFiles = [];
const collect = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) collect(path);
    else if (entry.name.endsWith(".css")) cssFiles.push(path);
  }
};
collect(src);
writeFileSync(join(dist, "styles.css"), cssFiles.map((file) => readFileSync(file, "utf8")).join("\n"));
