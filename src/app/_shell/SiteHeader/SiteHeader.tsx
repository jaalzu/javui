import { ButtonLink, Link } from "@/ui";
import {
  componentLinks,
  componentsIndex,
  sections,
} from "@/app/docs/_layout/nav";
import { MobileNav } from "@/app/_shell/MobileNav/MobileNav";
import { Search, type SearchItem } from "@/app/_shell/Search/Search";
import { Mark, Wordmark } from "@/app/_shell/Logo/Logo";
import { repoUrl, siteName } from "@/app/_config/site-config";
import { HideOnScroll } from "./HideOnScroll";
import { ThemeSwitcher } from "@/app/_shell/ThemeSwitcher/ThemeSwitcher";
import styles from "./SiteHeader.module.css";
import shell from "../shell.module.css";

const mainLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/agents", label: "Agents" },
];

const githubMark = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const searchItems: SearchItem[] = [
  ...sections.map((s) => ({ href: s.href, label: s.label, group: "Docs" })),
  ...componentLinks.map((c) => ({
    href: c.href,
    label: c.label,
    group: "Component",
  })),
];

export function SiteHeader() {
  const mobileGroups = [
    {
      title: "Menu",
      links: [
        { href: "/", label: "Home" },
        ...mainLinks,
        { href: repoUrl, label: "GitHub" },
      ],
    },
    { title: "Sections", links: sections },
    {
      title: "Components",
      links: [
        { ...componentsIndex, label: "All components" },
        ...componentLinks,
      ],
    },
  ];
  return (
    <HideOnScroll className={styles.header}>
      <div className={`${shell.wrap} ${styles.headerWrap}`}>
        <div className={styles.headerInner}>
          <div className={styles.menuSlot}>
            <MobileNav groups={mobileGroups} />
          </div>
          <Link
            href="/"
            tone="inherit"
            className={styles.brand}
            aria-label={`${siteName} home`}
          >
            <span className={styles.brandMark}>
              <Mark />
            </span>
            <span className={styles.brandWord}>
              <Wordmark />
            </span>
          </Link>
          <nav aria-label="Main" className={styles.mainNav}>
            <ul className={styles.navList}>
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <ButtonLink href={l.href} variant="ghost" size="md">
                    {l.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <Search items={searchItems} />
            <span className={styles.divider} aria-hidden="true" />
            <ButtonLink
              href={repoUrl}
              variant="ghost"
              size="sm"
              aria-label="GitHub repository"
              className={`${styles.iconButton} ${styles.githubLink}`}
              startIcon={githubMark}
              target="_blank"
              rel="noopener noreferrer"
            />
            <span className={styles.divider} aria-hidden="true" />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </HideOnScroll>
  );
}
