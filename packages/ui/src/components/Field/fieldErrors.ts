export type FieldErrorValue = string | { message?: string | null } | null | undefined;
export type FieldErrorProp = FieldErrorValue | readonly FieldErrorValue[];

/** Converts any supported error shape into a list of unique, non-empty messages. */
export function normalizeFieldErrors(error: FieldErrorProp): string[] {
  const items: readonly FieldErrorValue[] = Array.isArray(error)
    ? (error as readonly FieldErrorValue[])
    : [error as FieldErrorValue];
  const messages = new Set<string>();
  for (const item of items) {
    const text = (typeof item === "string" ? item : item?.message ?? "").trim();
    if (text) messages.add(text);
  }
  return [...messages];
}
