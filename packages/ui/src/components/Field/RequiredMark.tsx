import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Field.module.css";

/** Red asterisk that marks a required field; screen readers hear the full word. */
export function RequiredMark() {
  return (
    <span className={styles.required}>
      <span aria-hidden="true">*</span>
      <VisuallyHidden>Required</VisuallyHidden>
    </span>
  );
}
