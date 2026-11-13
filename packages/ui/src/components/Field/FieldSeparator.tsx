import type { ReactNode } from "react";
import { Separator } from "../Separator";
import { Text } from "../Text";
import styles from "./Field.module.css";

/** Divides alternatives between fields, optionally with readable text between the lines. */
export function FieldSeparator({ children }: { children?: ReactNode }) {
  return children ? <div className={styles.fieldSeparator}><Separator className={styles.separatorLine} /><Text variant="caption" tone="muted">{children}</Text><Separator className={styles.separatorLine} /></div> : <Separator />;
}
