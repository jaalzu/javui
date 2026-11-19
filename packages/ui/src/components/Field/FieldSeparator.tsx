import type { ReactNode } from "react";
import { Separator } from "../Separator";
import { Text } from "../Text";
import styles from "./Field.module.css";

/** Divides alternatives between fields, optionally with readable text between the lines. */
export function FieldSeparator({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.fieldSeparator}>
      <Separator className={styles.separatorLine} />
      {children ? <Text variant="caption" tone="muted">{children}</Text> : null}
      {children ? <Separator className={styles.separatorLine} /> : null}
    </div>
  );
}
