import { useId, type ReactNode } from "react";
import { Stack } from "../Stack";
import styles from "./Field.module.css";

export type FieldSetProps = { legend: ReactNode; description?: ReactNode; disabled?: boolean; children: ReactNode; className?: string };

/** Groups different controls under one accessible legend. Use CheckboxGroup or RadioGroup for same-type options. */
export function FieldSet({ legend, description, disabled, children, className }: FieldSetProps) {
  const descriptionId = useId();
  return <fieldset className={`${styles.fieldset} ${className ?? ""}`} disabled={disabled} aria-describedby={description ? descriptionId : undefined}>
    <legend className={styles.legend}>{legend}</legend>
    {description ? <p id={descriptionId} className={styles.description}>{description}</p> : null}
    <Stack gap="5">{children}</Stack>
  </fieldset>;
}
