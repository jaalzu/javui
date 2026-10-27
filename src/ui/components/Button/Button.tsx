"use client";

import {
  useEffect,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "../../utils/cx";
import type { AccessibleName } from "../../utils/accessibleName";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { iconPosition } from "../../utils/iconPosition";
import { useLinkComponent } from "../Link/LinkContext";
import { Spinner } from "../Spinner";
import styles from "./Button.module.css";

export type ButtonVariant =
  "primary" | "secondary" | "ghost" | "accent" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonSharedProps = {
  /**
   * Visual emphasis. `primary` is the main action (one per view), `secondary` for other actions,
   * `ghost` for low-emphasis actions, `accent` for brand emphasis, `danger` for destructive actions.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Control height and icon size: `xs` 1.5rem and 12px, `sm` 1.75rem and 16px, `md` 2.25rem and
   * 20px, `lg` 2.75rem and 24px.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Fully rounded shape (`--radius-full`). Inside `ButtonGroup` only the outer corners keep it.
   * @default false
   */
  pill?: boolean;
  className?: string;
};

/** An action button. `href` is forbidden: setting it turns the component into a link. */
type ButtonActionBaseProps = ButtonSharedProps & {
  /** Never on an action button. Pass `href` to render a link instead. */
  href?: never;
  /**
   * Shows a spinner and ignores clicks while an action is running. The button keeps its label and stays
   * focusable, and `aria-busy` tells assistive technology it is working. @default false
   */
  loading?: boolean;
} & Omit<BaseButton.Props, "className" | "color" | "children" | "href">;

/** A navigation link that looks like a button. */
type ButtonAnchorBaseProps = ButtonSharedProps & {
  /** Where the link goes. To navigate, pass `href`; do not wire `onClick` to `router.push`, which loses right-click and new-tab semantics. */
  href: string;
} & Omit<
  ComponentProps<"a">,
  "href" | "color" | "children" | "type" | "disabled" | "loading"
>;

type ButtonSlots = {
  /** Icon before the label. Pass a generated icon without `size`; the control sizes it. @default undefined */
  startIcon?: ReactNode;
  /** Icon after the label. Pass a generated icon without `size`; the control sizes it. @default undefined */
  endIcon?: ReactNode;
};

/**
 * A control with a visible label. Icons are optional.
 */
export type ButtonWithLabelProps = (
  | ButtonActionBaseProps
  | ButtonAnchorBaseProps
) &
  ButtonSlots & {
    /** The visible label. */
    children: ReactNode;
  };

/**
 * An icon-only control. `startIcon` is required, and so is an accessible name through
 * `aria-label` or `aria-labelledby`.
 */
export type ButtonIconOnlyProps = (
  | ButtonActionBaseProps
  | ButtonAnchorBaseProps
) &
  ButtonSlots &
  AccessibleName & {
    /** Icon-only controls have no visible children. */
    children?: never;
    /** The visible icon and accessible name. Pass a generated icon without `size`. */
    startIcon: ReactNode;
  };

export type ButtonProps = ButtonWithLabelProps | ButtonIconOnlyProps;

/**
 * Action button, or a link when given `href`.
 *
 * Icon-only controls need an accessible name (`aria-label` or `aria-labelledby`).
 *
 * @example
 * <Button>Save</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button variant="accent" pill>Upgrade</Button>
 * <Button loading>Saving</Button>
 * <Button aria-label="Close" startIcon={<XIcon />} />
 * <Button href="/docs/installation">Get started</Button>
 */
export function Button(props: ButtonProps) {
  const LinkComponent = useLinkComponent() as ElementType<
    ComponentProps<"a">
  >;
  const isLink = props.href !== undefined;
  const loading = props.href === undefined && props.loading === true;
  const hasLabel =
    props.children !== undefined &&
    props.children !== null &&
    props.children !== false;
  const position = isLink
    ? getIconSlots({
        startIcon: props.startIcon,
        endIcon: props.endIcon,
        hasLabel,
      })
    : iconPosition({
        startIcon: props.startIcon,
        endIcon: props.endIcon,
        loading,
        hasLabel,
      });
  const ariaLabel = props["aria-label"];
  const ariaLabelledBy = props["aria-labelledby"];

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (position === "only" && !ariaLabel && !ariaLabelledBy) {
      console.warn(
        isLink
          ? "Button: icon-only links need an accessible name. Pass aria-label or aria-labelledby."
          : "Button: icon-only buttons need an accessible name. Pass aria-label or aria-labelledby.",
      );
    }
  }, [position, ariaLabel, ariaLabelledBy, isLink]);

  if (props.href !== undefined) {
    const {
      href,
      target,
      rel,
      variant = "primary",
      size = "md",
      pill = false,
      startIcon,
      endIcon,
      className,
      children,
      ...rest
    } = props;

    return (
      <LinkComponent
        {...rest}
        href={href}
        target={target}
        rel={
          target === "_blank" && rel === undefined
            ? "noopener noreferrer"
            : rel
        }
        className={cx(
          styles.button,
          styles[variant],
          styles[size],
          pill && styles.pill,
          styles.asLink,
          className,
        )}
        data-variant={variant}
        data-icon={position}
      >
        <ButtonContent
          startIcon={startIcon}
          endIcon={endIcon}
          loading={false}
        >
          {children}
        </ButtonContent>
      </LinkComponent>
    );
  }

  const {
    variant = "primary",
    size = "md",
    pill = false,
    type = "button",
    loading: isLoading = false,
    startIcon,
    endIcon,
    className,
    disabled,
    children,
    ...rest
  } = props;

  return (
    <BaseButton
      {...rest}
      type={type}
      className={cx(styles.button, styles[variant], styles[size], pill && styles.pill, className)}
      disabled={disabled || isLoading}
      focusableWhenDisabled={isLoading || rest.focusableWhenDisabled}
      aria-busy={isLoading || undefined}
      data-loading={isLoading ? "" : undefined}
      data-variant={variant}
      data-icon={position}
    >
      <ButtonContent startIcon={startIcon} endIcon={endIcon} loading={isLoading}>
        {children}
      </ButtonContent>
    </BaseButton>
  );
}

type ButtonContentProps = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading: boolean;
  children?: ReactNode;
};

/** Shared content for the button and link branches: icons, optional spinner and the label. */
function ButtonContent({
  startIcon,
  endIcon,
  loading,
  children,
}: ButtonContentProps) {
  return (
    <>
      {loading ? (
        <Spinner className={styles.spinner} size="sm" label="" />
      ) : (
        <IconSlot>{startIcon}</IconSlot>
      )}
      {children}
      <IconSlot>{endIcon}</IconSlot>
    </>
  );
}
