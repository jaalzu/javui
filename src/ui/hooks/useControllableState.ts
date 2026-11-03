"use client";

import { useCallback, useState } from "react";

export type UseControllableStateOptions<T> = {
  /** Controlled value. When present, internal state is ignored. */
  value?: T;
  /** Initial value for the uncontrolled mode. */
  defaultValue: T;
  /** Called whenever the next value is committed. */
  onChange?: (value: T) => void;
};

/**
 * Shared controlled/uncontrolled state for interactive components.
 *
 * The hook owns the state transition policy; the component remains responsible for
 * accessibility, rendering and any domain-specific guards before calling `setValue`.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
