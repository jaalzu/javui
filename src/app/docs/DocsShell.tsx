"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "../site.module.css";
import { DocsNav } from "./DocsNav";

/**
 * Layout of the docs. Pages show the index on the left; a component page hides it (it has its own
 * Previous/Next). On small screens the index lives in the header menu, so it is not drawn here.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isComponentPage = /^\/docs\/components\/[^/]+/.test(pathname);
  return (
    <div className={styles.wrap}>
      <div className={isComponentPage ? styles.docsSingle : styles.docs}>
        {!isComponentPage && (
          <div className={styles.side}>
            <div className={styles.sideScroll}>
              <DocsNav />
            </div>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
