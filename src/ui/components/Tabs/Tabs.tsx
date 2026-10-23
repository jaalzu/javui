import type { ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./Tabs.module.css";

export type TabItem = {
  /** Unique id of the tab, used for `value` and `defaultValue`. */
  value: string;
  /** Tab label. */
  label: ReactNode;
  /** Content of the panel shown when the tab is selected. */
  content: ReactNode;
  /** Icon before the label. Pass a generated icon without `size`; the tab sizes it. */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the tab sizes it. */
  endIcon?: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  /** The tabs and their panels, in order. */
  items: TabItem[];
  /** Accessible name of the tab list, for example "Account sections". Required when there is no visible heading for it. */
  "aria-label"?: string;
  className?: string;
} & Pick<
  BaseTabs.Root.Props,
  "value" | "defaultValue" | "onValueChange" | "orientation"
>;

/**
 * Tabs that switch between panels, built on Base UI Tabs (arrow-key navigation, roles and
 * `aria-controls` come from there). Pass `items` instead of composing parts.
 * Tabs are compact: icons use the 16px small size.
 *
 * @example
 * <Tabs aria-label="Account" items={[
 *   { value: "profile", label: "Profile", content: <p>Profile</p> },
 *   { value: "billing", label: "Billing", content: <p>Billing</p> },
 * ]} />
 */
export function Tabs({
  items,
  "aria-label": ariaLabel,
  className,
  defaultValue,
  ...rest
}: TabsProps) {
  const initial =
    rest.value === undefined
      ? (defaultValue ?? items.find((i) => !i.disabled)?.value)
      : undefined;

  return (
    <BaseTabs.Root
      className={cx(styles.root, className)}
      defaultValue={initial}
      {...rest}
    >
      <div className={styles.listContainer}>
        <BaseTabs.List className={styles.list} aria-label={ariaLabel}>
          {items.map((item) => (
            <BaseTabs.Tab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={styles.tab}
              data-icon={iconPosition({
                startIcon: item.startIcon,
                endIcon: item.endIcon,
              })}
            >
              <IconSlot>{item.startIcon}</IconSlot>
              {item.label}
              <IconSlot>{item.endIcon}</IconSlot>
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
      </div>

      {items.map((item) => (
        <BaseTabs.Panel
          key={item.value}
          value={item.value}
          className={styles.panel}
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
