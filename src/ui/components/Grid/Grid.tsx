import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { space, type ContainerOrListElement, type Space } from "../../types";
import styles from "./Grid.module.css";

export type GridProps<T extends ContainerOrListElement = "div"> = {
  /** Element to render. With `ul` or `ol`, children must be `li` elements. @default "div" */
  as?: T;
  /**
   * Number of equal columns (`3`), or a full `grid-template-columns` value
   * (`"2fr 1fr"`, `"repeat(auto-fit, minmax(16rem, 1fr))"`). @default 1
   */
  columns?: number | string;
  /** Space between rows and columns, from the spacing scale. @default "4" */
  gap?: Space;
  /** Row gap override. */
  rowGap?: Space;
  /** Column gap override. */
  columnGap?: Space;
  /** Alignment of items inside their cells on the block axis. @default "stretch" */
  align?: "start" | "center" | "end" | "stretch";
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Two-dimensional layout using CSS grid with a token-based gap.
 *
 * @example
 * <Grid columns={3} gap="4">...</Grid>
 * <Grid columns="repeat(auto-fit, minmax(16rem, 1fr))">...</Grid>
 */
export function Grid<T extends ContainerOrListElement = "div">({
  as,
  columns = 1,
  gap = "4",
  rowGap,
  columnGap,
  align = "stretch",
  className,
  style,
  ...rest
}: GridProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties; role?: string }>;
  const isList = as === "ul" || as === "ol";
  const computed: CSSProperties = {
    gridTemplateColumns: typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns,
    gap: space(gap),
    ...(rowGap !== undefined && { rowGap: space(rowGap) }),
    ...(columnGap !== undefined && { columnGap: space(columnGap) }),
    alignItems: align === "stretch" ? "stretch" : align === "start" ? "start" : align === "end" ? "end" : "center",
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.grid, isList && styles.list, className)}
      style={computed}
      {...(isList ? { role: "list" } : {})}
      {...(rest as Record<string, unknown>)}
    />
  );
}
