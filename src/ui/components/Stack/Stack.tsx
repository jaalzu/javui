import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { space, type ContainerOrListElement, type Space } from "../../types";
import styles from "./Stack.module.css";

export type StackProps<T extends ContainerOrListElement = "div"> = {
  /**
   * Element to render. With `ul` or `ol`, children must be `li` elements.
   * @default "div"
   */
  as?: T;
  /** Main axis. `column` stacks vertically. @default "column" */
  direction?: "column" | "row";
  /** Space between children, from the spacing scale. @default "4" */
  gap?: Space;
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
 * @example
 * <Stack gap="3">
 *   <Heading as="h2">Title</Heading>
 *   <Text>Body</Text>
 * </Stack>
 * <Stack as="ul" gap="2"><li>One</li><li>Two</li></Stack>
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
  const computed: CSSProperties = {
    flexDirection: direction,
    gap: space(gap),
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? "wrap" : "nowrap",
    ...(style as CSSProperties | undefined),
  };
  return (
    <Component
      className={cx(styles.stack, isList && styles.list, className)}
      style={computed}
      // Removing list markers makes Safari/VoiceOver drop the list semantics; this restores them.
      {...(isList ? { role: "list" } : {})}
      {...(rest as Record<string, unknown>)}
    />
  );
}
