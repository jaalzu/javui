import type { ReactNode } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "../../utils/cx";
import { IconSlot } from "../Icon/IconSlot";
import { iconPosition } from "../../utils/iconPosition";
import { Spinner } from "../Spinner";
import styles from "./Button.module.css";

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /**
   * Visual emphasis. `primary` is the main action (one per view), `secondary` for other actions,
   * `outline` for a transparent button with a visible border, `ghost` for low-emphasis actions,
   * `accent` for brand emphasis, `danger` for destructive actions.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /** Control height: `sm` 1.75rem, `md` 2.25rem, `lg` 2.75rem. @default "md" */
  size?: ButtonSize;
  /** Icon before the label. Pass a generated icon without `size`; the button sizes it. @default undefined */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the button sizes it. @default undefined */
  endIcon?: ReactNode;
  /**
   * Shows a spinner and ignores clicks while an action is running. The button keeps its label and stays
   * focusable, and `aria-busy` tells assistive technology it is working. @default false
   */
  loading?: boolean;
  className?: string;
} & Omit<BaseButton.Props, "className" | "color">;

/**
 * Displays an action button. It is built on Base UI Button, so keyboard, focus and disabled behavior come from there.
 * It defaults to `type="button"` so it never submits a form by accident; set `type="submit"` explicitly.
 * For navigation use `ButtonLink` or `Link`.
 * Put icons in `startIcon`/`endIcon`. An icon on its own is a valid button (`startIcon` + `aria-label`);
 * with a label the icon sits next to the text.
 *
 * @example
 * <Button>Save</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button variant="outline">Learn more</Button>
 * <Button type="submit">Send</Button>
 * <Button loading>Saving</Button>
 * <Button variant="secondary" startIcon={<CheckIcon />}>Done</Button>
 * <Button variant="outline" aria-label="Close" startIcon={<XIcon />} />
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  startIcon,
  endIcon,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const hasLabel =
    children !== undefined && children !== null && children !== false;
  const position = iconPosition({ startIcon, endIcon, loading, hasLabel });

  return (
    <BaseButton
      {...rest}

      type={type}
      className={cx(styles.button, styles[variant], styles[size], className)}
      disabled={disabled || loading}
      focusableWhenDisabled={loading || rest.focusableWhenDisabled}
      aria-busy={loading || undefined}
      data-loading={loading ? "" : undefined}
      data-icon={position}
    >
      {loading ? (
        <Spinner
          className={styles.spinner}
          size="sm"
          label=""
          role="presentation"
          aria-hidden="true"
        />
      ) : (
        <IconSlot>{startIcon}</IconSlot>
      )}
      {children}
      <IconSlot>{endIcon}</IconSlot>
    </BaseButton>
  );
}
