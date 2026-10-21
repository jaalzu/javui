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
 * Indeterminate loading indicator. Announces `label` through a status region.
 * Respects `prefers-reduced-motion` by slowing the spin instead of stopping it.
 *
 * @example
 * <Spinner label="Saving changes" />
 */
export function Spinner({ label = "Loading", size = "md", className, ...rest }: SpinnerProps) {
  return (
    <span role="status" className={cx(styles.spinner, styles[size], className)} {...rest}>
      <svg className={styles.svg} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle className={styles.track} cx="12" cy="12" r="9" strokeWidth="3" />
        <path className={styles.arc} d="M21 12a9 9 0 0 0-9-9" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
