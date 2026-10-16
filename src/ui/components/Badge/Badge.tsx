import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import styles from "./Badge.module.css";

export type BadgeTone =
  "neutral" | "accent" | "success" | "warning" | "info" | "danger";
export type BadgeVariant = "subtle" | "solid" | "outline";

export type BadgeProps = {
  /** Meaning of the badge. Conveyed by tint, never by color alone: always include text. @default "neutral" */
  tone?: BadgeTone;
  /** Visual weight. `subtle` is a tinted pill, `solid` a filled one, `outline` only a border. @default "subtle" */
  variant?: BadgeVariant;
  /** Shows a spinner before the text, for statuses that are still in progress. @default false */
  loading?: boolean;
} & Omit<ComponentProps<"span">, "color">;

/**
 * Small status label. Text is always the primary signal; the tone is reinforcement.
 * Put an `<svg>` icon as the first or last child to add an icon.
 *
 * @example
 * <Badge tone="success">Active</Badge>
 * <Badge tone="info" loading>Syncing</Badge>
 */
export function Badge({
  tone = "neutral",
  variant = "subtle",
  loading = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(
        styles.badge,
        styles[tone],
        variant !== "subtle" && styles[variant],
        className,
      )}
      {...rest}
    >
      {loading && (
        <Spinner size="sm" label="" role="presentation" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
