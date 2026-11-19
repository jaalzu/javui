import type { ComponentProps, ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cx } from "../../utils/cx";
import styles from "./Tooltip.module.css";

export type TooltipProviderProps = ComponentProps<typeof BaseTooltip.Provider>;

/**
 * Shares the open delay between tooltips. The first tooltip waits `delay` ms; moving to the next
 * one opens instantly (`data-instant` skips the animation). Put it once near the app root.
 *
 * @default delay 600
 */
export function TooltipProvider({
  delay = 600,
  ...rest
}: TooltipProviderProps) {
  return <BaseTooltip.Provider delay={delay} {...rest} />;
}
export type TooltipProps = {
  /** Short supplementary text. Never put essential information only here. */
  content: ReactNode;
  /**
   * The element that triggers the tooltip. It must be focusable and already have its own
   * accessible name (visible text or `aria-label`).
   */
  children: ReactElement;
  /** Preferred side of the trigger. @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  /** Milliseconds to wait before opening. Overrides the provider's delay for this tooltip. */
  delay?: number;
  /** Milliseconds to wait before closing. */
  closeDelay?: number;
  /** Extra class for the popup, for example to widen the text. */
  className?: string;
  /** Keeps the tooltip open for documentation previews. */
  open?: boolean;
  /** Opens the tooltip initially. */
  defaultOpen?: boolean;
};

/**
 * A short, supplementary label shown on hover or keyboard focus. The trigger is the single child:
 * it must be focusable and keep its own accessible name. Use it to clarify an icon button or add a
 * hint, never to hold information the user needs to complete the task.
 *
 * The tooltip flips to the opposite side when there is no room. Put it under a `TooltipProvider`
 * to share one open delay across the page.
 *
 * @example
 * <Tooltip content="Saved">
 *   <Button variant="secondary" aria-label="Saved" startIcon={<CheckIcon />} />
 * </Tooltip>
 * <Tooltip content="Add to library" side="right">
 *   <Button variant="secondary">Hover</Button>
 * </Tooltip>
 * <Tooltip content="This feature is not available yet">
 *   <span><Button disabled>Disabled</Button></span>
 * </Tooltip>
 */
export function Tooltip({
  content,
  children,
  side = "top",
  delay,
  closeDelay,
  className,
  open,
  defaultOpen,
}: TooltipProps) {
  return (
    <BaseTooltip.Root open={open} defaultOpen={defaultOpen}>
      <BaseTooltip.Trigger
        render={children}
        delay={delay}
        closeDelay={closeDelay}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          sideOffset={8}
          className={styles.positioner}
        >
          <BaseTooltip.Popup className={cx(styles.popup, className)}>
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
