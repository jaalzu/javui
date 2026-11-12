/**
 * Accessible name for a control without visible text. Pass `aria-label` or `aria-labelledby`,
 * never neither and never both.
 */
export type AccessibleName =
  | {
      /** The name as a string, for example "Close". */
      "aria-label": string;
      "aria-labelledby"?: never;
    }
  | {
      /** The id of the element that names the control. */
      "aria-labelledby": string;
      "aria-label"?: never;
    };
