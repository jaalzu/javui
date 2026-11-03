import { Field, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, Kbd, Stack } from "@/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { MagnifyingGlassIcon, XIcon } from "@/ui/icons/icons.generated";

export const hero = defineHero(
  `<Field label="Website">
  <InputGroup>
    <InputGroupInput aria-label="Website" />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
  </InputGroup>
</Field>`,
  <Field label="Website">
    <InputGroup>
      <InputGroupInput aria-label="Website" />
      <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
    </InputGroup>
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Icon",
    `<Field label="Search">
  <InputGroup>
    <InputGroupInput type="search" />
    <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Search">
      <InputGroup>
        <InputGroupInput type="search" />
        <InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Prefix and suffix",
    `<Field label="Website" description="Include the protocol.">
  <InputGroup>
    <InputGroupInput />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
    <InputGroupAddon align="end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Website" description="Include the protocol and domain suffix.">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
        <InputGroupAddon align="end"><InputGroupText>.com</InputGroupText></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Clear button",
    `<Field label="Search">
  <InputGroup>
    <InputGroupInput defaultValue="Project status" />
    <InputGroupAddon align="end"><InputGroupButton aria-label="Clear" startIcon={<XIcon />} /></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Search">
      <InputGroup>
        <InputGroupInput defaultValue="Project status" />
        <InputGroupAddon align="end"><InputGroupButton aria-label="Clear" startIcon={<XIcon />} /></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Keyboard hint",
    `<Field label="Search">
  <InputGroup>
    <InputGroupInput />
    <InputGroupAddon align="end"><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Search">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon align="end"><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Action",
    `<Field label="API key">
  <InputGroup>
    <InputGroupInput type="password" />
    <InputGroupAddon align="end"><InputGroupButton aria-label="Show password">Show</InputGroupButton></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="API key">
      <InputGroup>
        <InputGroupInput type="password" />
        <InputGroupAddon align="end"><InputGroupButton aria-label="Show password">Show</InputGroupButton></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "States",
    `<Stack gap="3">
  <Field label="Loading"><InputGroup loading><InputGroupInput /></InputGroup></Field>
  <Field label="Invalid" error="Enter a valid value."><InputGroup><InputGroupInput aria-invalid="true" /></InputGroup></Field>
  <Field label="Read-only"><InputGroup><InputGroupInput readOnly defaultValue="Imported value" /></InputGroup></Field>
</Stack>`,
    <Stack gap="3">
      <Field label="Loading"><InputGroup loading><InputGroupInput /></InputGroup></Field>
      <Field label="Invalid" error="Enter a valid value."><InputGroup><InputGroupInput aria-invalid="true" /></InputGroup></Field>
      <Field label="Read-only"><InputGroup><InputGroupInput readOnly defaultValue="Imported value" /></InputGroup></Field>
    </Stack>,
  ),
];
