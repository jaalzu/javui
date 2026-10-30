"use client";

import { createContext, useContext, type ReactNode } from "react";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import { FieldError } from "../Field/FieldError";
import type { FieldErrorProp } from "../Field/fieldErrors";
import { useControlValidation } from "../Field/useControlValidation";
import fieldStyles from "../Field/Field.module.css";
import radioStyles from "../Radio/Radio.module.css";
import styles from "./Checkbox.module.css";

type CheckboxGroupControlState = {
  /** Group-level read-only state that each Checkbox inherits. */
  readOnly: boolean;
};

const CheckboxGroupControlContext =
  createContext<CheckboxGroupControlState | null>(null);

/** Reads the group state provided by `CheckboxGroup`; returns `null` outside one. */
export function useCheckboxGroupControlState() {
  return useContext(CheckboxGroupControlContext);
}

export type CheckboxGroupProps = {
  /** Visible group label, rendered as the `legend` of a `fieldset`. Required: the group needs a name. */
  legend: ReactNode;
  /** The `Checkbox` options. */
  children: ReactNode;
  /**
   * Error message. Marks the group invalid and links the message with `aria-describedby`.
   * Inside `Field`, omit it and pass `error` to the Field instead.
   */
  error?: FieldErrorProp;
  /**
   * The group must include at least one ticked option before the form can be submitted.
   * The legend prints "Required". Inside `Field`, omit it and pass `required` to the Field.
   * @default false
   */
  required?: boolean;
  /**
   * The group can be focused and read but not changed. Keeps the options at full contrast.
   * Distinct from `disabled`. @default false
   */
  readOnly?: boolean;
  /**
   * Shows a small spinner next to the legend, sets `aria-busy`, and makes the group not
   * interactive. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseCheckboxGroup.Props, "className" | "children" | "color">;

/**
 * A group of checkboxes that share a name, rendered as a `fieldset` with a `legend` and driven
 * by Base UI CheckboxGroup. Use `allValues` with a `Checkbox` marked `parent` for a working
 * "Select all"; the parent goes indeterminate while only some options are ticked.
 * Inside `Field` it inherits `error`, `required`, `readOnly` and `loading`.
 *
 * @example
 * <CheckboxGroup legend="Notifications">
 *   <Checkbox label="Email" value="email" />
 *   <Checkbox label="SMS" value="sms" />
 * </CheckboxGroup>
 * <CheckboxGroup legend="Notifications" defaultValue={["email"]} allValues={["email", "sms"]}>
 *   <Checkbox label="Select all" parent />
 *   <Checkbox label="Email" value="email" />
 *   <Checkbox label="SMS" value="sms" />
 * </CheckboxGroup>
 */
export function CheckboxGroup({
  legend,
  children,
  className,
  error,
  required: requiredProp,
  readOnly: readOnlyProp,
  loading: loadingProp,
  ...rest
}: CheckboxGroupProps) {
  const state = useControlValidation({
    error,
    required: requiredProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
  });
  const groupReadOnly = state.readOnly || state.loading;

  return (
    <>
      <CheckboxGroupControlContext.Provider value={{ readOnly: groupReadOnly }}>
        <BaseCheckboxGroup
          {...rest}
          render={<fieldset />}
          className={cx(radioStyles.group, className)}
          aria-busy={state.loading || undefined}
          aria-invalid={state.invalid || undefined}
          aria-required={state.required || undefined}
          aria-readonly={state.readOnly || undefined}
          aria-describedby={state.describedBy}
          data-readonly={state.readOnly ? "" : undefined}
          data-loading={state.loading ? "" : undefined}
          data-invalid={state.invalid ? "" : undefined}
        >
          <legend className={radioStyles.legend}>
            {legend}
            {state.showRequired ? (
              <>
                {" "}
                <span className={fieldStyles.required}>Required</span>
              </>
            ) : null}
            {state.loading ? (
              <Spinner
                size="sm"
                label=""
                role="presentation"
                aria-hidden="true"
                className={radioStyles.spinner}
              />
            ) : null}
          </legend>
          <div className={styles.options}>{children}</div>
        </BaseCheckboxGroup>
      </CheckboxGroupControlContext.Provider>
      {state.showError && state.errors.length ? (
        <FieldError id={state.errorId} errors={state.errors} />
      ) : null}
    </>
  );
}
