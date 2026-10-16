import type { Metadata } from "next";
import { Link } from "@/ui";
import styles from "../../site.module.css";
import { DocPage } from "../DocPage";
import { componentLinks } from "../nav";

export const metadata: Metadata = { title: "Components" };

export default function Components() {
  return (
    <DocPage
      href="/docs/components"
      title="Components"
      description="Every component has a live preview, code and notes for people and agents."
    >
      <ul className={styles.nameGrid}>
        {componentLinks.map((c) => (
          <li key={c.href}>
            <Link href={c.href} tone="inherit" className={styles.nameLink}>{c.label}</Link>
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
