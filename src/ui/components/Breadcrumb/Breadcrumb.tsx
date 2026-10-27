"use client";

import type { ComponentProps, ElementType, ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { useLinkComponent } from "../Link";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import { DotsThreeIcon } from "../../icons/icons.generated";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  /** Visible text. */
  label: string;
  /** Destination. Omit it on the last item, which is the current page. */
  href?: string;
  /** Icon before the label. Pass a generated icon without `size`; the breadcrumb sizes it. */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the breadcrumb sizes it. */
  endIcon?: ReactNode;
};

export type BreadcrumbProps = {
  /** The trail from the root to the current page. The last item is marked as the current page. */
  items: BreadcrumbItem[];
  /** Node between items. Any node is allowed; it is always hidden from assistive technology. @default ">" */
  separator?: ReactNode;
  /**
   * How many items to show before collapsing the middle ones into an ellipsis menu.
   * Values below 3 are ignored. Omit it to show every item.
   */
  maxItems?: number;
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
 * <Breadcrumb maxItems={4} items={[{ label: "Docs", href: "/docs" }, { label: "Components", href: "/docs/components" }, { label: "Navigation", href: "/docs/components/navigation" }, { label: "Breadcrumb", href: "/docs/components/breadcrumb" }, { label: "Examples" }]} />
 */
export function Breadcrumb({
  items,
  separator = ">",
  maxItems,
  "aria-label": ariaLabel = "Breadcrumb",
  className,
}: BreadcrumbProps) {
  const LinkEl = useLinkComponent() as ElementType<ComponentProps<"a">>;
  const limit = typeof maxItems === "number" && maxItems >= 3 ? maxItems : undefined;
  const shouldCollapse = limit !== undefined && items.length > limit;

  function renderItem(item: BreadcrumbItem, index: number) {
    const last = index === items.length - 1;
    const position = iconPosition({
      startIcon: item.startIcon,
      endIcon: item.endIcon,
    });

    return (
      <li key={`${item.href ?? item.label}-${index}`} className={styles.item}>
        {last ? (
          <span aria-current="page" className={styles.current} data-icon={position}>
            <IconSlot>{item.startIcon}</IconSlot>
            {item.label}
            <IconSlot>{item.endIcon}</IconSlot>
          </span>
        ) : item.href ? (
          <LinkEl href={item.href} className={styles.link} data-icon={position}>
            <IconSlot>{item.startIcon}</IconSlot>
            {item.label}
            <IconSlot>{item.endIcon}</IconSlot>
          </LinkEl>
        ) : (
          <span className={styles.text} data-icon={position}>
            <IconSlot>{item.startIcon}</IconSlot>
            {item.label}
            <IconSlot>{item.endIcon}</IconSlot>
          </span>
        )}
        {!last ? (
          <span
            aria-hidden="true"
            className={cx(styles.separator, separator === ">" && styles.separatorGlyph)}
          >
            {separator}
          </span>
        ) : null}
      </li>
    );
  }

  function renderHiddenMenu(hidden: BreadcrumbItem[]) {
    return (
      <BaseMenu.Root>
        <BaseMenu.Trigger className={styles.ellipsis} aria-label="Show hidden pages">
          <DotsThreeIcon />
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align="start" className={styles.positioner}>
            <BaseMenu.Popup className={styles.popup}>
              {hidden.map((item, i) => {
                const position = iconPosition({
                  startIcon: item.startIcon,
                  endIcon: item.endIcon,
                });
                const content = (
                  <>
                    <IconSlot>{item.startIcon}</IconSlot>
                    {item.label}
                    <IconSlot className={styles.menuSlotEnd}>{item.endIcon}</IconSlot>
                  </>
                );

                if (item.href) {
                  const render = LinkEl === "a" ? undefined : <LinkEl href={item.href} />;
                  return (
                    <BaseMenu.LinkItem
                      key={`${item.href}-${i}`}
                      href={item.href}
                      render={render}
                      className={styles.menuItem}
                      data-icon={position}
                    >
                      {content}
                    </BaseMenu.LinkItem>
                  );
                }

                return (
                  <BaseMenu.Item
                    key={`${item.label}-${i}`}
                    className={styles.menuItem}
                    data-icon={position}
                  >
                    {content}
                  </BaseMenu.Item>
                );
              })}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    );
  }

  if (shouldCollapse && limit !== undefined) {
    const tailCount = limit - 2;
    const tailStart = items.length - tailCount;
    const hidden = items.slice(1, tailStart);

    return (
      <nav aria-label={ariaLabel} className={cx(styles.nav, className)}>
        <ol className={styles.list}>
          {renderItem(items[0], 0)}
          <li key="ellipsis" className={styles.item}>
            {renderHiddenMenu(hidden)}
            <span
              aria-hidden="true"
              className={cx(styles.separator, separator === ">" && styles.separatorGlyph)}
            >
              {separator}
            </span>
          </li>
          {items.slice(tailStart).map((item, i) => renderItem(item, tailStart + i))}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label={ariaLabel} className={cx(styles.nav, className)}>
      <ol className={styles.list}>{items.map(renderItem)}</ol>
    </nav>
  );
}
