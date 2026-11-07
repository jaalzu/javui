"use client";

import type { ComponentProps } from "react";
import { ButtonGroupSizeContext, type ControlSize } from "./ButtonGroupContext";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupProps = {
  /** Shared control size inherited by children that omit their own size. @default "md" */
  size?: ControlSize;
  /**
   * Layout above the `stackBelow` breakpoint. `horizontal` joins the controls side by side;
   * `vertical` stacks them.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Stacks the group into a column below this breakpoint and returns to `orientation` above it.
   * Omit it to keep one orientation at every width.
   * @default undefined
   */
  stackBelow?: "sm" | "md";
} & Omit<ComponentProps<"div">, "color">;

/**
 * Joins 2-4 related actions into one control. Children draw their border and radius; the group only zeros the inner edges. It never inherits `size` or `variant`.
 *
 * @example
 * <ButtonGroup aria-label="Document actions">
 *   <Button variant="secondary">Save draft</Button>
 *   <Button variant="secondary">Preview</Button>
 *   <Button variant="secondary">Publish</Button>
 * </ButtonGroup>
 */
export function ButtonGroup({
  orientation = "horizontal",
  stackBelow,
  size = "md",
  className,
  ...rest
}: ButtonGroupProps) {
  return (
    <ButtonGroupSizeContext.Provider value={size}>
    <div
      {...rest}
      role="group"
      data-orientation={orientation}
      data-stack-below={stackBelow}
      data-size={size}
      className={cx(styles.group, styles[orientation], className)}
    />
    </ButtonGroupSizeContext.Provider>
  );
}
