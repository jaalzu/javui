"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cx } from "../../utils/cx";
import styles from "./Separator.module.css";

export type SeparatorProps = BaseSeparator.Props & {
  /**
   * Hides the line from assistive technology when true. Set it to false when the line conveys a
   * real section boundary that screen readers should announce.
   * @default true
   */
  decorative?: boolean;
};

/**
 * A 1px line that visually or semantically divides content, built on Base UI Separator.
 * Horizontal by default; use `orientation="vertical"` inside a row. Spacing is not part of the
 * component: use the parent `gap` or a margin on `className`.
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator decorative={false} />
 */
export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...rest
}: SeparatorProps) {
  return (
    <BaseSeparator
      {...rest}
      orientation={orientation}
      data-slot="separator"
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={(state) =>
        cx(styles.separator, typeof className === "function" ? className(state) : className)
      }
    />
  );
}
