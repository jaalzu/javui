"use client";

import { useId } from "react";
import { useFieldControlState } from "./FieldContext";
import { normalizeFieldErrors, type FieldErrorProp } from "./fieldErrors";

/** Validation props accepted directly by a control. */
export type ControlValidationProps = {
  error?: FieldErrorProp;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
};

/**
 * Resolves a control's validation props against the surrounding `Field`.
 * Direct props win; `Field` fills in the rest.
 */
export function useControlValidation({
  error,
  required,
  readOnly,
  loading,
}: ControlValidationProps) {
  const field = useFieldControlState();
  const directErrors = normalizeFieldErrors(error);
  const invalid = (field?.invalid ?? false) || directErrors.length > 0;
  const showError = directErrors.length > 0 && !(field?.invalid ?? false);
  const effectiveRequired = required ?? field?.required ?? false;
  const fieldShowsRequired = Boolean(field?.required) && (field?.hasLabel ?? false);
  const showRequired = effectiveRequired && !fieldShowsRequired;
  const errorId = useId();

  return {
    field,
    errors: directErrors.length > 0 ? directErrors : (field?.errors ?? []),
    errorId,
    invalid,
    showError,
    showRequired,
    describedBy: showError ? errorId : undefined,
    required: effectiveRequired,
    readOnly: readOnly ?? field?.readOnly ?? false,
    loading: loading ?? field?.loading ?? false,
  };
}
