"use client";

import type { ComponentProps, ElementType, ReactElement, ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { CaretDownIcon, CaretRightIcon, CheckIcon } from "../../icons/icons.generated";
import { Spinner } from "../Spinner";
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
  /** Prevents navigation while keeping the item rendered as a link; useful in documentation previews. */
  preventNavigation?: boolean;
  disabled?: boolean;
  /** Marks a destructive action such as Delete. */
  destructive?: boolean;
  /** Icon before the label. Pass a generated icon without `size`. */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`. */
  endIcon?: ReactNode;
  /** Secondary status text shown at the end of the item. */
  status?: ReactNode;
  /** Keeps a checkmark beside the item while it is selected. */
  selected?: boolean;
};

export type MenuSeparator = { type: "separator" };
export type MenuHeading = { type: "heading"; label: string };
export type MenuCheckboxItem = Omit<MenuItem, "type"> & {
  type: "checkbox";
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};
export type MenuRadioItem = Omit<MenuItem, "type" | "href" | "onSelect"> & {
  type: "radio";
  value: string;
};
export type MenuSubmenuEntry = Exclude<MenuEntry, MenuSubmenu>;
export type MenuSubmenu = { type: "submenu"; label: string; items: MenuEntry[]; startIcon?: ReactNode; status?: ReactNode; disabled?: boolean };

export type MenuEntry = MenuItem | MenuSeparator | MenuHeading | MenuCheckboxItem | MenuRadioItem | MenuSubmenu;

export type MenuSingleSelection = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type MenuWidth = "auto" | "xxs" | "xs" | "sm" | "md" | "lg";
export type MenuPlacement =
  | "bottom-start" | "bottom-center" | "bottom-end"
  | "top-start" | "top-center" | "top-end"
  | "left-start" | "left-center" | "left-end"
  | "right-start" | "right-center" | "right-end";

export type MenuProps = {
  /** Text of the button that opens the menu. */
  label: string;
  /** Items in order. Use `{ type: "separator" }` to group them. */
  items?: MenuEntry[];
  /** Button style of the trigger. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
  /** Optional custom trigger. It must be an accessible button-like element. */
  trigger?: ReactElement;
  /** Uses a bordered text trigger, like an editor menubar, instead of the default button. */
  triggerVariant?: "button" | "tab";
  /** Alignment of the menu against the trigger. @default "start" */
  align?: "start" | "center" | "end";
  /** Placement relative to the trigger. Overrides `align` when provided. @default "bottom-start" */
  placement?: MenuPlacement;
  /** Content-sized by default, or one of the fixed semantic menu widths. @default "auto" */
  width?: MenuWidth;
  className?: string;
  /** Shows a non-interactive loading state inside the popup. @default false */
  loading?: boolean;
  /** Enables a single-selection radio group for entries with `type: "radio"`. */
  singleSelection?: MenuSingleSelection;
  /** Removes the popup entrance transition when the menu is coordinated by MenuBar. */
  instant?: boolean;
};

export type MenuBarProps = {
  menus: MenuProps[];
  className?: string;
};


/**
 * A dropdown list of actions, links, grouped items, selections and one-level submenus, built on Base UI
 * Menu (arrow keys, typeahead, focus return and Escape come from there). Items with `href` are real
 * links; items with `onSelect` are actions. The trigger icons follow its button size; menu items use
 * clear, 20px icons for better scanability.
 *
 * @example
 * <Menu label="Account" items={[
 *   { label: "Profile", href: "/profile" },
 *   { type: "separator" },
 *   { label: "Sign out", onSelect: signOut },
 * ]} />
 */
export function Menu({ label, items = [], variant = "secondary", size = "md", align = "start", placement = "bottom-start", width = "auto", loading = false, singleSelection, instant = false, trigger, triggerVariant = "button", className }: MenuProps) {
  const LinkComponent = useLinkComponent() as ElementType<ComponentProps<"a">> | "a";
  const [placementSide, placementAlign] = placement.split("-") as ["bottom" | "top" | "left" | "right", "start" | "center" | "end"];
  const positionSide = placementSide;
  const positionAlign = placement === "bottom-start" ? align : placementAlign;
  const renderItems = (entries: MenuEntry[]): ReactNode => {
    const hasSelection = entries.some((entry) => entry.type === "checkbox" || entry.type === "radio" || ("selected" in entry && entry.selected !== undefined));
    return entries.map((entry, i) => {
    if (entry.type === "separator") return <BaseMenu.Separator key={`sep-${i}`} className={styles.separator} />;
    if (entry.type === "heading") return <BaseMenu.GroupLabel key={`heading-${entry.label}-${i}`} className={styles.heading}>{entry.label}</BaseMenu.GroupLabel>;
    if (entry.type === "submenu") {
      return (
        <BaseMenu.SubmenuRoot key={`submenu-${entry.label}-${i}`}>
          <BaseMenu.SubmenuTrigger disabled={entry.disabled} className={styles.item}>
            <IconSlot>{entry.startIcon}</IconSlot>
            {entry.label}
            {entry.status ? <span className={styles.status}>{entry.status}</span> : null}
            <IconSlot className={styles.slotEnd}><CaretRightIcon /></IconSlot>
          </BaseMenu.SubmenuTrigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner side="inline-end" sideOffset={1} align="start" className={styles.positioner}>
              <BaseMenu.Popup className={cx(styles.popup, styles["width-auto"], instant && styles.popupInstant)}>
                <BaseMenu.Group>{renderItems(entry.items)}</BaseMenu.Group>
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.SubmenuRoot>
      );
    }
    const itemClass = cx(styles.item, entry.destructive && styles.destructive);
    const position = iconPosition({ startIcon: entry.startIcon, endIcon: entry.endIcon });
    const itemContent = <><IconSlot>{entry.selected ? null : entry.startIcon}</IconSlot>{entry.label}{entry.status ? <span className={styles.status}>{entry.status}</span> : null}<IconSlot className={styles.slotEnd}>{entry.selected ? null : entry.endIcon}</IconSlot></>;
    const selectionIndicator = hasSelection ? <span className={cx(styles.checkIndicator, !entry.selected && styles.checkIndicatorHidden)} aria-hidden="true">{entry.selected ? <CheckIcon /> : null}</span> : null;
    const content = <>{itemContent}{selectionIndicator}</>;
    if (entry.type === "checkbox") {
      return <BaseMenu.CheckboxItem key={`${entry.label}-${i}`} checked={entry.checked} defaultChecked={entry.defaultChecked} disabled={entry.disabled} onCheckedChange={entry.onCheckedChange} className={itemClass} data-icon={position}>{itemContent}<span className={styles.checkIndicator}><BaseMenu.CheckboxItemIndicator className={styles.checkGlyph}><CheckIcon /></BaseMenu.CheckboxItemIndicator></span></BaseMenu.CheckboxItem>;
    }
    if (entry.type === "radio") {
      return <BaseMenu.RadioItem key={`${entry.value}-${i}`} value={entry.value} disabled={entry.disabled} className={itemClass} data-icon={position}>{itemContent}<span className={styles.checkIndicator}><BaseMenu.RadioItemIndicator className={styles.checkGlyph}><CheckIcon /></BaseMenu.RadioItemIndicator></span></BaseMenu.RadioItem>;
    }
    if (entry.href) {
      const render = LinkComponent === "a" ? undefined : <LinkComponent href={entry.href} />;
      return <BaseMenu.LinkItem key={`${entry.label}-${i}`} href={entry.href} render={render} onClick={(event) => { if (entry.preventNavigation) event.preventDefault(); else entry.onSelect?.(); }} className={itemClass} data-icon={position} data-selected={entry.selected || undefined}>{content}</BaseMenu.LinkItem>;
    }
    return <BaseMenu.Item key={`${entry.label}-${i}`} disabled={entry.disabled} onClick={() => entry.onSelect?.()} className={itemClass} data-icon={position} data-selected={entry.selected || undefined}>{content}</BaseMenu.Item>;
    });
  };
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger
        render={trigger ?? (triggerVariant === "tab" ? (
          <button type="button" className={styles.tabTrigger}>{label}</button>
        ) : (
          <Button
            variant={variant}
            size={size}
            className={className}
            endIcon={<CaretDownIcon />}
          >
            {label}
          </Button>
        ))}
      />
      <BaseMenu.Portal>
          <BaseMenu.Positioner side={positionSide} sideOffset={8} align={positionAlign} className={styles.positioner}>
          <BaseMenu.Popup className={cx(styles.popup, styles[`width-${width}`], instant && styles.popupInstant)}>
            {loading ? <div className={styles.loading}><Spinner size="sm" label="Loading menu" /></div> : singleSelection ? <BaseMenu.RadioGroup value={singleSelection.value} defaultValue={singleSelection.defaultValue} onValueChange={(value) => singleSelection.onValueChange?.(String(value))}>{renderItems(items)}</BaseMenu.RadioGroup> : <BaseMenu.Group>{renderItems(items)}</BaseMenu.Group>}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
export function MenuBar({ menus, className }: MenuBarProps) {
  return (
    <BaseMenubar modal={false} className={cx(styles.menubar, className)}>
      {menus.map((menu, index) => <Menu key={`${menu.label}-${index}`} {...menu} instant />)}
    </BaseMenubar>
  );
}
