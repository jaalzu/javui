"use client";

import type { ReactNode } from "react";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./ToggleGroup.module.css";

export type ToggleGroupItem = {
  /** Value used by `value` and `defaultValue`. */
  value: string;
  /** Visible label. */
  label: ReactNode;
  /** Icon before the label. Pass a generated icon without `size`; the item sizes it. */
  startIcon?: ReactNode;
  disabled?: boolean;
};

export type ToggleGroupProps = {
  /** The options, in order. */
  items: ToggleGroupItem[];
  /** Accessible name of the group. Required. */
  label: string;
  /** Selected value, when controlled. */
  value?: string;
  /** Initially selected value, when uncontrolled. */
  defaultValue?: string;
  /** Called with the selected value, or an empty string when nothing is selected. */
  onValueChange?: (value: string) => void;
  /** Control height: `sm` 1.75rem, `md` 2.25rem. @default "md" */
  size?: "sm" | "md";
  disabled?: boolean;
  className?: string;
};

/**
 * A segmented single-choice control built on Base UI Toggle Group. Use it for two to five short,
 * mutually exclusive options, such as a view switch. For longer content use Tabs; for independent
 * on/off choices use Checkbox.
 *
 * @example
 * <ToggleGroup
 *   label="View"
 *   defaultValue="list"
 *   items={[
 *     { value: "list", label: "List" },
 *     { value: "grid", label: "Grid" },
 *   ]}
 * />
 */
export function ToggleGroup({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  disabled = false,
  className,
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cx(styles.root, className)}
      aria-label={label}
      value={value === undefined ? undefined : value ? [value] : []}
      defaultValue={defaultValue === undefined ? undefined : defaultValue ? [defaultValue] : []}
      onValueChange={onValueChange ? (next) => onValueChange(next[next.length - 1] ?? "") : undefined}
      disabled={disabled}
    >
      {items.map((item) => (
        <BaseToggle
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cx(styles.item, styles[size])}
          data-icon={iconPosition({ startIcon: item.startIcon })}
        >
          <IconSlot>{item.startIcon}</IconSlot>
          <span>{item.label}</span>
        </BaseToggle>
      ))}
    </BaseToggleGroup>
  );
}
