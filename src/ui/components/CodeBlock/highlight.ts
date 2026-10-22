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
  "use cache";

  if (!language) return null;
  const lang = languageAliases[language] ?? language;
  if (!supported.has(lang)) return null;

  const instance = await getHighlighter();
  const lines = code.split("\n");
  return instance.codeToHtml(code, {
    lang,
    theme,
    tabindex: false,
    transformers: [diffLines(lines)],
  });
}
