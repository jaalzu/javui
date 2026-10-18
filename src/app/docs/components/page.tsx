import type { Metadata } from "next";
import { Link } from "@/ui";
import lists from "../_page/DocLists.module.css";
import { DocPage } from "@/app/docs/_page/DocPage";
import { componentLinks } from "@/app/docs/_layout/nav";

export const metadata: Metadata = { title: "Components" };

export default function Components() {
  return (
    <DocPage
      href="/docs/components"
      title="Components"
      description="Every component has a live preview, code and notes for people and agents."
    >
      <ul className={lists.nameGrid}>
        {componentLinks.map((c) => (
          <li key={c.href}>
            <Link href={c.href} tone="inherit" className={lists.nameLink}>{c.label}</Link>
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
