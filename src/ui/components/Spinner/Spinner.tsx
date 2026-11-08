import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Spinner.module.css";

export type SpinnerProps = {
  /** Text announced to screen readers. @default "Loading" */
  label?: string;
  /** Diameter: `xs` 12px, `sm` 16px, `md` 20px, `lg` 24px, `xl` 32px. @default "md" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
} & Omit<ComponentProps<"span">, "color" | "children">;

/** Twelve bars, one per position, light up in sequence to form a rotating trail. */
const BARS = 12;

/**
 * Indeterminate loading indicator. Twelve thick bars sit around a circle and light up in
 * sequence, leaving a fading trail that reads as rotation.
 *
 * Use it only when the wait is expected to last more than a second; for shorter operations it
 * appears and disappears too fast to help. Use `Skeleton` instead when the shape of the incoming
 * content is known, and `Progress` when the completion percentage is known.
 *
 * It paints with `currentColor`, so it inherits the surrounding text color. Announces `label`
 * through a status region. An empty label makes it decorative: no status role, no hidden text,
 * and `aria-hidden="true"`. Respects `prefers-reduced-motion` by slowing the sequence down.
 *
 * @example
 * <Spinner label="Saving changes" />
 * <Spinner size="sm" label="Uploading" />
 * <Spinner label="" />
 */
export function Spinner({
  label = "Loading",
  size = "md",
  className,
  ...rest
}: SpinnerProps) {
  const hasLabel = label.trim().length > 0;
  return (
    <span
      {...rest}
      role={hasLabel ? "status" : undefined}
      aria-hidden={hasLabel ? undefined : true}
      className={cx(styles.spinner, styles[size], className)}
    >
      <span className={styles.bars} aria-hidden="true">
        {Array.from({ length: BARS }, (_, index) => (
          <span key={index} className={styles.bar} />
        ))}
      </span>
      {hasLabel ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </span>
  );
}
