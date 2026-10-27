import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { IconSlot } from "../Icon/IconSlot";
import styles from "./EmptyState.module.css";

export type EmptyStateProps = {
  /** Short title of the empty state. */
  title: ReactNode;
  /** One or two sentences that explain what to do next. */
  description?: ReactNode;
  /** Icon above the title. Pass a generated icon without `size`; the component sizes it. */
  icon?: ReactNode;
  /** Main action, usually a Button (with `href` for navigation) or Link. */
  action?: ReactNode;
  /** Heading level for the title. Keep the page outline in order. @default "h3" */
  as?: "h2" | "h3" | "h4";
  className?: string;
};

/**
 * A quiet placeholder for a region with no content, with an optional icon and action.
 * The icon is decorative; the title carries the meaning.
 *
 * @example
 * <EmptyState
 *   icon={<FolderIcon />}
 *   title="No projects yet"
 *   description="Create a project to start collecting feedback."
 *   action={<Button>New project</Button>}
 * />
 */
export function EmptyState({ title, description, icon, action, as = "h3", className }: EmptyStateProps) {
  return (
    <section className={cx(styles.root, className)}>
      {icon ? <IconSlot className={styles.icon}>{icon}</IconSlot> : null}
      <Heading as={as} size={5} className={styles.title}>{title}</Heading>
      {description ? <Text size="sm" tone="muted" className={styles.description}>{description}</Text> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
