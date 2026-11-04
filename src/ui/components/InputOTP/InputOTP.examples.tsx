import { Field, InputOTP } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import styles from "./InputOTP.module.css";

function AlphanumericExample() {
  return <Field className={styles.exampleField} label="Numbers and letters"><InputOTP length={4} validationType="alphanumeric" /></Field>;
}

export const hero = defineHero(
  `<Field label="Verification code" description="Enter the 4 digits we sent you.">
  <InputOTP length={4} />
</Field>`,
  <Field className={styles.exampleField} label="Verification code" description="Enter the 4 digits we sent you.">
    <InputOTP length={4} />
  </Field>,
);

export const examples: Example[] = [
  ex("Groups", `<Field label="Verification code"><InputOTP groups={[3, 3]} /></Field>`, <Field className={styles.exampleField} label="Verification code"><InputOTP groups={[3, 3]} /></Field>),
  ex("Alphanumeric", `<Field label="Numbers and letters"><InputOTP length={4} validationType="alphanumeric" /></Field>`, <AlphanumericExample />),
  ex("Invalid", `<Field error="That code has expired."><InputOTP aria-label="Invalid code" aria-invalid="true" /></Field>`, <Field className={styles.exampleField} error="That code has expired."><InputOTP aria-label="Invalid code" aria-invalid="true" /></Field>),
  ex("Read-only", `<Field label="Read-only code"><InputOTP length={6} readOnly defaultValue="123456" /></Field>`, <Field className={styles.exampleField} label="Read-only code"><InputOTP length={6} readOnly defaultValue="123456" /></Field>),
];
