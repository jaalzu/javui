"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../../utils/cx";
import { IconSlot } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import { useFieldControlState } from "../Field/FieldContext";
import { CaretDownIcon, CheckIcon, XIcon } from "../../icons/icons.generated";
import controlStyles from "./Combobox.module.css";
import popupStyles from "./ComboboxPopup.module.css";

export type ComboboxOption = {
  value: string;
  label: string;
  description?: string;
  group?: string;
  startIcon?: ReactNode;
  disabled?: boolean;
};

type BaseProps = {
  /** The options. Each has a machine `value` and a visible `label`. */
  items: ComboboxOption[];
  /** Accessible name when there is no `Field` label. */
  "aria-label"?: string;
  placeholder?: string;
  /** Text shown when the filter matches nothing. @default "No results." */
  emptyMessage?: string;
  name?: string;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: "sm" | "md" | "lg";
  startIcon?: ReactNode;
  /** End icon. Omit for the caret, `null` to hide it. */
  icon?: ReactNode | null;
  /** Shows a button to clear the selection. @default false */
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** Shows a spinner and blocks editing. Inside `Field`, pass it to the Field. */
  loading?: boolean;
  id?: string;
  className?: string;
};

export type ComboboxProps = BaseProps &
  (
    | {
        multiple?: false;
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
      }
    | {
        multiple: true;
        value?: string[];
        defaultValue?: string[];
        onValueChange?: (value: string[]) => void;
      }
  );

const getValue = (item: ComboboxOption) => item.value;

function ComboboxItem({ item }: { item: ComboboxOption }) {
  return (
    <BaseCombobox.Item
      value={item}
      disabled={item.disabled}
      className={popupStyles.item}
    >
      <IconSlot className={popupStyles.itemIcon}>{item.startIcon}</IconSlot>
      <span className={popupStyles.itemText}>
        <span className={popupStyles.itemLabel}>{item.label}</span>
        {item.description ? (
          <span className={popupStyles.itemDescription}>
            {item.description}
          </span>
        ) : null}
      </span>
      <BaseCombobox.ItemIndicator className={popupStyles.indicator}>
        <CheckIcon />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

function ComboboxList({ items }: { items: ComboboxOption[] }) {
  const groups = new Map<string, ComboboxOption[]>();
  for (const item of items) {
    const key = item.group ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return (
    <>
      {[...groups].map(([group, groupItems]) =>
        group ? (
          <BaseCombobox.Group key={group} items={groupItems}>
            <BaseCombobox.GroupLabel className={popupStyles.groupLabel}>
              {group}
            </BaseCombobox.GroupLabel>
            {groupItems.map((item) => (
              <ComboboxItem key={item.value} item={item} />
            ))}
          </BaseCombobox.Group>
        ) : (
          groupItems.map((item) => (
            <ComboboxItem key={item.value} item={item} />
          ))
        ),
      )}
    </>
  );
}

/** Searchable single- or multi-choice field. Labels come from `Field`. */
export function Combobox(props: ComboboxProps) {
  const {
    items,
    placeholder,
    emptyMessage = "No results.",
    name,
    size = "md",
    startIcon,
    icon,
    clearable = false,
    className,
    id,
    "aria-label": ariaLabel,
  } = props;

  const field = useFieldControlState();
  const generatedId = useId();
  const groupRef = useRef<HTMLDivElement>(null);

  const multiple = props.multiple === true;
  const loading = props.loading || field?.loading || false;
  const disabled = props.disabled || loading;
  const readOnly = props.readOnly || field?.readOnly || loading;
  const required = props.required || field?.required || false;
  const invalid = Boolean(field?.invalid);
  const endIcon = icon === undefined ? <CaretDownIcon /> : icon;

  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" &&
      !field?.hasLabel &&
      !ariaLabel
    ) {
      console.warn("Combobox needs a Field label or aria-label.");
    }
  }, [field?.hasLabel, ariaLabel]);

  const toOption = (value?: string) =>
    items.find((item) => item.value === value) ?? null;
  const toOptions = (values?: string[]) =>
    items.filter((item) => values?.includes(item.value));
  const mapValue = (value?: string | string[]) =>
    multiple
      ? toOptions(value as string[] | undefined)
      : toOption(value as string | undefined);

  const handleValueChange = (
    next: ComboboxOption[] | ComboboxOption | null,
  ) => {
    const onChange = props.onValueChange as
      ((value: string | string[]) => void) | undefined;
    onChange?.(Array.isArray(next) ? next.map(getValue) : (next?.value ?? ""));
  };

  const valueProps =
    props.value !== undefined
      ? { value: mapValue(props.value) }
      : { defaultValue: mapValue(props.defaultValue) };

  const markPointer = () =>
    groupRef.current?.setAttribute("data-pointer-action", "");
  const clearPointer = () =>
    groupRef.current?.removeAttribute("data-pointer-action");

  return (
    <BaseCombobox.Root
      items={items}
      multiple={multiple}
      itemToStringValue={getValue}
      onValueChange={handleValueChange as never}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoHighlight
      {...valueProps}
    >
      <div className={cx(controlStyles.wrapper, className)}>
        <BaseCombobox.InputGroup
          ref={groupRef}
          className={cx(
            controlStyles.group,
            controlStyles[size],
            multiple && controlStyles.multiple,
          )}
          data-invalid={invalid ? "" : undefined}
          data-readonly={readOnly ? "" : undefined}
          data-loading={loading ? "" : undefined}
          data-disabled={disabled ? "" : undefined}
        >
          <IconSlot className={controlStyles.lead}>{startIcon}</IconSlot>

          {multiple ? (
            <BaseCombobox.Chips className={controlStyles.chips}>
              <BaseCombobox.Value>
                {(values: ComboboxOption[]) =>
                  values.map((item) => (
                    <BaseCombobox.Chip
                      key={item.value}
                      className={controlStyles.chip}
                    >
                      {item.label}
                      {!readOnly ? (
                        <BaseCombobox.ChipRemove
                          className={controlStyles.chipRemove}
                          aria-label={`Remove ${item.label}`}
                        >
                          <XIcon />
                        </BaseCombobox.ChipRemove>
                      ) : null}
                    </BaseCombobox.Chip>
                  ))
                }
              </BaseCombobox.Value>
            </BaseCombobox.Chips>
          ) : null}

          <BaseCombobox.Input
            className={controlStyles.input}
            id={id ?? generatedId}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-busy={loading || undefined}
            disabled={disabled}
            onBlur={clearPointer}
            onKeyDown={clearPointer}
          />

          {loading ? (
            <span className={controlStyles.loading}>
              <Spinner size="sm" label="" />
            </span>
          ) : (
            <>
              {clearable ? (
                <BaseCombobox.Clear
                  className={controlStyles.action}
                  aria-label="Clear selection"
                  onPointerDown={markPointer}
                >
                  <XIcon />
                </BaseCombobox.Clear>
              ) : null}
              {endIcon !== null ? (
                <BaseCombobox.Trigger
                  className={cx(
                    controlStyles.action,
                    icon === undefined && controlStyles.chevronTrigger,
                  )}
                  aria-label="Open list"
                  onPointerDown={markPointer}
                >
                  {endIcon}
                </BaseCombobox.Trigger>
              ) : null}
            </>
          )}
        </BaseCombobox.InputGroup>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          sideOffset={4}
          align="start"
          className={popupStyles.positioner}
        >
          <BaseCombobox.Popup className={popupStyles.popup}>
            <BaseCombobox.Empty className={popupStyles.empty}>
              {emptyMessage}
            </BaseCombobox.Empty>
            <BaseCombobox.List className={popupStyles.list}>
              <ComboboxList items={items} />
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
