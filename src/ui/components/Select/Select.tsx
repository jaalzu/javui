import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../../utils/cx";
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
  /** Control height: `sm` 2rem, `md` 2.5rem, `lg` 3rem. @default "md" */
  size?: "sm" | "md" | "lg";
  className?: string;
} & Pick<
  BaseSelect.Root.Props<string, false>,
  "value" | "defaultValue" | "onValueChange" | "name" | "disabled" | "required" | "id"
>;

/**
 * A custom select, built on Base UI Select (keyboard, typeahead, focus and form value come from there).
 * Pass `items` instead of composing parts.
 *
 * @example
 * <Select label="Country" placeholder="Choose one" items={[{ value: "ar", label: "Argentina" }]} />
 */
export function Select({
  items,
  placeholder,
  label,
  "aria-label": ariaLabel,
  size = "md",
  className,
  ...rest
}: SelectProps) {
  return (
    <BaseSelect.Root items={items} {...rest}>
      <div className={cx(styles.wrapper, className)}>
        {label ? <BaseSelect.Label className={styles.label}>{label}</BaseSelect.Label> : null}
        <BaseSelect.Trigger className={cx(styles.trigger, styles[size])} aria-label={ariaLabel}>
          <BaseSelect.Value className={styles.value} placeholder={placeholder} />
          <BaseSelect.Icon className={styles.icon}>
            <CaretDownIcon size="sm" />
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
                    <CheckIcon size="sm" />
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
