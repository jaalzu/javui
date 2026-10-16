import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cx } from "../../utils/cx";
import styles from "./Slider.module.css";

export type SliderProps = {
  /** What the slider sets. Required: it is the accessible name. */
  label: string;
  /** Initial value, or `[min, max]` for a range. */
  defaultValue?: number | number[];
  /** Controlled value, or `[min, max]` for a range. */
  value?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Names of the thumbs of a range, for example `["Minimum price", "Maximum price"]`. */
  thumbLabels?: string[];
  /** Show the current value next to the label. @default true */
  showValue?: boolean;
  className?: string;
};

/**
 * Pick a number, or a range, by dragging or with arrow keys. Built on Base UI Slider (each thumb is an
 * `input type="range"`). For a short list of exact choices use `Select`; for typing a number, use `Input`.
 *
 * @example
 * <Slider label="Volume" defaultValue={40} />
 * <Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />
 */
export function Slider({ label, thumbLabels, showValue = true, className, defaultValue, ...rest }: SliderProps) {
  const initial = rest.value === undefined ? (defaultValue ?? 0) : undefined;
  const current = rest.value ?? initial;
  const range = Array.isArray(current);
  const count = Array.isArray(current) ? current.length : 1;
  return (
    <BaseSlider.Root className={cx(styles.root, className)} defaultValue={initial} {...rest}>
      <div className={styles.row}>
        <BaseSlider.Label className={styles.label}>{label}</BaseSlider.Label>
        {showValue && <BaseSlider.Value className={styles.value} />}
      </div>
      <BaseSlider.Control className={styles.control}>
        <BaseSlider.Track className={styles.track}>
          <BaseSlider.Indicator className={styles.indicator} />
          {Array.from({ length: count }, (_, i) => (
            <BaseSlider.Thumb
              key={i}
              index={range ? i : undefined}
              aria-label={range ? (thumbLabels?.[i] ?? `${label} ${i === 0 ? "minimum" : "maximum"}`) : undefined}
              className={styles.thumb}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
