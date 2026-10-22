"use client";

import type { ReactNode } from "react";
import { WarningIcon } from "../../icons/icons.generated";
import styles from "./Field.module.css";

/** Error text used by controls outside `Field`; matches Field's error row. */
export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div id={id} className={styles.error} aria-live="polite">
      <WarningIcon size="sm" />
      <span>{children}</span>
    </div>
  );
}
