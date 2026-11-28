import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import {
  Heading,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@javui/ui";
import { CodeBlock } from "@javui/ui/server";
import { WarningIcon } from "@/icons";
import {
  PackageManagerCode,
  isPackageManagerBlock,
} from "@/app/docs/_page/PackageManagerCode";
import styles from "./InstallationFromReadme.module.css";

type Block =
  | { kind: "heading"; level: 2 | 3 | 4; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "code"; language: string; label: string; code: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "rule" };

/**
 * The package README is the canonical install guide. Read it at build time so this page cannot
 * drift from the package; the docs only add the page frame and the link to the source.
 */
function readReadme(): string {
  const candidates = [
    path.resolve(process.cwd(), "../../packages/ui/README.md"),
    path.resolve(process.cwd(), "packages/ui/README.md"),
  ];
  const file = candidates.find((candidate) => existsSync(candidate));
  if (!file) {
    throw new Error("Cannot find packages/ui/README.md for the installation page.");
  }
  return readFileSync(file, "utf8");
}

function installationSection(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === "## Installation");
  if (start === -1) {
    throw new Error('packages/ui/README.md must contain a "## Installation" section.');
  }
  const next = lines.findIndex(
    (line, index) => index > start && /^##\s+/.test(line),
  );
  return lines.slice(start + 1, next === -1 ? undefined : next).join("\n");
}

function cells(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const info = line.slice(3).trim().split(/\s+/);
      const language = info[0] ?? "";
      const label = info.slice(1).join(" ");
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "code", language, label, code: code.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      blocks.push({
        kind: "heading",
        level: heading[1].length as 2 | 3 | 4,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      lines[index + 1] &&
      /^\|?\s*:?-{3,}/.test(lines[index + 1].trim())
    ) {
      const header = cells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(cells(lines[index]));
        index += 1;
      }
      blocks.push({ kind: "table", header, rows });
      continue;
    }

    const listItem = line.match(/^\s*(?:([-*])|(\d+)\.)\s+(.*)$/);
    if (listItem) {
      const ordered = Boolean(listItem[2]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*(?:([-*])|(\d+)\.)\s+(.*)$/);
        if (!item) break;
        items.push(item[3]);
        index += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    if (/^\s*(?:---+|\*\*\*+)\s*$/.test(line)) {
      blocks.push({ kind: "rule" });
      index += 1;
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      if (
        !next.trim() ||
        next.startsWith("```") ||
        /^#{2,4}\s+/.test(next) ||
        next.trim().startsWith("|") ||
        /^\s*(?:[-*]|\d+\.)\s+/.test(next)
      ) {
        break;
      }
      paragraph.push(next.trim());
      index += 1;
    }
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text: string): ReactNode[] {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        return (
          <Link key={index} href={link[2]}>
            {link[1]}
          </Link>
        );
      }
      return part;
    });
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderBlock(block: Block, index: number): ReactNode {
  switch (block.kind) {
    case "heading": {
      const level = block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";
      const section =
        block.level === 3
          ? `${styles.section}${block.text === "Existing project" ? ` ${styles.existingProject}` : ""}`
          : undefined;
      return (
        <Heading
          key={index}
          as={level}
          size={block.level === 2 ? 3 : block.level === 3 ? 5 : 6}
          id={slug(block.text)}
          className={section}
        >
          {inline(block.text)}
        </Heading>
      );
    }
    case "paragraph":
      if (block.text.startsWith("Requires ")) {
        return (
          <p key={index} className={styles.requirements}>
            <WarningIcon size="sm" className={styles.requirementsIcon} />
            <span>{inline(block.text)}</span>
          </p>
        );
      }
      return <p key={index}>{inline(block.text)}</p>;
    case "code":
      if (isPackageManagerBlock(block.language, block.code)) {
        return <PackageManagerCode key={index} npm={block.code} label={block.label || undefined} />;
      }
      return (
        <CodeBlock
          key={index}
          language={block.language || undefined}
          label={block.label || undefined}
          code={block.code}
        />
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{inline(item)}</li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <Table key={index} aria-label="Common installation problems">
          <TableHeader>
            <TableRow>
              {block.header.map((cell, cellIndex) => (
                <TableHead key={cellIndex}>{inline(cell)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {block.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{inline(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    case "rule":
      return <hr key={index} />;
  }
}

type Group =
  | { kind: "block"; block: Block }
  | {
      kind: "step";
      number: string;
      title: string;
      blocks: Block[];
      last: boolean;
    };

/**
 * Groups a numbered `####` heading with the blocks that follow it, so the number and its content
 * can be drawn as one step with a connecting rail. The rest of the blocks stay flat.
 */
function groupBlocks(blocks: Block[]): Group[] {
  const groups: Group[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    const step =
      block.kind === "heading" && block.level === 4
        ? block.text.match(/^(\d+)\.\s+(.*)$/)
        : null;

    if (!step) {
      groups.push({ kind: "block", block });
      index += 1;
      continue;
    }

    const inner: Block[] = [];
    index += 1;
    while (index < blocks.length) {
      const next = blocks[index];
      if (next.kind === "heading" && next.level <= 4) break;
      inner.push(next);
      index += 1;
    }

    const following = blocks[index];
    const last =
      !following ||
      (following.kind === "heading" && following.level <= 3);
    groups.push({ kind: "step", number: step[1], title: step[2], blocks: inner, last });
  }

  return groups;
}

export function InstallationFromReadme() {
  const groups = groupBlocks(parseBlocks(installationSection(readReadme())));
  return (
    <>
      {groups.map((group, index) =>
        group.kind === "step" ? (
          <div
            key={index}
            className={`${styles.step}${group.last ? ` ${styles.stepLast}` : ""}`}
          >
            <div className={styles.stepHead}>
              <span className={styles.stepNumber} aria-hidden="true">
                {group.number}
              </span>
              <Heading
                as="h4"
                size={6}
                id={slug(group.title)}
                className={styles.stepTitle}
              >
                {inline(group.title)}
              </Heading>
            </div>
            {group.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
          </div>
        ) : (
          renderBlock(group.block, index)
        ),
      )}
    </>
  );
}
