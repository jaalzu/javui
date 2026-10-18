import type { ComponentProps, ElementType } from "react";
import { cx } from "../../utils/cx";
import styles from "./Text.module.css";

/** HTML elements Text may render. Links and buttons are not allowed: use Link and Button. */
export type TextElement = "p" | "span" | "label" | "strong" | "em" | "small" | "div" | "code";

export type TextVariant = "body" | "label" | "caption" | "emphasis" | "code";

/** `lg`, `base` and `sm` for body and caption. `base`, `sm` and `xs` for code. */
export type TextSize = "lg" | "base" | "sm" | "xs";

export type TextWeight = "regular" | "medium" | "semibold";

export type TextTone = "default" | "muted" | "subtle" | "brand" | "success" | "warning" | "info" | "danger";

const defaultElement: Record<TextVariant, TextElement> = {
  body: "p",
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
  /**
   * Size within the variant: body is 18px (`lg`), 15px (`base`) or 13px (`sm`); caption is 12px, 11px or 10px;
   * code is 14px (`base`), 13px (`sm`) or 12px (`xs`). Ignored by `label` and `emphasis`.
   * @default "base"
   */
  size?: TextSize;
  /** Font weight. Only three exist; there is no light. Defaults to the variant's own weight. */
  weight?: TextWeight;
  /** Set to `uppercase` for small uppercase captions. @default "normal" */
  casing?: "normal" | "uppercase";
  /** Text color from the semantic color tokens. @default "default" */
  tone?: TextTone;
} & Omit<ComponentProps<T>, "as" | "color">;

/**
 * Body-level text: paragraphs, labels, captions and inline code.
 * For headings use `Heading`; for links use `Link`.
 *
 * @example
 * <Text>Default paragraph.</Text>
 * <Text size="lg">Large body text</Text>
 * <Text variant="caption" tone="muted">Helper text</Text>
 * <Text as="label" htmlFor="email" variant="label">Email</Text>
 */
export function Text<T extends TextElement = "p">({
  as,
  variant = "body",
  size = "base",
  weight,
  casing = "normal",
  tone = "default",
  className,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? defaultElement[variant]) as ElementType<{ className?: string }>;
  return (
    <Component
      className={cx(
        styles.text,
        styles[variant === "label" || variant === "emphasis" ? variant : `${variant}-${size}`],
        weight && styles[`weight-${weight}`],
        casing === "uppercase" && styles.uppercase,
        styles[`tone-${tone}`],
        className,
      )}
      {...(rest as Record<string, unknown>)}
    />
  );
}
