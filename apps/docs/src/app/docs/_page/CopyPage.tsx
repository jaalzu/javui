"use client";

import {
  useEffect,
  useRef,
  useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  Menu,
  type MenuEntry
} from "@javui/ui";
import { CaretDownIcon, CheckIcon, CopyIcon, FileTextIcon } from "@/icons";
import shell from "../../_shell/shell.module.css";
import { articleToMarkdown } from "./articleToMarkdown";

type CopyFormat = "text" | "markdown";

/** Copies the page as plain text or as Markdown so it can be pasted into an editor or an agent. */
export function CopyPage() {
  const [copied, setCopied] = useState<CopyFormat | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy(format: CopyFormat) {
    const article = document.querySelector("article");
    if (!article) return;
    const text =
      format === "markdown"
        ? articleToMarkdown(article as HTMLElement)
        : (article as HTMLElement).innerText;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  const items: MenuEntry[] = [
    {
      label:
        copied === "markdown" ? "Copied as Markdown" : "Copy page as Markdown",
      startIcon: <FileTextIcon />,
      onSelect: () => copy("markdown"),
    },
  ];

  return (
    <>
      <ButtonGroup size="sm" aria-label="Copy page">
        <Button
          variant="secondary"
          startIcon={copied === "text" ? <CheckIcon /> : <CopyIcon />}
          onClick={() => copy("text")}
        >
          {copied === "text" ? "Copied" : "Copy page"}
        </Button>
        <ButtonGroupSeparator />
        <Menu
          label="Copy page options"
          items={items}
          align="end"
          trigger={
            <Button
              variant="secondary"
              aria-label="More copy options"
              startIcon={<CaretDownIcon />}
            />
          }
        />
      </ButtonGroup>
      <span role="status" className={shell.srOnly}>
        {copied === "markdown"
          ? "Page copied as Markdown"
          : copied === "text"
            ? "Page copied"
            : ""}
      </span>
    </>
  );
}
