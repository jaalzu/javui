import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { responsiveVars, type Responsive } from "../../utils/responsive";
import { space, type ContainerOrListElement, type Space } from "../../types";
import styles from "./Stack.module.css";

export type StackProps<T extends ContainerOrListElement = "div"> = {
  /**
   * Element to render. With `ul` or `ol`, children must be `li` elements.
   * @default "div"
   */
  as?: T;
  /**
   * Main axis. `column` stacks vertically. Pass a per-breakpoint object to change it responsively;
   * mobile-first, a missing breakpoint inherits the smaller one.
   * @default "column"
   */
  direction?: Responsive<"column" | "row">;
  /**
   * Space between children, from the spacing scale. Pass a per-breakpoint object to change it
   * responsively; mobile-first, a missing breakpoint inherits the smaller one.
   * @default "4"
   */
  gap?: Responsive<Space>;
  /** Alignment on the cross axis. @default "stretch" */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Distribution on the main axis. @default "start" */
  justify?: "start" | "center" | "end" | "between";
  /** Lets children wrap onto new lines. @default false */
  wrap?: boolean;
} & Omit<ComponentProps<T>, "as" | "color">;

const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" } as const;
const justifyMap = { start: "flex-start", center: "center", end: "flex-end", between: "space-between" } as const;

/**
 * One-dimensional layout: children in a row or column with a token-based gap.
 *
 * `direction` and `gap` accept a per-breakpoint object. Breakpoints are mobile-first:
 * `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem. A missing breakpoint inherits the
 * smaller one, so `{ md: "row" }` stays `column` below 48rem.
 *
 * @example
 * <Stack gap="3">
 *   <Heading as="h2">Title</Heading>
 *   <Text>Body</Text>
 * </Stack>
 * <Stack as="ul" gap="2"><li>One</li><li>Two</li></Stack>
 * <Stack direction={{ base: "column", md: "row" }} gap={{ base: "3", md: "6" }}>
 *   <Card>One</Card>
 *   <Card>Two</Card>
 * </Stack>
 */
export function Stack<T extends ContainerOrListElement = "div">({
  as,
  direction = "column",
  gap = "4",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  style,
  ...rest
}: StackProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties; role?: string }>;
  const isList = as === "ul" || as === "ol";
  const vars: CSSProperties = {
    ...responsiveVars("stack-direction", direction),
    ...responsiveVars("stack-gap", gap, space),
    ["--stack-align" as string]: alignMap[align],
    ["--stack-justify" as string]: justifyMap[justify],
    ["--stack-wrap" as string]: wrap ? "wrap" : "nowrap",
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.stack, isList && styles.list, className)}
      style={vars}
      // Removing list markers makes Safari/VoiceOver drop the list semantics; this restores them.
      {...(isList ? { role: "list" } : {})}
      {...(rest as Record<string, unknown>)}
    />
  );
}
