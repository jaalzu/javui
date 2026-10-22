"use client";

import { useCallback, type KeyboardEvent } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import styles from "./Slider.module.css";

const valueKeys = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);

export type SliderProps = {
  /** What the slider sets. Required: it is the accessible name. */
  label: string;
  /**
   * Error message. Marks the slider invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: string;
  /**
   * The slider must have a value before the form can be submitted. The label prints "Required".
   * Inside `Field`, omit it and pass `required` to the Field instead. @default false
   */
  required?: boolean;
  /**
   * The slider can be focused and read but not changed. Uses the sunken track and keeps the
   * label at full contrast. Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner next to the value, sets `aria-busy`, and makes the slider not
   * interactive. @default false
   */
  loading?: boolean;
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
  /** Story/test hook: force the focus ring without moving focus. */
  "data-force"?: "focus";
  className?: string;
};

/**
 * Pick a number, or a range, by dragging or with arrow keys. Built on Base UI Slider (each thumb is an
 * `input type="range"`). For a short list of exact choices use `Select`; for typing a number, use `Input`.
 * Inside `Field` it inherits `error`, `required`, `readOnly` and `loading`.
 *
 * @example
 * <Slider label="Volume" defaultValue={40} />
 * <Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum price", "Maximum price"]} />
 * <Slider label="Budget" error="Choose a budget" required />
 */
export function Slider({
  label,
  thumbLabels,
  showValue = true,
  className,
  defaultValue,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  "data-force": dataForce,
  ...rest
}: SliderProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });
  const blocked = state.readOnly || state.loading;
  const initial = rest.value === undefined ? (defaultValue ?? 0) : undefined;
  const current = rest.value ?? initial;
  const range = Array.isArray(current);
  const count = Array.isArray(current) ? current.length : 1;

  const setInputState = useCallback(
    (input: HTMLInputElement | null) => {
      if (!input) return;
      if (state.invalid) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
      if (state.required) input.setAttribute("aria-required", "true");
      else input.removeAttribute("aria-required");
      if (blocked) input.setAttribute("aria-readonly", "true");
      else input.removeAttribute("aria-readonly");
      if (state.loading) input.setAttribute("aria-busy", "true");
      else input.removeAttribute("aria-busy");
    },
    [blocked, state.invalid, state.loading, state.required],
  );

  const handleKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (blocked && valueKeys.has(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <BaseSlider.Root
        className={cx(styles.root, className)}
        defaultValue={initial}
        {...rest}
        data-readonly={state.readOnly ? "" : undefined}
        data-loading={state.loading ? "" : undefined}
        data-invalid={state.invalid ? "" : undefined}
        data-force={dataForce}
        aria-busy={state.loading || undefined}
        aria-invalid={state.invalid || undefined}
        onKeyDownCapture={handleKeyDownCapture}
      >
        <div className={styles.row}>
          <BaseSlider.Label className={styles.label}>
            {label}
            {state.showRequired ? (
              <>
                {" "}
                <span className={fieldStyles.required}>Required</span>
              </>
            ) : null}
          </BaseSlider.Label>
          <span className={styles.valueGroup}>
            {showValue ? <BaseSlider.Value className={styles.value} /> : null}
            {state.loading ? (
              <Spinner
                size="sm"
                label=""
                role="presentation"
                aria-hidden="true"
                className={styles.spinner}
              />
            ) : null}
          </span>
        </div>
        <BaseSlider.Control className={styles.control}>
          <BaseSlider.Track className={styles.track}>
            <BaseSlider.Indicator className={styles.indicator} />
            {Array.from({ length: count }, (_, i) => (
              <BaseSlider.Thumb
                key={i}
                index={range ? i : undefined}
                aria-label={range ? (thumbLabels?.[i] ?? `${label} ${i === 0 ? "minimum" : "maximum"}`) : undefined}
                aria-describedby={state.describedBy}
                inputRef={setInputState}
                className={styles.thumb}
              />
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
      {state.showError && state.error ? (
        <FieldError id={state.errorId}>{state.error}</FieldError>
      ) : null}
    </>
  );
}
