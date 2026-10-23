"use client";

import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { IconSlot, getIconSlots } from "../Icon/IconSlot";
import { Spinner } from "../Spinner";
import styles from "./Badge.module.css";

export type BadgeVariant =
  | "default"
  | "inverted"
  | "outline"
  | "brand"
  | "success"
  | "danger";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill";

export type BadgeProps = {
  /**
   * Visual treatment. `default` is a quiet component surface, `inverted` a filled
   * high-contrast pill, `outline` only an inset ring, and `brand`, `success` and
   * `danger` are soft semantic tints (translucent background, colored text).
   * @default "default"
   */
  variant?: BadgeVariant;
  /** Height and type scale: `sm` 20px, `md` 24px, `lg` 28px. @default "md" */
  size?: BadgeSize;
  /** Corner shape: `pill` (fully round) or `rounded` (small radius). @default "pill" */
  shape?: BadgeShape;
  /** Shows a spinner before or after the text, for statuses still in progress. @default false */
  loading?: boolean;
  /** Icon before the text. Pass a generated icon without `size`; the badge sizes it. */
  startIcon?: ReactNode;
  /** Icon after the text. Pass a generated icon without `size`; the badge sizes it. */
  endIcon?: ReactNode;
  /** Side the spinner sits on. @default "start" */
  spinnerPosition?: "start" | "end";
  /**
   * Renders the badge as another element or component, e.g. a link:
   * `render={<Link href="/docs" />}`. Keyboard and focus behavior then come from
   * that element, since Base UI merges the props.
   */
  render?: useRender.RenderProp;
  className?: string;
} & Omit<ComponentProps<"span">, "color" | "className" | "render">;

/**
 * Small status, category or count label. Text is always the primary signal; the
 * variant only reinforces it.
 *
 * Keep the text to one or two words and truncate counts to two digits (`99+`).
 * Badges are secondary and supportive: never use one as a heading or a key
 * indicator. Put icons in `startIcon`/`endIcon`; they follow the badge size: sm 16px, md 20px,
 * lg 24px.
 *
 * @example
 * <Badge>Draft</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">99+</Badge>
 * <Badge variant="outline" shape="rounded">Beta</Badge>
 * <Badge variant="brand" loading>Saving</Badge>
 * <Badge variant="inverted" size="lg" spinnerPosition="end" loading>Syncing</Badge>
 * <Badge variant="success" startIcon={<CheckIcon />}>Active</Badge>
 * <Badge variant="default" render={<Link href="/docs" />}>Docs</Badge>
 */
export function Badge({
  variant = "default",
  size = "md",
  shape = "pill",
  loading = false,
  spinnerPosition = "start",
  startIcon,
  endIcon,
  render,
  className,
  children,
  ...rest
}: BadgeProps) {
  const hasLabel =
    children !== undefined && children !== null && children !== false;
  const position = getIconSlots({
    startIcon,
    endIcon,
    loading,
    loadingPosition: spinnerPosition,
    hasLabel,
  });

  const spinner = loading ? (
    <Spinner size="sm" label="" role="presentation" aria-hidden="true" />
  ) : null;

  return useRender({
    render,
    defaultTagName: "span",
    props: {
      ...rest,
      className: cx(
        styles.badge,
        styles[variant],
        styles[size],
        styles[shape],
        className,
      ),
      "data-icon": position,
      children: (
        <>
          {loading && spinnerPosition === "start" ? (
            spinner
          ) : (
            <IconSlot>{startIcon}</IconSlot>
          )}
          {children}
          {loading && spinnerPosition === "end" ? (
            spinner
          ) : (
            <IconSlot>{endIcon}</IconSlot>
          )}
        </>
      ),
    },
  });
}
