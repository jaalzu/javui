"use client";

import { useEffect, useRef, useState } from "react";
import { Button, CheckIcon, CopyIcon } from "@/ui";
import shell from "../../_shell/shell.module.css";

/** Copies the text of the page (title and content) so it can be pasted into an editor or an agent. */
export function CopyPage() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    const article = document.querySelector("article");
    if (!article) return;
    try {
      await navigator.clipboard.writeText((article as HTMLElement).innerText);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={copy}>
        {copied ? <CheckIcon size="sm" /> : <CopyIcon size="sm" />}
        {copied ? "Copied" : "Copy page"}
      </Button>
      <span role="status" className={shell.srOnly}>{copied ? "Page copied" : ""}</span>
    </>
  );
}
