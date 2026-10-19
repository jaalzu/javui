"use client";

import type { ComponentProps, ElementType } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { CaretDownIcon } from "../../icons/icons.generated";
import { useLinkComponent } from "../Link/LinkContext";
import styles from "./Menu.module.css";

export type MenuItem = {
  type?: "item";
  /** Visible text of the item. */
  label: string;
  /** Runs when the item is chosen (click, Enter or Space). Use it for actions. */
  onSelect?: () => void;
  /** Makes the item a link to this URL instead of an action. Use it for navigation. */
  href?: string;
  disabled?: boolean;
  /** Marks a destructive action such as Delete. */
  destructive?: boolean;
};

export type MenuSeparator = { type: "separator" };

export type MenuEntry = MenuItem | MenuSeparator;

export type MenuProps = {
  /** Text of the button that opens the menu. */
  label: string;
  /** Items in order. Use `{ type: "separator" }` to group them. */
  items: MenuEntry[];
  /** Button style of the trigger. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
  /** Alignment of the menu against the trigger. @default "start" */
  align?: "start" | "center" | "end";
  className?: string;
};

/**
 * A dropdown list of actions or links, built on Base UI Menu (arrow keys, typeahead, focus return and
 * Escape come from there). Items with `href` are real links; items with `onSelect` are actions.
 * Do not put form controls in a menu: use `Popover`.
 *
 * @example
 * <Menu label="Account" items={[
 *   { label: "Profile", href: "/profile" },
 *   { type: "separator" },
 *   { label: "Sign out", onSelect: signOut },
 * ]} />
 */
export function Menu({ label, items, variant = "secondary", size = "md", align = "start", className }: MenuProps) {
  const LinkComponent = useLinkComponent() as ElementType<ComponentProps<"a">> | "a";
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={<Button variant={variant} size={size} className={className} />}>
        {label}
        <CaretDownIcon size="sm" />
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={6} align={align} className={styles.positioner}>
          <BaseMenu.Popup className={styles.popup}>
            {items.map((entry, i) => {
              if (entry.type === "separator") {
                return <BaseMenu.Separator key={`sep-${i}`} className={styles.separator} />;
              }
              const itemClass = cx(styles.item, entry.destructive && styles.destructive);
              if (entry.href) {
                const render = LinkComponent === "a" ? undefined : <LinkComponent href={entry.href} />;
                return (
                  <BaseMenu.LinkItem key={`${entry.label}-${i}`} href={entry.href} render={render} className={itemClass}>
                    {entry.label}
                  </BaseMenu.LinkItem>
                );
              }
              return (
                <BaseMenu.Item
                  key={`${entry.label}-${i}`}
                  disabled={entry.disabled}
                  onClick={() => entry.onSelect?.()}
                  className={itemClass}
                >
                  {entry.label}
                </BaseMenu.Item>
              );
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
