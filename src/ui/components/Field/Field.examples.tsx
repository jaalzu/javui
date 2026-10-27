import { Field, Input } from "@/ui";
import { ex, type Example } from "@/docs/example";

export const examples: Example[] = [
    ex("Default", `<Field label="Email">\n  <Input type="email" autoComplete="email" />\n</Field>`, <Field label="Email"><Input type="email" autoComplete="email" /></Field>),
    ex("With description", `<Field label="Email" description="We only use it for receipts.">\n  <Input type="email" autoComplete="email" />\n</Field>`, <Field label="Email" description="We only use it for receipts."><Input type="email" autoComplete="email" /></Field>),
    ex("With error", `<Field label="Name" error="Enter your name">\n  <Input autoComplete="name" />\n</Field>`, <Field label="Name" error="Enter your name"><Input autoComplete="name" /></Field>, "The error is linked to the input for screen readers."),
];
