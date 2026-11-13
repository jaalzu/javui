"use client";

import { FieldErrorMessages } from "./FieldErrorMessages";
import styles from "./Field.module.css";

/** Error text used by controls outside `Field`; matches Field's error row. */
export function FieldError({ id, errors }: { id?: string; errors: string[] }) {
  return (
    <div id={id} className={styles.error} aria-live="polite">
      <FieldErrorMessages errors={errors} />
    </div>
  );
}
