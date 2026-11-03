import { Field, InputOTP, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

export const hero = defineHero(
  `<Field label="Verification code" description="Enter the 6 digits we sent you.">
  <InputOTP />
</Field>`,
  <Field label="Verification code" description="Enter the 6 digits we sent you.">
    <InputOTP />
  </Field>,
);

export const examples: Example[] = [
  ex("Groups", `<InputOTP groups={[3, 3]} aria-label="Verification code" />`, <InputOTP groups={[3, 3]} aria-label="Verification code" />),
  ex("Alphanumeric", `<InputOTP length={8} validationType="alphanumeric" normalizeValue={(value) => value.toUpperCase()} aria-label="Backup code" />`, <InputOTP length={8} validationType="alphanumeric" normalizeValue={(value) => value.toUpperCase()} aria-label="Backup code" />),
  ex("Masked", `<InputOTP mask aria-label="Authenticator code" />`, <InputOTP mask aria-label="Authenticator code" />),
  ex("Invalid", `<Field label="Verification code" error="That code has expired."><InputOTP aria-invalid="true" /></Field>`, <Field label="Verification code" error="That code has expired."><InputOTP aria-invalid="true" /></Field>),
  ex("Disabled and read-only", `<Stack gap="3"><InputOTP disabled aria-label="Disabled code" /><InputOTP readOnly defaultValue="123456" aria-label="Read-only code" /></Stack>`, <Stack gap="3"><InputOTP disabled aria-label="Disabled code" /><InputOTP readOnly defaultValue="123456" aria-label="Read-only code" /></Stack>),
  ex("Loading while verifying", `<Field label="Verification code" loading><InputOTP /></Field>`, <Field label="Verification code" loading><InputOTP /></Field>),
];
