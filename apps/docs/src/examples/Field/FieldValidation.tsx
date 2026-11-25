"use client";

import { useState, type FormEvent } from "react";
import { Button, Field, Input, Stack } from "@javui/ui";

/**
 * Validation example moved from the removed Usage page: errors appear on blur or submit, never on
 * the first keystroke, and the field and button report `loading` while saving.
 */
export function FieldValidationForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  function validate(value: string) {
    return value.includes("@") ? undefined : "Enter a valid email address.";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validate(email);
    setError(nextError);
    if (nextError) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="4">
        <Field
          label="Email"
          description="We only use it for receipts."
          error={error}
          required
          loading={saving}
        >
          <Input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(undefined);
            }}
            onBlur={() => setError(validate(email))}
          />
        </Field>
        <Button type="submit" loading={saving}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
