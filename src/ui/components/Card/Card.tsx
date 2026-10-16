import type { ComponentProps, CSSProperties, ElementType } from "react";
import { cx } from "../../utils/cx";
import { space, type Space } from "../../types";
import styles from "./Card.module.css";

/** Elements a Card may render. Use `li` only as a direct child of a `ul` or `ol`. */
export type CardElement = "div" | "article" | "section" | "li";

export type CardProps<T extends CardElement = "div"> = {
  /** Element to render. `article` for self-contained content, `section` for a named group. @default "div" */
  as?: T;
  /** Inner padding from the spacing scale. @default "6" */
  padding?: Space;
  /** `outline` draws only a soft border; `surface` adds the surface fill. @default "outline" */
  variant?: "outline" | "surface";
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * A bordered container that groups related content. Compose its content with `Stack`, `Heading` and `Text`.
 *
 * @example
 * <Card as="article" variant="surface">
 *   <Stack gap="2"><Heading as="h3">Title</Heading><Text>Body</Text></Stack>
 * </Card>
 */
export function Card<T extends CardElement = "div">({
  as,
  padding = "6",
  variant = "outline",
  className,
  style,
  ...rest
}: CardProps<T>) {
  const Component = (as ?? "div") as ElementType<{ className?: string; style?: CSSProperties }>;
  return (
    <Component
      className={cx(styles.card, styles[variant], className)}
      style={{ padding: space(padding), ...(style as CSSProperties | undefined) }}
      {...(rest as Record<string, unknown>)}
    />
  );
}
