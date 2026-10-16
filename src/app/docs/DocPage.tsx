import type { ReactNode } from "react";
import { ButtonLink, Heading, Icon, Link } from "@/ui";
import styles from "../site.module.css";
import { CopyPage } from "./CopyPage";
import { neighbors } from "./nav";

const chevronLeft = <path d="M15 6l-6 6 6 6" />;
const chevronRight = <path d="M9 6l6 6-6 6" />;

type DocPageProps = {
  /** Path of the page, used to find Previous and Next. */
  href: string;
  title: string;
  /** Lead sentence under the title. */
  description?: ReactNode;
  children: ReactNode;
};

/** Page frame for the docs: title, Copy page, Previous/Next at the top, content, and Previous/Next cards at the bottom. */
export function DocPage({ href, title, description, children }: DocPageProps) {
  const { prev, next } = neighbors(href);
  return (
    <article className={styles.prose}>
      <header className={styles.docHeader}>
        <div className={styles.docTitleRow}>
          <Heading as="h1" size="h1">{title}</Heading>
          <div className={styles.docActions}>
            <CopyPage />
            {prev && (
              <ButtonLink href={prev.href} variant="secondary" size="sm" aria-label={`Previous: ${prev.label}`} className={styles.iconBtn}>
                <Icon size="sm">{chevronLeft}</Icon>
              </ButtonLink>
            )}
            {next && (
              <ButtonLink href={next.href} variant="secondary" size="sm" aria-label={`Next: ${next.label}`} className={styles.iconBtn}>
                <Icon size="sm">{chevronRight}</Icon>
              </ButtonLink>
            )}
          </div>
        </div>
        {description && <p className={styles.lead}>{description}</p>}
      </header>

      {children}

      {(prev || next) && (
        <nav aria-label="Previous and next pages" className={styles.pager}>
          {prev ? (
            <Link href={prev.href} tone="inherit" className={styles.pagerLink}>
              <span className={styles.pagerLabel}><Icon size="sm">{chevronLeft}</Icon>Previous</span>
              <span className={styles.pagerTitle}>{prev.label}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={next.href} tone="inherit" className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>Next<Icon size="sm">{chevronRight}</Icon></span>
              <span className={styles.pagerTitle}>{next.label}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
    </article>
  );
}
