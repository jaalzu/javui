import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cx } from "../../utils/cx";
import styles from "./Progress.module.css";

export type ProgressProps = {
  /** What is progressing. Required: it is the accessible name. */
  label: string;
  /** Current value. Use `null` when the amount is unknown (indeterminate). */
  value: number | null;
  /** Maximum value. @default 100 */
  max?: number;
  /** Show the percentage next to the label. @default true */
  showValue?: boolean;
  className?: string;
};

/**
 * Progress of a task, built on Base UI Progress (`role="progressbar"` with `aria-valuenow`).
 * For a quick wait with no known end, prefer `Spinner`; for a value the user sets, use `Slider`.
 *
 * @example
 * <Progress label="Uploading" value={40} />
 */
export function Progress({ label, value, max = 100, showValue = true, className }: ProgressProps) {
  return (
    <BaseProgress.Root className={cx(styles.root, className)} value={value} max={max}>
      <div className={styles.row}>
        <BaseProgress.Label className={styles.label}>{label}</BaseProgress.Label>
        {showValue && <BaseProgress.Value className={styles.value} />}
      </div>
      <BaseProgress.Track className={styles.track}>
        <BaseProgress.Indicator className={styles.indicator} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
