"use client";

import { useMemo, useRef, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cx } from "../../utils/cx";
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "../Button";
import { useFieldControlState } from "../Field/FieldContext";
import { Spinner } from "../Spinner";
import { InputGroupContext, useInputGroup, type InputGroupState } from "./InputGroupContext";
import styles from "./InputGroup.module.css";

const INTERACTIVE = 'button, a, input, select, textarea, [role="button"], [tabindex]';

export type InputGroupProps = {
  /** Control height: `xs` 1.5rem, `sm` 1.75rem, `md` 2rem, `lg` 2.5rem. Flows to every part. @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Shows a spinner after the last addon, marks the input `aria-busy` and makes it not editable.
   * Inside `Field`, omit it and pass `loading` to the Field instead. @default false
   */
  loading?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "className" | "children">;

/**
 * Text input with addons (icons, text, buttons, keyboard hints) inside one bordered control.
 * The border, background, hover, focus ring, invalid, disabled and read-only states live on the group;
 * `InputGroupInput` is the borderless input inside it. Invalid, disabled, required and read-only come
 * from `Field` exactly as they do for `Input`.
 *
 * Put `InputGroupInput` first in the DOM and the addons after it. Visual order comes from `align`, so
 * keyboard order stays input, then buttons. For a plain icon use `Input` with `startIcon`/`endIcon`.
 *
 * Styling hooks: `--input-radius` (default `--radius-md`) and `--input-px` (default `--space-3`).
 *
 * @example
 * <Field label="Search">
 *   <InputGroup>
 *     <InputGroupInput type="search" />
 *     <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
 *   </InputGroup>
 * </Field>
 * <Field label="Website" description="Without the protocol.">
 *   <InputGroup>
 *     <InputGroupInput />
 *     <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
 *     <InputGroupAddon align="end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
 *   </InputGroup>
 * </Field>
 */
export function InputGroup({
  size = "md",
  loading: loadingProp,
  className,
  children,
  onMouseDown,
  ...rest
}: InputGroupProps) {
  const field = useFieldControlState();
  const loading = loadingProp ?? field?.loading ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const value = useMemo<InputGroupState>(() => ({ size, loading }), [size, loading]);

  // Pointer convenience only: a click on padding or on non-interactive addon content focuses the input.
  // Keyboard users reach the input directly, so nothing is lost without this handler.
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    onMouseDown?.(event);
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    const interactive = target.closest(INTERACTIVE);
    if (interactive && ref.current?.contains(interactive) && interactive !== ref.current) return;
    const control = ref.current?.querySelector<HTMLElement>('[data-slot="input-group-control"]');
    if (!control) return;
    event.preventDefault();
    control.focus();
  }

  return (
    <InputGroupContext.Provider value={value}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- see handleMouseDown */}
      <div
        {...rest}
        ref={ref}
        className={cx(styles.group, className)}
        data-size={size}
        data-loading={loading ? "" : undefined}
        onMouseDown={handleMouseDown}
      >
        {children}
        {loading ? (
          <span className={styles.spinner}>
            <Spinner size="sm" label="" />
          </span>
        ) : null}
      </div>
    </InputGroupContext.Provider>
  );
}

export type InputGroupInputProps = {
  className?: string;
} & Omit<BaseInput.Props, "className" | "size" | "color">;

/**
 * The input of an `InputGroup`: borderless and transparent, with the same text styles as `Input`.
 * Inherits `required`, `readOnly` and `loading` from the group and `Field`. Needs an accessible name
 * (`Field label` or `aria-label`).
 *
 * @example
 * <InputGroupInput aria-label="Amount" inputMode="decimal" />
 */
export function InputGroupInput({
  readOnly: readOnlyProp,
  required: requiredProp,
  className,
  ...rest
}: InputGroupInputProps) {
  const field = useFieldControlState();
  const group = useInputGroup();
  const loading = group?.loading ?? field?.loading ?? false;
  const readOnly = readOnlyProp ?? field?.readOnly ?? false;
  const required = requiredProp ?? field?.required ?? false;

  return (
    <BaseInput
      data-slot="input-group-control"
      className={cx(styles.control, className)}
      readOnly={readOnly || loading}
      required={required}
      aria-busy={loading || undefined}
      data-readonly={readOnly ? "" : undefined}
      data-loading={loading ? "" : undefined}
      {...rest}
    />
  );
}

export type InputGroupAddonProps = {
  /** Which side of the input it sits on. Visual only; keep it after the input in the DOM. @default "start" */
  align?: "start" | "end";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"span">, "className" | "children">;

/**
 * Holds icons, `InputGroupText`, `InputGroupButton` or a keyboard hint beside the input. Icons passed
 * directly are sized by the group. Text that names the value ("USD", ".com") is not read when the input
 * is focused, so also say it in the `Field` label or description.
 *
 * @example
 * <InputGroupAddon align="end"><InputGroupText>USD</InputGroupText></InputGroupAddon>
 */
export function InputGroupAddon({ align = "start", className, children, ...rest }: InputGroupAddonProps) {
  return (
    <span {...rest} className={cx(styles.addon, className)} data-align={align}>
      {children}
    </span>
  );
}

/**
 * Plain text inside an addon: a prefix, suffix or unit.
 *
 * @example
 * <InputGroupText>https://</InputGroupText>
 */
export function InputGroupText({ className, ...rest }: ComponentProps<"span">) {
  return <span {...rest} className={cx(styles.text, className)} />;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type InputGroupButtonProps = DistributiveOmit<ButtonProps, "variant" | "pill"> & {
  /** @default "ghost" */
  variant?: Extract<ButtonVariant, "primary" | "ghost" | "secondary">;
};

const BUTTON_SIZE: Record<InputGroupState["size"], ButtonSize> = { xs: "xs", sm: "xs", md: "sm", lg: "md" };

/**
 * A `Button` sized for the group. Icon-only buttons need `aria-label` (change it when the state
 * changes, e.g. "Show password" / "Hide password").
 *
 * @example
 * <InputGroupButton aria-label="Clear" startIcon={<XIcon />} onClick={clear} />
 * <InputGroupButton variant="secondary">Copy</InputGroupButton>
 */
export function InputGroupButton({ variant = "ghost", size, className, ...rest }: InputGroupButtonProps) {
  const group = useInputGroup();
  return (
    <Button
      {...(rest as ButtonProps)}
      variant={variant}
      size={size ?? BUTTON_SIZE[group?.size ?? "md"]}
      className={cx(styles.button, className)}
    />
  );
}
