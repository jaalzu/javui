"use client";

import type { ReactNode } from "react";
import shell from "../../_shell/shell.module.css";
import layout from "./DocsLayout.module.css";
import { DocsNav } from "./DocsNav";
import { OnThisPage } from "../_page/OnThisPage";

/** Layout of the docs: the index on the left, the page, and its headings on the right. */
export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className={shell.wrap}>
      <div className={layout.docs}>
        <div className={layout.side}>
          <div className={layout.sideScroll}>
            <DocsNav />
          </div>
        </div>
        <div className={layout.content}>{children}</div>
        <OnThisPage />
      </div>
    </div>
  );
}
