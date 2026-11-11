"use client";

import type { ComponentProps, ReactNode } from "react";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cx } from "../../utils/cx";
import type { ButtonSize } from "../Button";
import { Toggle, type ToggleProps, type ToggleVariant } from "../Toggle";
import { ToggleGroupContext } from "../Toggle/ToggleContext";
import styles from "./ToggleGroup.module.css";

type BaseToggleGroupProps = ComponentProps<typeof BaseToggleGroup>;

export type ToggleGroupSpacing = "none" | "sm" | "md";

export type ToggleGroupProps = Omit<
  BaseToggleGroupProps,
  "children" | "className" | "value" | "defaultValue" | "onValueChange" | "multiple" | "orientation"
> & {
  /** Toggle buttons in the group. */
  children: ReactNode;
  /** Control height and icon size inherited by every item. @default "md" */
  size?: ButtonSize;
  /** Visual treatment inherited by every item. @default "outline" */
  variant?: ToggleVariant;
  /** Space between items. `none` connects their borders. @default "md" */
  spacing?: ToggleGroupSpacing;
  /** Selected values, when controlled. */
  value?: readonly string[];
  /** Initially selected values, when uncontrolled. */
  defaultValue?: readonly string[];
  /** Allow several items to be on at once. By default only one is. @default false */
  multiple?: boolean;
  /** Stack the items vertically instead of horizontally. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Called when the selected values change. */
  onValueChange?: BaseToggleGroupProps["onValueChange"];
  className?: string;
};

export type ToggleGroupItemProps = ToggleProps & {
  /** Unique value used by the group. */
  value: string;
};

/** A toggle group item that composes the standalone Toggle with Base UI Toggle Group. */
export function ToggleGroupItem({ className, ...props }: ToggleGroupItemProps) {
  return <Toggle {...props} className={cx(styles.item, className)} />;
}

/**
 * A set of related toggles with shared state, built on Base UI Toggle Group. It handles arrow-key
 * navigation and the selected values, so do not wire them by hand. Items inherit `size`.
 *
 * Selection is single by default; add `multiple` for several. `value` and `defaultValue` are always
 * arrays of item values. A group needs an accessible name (`aria-label`), and each icon-only item
 * needs its own. For a single independent on/off button, use `Toggle`.
 *
 * @example
 * <ToggleGroup aria-label="View" defaultValue={["list"]}>
 *   <ToggleGroupItem value="list">List</ToggleGroupItem>
 *   <ToggleGroupItem value="board">Board</ToggleGroupItem>
 * </ToggleGroup>
 * <ToggleGroup aria-label="Text style" multiple>...</ToggleGroup>
 */
export function ToggleGroup({
  children,
  size = "md",
  variant = "outline",
  spacing = "md",
  className,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ size, variant }}>
      <BaseToggleGroup
        {...props}
        className={cx(styles.root, className)}
        data-spacing={spacing}
      >
        {children}
      </BaseToggleGroup>
    </ToggleGroupContext.Provider>
  );
}
