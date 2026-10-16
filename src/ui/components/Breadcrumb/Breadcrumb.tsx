"use client";

import { Fragment } from "react";
import type { ComponentProps, ElementType } from "react";
import { useLinkComponent } from "../Link";
import { cx } from "../../utils/cx";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  /** Visible text. */
  label: string;
  /** Destination. Omit it on the last item, which is the current page. */
  href?: string;
};

export type BreadcrumbProps = {
  /** The trail from the root to the current page. The last item is marked as the current page. */
  items: BreadcrumbItem[];
  /** Accessible name of the navigation. Change it when a page has more than one breadcrumb. @default "Breadcrumb" */
  "aria-label"?: string;
  className?: string;
};

/**
 * Where the current page sits in the site. Renders `nav > ol` and marks the last item with
 * `aria-current="page"`. Links use whatever `LinkProvider` provides (`next/link` in this app).
 *
 * @example
 * <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Components", href: "/docs/components" }, { label: "Button" }]} />
 */
export function Breadcrumb({ items, "aria-label": ariaLabel = "Breadcrumb", className }: BreadcrumbProps) {
  const LinkEl = useLinkComponent() as ElementType<ComponentProps<"a">>;
  return (
    <nav aria-label={ariaLabel} className={cx(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className={styles.item}>
                {last || !item.href ? (
                  <span aria-current={last ? "page" : undefined} className={styles.current}>
                    {item.label}
                  </span>
                ) : (
                  <LinkEl href={item.href} className={styles.link}>
                    {item.label}
                  </LinkEl>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className={styles.sep} role="presentation">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
