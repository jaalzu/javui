"use client";

import type { ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import { CaretDownIcon, CheckIcon } from "../../icons/icons.generated";
import styles from "./Select.module.css";
import { useButtonGroupSize } from "../ButtonGroup/ButtonGroupContext";

export type SelectItem = {
  value: string;
  label: string;
  /** Supporting text shown below the option label. */
  description?: string;
  /** Optional group heading. Consecutive items with the same group share a section. */
  group?: string;
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
  /** Control height: `xs` 1.5rem, `sm` 1.75rem, `md` 2rem, `lg` 2.5rem. @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
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
 * Pass `items` instead of composing parts; items can include `description` and a `group` heading.
 * Groups are separated by space and a heading, never by a rule. Long lists keep a compact height
 * and hide the scrollbar. Inside `Field` it inherits `required`, `readOnly` and `loading`.
 * Icons follow the trigger size: xs 12px, sm 16px, md 20px, lg 24px.
 * The trigger keeps the shared control face while open, including when opened with a mouse.
 * When used inside `ButtonGroup`, omit `label` and provide `aria-label` so the visible label does
 * not become part of the group's control row.
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
  size: sizeProp,
  startIcon,
  endIcon,
  loading: loadingProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  "data-force": dataForce,
  className,
  ...rest
}: SelectProps) {
  const groupSize = useButtonGroupSize();
  const size = sizeProp ?? groupSize ?? "md";
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
          data-size={size}
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
          <BaseSelect.Popup className={styles.popup} data-size={size}>
            <BaseSelect.List className={styles.list}>{renderItems(items)}</BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function renderItems(items: SelectItem[]) {
  const chunks: Array<{ group?: string; items: SelectItem[] }> = [];
  for (const item of items) {
    const last = chunks[chunks.length - 1];
    if (last && last.group === item.group) last.items.push(item);
    else chunks.push({ group: item.group, items: [item] });
  }

  return chunks.map((chunk, index) => {
    const itemNodes = chunk.items.map((item) => (
      <BaseSelect.Item key={item.value} value={item.value} disabled={item.disabled} className={styles.item}>
        <BaseSelect.ItemText className={styles.itemText}>
          <span>{item.label}</span>
          {item.description ? <span className={styles.itemDescription}>{item.description}</span> : null}
        </BaseSelect.ItemText>
        <BaseSelect.ItemIndicator className={styles.itemIndicator}>
          <CheckIcon />
        </BaseSelect.ItemIndicator>
      </BaseSelect.Item>
    ));

    return (
      <BaseSelect.Group key={`${chunk.group ?? "ungrouped"}-${index}`} className={styles.group}>
        {chunk.group ? <BaseSelect.GroupLabel className={styles.groupLabel}>{chunk.group}</BaseSelect.GroupLabel> : null}
        {itemNodes}
      </BaseSelect.Group>
    );
  });
}
