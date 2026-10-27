import type { ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cx } from "../../utils/cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import styles from "./Popover.module.css";

/**
 * Root of a popover: a small panel anchored to a button, for extra controls or details the user asked for.
 * Built on Base UI Popover (focus management, Escape to close, outside click and positioning come from there).
 * For decisions that must interrupt the user use `Modal`; for a list of actions use `Menu`.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger variant="secondary">Filters</PopoverTrigger>
 *   <PopoverContent title="Filters" description="Narrow the results.">...</PopoverContent>
 * </Popover>
 */
export const Popover = BasePopover.Root;

export type PopoverTriggerProps = {
  /** Button style of the trigger. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size of the trigger. @default "md" */
  size?: ButtonSize;
} & Omit<BasePopover.Trigger.Props, "render" | "className" | "color">;

/**
 * The button that opens the popover. It is rendered as a `Button`.
 *
 * @example
 * <PopoverTrigger variant="secondary">Filters</PopoverTrigger>
 */
export function PopoverTrigger({ variant = "secondary", size = "md", children, ...rest }: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}

export type PopoverContentProps = {
  /** Heading of the panel. Required: it is the accessible name of the popover. */
  title: ReactNode;
  /** Short explanation, announced as the accessible description. */
  description?: ReactNode;
  /** The content: text, a form, or `PopoverClose` buttons. */
  children?: ReactNode;
  /** Preferred side of the trigger. @default "bottom" */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment against the trigger. @default "center" */
  align?: "start" | "center" | "end";
  className?: string;
};

/**
 * The popover panel with its title and description. Place it inside `Popover`.
 *
 * @example
 * <PopoverContent title="Filters" description="Narrow the results.">
 *   <PopoverClose>Done</PopoverClose>
 * </PopoverContent>
 */
export function PopoverContent({ title, description, children, side = "bottom", align = "center", className }: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={8} className={styles.positioner}>
        <BasePopover.Popup className={cx(styles.popup, className)}>
          <BasePopover.Title className={styles.title}>{title}</BasePopover.Title>
          {description ? <BasePopover.Description className={styles.description}>{description}</BasePopover.Description> : null}
          {children ? <div className={styles.body}>{children}</div> : null}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export type PopoverCloseProps = {
  /** Button style. @default "secondary" */
  variant?: ButtonVariant;
  /** Button size. @default "sm" */
  size?: ButtonSize;
} & Omit<BasePopover.Close.Props, "render" | "className" | "color">;

/**
 * A button that closes the popover. It is rendered as a `Button`.
 *
 * @example
 * <PopoverClose>Done</PopoverClose>
 */
export function PopoverClose({ variant = "secondary", size = "sm", children, ...rest }: PopoverCloseProps) {
  return (
    <BasePopover.Close
      render={
        <Button variant={variant} size={size}>
          {children}
        </Button>
      }
      {...rest}
    />
  );
}
