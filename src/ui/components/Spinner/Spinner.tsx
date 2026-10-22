import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Spinner.module.css";

export type SpinnerProps = {
  /** Text announced to screen readers. @default "Loading" */
  label?: string;
  /** Size relative to the surrounding text. @default "md" */
  size?: "sm" | "md" | "lg";
} & Omit<ComponentProps<"span">, "color" | "children">;

/**
 * Indeterminate loading indicator. Announces `label` through a status region. An empty label makes
 * it decorative: no status role, no hidden text, and `aria-hidden="true"`.
 * Respects `prefers-reduced-motion` by slowing the spin instead of stopping it.
 *
 * @example
 * <Spinner label="Saving changes" />
 * <Spinner label="" />
 */
export function Spinner({ label = "Loading", size = "md", className, ...rest }: SpinnerProps) {
  const hasLabel = label.trim().length > 0;
  return (
    <span
      {...rest}
      role={hasLabel ? "status" : undefined}
      aria-hidden={hasLabel ? undefined : true}
      className={cx(styles.spinner, styles[size], className)}
    >
      <svg className={styles.svg} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle className={styles.track} cx="12" cy="12" r="9" strokeWidth="3" />
        <path className={styles.arc} d="M21 12a9 9 0 0 0-9-9" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {hasLabel ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </span>
  );
}
