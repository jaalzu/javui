import type { ReactNode } from "react";
import { ButtonLink, CaretLeftIcon, CaretRightIcon, Heading, Link } from "@/ui";
import styles from "./DocPage.module.css";
import { CopyPage } from "./CopyPage";
import { neighbors } from "@/app/docs/_layout/nav";

const chevronLeft = <CaretLeftIcon size="sm" />;
const chevronRight = <CaretRightIcon size="sm" />;

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
          <Heading as="h1" size={2}>{title}</Heading>
          <div className={styles.docActions}>
            <CopyPage />
            {prev && (
              <ButtonLink href={prev.href} variant="secondary" size="sm" aria-label={`Previous: ${prev.label}`} className={styles.iconBtn}>
                {chevronLeft}
              </ButtonLink>
            )}
            {next && (
              <ButtonLink href={next.href} variant="secondary" size="sm" aria-label={`Next: ${next.label}`} className={styles.iconBtn}>
                {chevronRight}
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
              <span className={styles.pagerLabel}>{chevronLeft}Previous</span>
              <span className={styles.pagerTitle}>{prev.label}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={next.href} tone="inherit" className={`${styles.pagerLink} ${styles.pagerNext}`}>
              <span className={styles.pagerLabel}>Next{chevronRight}</span>
              <span className={styles.pagerTitle}>{next.label}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
    </article>
  );
}
