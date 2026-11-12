import type { CSSProperties } from "react";
import { Field, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, Kbd, Spinner, Stack } from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { CheckIcon, CopyIcon, EyeIcon, InfoIcon, MagnifyingGlassIcon, StarIcon } from "@javui/ui";

const smallIconStyle = { "--icon-size": "var(--size-icon-sm)" } as CSSProperties;

export const hero = defineHero(
  `<Field label="Website URL">
  <InputGroup>
    <InputGroupInput placeholder="example.com" />
    <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
    <InputGroupAddon align="end"><InfoIcon /></InputGroupAddon>
  </InputGroup>
</Field>`,
  <Field label="Website URL">
    <InputGroup>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
      <InputGroupAddon align="end" style={smallIconStyle}><InfoIcon /></InputGroupAddon>
    </InputGroup>
  </Field>,
);

export const examples: Example[] = [
  ex(
    "Icons",
    `<Stack gap="3">
  <InputGroup><InputGroupInput placeholder="Search" /><InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon></InputGroup>
  <InputGroup><InputGroupInput /><InputGroupAddon align="end"><InfoIcon /></InputGroupAddon></InputGroup>
  <InputGroup><InputGroupInput /><InputGroupAddon align="end"><StarIcon /><CheckIcon /></InputGroupAddon></InputGroup>
</Stack>`,
    <Stack gap="3">
      <InputGroup><InputGroupInput aria-label="Search with leading icon" placeholder="Search" /><InputGroupAddon style={smallIconStyle}><MagnifyingGlassIcon /></InputGroupAddon></InputGroup>
      <InputGroup><InputGroupInput aria-label="Your name" placeholder="Enter your name" /><InputGroupAddon align="end" style={smallIconStyle}><InfoIcon /></InputGroupAddon></InputGroup>
      <InputGroup><InputGroupInput aria-label="Card number" placeholder="Card number" /><InputGroupAddon align="end" style={smallIconStyle}><StarIcon /><CheckIcon /></InputGroupAddon></InputGroup>
    </Stack>,
  ),
  ex(
    "Text",
    `<Stack gap="3">
  <InputGroup><InputGroupInput placeholder="0.0000" /><InputGroupAddon><InputGroupText>BTC</InputGroupText></InputGroupAddon><InputGroupAddon align="end"><InputGroupText>≈ USD</InputGroupText></InputGroupAddon></InputGroup>
  <InputGroup><InputGroupInput placeholder="username" /><InputGroupAddon><InputGroupText>LinkedIn/</InputGroupText></InputGroupAddon></InputGroup>
</Stack>`,
    <Stack gap="3">
      <InputGroup><InputGroupInput aria-label="Wallet balance" placeholder="0.0000" /><InputGroupAddon><InputGroupText>BTC</InputGroupText></InputGroupAddon><InputGroupAddon align="end"><InputGroupText>≈ USD</InputGroupText></InputGroupAddon></InputGroup>
      <InputGroup><InputGroupInput aria-label="LinkedIn username" placeholder="username" /><InputGroupAddon><InputGroupText>LinkedIn/</InputGroupText></InputGroupAddon></InputGroup>
    </Stack>,
  ),
  ex(
    "Spinner",
    `<Stack gap="3">
  <InputGroup>
    <InputGroupInput aria-label="Uploading" placeholder="Uploading file" />
    <InputGroupAddon><Spinner size="sm" label="Uploading" /></InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput aria-label="Checking availability" placeholder="Checking availability" readOnly />
    <InputGroupAddon align="end"><Spinner size="sm" label="Checking availability" /></InputGroupAddon>
  </InputGroup>
</Stack>`,
    <Stack gap="3">
      <InputGroup>
        <InputGroupInput aria-label="Uploading" placeholder="Uploading file" />
        <InputGroupAddon><Spinner size="sm" label="Uploading" /></InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput aria-label="Checking availability" placeholder="Checking availability" />
        <InputGroupAddon align="end"><Spinner size="sm" label="Checking availability" /></InputGroupAddon>
      </InputGroup>
    </Stack>,
  ),
  ex(
    "Keyboard hint",
    `<Field label="Search">
  <InputGroup>
    <InputGroupInput />
    <InputGroupAddon align="end" style={{ gap: "var(--space-1)" }}><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
  </InputGroup>
</Field>`,
    <Field label="Search">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon align="end" style={{ gap: "var(--space-1)" }}><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
      </InputGroup>
    </Field>,
  ),
  ex(
    "Action",
    `<Stack gap="3">
  <InputGroup><InputGroupInput type="password" placeholder="Password" /><InputGroupAddon align="end"><InputGroupButton variant="ghost" aria-label="Show password" startIcon={<EyeIcon />} /></InputGroupAddon></InputGroup>
  <InputGroup><InputGroupInput defaultValue="invite@example.com" /><InputGroupAddon align="end"><InputGroupButton variant="ghost" aria-label="Copy email" startIcon={<CopyIcon />} /></InputGroupAddon></InputGroup>
  <InputGroup><InputGroupInput defaultValue="Draft profile" /><InputGroupAddon align="end"><InputGroupButton variant="secondary" size="xs">Save</InputGroupButton></InputGroupAddon></InputGroup>
</Stack>`,
    <Stack gap="3">
      <InputGroup><InputGroupInput aria-label="Password" type="password" placeholder="Password" /><InputGroupAddon align="end"><InputGroupButton variant="ghost" aria-label="Show password" startIcon={<EyeIcon />} /></InputGroupAddon></InputGroup>
      <InputGroup><InputGroupInput aria-label="Email" defaultValue="invite@example.com" /><InputGroupAddon align="end"><InputGroupButton variant="ghost" aria-label="Copy email" startIcon={<CopyIcon />} /></InputGroupAddon></InputGroup>
      <InputGroup><InputGroupInput aria-label="Draft profile" defaultValue="Draft profile" /><InputGroupAddon align="end"><InputGroupButton variant="secondary" size="xs">Save</InputGroupButton></InputGroupAddon></InputGroup>
    </Stack>,
  ),
];
