"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { CheckIcon, CopyIcon, TerminalWindowIcon } from "../../icons/icons.generated";
import { cx } from "../../utils/cx";
import type { CodeBlockProps } from "./types";
import styles from "./CodeBlock.module.css";

export type CodeBlockViewProps = Omit<CodeBlockProps, "highlight"> & {
  /** Highlighted HTML for `code`, produced on the server. */
  html?: string | null;
  /** Highlighted HTML per tab label, produced on the server. */
  tabHtml?: Record<string, string | null>;
};

const terminalLanguages = new Set(["bash", "sh", "shell", "zsh", "terminal"]);

/** Adds `data-highlight` to the requested 1-based lines of Shiki's `.line` spans. */
function markLines(html: string, lines?: number[]): string {
  if (!lines?.length) return html;
  const wanted = new Set(lines);
  let index = 0;
  return html.replace(/<span class="line([^"]*)">/g, (match, classes: string) => {
    index += 1;
    return wanted.has(index) ? `<span class="line${classes}" data-highlight="">` : match;
  });
}

/**
 * Presentation half of `CodeBlock`: tabs, copy button and the focusable code region.
 * The server passes highlighted HTML; without it the code stays plain text.
 */
export function CodeBlockView({
  code = "",
  tabs,
  language,
  label = "Code",
  className,
  tone = "default",
  html,
  tabHtml,
  highlightLines,
}: CodeBlockViewProps) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(tabs?.[0]?.label ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const currentTab = tabs ? (tabs.find((t) => t.label === active) ?? tabs[0]) : undefined;
  const current = currentTab?.code ?? code;

  async function copy() {
    try {
      await navigator.clipboard.writeText(current);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const lead = language && terminalLanguages.has(language) ? (
    <TerminalWindowIcon size="sm" className={styles.lead} />
  ) : (
    <span className={styles.language}>{language ?? ""}</span>
  );

  const copyButton = (
    <>
      <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? <CheckIcon size="sm" /> : <CopyIcon size="sm" />}
      </button>
      <span role="status" className={styles.status}>{copied ? "Copied" : ""}</span>
    </>
  );

  const region = (text: string, name: string, highlighted?: string | null) => (
    // A scrollable region must be focusable so keyboard users can scroll it (axe: scrollable-region-focusable).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.scroll} role="region" aria-label={name} tabIndex={0}>
      {highlighted ? (
        <div
          className={styles.highlight}
          dangerouslySetInnerHTML={{ __html: markLines(highlighted, highlightLines) }}
        />
      ) : highlightLines?.length ? (
        <pre className={styles.pre}>
          <code>
            {text.split("\n").map((line, i) => (
              <span
                key={i}
                className={styles.line}
                data-highlight={highlightLines.includes(i + 1) ? "" : undefined}
              >
                {line}
              </span>
            ))}
          </code>
        </pre>
      ) : (
        <pre className={styles.pre}>
          <code>{text}</code>
        </pre>
      )}
    </div>
  );

  if (!tabs?.length) {
    return (
      <div className={cx(styles.root, className)} data-tone={tone}>
        <div className={styles.bar}>
          {lead}
          {copyButton}
        </div>
        {region(code, label, html)}
      </div>
    );
  }

  return (
    <BaseTabs.Root
      className={cx(styles.root, className)}
      data-tone={tone}
      value={active}
      onValueChange={(v) => setActive(String(v))}
    >
      <div className={styles.bar}>
        {lead}
        <BaseTabs.List className={styles.tabs} aria-label={`${label}: choose a version`}>
          {tabs.map((t) => (
            <BaseTabs.Tab key={t.label} value={t.label} className={styles.tab}>
              {t.label}
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
        {copyButton}
      </div>
      {tabs.map((t) => (
        <BaseTabs.Panel key={t.label} value={t.label} className={styles.panel}>
          {region(t.code, `${label} (${t.label})`, tabHtml?.[t.label])}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
