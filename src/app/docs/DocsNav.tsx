"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/ui";
import styles from "../site.module.css";
import { componentLinks, componentsIndex, sections, type NavLink } from "./nav";

function Group({ title, links, pathname }: { title: string; links: NavLink[]; pathname: string }) {
  return (
    <div className={styles.sideGroup}>
      <p className={styles.sideTitle}>{title}</p>
      <ul className={styles.sideList}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              tone="inherit"
              className={styles.sideLink}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The documentation index: sections first, then every component. */
export function DocsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation">
      <Group title="Sections" links={sections} pathname={pathname} />
      <Group title="Components" links={[{ ...componentsIndex, label: "All components" }, ...componentLinks]} pathname={pathname} />
    </nav>
  );
}
