import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /**
   * Visual emphasis. `primary` is the main action (one per view), `secondary` for other actions,
   * `ghost` for low-emphasis actions, `accent` for brand emphasis, `danger` for destructive actions.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /** Control height: `sm` 2rem, `md` 2.5rem, `lg` 3rem. @default "md" */
  size?: ButtonSize;
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
 * For navigation use `Link`.
 *
 * @example
 * <Button>Save</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button type="submit">Send</Button>
 * <Button loading>Saving</Button>
 * <Button variant="secondary"><Icon><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>Done</Button>
 */
export function Button({ variant = "primary", size = "md", type = "button", loading = false, className, disabled, children, ...rest }: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={cx(styles.button, styles[variant], styles[size], className)}
      disabled={disabled || loading}
      focusableWhenDisabled={loading || rest.focusableWhenDisabled}
      aria-busy={loading || undefined}
      data-loading={loading ? "" : undefined}
      {...rest}
    >
      {loading && <Spinner size="sm" label="" role="presentation" aria-hidden="true" />}
      {children}
    </BaseButton>
  );
}
