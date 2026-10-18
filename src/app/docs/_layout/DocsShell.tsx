"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import shell from "../../_shell/shell.module.css";
import layout from "./DocsLayout.module.css";
import { DocsNav } from "./DocsNav";

/**
 * Layout of the docs. Pages show the index on the left; a component page hides it (it has its own
 * Previous/Next). On small screens the index lives in the header menu, so it is not drawn here.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isComponentPage = /^\/docs\/components\/[^/]+/.test(pathname);
  return (
    <div className={shell.wrap}>
      <div className={isComponentPage ? layout.docsSingle : layout.docs}>
        {!isComponentPage && (
          <div className={layout.side}>
            <div className={layout.sideScroll}>
              <DocsNav />
            </div>
          </div>
        )}
        <div className={layout.content}>{children}</div>
      </div>
    </div>
  );
}
