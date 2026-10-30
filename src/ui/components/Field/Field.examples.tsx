import { Button, Checkbox, Field, FieldSeparator, FieldSet, Input, Select, Stack, Textarea } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";

const countries = [{ value: "ar", label: "Argentina" }, { value: "uy", label: "Uruguay" }, { value: "cl", label: "Chile" }];
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((value) => ({ value, label: value }));
const years = ["2026", "2027", "2028", "2029"].map((value) => ({ value, label: value }));

export const hero = defineHero(
  `<form><Stack gap="4">
  <FieldSet legend="Payment details" description="Your information is protected throughout checkout.">
    <Stack gap="4">
      <Field label="Cardholder name" required><Input placeholder="Alex Morgan" /></Field>
      <Field label="Card number" description="Use the 16 digits from your card." required><Input placeholder="4242 4242 4242 4242" /></Field>
      <Stack direction="row" gap="3"><Field label="Month"><Select items={months} placeholder="MM" /></Field><Field label="Year"><Select items={years} placeholder="YYYY" /></Field><Field label="CVV"><Input placeholder="123" /></Field></Stack>
    </Stack>
  </FieldSet>
  <FieldSeparator />
  <FieldSet legend="Billing address" description="Use the address connected to this payment method.">
    <Stack gap="3"><Checkbox label="Same as shipping address" defaultChecked /></Stack>
  </FieldSet>
  <Field label="Comments"><Textarea placeholder="Add any additional comments" rows={3} /></Field>
  <Stack direction="row" gap="2"><Button size="sm" type="submit">Submit</Button><Button size="sm" type="button" variant="secondary">Cancel</Button></Stack>
</Stack></form>`,
  <form><Stack gap="4"><FieldSet legend="Payment details" description="Your information is protected throughout checkout."><Stack gap="4"><Field label="Cardholder name" required><Input placeholder="Alex Morgan" /></Field><Field label="Card number" description="Use the 16 digits from your card." required><Input placeholder="4242 4242 4242 4242" /></Field><Stack direction="row" gap="3"><Field label="Month"><Select items={months} placeholder="MM" /></Field><Field label="Year"><Select items={years} placeholder="YYYY" /></Field><Field label="CVV"><Input placeholder="123" /></Field></Stack></Stack></FieldSet><FieldSeparator /><FieldSet legend="Billing address" description="Use the address connected to this payment method."><Stack gap="3"><Checkbox label="Same as shipping address" defaultChecked /></Stack></FieldSet><Field label="Comments"><Textarea placeholder="Add any additional comments" rows={3} /></Field><Stack direction="row" gap="2"><Button size="sm" type="submit">Submit</Button><Button size="sm" type="button" variant="secondary">Cancel</Button></Stack></Stack></form>,
);

export const examples: Example[] = [
  ex("Basic field", `<Field label="Email" description="We only use it for receipts."><Input type="email" autoComplete="email" /></Field>`, <Field label="Email" description="We only use it for receipts."><Input type="email" autoComplete="email" /></Field>),
  ex("Validation", `<Stack gap="4"><Field label="Name" error="Enter your name"><Input autoComplete="name" /></Field><Field label="Email" error={["Enter a valid address.", "This email is already in use."]}><Input type="email" /></Field></Stack>`, <Stack gap="4"><Field label="Name" error="Enter your name"><Input autoComplete="name" /></Field><Field label="Email" error={["Enter a valid address.", "This email is already in use."]}><Input type="email" /></Field></Stack>, "Errors appear after blur or submit, not on the first keystroke."),
];
