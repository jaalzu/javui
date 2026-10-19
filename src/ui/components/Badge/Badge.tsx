"use client";

import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { iconPosition } from "../../utils/iconPosition";
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
 * indicator. Add an icon (e.g. `<CheckIcon />`) as the first or last child for an icon.
 *
 * @example
 * <Badge>Draft</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">99+</Badge>
 * <Badge variant="outline" shape="rounded">Beta</Badge>
 * <Badge variant="brand" loading>Saving</Badge>
 * <Badge variant="inverted" size="lg" spinnerPosition="end" loading>Syncing</Badge>
 * <Badge variant="default" render={<Link href="/docs" />}>Docs</Badge>
 */
export function Badge({
  variant = "default",
  size = "md",
  shape = "pill",
  loading = false,
  spinnerPosition = "start",
  render,
  className,
  children,
  ...rest
}: BadgeProps) {
  const position = iconPosition(children);
  const startsWithIcon =
    position === "start" ||
    position === "both" ||
    position === "only" ||
    (loading && spinnerPosition === "start");
  const endsWithIcon =
    position === "end" ||
    position === "both" ||
    position === "only" ||
    (loading && spinnerPosition === "end");

  const spinner = loading ? (
    <Spinner size="sm" label="" role="presentation" aria-hidden="true" />
  ) : null;

  return useRender({
    render,
    defaultTagName: "span",
    props: {
      className: cx(
        styles.badge,
        styles[variant],
        styles[size],
        styles[shape],
        className,
      ),
      "data-icon-start": startsWithIcon ? "" : undefined,
      "data-icon-end": endsWithIcon ? "" : undefined,
      ...rest,
      children:
        spinnerPosition === "start" ? (
          <>
            {spinner}
            {children}
          </>
        ) : (
          <>
            {children}
            {spinner}
          </>
        ),
    },
  });
}
