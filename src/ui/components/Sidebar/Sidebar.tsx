"use client";

import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { IconSlot } from "../Icon/IconSlot";
import { Link } from "../Link";
import styles from "./Sidebar.module.css";

export type SidebarItem = {
  /** Visible label. */
  label: ReactNode;
  /** Destination. When set, the item is a link. */
  href?: string;
  /** Action for a button item. Ignored when `href` is set. */
  onSelect?: () => void;
  /** Icon before the label. Pass a generated icon without `size`; the item sizes it. */
  startIcon?: ReactNode;
  /** Marks the current page or section. */
  active?: boolean;
  /** Disables the item. */
  disabled?: boolean;
};

export type SidebarProps = {
  /** The navigation items, in order. */
  items: SidebarItem[];
  /** Accessible name of the navigation landmark. Required. */
  label: string;
  /** Content above the navigation, such as a title or a workspace switcher. */
  header?: ReactNode;
  /** Content below the navigation, pinned to the end. */
  footer?: ReactNode;
  className?: string;
};

/**
 * A vertical navigation panel for the side of an app layout. Items can be links or buttons;
 * links use the component from `LinkProvider`. This is a layout piece, not a Base UI primitive.
 *
 * @example
 * <Sidebar
 *   label="Workspace"
 *   header={<Heading as="h2" size={6}>Acme</Heading>}
 *   items={[
 *     { label: "Overview", href: "/", startIcon: <HouseIcon />, active: true },
 *     { label: "Settings", href: "/settings", startIcon: <GearIcon /> },
 *   ]}
 * />
 */
export function Sidebar({ items, label, header, footer, className }: SidebarProps) {
  return (
    <aside className={cx(styles.root, className)}>
      {header ? <div className={styles.header}>{header}</div> : null}
      <nav aria-label={label} className={styles.nav}>
        <ul className={styles.list}>
          {items.map((item, index) => {
            const itemClassName = cx(
              styles.item,
              item.active && styles.active,
              item.disabled && styles.disabled,
            );

            return (
              <li key={item.href ?? `${index}-${String(item.label)}`}>
                {item.href && !item.disabled ? (
                  <Link
                    href={item.href}
                    tone="inherit"
                    startIcon={item.startIcon}
                    className={itemClassName}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={itemClassName}
                    onClick={item.onSelect}
                    disabled={item.disabled}
                    aria-current={item.active ? "page" : undefined}
                    data-icon={item.startIcon ? "start" : undefined}
                  >
                    <IconSlot>{item.startIcon}</IconSlot>
                    <span className={styles.label}>{item.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </aside>
  );
}
