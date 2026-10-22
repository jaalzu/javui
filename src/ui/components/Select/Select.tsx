"use client";

import type { ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import { CaretDownIcon, CheckIcon } from "../../icons/icons.generated";
import styles from "./Select.module.css";

export type SelectItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  /** The options. Each has a machine `value` and a visible `label`. */
  items: SelectItem[];
  /** Text shown when nothing is selected. */
  placeholder?: string;
  /**
   * Visible label. Provide it, or `aria-label`, or put the Select inside `Field`:
   * every control needs an accessible name.
   */
  label?: string;
  /** Accessible name when there is no visible label. */
  "aria-label"?: string;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon before the value. Pass a generated icon without `size`; the select sizes it. */
  startIcon?: ReactNode;
  /** Icon after the value, before the caret. Pass a generated icon without `size`; the select sizes it. */
  endIcon?: ReactNode;
  /** Story/test hook: force the focus ring without moving focus. */
  "data-force"?: "focus";
  /**
   * Shows a small spinner at the end and makes the select not editable. `aria-busy` is set.
   * Inside `Field`, omit it and pass `loading` to the Field instead. @default false
   */
  loading?: boolean;
  className?: string;
} & Pick<
  BaseSelect.Root.Props<string, false>,
  "value" | "defaultValue" | "onValueChange" | "name" | "disabled" | "required" | "readOnly" | "id"
>;

/**
 * A custom select, built on Base UI Select (keyboard, typeahead, focus and form value come from there).
 * Pass `items` instead of composing parts. Inside `Field` it inherits `required`, `readOnly` and `loading`.
 *
 * @example
 * <Select label="Country" placeholder="Choose one" items={[{ value: "ar", label: "Argentina" }]} />
 * <Field label="Role" required><Select items={roles} /></Field>
 */
export function Select({
  items,
  placeholder,
  label,
  "aria-label": ariaLabel,
  size = "md",
  startIcon,
  endIcon,
  loading: loadingProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  "data-force": dataForce,
  className,
  ...rest
}: SelectProps) {
  const field = useFieldControlState();
  const loading = loadingProp ?? field?.loading ?? false;
  const readOnly = readOnlyProp ?? field?.readOnly ?? false;
  const required = requiredProp ?? field?.required ?? false;
  const position = getIconSlots({
    startIcon,
    endIcon,
    loading,
    loadingPosition: "end",
  });

  return (
    <BaseSelect.Root
      items={items}
      readOnly={readOnly || loading}
      required={required}
      {...rest}
    >
      <div className={cx(styles.wrapper, className)}>
        {label ? <BaseSelect.Label className={styles.label}>{label}</BaseSelect.Label> : null}
        <BaseSelect.Trigger
          className={cx(styles.trigger, styles[size])}
          aria-label={ariaLabel}
          aria-busy={loading || undefined}
          data-force={dataForce}
          data-icon={position}
          data-readonly={readOnly ? "" : undefined}
          data-loading={loading ? "" : undefined}
        >
          <IconSlot>{startIcon}</IconSlot>
          <BaseSelect.Value className={styles.value} placeholder={placeholder} />
          {loading ? (
            <span className={styles.spinnerSlot}>
              <Spinner
                size="sm"
                label=""
                role="presentation"
                aria-hidden="true"
              />
            </span>
          ) : (
            <IconSlot>{endIcon}</IconSlot>
          )}
          <BaseSelect.Icon className={styles.icon}>
            <CaretDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </div>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className={styles.positioner} sideOffset={4} alignItemWithTrigger={false}>
          <BaseSelect.Popup className={styles.popup}>
            <BaseSelect.List className={styles.list}>
              {items.map((item) => (
                <BaseSelect.Item key={item.value} value={item.value} disabled={item.disabled} className={styles.item}>
                  <BaseSelect.ItemIndicator className={styles.itemIndicator}>
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className={styles.itemText}>{item.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
