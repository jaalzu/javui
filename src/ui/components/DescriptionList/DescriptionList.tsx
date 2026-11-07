import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./DescriptionList.module.css";

export type DescriptionListLayout = "stacked" | "inline" | "horizontal";

export type DescriptionListProps = {
  /** Layout for the term/detail pairs. @default "stacked" */
  layout?: DescriptionListLayout;
  /** Uses a narrower label column in `horizontal` layout. @default false */
  narrow?: boolean;
  /** Term and detail children, normally alternating `DescriptionListTerm` and `DescriptionListDetails`. */
  children: ReactNode;
} & Omit<ComponentProps<"dl">, "children">;

export type DescriptionListTermProps = ComponentProps<"dt">;
export type DescriptionListDetailsProps = ComponentProps<"dd">;

/** Semantic `dl` structure for terms and descriptions. It does not impose a data model. */
export function DescriptionList({
  layout = "stacked",
  narrow = false,
  className,
  children,
  ...rest
}: DescriptionListProps) {
  return (
    <dl
      className={cx(styles.list, styles[`layout-${layout}`], narrow && styles.narrow, className)}
      {...rest}
    >
      {children}
    </dl>
  );
}

/** A term inside `DescriptionList`. */
export function DescriptionListTerm({ className, ...rest }: DescriptionListTermProps) {
  return <dt className={cx(styles.term, className)} {...rest} />;
}

/** A description/value inside `DescriptionList`. */
export function DescriptionListDetails({ className, ...rest }: DescriptionListDetailsProps) {
  return <dd className={cx(styles.details, className)} {...rest} />;
}
