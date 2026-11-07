import { useId, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading } from "../../typography/Heading";
import { Text } from "../Text";
import styles from "./EmptyState.module.css";

export type EmptyStateSize = "md" | "sm" | "xs";

export type EmptyStateProps = {
  /** Explains the current situation and, if possible, what to do next. Required. Keep it to one short paragraph. */
  description: ReactNode;
  /** Short message that introduces the scenario. Optional. */
  title?: ReactNode;
  /** Decorative illustration. Hidden from assistive technology and never shown at size `xs`. */
  illustration?: ReactNode;
  /** Actions that resolve the empty state, usually one or two Buttons. Optional. */
  actions?: ReactNode;
  /** `md` for screens, tables and large cards; `sm` for cards and panels; `xs` for nested containers. @default "md" */
  size?: EmptyStateSize;
  /** Heading level of the title. @default "h3" */
  as?: "h2" | "h3" | "h4";
  className?: string;
};

const titleSize = { md: 4, sm: 5, xs: 6 } as const;
const descriptionSize = { md: "base", sm: "sm", xs: "sm" } as const;

/** Explains why a region is empty and how to fill it. */
export function EmptyState({ description, title, illustration, actions, size = "md", as = "h3", className }: EmptyStateProps) {
  const titleId = useId();
  const showIllustration = Boolean(illustration) && size !== "xs";
  const Root = title ? "section" : "div";

  return (
    <Root className={cx(styles.root, className)} data-size={size} aria-labelledby={title ? titleId : undefined}>
      {showIllustration ? <div className={styles.illustration} aria-hidden="true">{illustration}</div> : null}
      {title ? <Heading as={as} size={titleSize[size]} id={titleId} className={styles.title}>{title}</Heading> : null}
      <Text size={descriptionSize[size]} tone="muted" className={styles.description}>{description}</Text>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </Root>
  );
}
