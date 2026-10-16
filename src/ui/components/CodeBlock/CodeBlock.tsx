"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { Icon } from "../Icon";
import { cx } from "../../utils/cx";
import styles from "./CodeBlock.module.css";

export type CodeTab = {
  /** Tab text, for example `bun`. */
  label: string;
  /** The code shown and copied when this tab is selected. */
  code: string;
};

export type CodeBlockProps = {
  /** The code to show, as plain text. Use `tabs` instead when there are alternatives (bun, npm, pnpm). */
  code?: string;
  /** Alternative versions of the same code, usually one command per package manager. The first tab is selected first. */
  tabs?: CodeTab[];
  /** Language name. `bash`, `sh` and `shell` show a small terminal icon instead of the word. No syntax highlighting. */
  language?: string;
  /** Accessible name of the scrollable code region. @default "Code" */
  label?: string;
  className?: string;
};

const terminalLanguages = new Set(["bash", "sh", "shell", "zsh", "terminal"]);

/**
 * Preformatted code with an icon-only copy button. Pass `tabs` to switch between alternatives such as
 * bun, pnpm, npm and yarn inside the same box. The code region can be focused so long lines scroll with the
 * keyboard, the scrollbar is hidden, and the copy result is announced politely.
 * There is no syntax highlighting on purpose (less weight, more contrast).
 *
 * @example
 * <CodeBlock language="tsx" label="Example" code={'<Button>Save</Button>'} />
 * <CodeBlock language="bash" label="Install" tabs={[
 *   { label: "bun", code: "bun add @base-ui/react" },
 *   { label: "npm", code: "npm install @base-ui/react" },
 * ]} />
 */
export function CodeBlock({ code = "", tabs, language, label = "Code", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(tabs?.[0]?.label ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const current = tabs ? (tabs.find((t) => t.label === active) ?? tabs[0])?.code ?? "" : code;

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
    <Icon size="sm" className={styles.lead}>
      <path d="M4 5h16v14H4z" />
      <path d="M7.5 10l3 2-3 2M12.5 14.5h4" />
    </Icon>
  ) : (
    <span className={styles.language}>{language ?? ""}</span>
  );

  const copyButton = (
    <>
      <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
        <Icon size="sm">{copied ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}</Icon>
      </button>
      <span role="status" className={styles.status}>{copied ? "Copied" : ""}</span>
    </>
  );

  const region = (text: string, name: string) => (
    // A scrollable region must be focusable so keyboard users can scroll it (axe: scrollable-region-focusable).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className={styles.scroll} role="region" aria-label={name} tabIndex={0}>
      <pre className={styles.pre}>
        <code>{text}</code>
      </pre>
    </div>
  );

  if (!tabs?.length) {
    return (
      <div className={cx(styles.root, className)}>
        <div className={styles.bar}>
          {lead}
          {copyButton}
        </div>
        {region(code, label)}
      </div>
    );
  }

  return (
    <BaseTabs.Root className={cx(styles.root, className)} value={active} onValueChange={(v) => setActive(String(v))}>
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
          {region(t.code, `${label} (${t.label})`)}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
