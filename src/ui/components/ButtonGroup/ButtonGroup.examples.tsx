import type { ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  Field,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Textarea,
} from "@/ui";
import {
  ArrowRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  PulseIcon,
  SparkleIcon,
} from "@/ui/icons/icons.generated";
import { defineHero, ex, type Example } from "@/docs/example";
import { ButtonGroupActionsExample } from "./ButtonGroupActionsExample";
import styles from "./ButtonGroup.examples.module.css";

const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "ars", label: "ARS" },
];

/** Centers an example in the preview. */
function Stage({ children }: { children: ReactNode }) {
  return <div className={styles.stage}>{children}</div>;
}

export const hero = defineHero(
  `<Button size="md" variant="outline" aria-label="Next" startIcon={<ArrowRightIcon />} />
<ButtonGroup aria-label="Preview actions">
  <Button variant="outline">Preview</Button>
  <Button variant="outline">Publish</Button>
</ButtonGroup>`,
  <Stage>
    <ButtonGroupActionsExample />
  </Stage>,
);

export const examples: Example[] = [
  ex(
    "Actions",
    `<ButtonGroup aria-label="Preview actions">
  <Button variant="outline">Preview</Button>
  <Button variant="outline">Publish</Button>
</ButtonGroup>`,
    <Stage>
      <ButtonGroupActionsExample />
    </Stage>,
    "Outline buttons draw the border and the group overlaps each inner edge, so it is drawn once.",
  ),
  ex(
    "Orientation",
    `<ButtonGroup aria-label="Quantity" orientation="vertical">
  <Button variant="outline" aria-label="Increase" startIcon={<PlusIcon />} />
  <Button variant="outline" aria-label="Decrease" startIcon={<MinusIcon />} />
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Quantity" orientation="vertical">
        <Button
          variant="outline"
          aria-label="Increase"
          startIcon={<PlusIcon />}
        />
        <Button
          variant="outline"
          aria-label="Decrease"
          startIcon={<MinusIcon />}
        />
      </ButtonGroup>
    </Stage>,
    "Use a vertical group for compact increment and decrement actions.",
  ),
  ex(
    "Size",
    `<ButtonGroup aria-label="Small" size="sm">
  <Button size="sm" variant="outline">Save</Button>
  <Button size="sm" variant="outline">Preview</Button>
</ButtonGroup>`,
    <Stage>
      <div className={styles.stack}>
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <ButtonGroup key={size} aria-label={`${size} actions`} size={size}>
            <Button size={size} variant="outline">
              Save
            </Button>
            <Button size={size} variant="outline">
              Preview
            </Button>
          </ButtonGroup>
        ))}
      </div>
    </Stage>,
    "The group size is inherited by Button, Input and Select that omit their own.",
  ),
  ex(
    "Nested",
    `<ButtonGroup aria-label="Formatting">
  <ButtonGroup aria-label="Text style">
    <Button variant="outline">Bold</Button>
    <Button variant="outline">Italic</Button>
  </ButtonGroup>
  <ButtonGroup aria-label="Alignment">
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
  </ButtonGroup>
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Formatting">
        <ButtonGroup aria-label="Text style">
          <Button variant="outline">Bold</Button>
          <Button variant="outline">Italic</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Alignment">
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
        </ButtonGroup>
      </ButtonGroup>
    </Stage>,
    "Nest `ButtonGroup` components to create button groups with spacing.",
  ),
  ex(
    "Input",
    `<ButtonGroup aria-label="Send message">
  <Button variant="outline" aria-label="Add" startIcon={<PlusIcon />} />
  <ButtonGroupSeparator />
  <Input aria-label="Message" placeholder="Send message" endIcon={<PulseIcon />} />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <ButtonGroup aria-label="Send message">
          <Button variant="outline" className={styles.fieldButton} aria-label="Add" startIcon={<PlusIcon />} />
          <ButtonGroupSeparator />
          <Input
            aria-label="Message"
            placeholder="Send message"
            endIcon={<PulseIcon />}
          />
        </ButtonGroup>
      </div>
    </Stage>,
    "The input fills the row and shares one edge with the button. Do not pass a `size` to a child: the group sets it.",
  ),
  ex(
    "Search",
    `<ButtonGroup aria-label="Search">
  <Button variant="outline" aria-label="Search" startIcon={<MagnifyingGlassIcon />} />
  <ButtonGroupSeparator />
  <Input aria-label="Search" placeholder="Search" />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <ButtonGroup aria-label="Search">
          <Button
            variant="outline"
            className={styles.fieldButton}
            aria-label="Search"
            startIcon={<MagnifyingGlassIcon />}
          />
          <ButtonGroupSeparator />
          <Input aria-label="Search" placeholder="Search" />
        </ButtonGroup>
      </div>
    </Stage>,
  ),
  ex(
    "Search with separator",
    `<ButtonGroup aria-label="Search">
  <Button variant="outline" aria-label="Search" startIcon={<MagnifyingGlassIcon />} />
  <ButtonGroupSeparator />
  <Input aria-label="Search" placeholder="Search" />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <ButtonGroup aria-label="Search">
          <Button
            variant="outline"
            className={styles.fieldButton}
            aria-label="Search"
            startIcon={<MagnifyingGlassIcon />}
          />
          <ButtonGroupSeparator />
          <Input aria-label="Search" placeholder="Search" />
        </ButtonGroup>
      </div>
    </Stage>,
    "The separator and the input border share one pixel: the input overlaps the separator.",
  ),
  ex(
    "Select",
    `<ButtonGroup aria-label="Currency">
  <Select className={styles.currencySelect} aria-label="Currency" placeholder="USD" items={currencies} />
  <Input aria-label="Amount" placeholder="10.00" inputMode="decimal" />
  <ButtonGroupSeparator />
  <Button variant="outline" className={styles.fieldButton} aria-label="Next currency" startIcon={<ArrowRightIcon />} />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <ButtonGroup aria-label="Currency">
          <Select className={styles.currencySelect} aria-label="Currency" placeholder="USD" items={currencies} />
          <Input aria-label="Amount" placeholder="10.00" inputMode="decimal" />
          <ButtonGroupSeparator />
          <Button
            variant="outline"
            className={styles.fieldButton}
            aria-label="Next currency"
            startIcon={<ArrowRightIcon />}
          />
        </ButtonGroup>
      </div>
    </Stage>,
    "The select keeps its content width, the input takes the rest and the button keeps its size.",
  ),
  ex(
    "Separator",
    `<ButtonGroup aria-label="Export">
  <Button>CSV</Button>
  <ButtonGroupSeparator />
  <Button>JSON</Button>
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Export">
        <Button>CSV</Button>
        <ButtonGroupSeparator />
        <Button>JSON</Button>
      </ButtonGroup>
    </Stage>,
    "Use the separator with filled buttons, which have no border of their own.",
  ),
  ex(
    "Split",
    `<ButtonGroup aria-label="Actions">
  <Button>Button</Button>
  <ButtonGroupSeparator />
  <Button aria-label="More actions" startIcon={<PlusIcon />} />
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Actions">
        <Button>Button</Button>
        <ButtonGroupSeparator />
        <Button aria-label="More actions" startIcon={<PlusIcon />} />
      </ButtonGroup>
    </Stage>,
    "A main action next to a secondary one, separated by a `ButtonGroupSeparator`.",
  ),
  ex(
    "Popover",
    `<ButtonGroup aria-label="Copilot">
  <Popover>
    <PopoverTrigger variant="outline" startIcon={<SparkleIcon />} endIcon={<CaretDownIcon />}>
      Copilot
    </PopoverTrigger>
    <PopoverContent title="Start a new task with Copilot" description="Describe your task in natural language.">
      <Field label="Task description">
        <Textarea placeholder="I need to..." resize="none" />
      </Field>
    </PopoverContent>
  </Popover>
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Copilot">
        <Popover>
          <PopoverTrigger
            variant="outline"
            startIcon={<SparkleIcon />}
            endIcon={<CaretDownIcon />}
          >
            Copilot
          </PopoverTrigger>
          <PopoverContent
            title="Start a new task with Copilot"
            description="Describe your task in natural language."
          >
            <Field label="Task description">
              <Textarea placeholder="I need to..." resize="none" />
            </Field>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </Stage>,
    "Use a popover when the grouped action opens a small task form or additional controls.",
  ),
];
