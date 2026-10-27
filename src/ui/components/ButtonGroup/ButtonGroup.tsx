import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./ButtonGroup.module.css";

export type ButtonGroupProps = {
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
 * Joins related actions into one control. Each child draws its own border and radius; the group
 * only zeros the inner edges. Use the same size and variant in every child.
 *
 * Use `ButtonGroup` for actions and `ToggleGroup` for a selected state.
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
  className,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      {...rest}
      role="group"
      data-orientation={orientation}
      data-stack-below={stackBelow}
      className={cx(styles.group, styles[orientation], className)}
    />
  );
}
