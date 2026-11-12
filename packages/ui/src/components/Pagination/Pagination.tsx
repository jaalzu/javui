"use client";

import type { ComponentProps, ElementType } from "react";
import { useLinkComponent } from "../Link";
import { cx } from "../../utils/cx";
import { CaretLeftIcon, CaretRightIcon } from "../../icons/icons.generated";
import styles from "./Pagination.module.css";

export type PaginationProps = {
  /** Current page, starting at 1. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** URL of a page, with `{page}` where the number goes, for example `"/blog?page={page}"`. A string (not a function) so it works from Server Components. */
  hrefTemplate: string;
  /** Whether to render the Previous and Next links. @default true */
  showPreviousNext?: boolean;
  /** Whether to render page-number links and ellipses. @default true */
  showPageNumbers?: boolean;
  /** Render Previous and Next as icon-only links. @default false */
  iconSteps?: boolean;
  /** Accessible name of the navigation. @default "Pagination" */
  "aria-label"?: string;
  className?: string;
};

type Slot = number | "gap-start" | "gap-end";

function slots(page: number, count: number): Slot[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: Slot[] = [1];
  const from = Math.max(2, page - 1);
  const to = Math.min(count - 1, page + 1);
  if (from > 2) out.push("gap-start");
  for (let p = from; p <= to; p++) out.push(p);
  if (to < count - 1) out.push("gap-end");
  out.push(count);
  return out;
}

/**
 * Page links for content split across URLs. Every page is a real link, so it works without JavaScript and
 * with `next/link` through `LinkProvider`. Previous and next are left out (not disabled) when unavailable.
 *
 * @example
 * <Pagination page={2} pageCount={9} hrefTemplate="/blog?page={page}" />
 */
export function Pagination({
  page,
  pageCount,
  hrefTemplate,
  showPreviousNext = true,
  showPageNumbers = true,
  iconSteps = false,
  "aria-label": ariaLabel = "Pagination",
  className,
}: PaginationProps) {
  const LinkEl = useLinkComponent() as ElementType<ComponentProps<"a">>;
  const href = (p: number) => hrefTemplate.replace("{page}", String(p));
  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className={styles.list}>
        {showPreviousNext && page > 1 && (
          <li>
            <LinkEl
              href={href(page - 1)}
              className={cx(styles.link, styles.step, iconSteps && styles.iconStep)}
              rel="prev"
              aria-label={iconSteps ? "Previous page" : undefined}
            >
              {iconSteps ? <CaretLeftIcon /> : <><CaretLeftIcon /> Previous</>}
            </LinkEl>
          </li>
        )}
        {showPageNumbers && slots(page, pageCount).map((s) =>
          typeof s === "number" ? (
            <li key={s}>
              <LinkEl
                href={href(s)}
                className={cx(styles.link, styles.number, s === page && styles.current)}
                aria-current={s === page ? "page" : undefined}
                aria-label={`Page ${s}`}
              >
                {s}
              </LinkEl>
            </li>
          ) : (
            <li key={s} className={styles.gap} aria-hidden="true">
              …
            </li>
          ),
        )}
        {showPreviousNext && page < pageCount && (
          <li>
            <LinkEl
              href={href(page + 1)}
              className={cx(styles.link, styles.step, iconSteps && styles.iconStep)}
              rel="next"
              aria-label={iconSteps ? "Next page" : undefined}
            >
              {iconSteps ? <CaretRightIcon /> : <>Next <CaretRightIcon /></>}
            </LinkEl>
          </li>
        )}
      </ul>
    </nav>
  );
}
