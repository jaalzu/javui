import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import { Heading, type HeadingElement, type HeadingSize } from "../../typography/Heading";
import { Text } from "../Text";
import styles from "./Card.module.css";

/** Elements a Card may render. Use `li` only as a direct child of a `ul` or `ol`. */
export type CardElement = "div" | "article" | "section" | "li";

export type CardProps<T extends CardElement = "div"> = {
  /**
   * Element to render. Prefer `article` for self-contained content: it can stand alone outside
   * the page context, with its own heading. If you use `section`, give it `aria-labelledby`
   * pointing to the `CardTitle` id. `li` only as a direct child of a `ul` or `ol`.
   * @default "div"
   */
  as?: T;
  /**
   * Inset between the card edge and its content. `sm` is 1rem, `default` is 1.5rem.
   * It sets `--card-spacing`, shared by the parts and the gap between them.
   * An inline `--card-spacing` on the card overrides `size`.
   * @default "default"
   */
  size?: "default" | "sm";
  /** `outline` draws only a soft border; `surface` adds the surface fill. @default "outline" */
  variant?: "outline" | "surface";
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * A bordered container that groups related content into one idea, with a short title.
 * Its parts share one inset through `--card-spacing`, and an `img` as the first child is
 * full-bleed with rounded top corners.
 *
 * Use `as="article"` for self-contained content. If you render a `section`, point
 * `aria-labelledby` at the `CardTitle`. For state, mark the card with `aria-busy="true"`
 * while its content loads and let `Skeleton` stand in for the text.
 *
 * @example
 * <Card as="article" variant="surface">
 *   <CardHeader>
 *     <CardTitle>Release notes</CardTitle>
 *     <CardDescription>What changed in this version.</CardDescription>
 *     <CardAction><Button variant="secondary">Share</Button></CardAction>
 *   </CardHeader>
 *   <CardContent><Text>Body of the card.</Text></CardContent>
 *   <CardFooter><Text size="sm" tone="muted">Updated today</Text></CardFooter>
 * </Card>
 */
export function Card<T extends CardElement = "div">({
  as,
  size = "default",
  variant = "outline",
  className,
  ...rest
}: CardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cx(styles.card, size === "sm" && styles.sm, styles[variant], className)}
      {...(rest as Record<string, unknown>)}
    />
  );
}

export type CardHeaderProps = ComponentProps<"div">;

/**
 * The top region of a Card: a `CardTitle`, an optional `CardDescription` and an optional
 * `CardAction` at the top end. A child marked with `data-card-media` (an icon or avatar)
 * adds a leading column, aligned with the title.
 */
export function CardHeader({ className, ...rest }: CardHeaderProps) {
  return <div className={cx(styles.header, className)} {...rest} />;
}

export type CardTitleProps = {
  /** Heading level in the document outline. Keep the order of the page. @default "h3" */
  as?: HeadingElement;
  /** Visual size from 1 (largest) to 6 (smallest). @default 6 */
  size?: HeadingSize;
} & Omit<ComponentProps<"h3">, "as" | "color">;

/**
 * The heading of a Card. Renders a real heading; the default `h3` suits a card inside a section
 * with an `h2`.
 */
export function CardTitle({ as = "h3", size = 6, className, ...rest }: CardTitleProps) {
  return <Heading as={as} size={size} className={cx(styles.title, className)} {...rest} />;
}

export type CardDescriptionProps = Omit<ComponentProps<"p">, "color">;

/** Supporting text below a `CardTitle`, in the muted body style. */
export function CardDescription({ className, ...rest }: CardDescriptionProps) {
  return <Text tone="muted" className={cx(styles.description, className)} {...rest} />;
}

export type CardActionProps = ComponentProps<"div">;

/** A control at the top end of a Card, aligned with `CardTitle`. */
export function CardAction({ className, ...rest }: CardActionProps) {
  return <div className={cx(styles.action, className)} {...rest} />;
}

export type CardContentProps = ComponentProps<"div">;

/**
 * The main content region of a Card, aligned with the header and footer.
 * Add `data-flush` to drop the side inset so the body can reach the card edges,
 * for example when it holds a `Table`.
 */
export function CardContent({ className, ...rest }: CardContentProps) {
  return <div className={cx(styles.content, className)} {...rest} />;
}

export type CardFooterProps = ComponentProps<"div">;

/** The bottom region of a Card, aligned with the header and content. */
export function CardFooter({ className, ...rest }: CardFooterProps) {
  return <div className={cx(styles.footer, className)} {...rest} />;
}
