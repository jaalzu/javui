import { createCssVariablesTheme, type ShikiTransformer } from "shiki";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import diff from "shiki/langs/diff.mjs";
import html from "shiki/langs/html.mjs";
import json from "shiki/langs/json.mjs";
import ts from "shiki/langs/ts.mjs";
import tsx from "shiki/langs/tsx.mjs";

const theme = createCssVariablesTheme({ variablePrefix: "--shiki-" });

const languageAliases: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  js: "ts",
  javascript: "ts",
  jsx: "tsx",
};

const supported = new Set(["bash", "css", "diff", "html", "json", "ts", "tsx"]);

let highlighter: Promise<HighlighterCore> | undefined;
const highlightedCache = new Map<string, Promise<string>>();
const MAX_HIGHLIGHTED_CACHE = 128;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [theme],
    langs: [bash, css, diff, html, json, ts, tsx],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

function diffLines(lines: string[]): ShikiTransformer {
  const add = (node: Parameters<NonNullable<ShikiTransformer["line"]>>[0], className: string) => {
    const current = node.properties.class;
    node.properties.class = current ? `${String(current)} ${className}` : className;
  };
  return {
    line(node, line) {
      const text = lines[line - 1] ?? "";
      if (text.startsWith("+") && !text.startsWith("+++")) add(node, "diff-added");
      if (text.startsWith("-") && !text.startsWith("---")) add(node, "diff-removed");
    },
  };
}

/** Highlights code with Shiki, or returns null when the language is unknown or highlighting is off. */
export async function highlightCode(code: string, language?: string): Promise<string | null> {
  if (!language) return null;
  const lang = languageAliases[language] ?? language;
  if (!supported.has(lang)) return null;

  const key = `${lang}\u0000${code}`;
  const cached = highlightedCache.get(key);
  if (cached) {
    highlightedCache.delete(key);
    highlightedCache.set(key, cached);
    return cached;
  }

  const result = getHighlighter().then((instance) => instance.codeToHtml(code, {
    lang,
    theme,
    tabindex: false,
    transformers: [diffLines(code.split("\n"))],
  }));
  highlightedCache.set(key, result);
  if (highlightedCache.size > MAX_HIGHLIGHTED_CACHE) highlightedCache.delete(highlightedCache.keys().next().value!);
  return result;
}
