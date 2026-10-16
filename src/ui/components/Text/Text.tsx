import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import styles from "./Text.module.css";

/** HTML elements Text may render. Links and buttons are not allowed: use Link and Button. */
export type TextElement = "p" | "span" | "label" | "strong" | "em" | "small" | "div" | "code";

export type TextVariant = "body-lg" | "body" | "body-sm" | "label" | "caption" | "emphasis" | "code";

export type TextTone = "default" | "muted" | "subtle" | "danger" | "success";

const defaultElement: Record<TextVariant, TextElement> = {
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
  emphasis: "p",
  code: "code",
};

export type TextProps<T extends TextElement = "p"> = {
  /**
   * HTML element to render. Defaults by variant: `p` for body variants, `span` for
   * `label` and `caption`, `code` for `code`. Use `label` with `htmlFor` for form labels.
   */
  as?: T;
  /** Which text style to apply. Appearance only; it does not change the element. @default "body" */
  variant?: TextVariant;
  /** Text color from the semantic color tokens. @default "default" */
  tone?: TextTone;
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Body-level text: paragraphs, labels, captions and inline code.
 * For headings use `Heading`; for links use `Link`.
 *
 * @example
 * <Text>Default paragraph.</Text>
 * <Text variant="caption" tone="muted">Helper text</Text>
 * <Text as="label" htmlFor="email" variant="label">Email</Text>
 */
export function Text<T extends TextElement = "p">({
  as,
  variant = "body",
  tone = "default",
  className,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? defaultElement[variant]) as ElementType<{ className?: string }>;
  return (
    <Component
      className={cx(styles.text, styles[variant], styles[`tone-${tone}`], className)}
      {...(rest as Record<string, unknown>)}
    />
  );
}
