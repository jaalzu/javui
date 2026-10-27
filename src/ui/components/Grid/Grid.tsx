import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { responsiveVars, type Responsive } from "../../utils/responsive";
import { space, type ContainerOrListElement, type Space } from "../../types";
import styles from "./Grid.module.css";

export type GridProps<T extends ContainerOrListElement = "div"> = {
  /** Element to render. With `ul` or `ol`, children must be `li` elements. @default "div" */
  as?: T;
  /**
   * Number of equal columns (`3`), or a full `grid-template-columns` value
   * (`"2fr 1fr"`). Pass a per-breakpoint object to change it responsively;
   * mobile-first, a missing breakpoint inherits the smaller one. @default 1
   */
  columns?: Responsive<number | string>;
  /**
   * Minimum width for automatic columns, for example `"16rem"`. Uses `auto-fit` with no
   * breakpoints and overrides `columns`. `min(100%, X)` prevents overflow on narrow screens.
   */
  minColumnWidth?: string;
  /**
   * Space between rows and columns, from the spacing scale. Pass a per-breakpoint object
   * to change it responsively; mobile-first, a missing breakpoint inherits the smaller one.
   * @default "4"
   */
  gap?: Responsive<Space>;
  /** Row gap override. */
  rowGap?: Space;
  /** Column gap override. */
  columnGap?: Space;
  /** Alignment of items inside their cells on the block axis. @default "stretch" */
  align?: "start" | "center" | "end" | "stretch";
} & Omit<ComponentProps<T>, "as" | "color">;

const toTemplate = (v: number | string) =>
  typeof v === "number" ? `repeat(${v}, minmax(0, 1fr))` : v;

/**
 * Two-dimensional layout using CSS grid with a token-based gap.
 *
 * Breakpoints are mobile-first: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem.
 * A missing breakpoint inherits the smaller one.
 *
 * @example
 * <Grid columns={3} gap="4">...</Grid>
 * <Grid columns="2fr 1fr">...</Grid>
 * <Grid minColumnWidth="16rem" gap="4">...</Grid>
 * <Grid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: "3", md: "6" }}>...</Grid>
 * <Grid columns={{ base: 1, lg: "2fr 1fr" }}>...</Grid>
 */
export function Grid<T extends ContainerOrListElement = "div">({
  as,
  columns = 1,
  minColumnWidth,
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
  const columnsVars: CSSProperties = minColumnWidth
    ? { ["--grid-columns" as string]: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}), 1fr))` }
    : responsiveVars("grid-columns", columns, toTemplate);

  const vars: CSSProperties = {
    ...columnsVars,
    ...responsiveVars("grid-gap", gap, space),
    ...(rowGap !== undefined && { ["--grid-row-gap" as string]: space(rowGap) }),
    ...(columnGap !== undefined && { ["--grid-column-gap" as string]: space(columnGap) }),
    ["--grid-align" as string]: align,
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.grid, isList && styles.list, className)}
      style={vars}
      {...(isList ? { role: "list" } : {})}
      {...(rest as Record<string, unknown>)}
    />
  );
}
