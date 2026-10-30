"use client";

import { useId, useState, type ReactNode } from "react";
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
  /** Visible label and filtering text. */
  label: string;
  /** Optional second line under the label. */
  description?: string;
  /** Optional group heading. @default undefined */
  group?: string;
  /** Icon before the label. */
  startIcon?: ReactNode;
  disabled?: boolean;
};

type ComboboxSharedProps = {
  items: ComboboxOption[];
  label?: string;
  "aria-label"?: string;
  placeholder?: string;
  emptyMessage?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  startIcon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  "data-force"?: "focus";
  id?: string;
  className?: string;
};

export type ComboboxProps = ComboboxSharedProps & (
  | {
      /** Allow selecting multiple options. @default false */
      multiple?: false;
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    }
  | {
      /** Allow selecting multiple options. @default false
       * @example <Combobox multiple defaultValue={["ada", "grace"]} items={items} />
       */
      multiple: true;
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
);

/** Searchable single- or multi-choice field built on Base UI Combobox. */
export function Combobox(props: ComboboxProps) {
  const {
    items, label, "aria-label": ariaLabel, placeholder, emptyMessage = "No results.", name,
    size = "md", startIcon, disabled = false, required: requiredProp = false,
    readOnly: readOnlyProp = false, loading: loadingProp = false, "data-force": dataForce,
    id, className,
  } = props;
  const multiple = props.multiple === true;
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const field = useFieldControlState();
  const loading = loadingProp || field?.loading || false;
  const readOnly = readOnlyProp || field?.readOnly || false;
  const required = requiredProp || field?.required || false;
  const [internal, setInternal] = useState<string | string[]>(multiple ? (props.defaultValue ?? []) : (props.defaultValue ?? ""));
  const selectedValues = props.value ?? internal;
  const selectedItems = items.filter((item) => multiple ? (selectedValues as string[]).includes(item.value) : item.value === selectedValues);
  const selected = multiple ? selectedItems : selectedItems[0] ?? null;
  const initial = props.defaultValue === undefined ? undefined : multiple ? items.filter((item) => (props.defaultValue as string[]).includes(item.value)) : items.find((item) => item.value === props.defaultValue) ?? null;
  const emit = (next: unknown) => {
    const nextValue = multiple ? ((next as ComboboxOption[]).map((item) => item.value)) : ((next as ComboboxOption | null)?.value ?? "");
    if (props.value === undefined) setInternal(nextValue);
    if (multiple) (props.onValueChange as ((value: string[]) => void) | undefined)?.(nextValue as string[]);
    else (props.onValueChange as ((value: string) => void) | undefined)?.(nextValue as string);
  };
  const itemNode = (item: ComboboxOption) => (
    <BaseCombobox.Item key={item.value} value={item} disabled={item.disabled} className={styles.item} data-icon={item.startIcon ? "start" : undefined}>
      <IconSlot className={styles.itemIcon}>{item.startIcon}</IconSlot>
      <span className={styles.itemText}><span className={styles.itemLabel}>{item.label}</span>{item.description ? <span className={styles.itemDescription}>{item.description}</span> : null}</span>
      <BaseCombobox.ItemIndicator className={styles.indicator}><CheckIcon /></BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
  const grouped = items.some((item) => item.group);
  const list = grouped ? Array.from(new Set(items.map((item) => item.group ?? ""))).map((group) => group ? <BaseCombobox.Group key={group} items={items.filter((item) => item.group === group)}><BaseCombobox.GroupLabel className={styles.groupLabel}>{group}</BaseCombobox.GroupLabel>{items.filter((item) => item.group === group).map(itemNode)}</BaseCombobox.Group> : items.filter((item) => !item.group).map(itemNode)) : items.map(itemNode);

  return <BaseCombobox.Root items={items} multiple={multiple} value={selected} defaultValue={initial} onValueChange={emit as never} autoHighlight name={name} disabled={disabled || loading} readOnly={readOnly || loading} required={required}>
    <div className={cx(styles.wrapper, className)}>
      {label ? <label className={styles.label} htmlFor={inputId}>{label}{required ? <span className={styles.required}>Required</span> : null}</label> : null}
      <BaseCombobox.InputGroup className={cx(styles.group, styles[size], multiple && styles.multiple)} data-force={dataForce} data-invalid={field?.invalid ? "" : undefined} data-readonly={readOnly ? "" : undefined} data-loading={loading ? "" : undefined} data-disabled={disabled ? "" : undefined}>
        <IconSlot className={styles.lead}>{startIcon}</IconSlot>
        {multiple ? <BaseCombobox.Chips className={styles.chips}>{selectedItems.map((item) => <BaseCombobox.Chip key={item.value} className={styles.chip}>{item.label}{!readOnly && !loading ? <BaseCombobox.ChipRemove className={styles.chipRemove} aria-label={`Remove ${item.label}`}><XIcon /></BaseCombobox.ChipRemove> : null}</BaseCombobox.Chip>)}</BaseCombobox.Chips> : null}
        <BaseCombobox.Input className={styles.input} id={inputId} placeholder={selectedItems.length ? undefined : placeholder} aria-label={ariaLabel} aria-busy={loading || undefined} disabled={disabled || loading} />
        {loading ? <span className={styles.loading}><Spinner size="sm" label="" /></span> : <><BaseCombobox.Clear className={styles.action} aria-label="Clear selection"><XIcon /></BaseCombobox.Clear><BaseCombobox.Trigger className={styles.action} aria-label="Open list"><CaretDownIcon /></BaseCombobox.Trigger></>}
      </BaseCombobox.InputGroup>
    </div>
    <BaseCombobox.Portal><BaseCombobox.Positioner sideOffset={4} align="start" className={styles.positioner}><BaseCombobox.Popup className={styles.popup}><BaseCombobox.Empty className={styles.empty}>{emptyMessage}</BaseCombobox.Empty><BaseCombobox.List className={styles.list}>{list}</BaseCombobox.List></BaseCombobox.Popup></BaseCombobox.Positioner></BaseCombobox.Portal>
  </BaseCombobox.Root>;
}
