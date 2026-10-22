import type { ReactNode } from "react";
import { ButtonLink, CaretLeftIcon, CaretRightIcon, Heading, Link } from "@/ui";
import styles from "./DocPage.module.css";
import { CopyPage } from "./CopyPage";
import { neighbors } from "@/app/docs/_layout/nav";

const chevronLeft = <CaretLeftIcon />;
const chevronRight = <CaretRightIcon />;

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
          <Heading as="h1" size={3}>{title}</Heading>
          <div className={styles.docActions}>
            <CopyPage />
            {prev && (
              <ButtonLink href={prev.href} variant="secondary" size="sm" aria-label={`Previous: ${prev.label}`} className={styles.iconBtn} startIcon={chevronLeft} />
            )}
            {next && (
              <ButtonLink href={next.href} variant="secondary" size="sm" aria-label={`Next: ${next.label}`} className={styles.iconBtn} startIcon={chevronRight} />
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
              <span className={styles.pagerLabel}><CaretLeftIcon size="sm" />Previous</span>
              <span className={styles.pagerTitle}>{prev.label}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={next.href} tone="inherit" className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>Next<CaretRightIcon size="sm" /></span>
              <span className={styles.pagerTitle}>{next.label}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
    </article>
  );
}
