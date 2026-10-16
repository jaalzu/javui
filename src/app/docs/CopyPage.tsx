"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Icon } from "@/ui";
import styles from "../site.module.css";

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
        <Icon size="sm">
          {copied ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}
        </Icon>
        {copied ? "Copied" : "Copy page"}
      </Button>
      <span role="status" className={styles.srOnly}>{copied ? "Page copied" : ""}</span>
    </>
  );
}
