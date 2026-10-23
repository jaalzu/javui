"use client";

import { useId, type ReactNode } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../../utils/cx";
import { IconSlot } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import { CaretDownIcon, CheckIcon, XIcon } from "../../icons/icons.generated";
import styles from "./Combobox.module.css";

export type ComboboxOption = {
  /** Value stored in the form and passed to `onValueChange`. */
  value: string;
  /** Visible label and the text used for filtering. */
  label: string;
  /** Optional second line under the label. */
  description?: string;
  /** Icon before the label. Pass a generated icon without `size`; the item sizes it. */
  startIcon?: ReactNode;
  disabled?: boolean;
};

export type ComboboxProps = {
  /** The options, in order. */
  items: ComboboxOption[];
  /** Visible label. Provide it, or `aria-label`, or put the Combobox inside `Field`. */
  label?: string;
  /** Accessible name when there is no visible label. */
  "aria-label"?: string;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Message shown when the filter has no matches. @default "No results." */
  emptyMessage?: string;
  /** Selected value, when controlled. */
  value?: string;
  /** Initially selected value, when uncontrolled. */
  defaultValue?: string;
  /** Called with the selected value, or an empty string when cleared. */
  onValueChange?: (value: string) => void;
  /** Submitted with the form. */
  name?: string;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon before the input. Pass a generated icon without `size`; the field sizes it. */
  startIcon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /**
   * Shows a small spinner, marks the field busy and makes it not editable.
   * Inside `Field`, omit it and pass `loading` to the Field instead. @default false
   */
  loading?: boolean;
  /** Story/test hook: force the focus ring without moving focus. */
  "data-force"?: "focus";
  id?: string;
  className?: string;
};

/**
 * A searchable single-choice field built on Base UI Combobox (filtering, keyboard navigation,
 * focus and form value come from there). Pass `items` instead of composing parts.
 * Inside `Field` it inherits `required`, `readOnly` and `loading`.
 *
 * @example
 * <Combobox
 *   label="Assignee"
 *   placeholder="Search people"
 *   items={[
 *     { value: "ada", label: "Ada Lovelace", description: "Engineering" },
 *     { value: "grace", label: "Grace Hopper", description: "Research" },
 *   ]}
 * />
 */
export function Combobox({
  items,
  label,
  "aria-label": ariaLabel,
  placeholder,
  emptyMessage = "No results.",
  value,
  defaultValue,
  onValueChange,
  name,
  size = "md",
  startIcon,
  disabled = false,
  required: requiredProp = false,
  readOnly: readOnlyProp = false,
  loading: loadingProp = false,
  "data-force": dataForce,
  id,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const field = useFieldControlState();
  const loading = loadingProp || field?.loading || false;
  const readOnly = readOnlyProp || field?.readOnly || false;
  const required = requiredProp || field?.required || false;
  const selected = value === undefined ? undefined : value ? items.find((item) => item.value === value) ?? null : null;
  const initial = defaultValue === undefined ? undefined : defaultValue ? items.find((item) => item.value === defaultValue) ?? null : null;

  return (
    <BaseCombobox.Root
      items={items}
      value={selected}
      defaultValue={initial}
      onValueChange={onValueChange ? (item) => onValueChange(item?.value ?? "") : undefined}
      name={name}
      disabled={disabled || loading}
      readOnly={readOnly || loading}
      required={required}
      id={inputId}
    >
      <div className={cx(styles.wrapper, className)}>
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required ? <span className={styles.required}>Required</span> : null}
          </label>
        ) : null}
        <BaseCombobox.InputGroup
          className={cx(styles.group, styles[size])}
          data-force={dataForce}
          data-invalid={field?.invalid ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          data-loading={loading ? "" : undefined}
          data-disabled={disabled ? "" : undefined}
        >
          <IconSlot className={styles.lead}>{startIcon}</IconSlot>
          <BaseCombobox.Input
            className={styles.input}
            id={inputId}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-busy={loading || undefined}
            disabled={disabled || loading}
          />
          {loading ? (
            <span className={styles.loading}>
              <Spinner size="sm" label="" />
            </span>
          ) : (
            <>
              <BaseCombobox.Clear className={styles.action} aria-label="Clear selection">
                <XIcon />
              </BaseCombobox.Clear>
              <BaseCombobox.Trigger className={styles.action} aria-label="Open list">
                <CaretDownIcon />
              </BaseCombobox.Trigger>
            </>
          )}
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={4} align="start" className={styles.positioner}>
          <BaseCombobox.Popup className={styles.popup}>
            <BaseCombobox.Empty className={styles.empty}>{emptyMessage}</BaseCombobox.Empty>
            <BaseCombobox.List className={styles.list}>
              {(item: ComboboxOption) => (
                <BaseCombobox.Item
                  key={item.value}
                  value={item}
                  disabled={item.disabled}
                  className={styles.item}
                  data-icon={item.startIcon ? "start" : undefined}
                >
                  <IconSlot className={styles.itemIcon}>{item.startIcon}</IconSlot>
                  <span className={styles.itemText}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    {item.description ? <span className={styles.itemDescription}>{item.description}</span> : null}
                  </span>
                  <BaseCombobox.ItemIndicator className={styles.indicator}>
                    <CheckIcon />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
