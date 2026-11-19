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
} from "@javui/ui";
import {
  ArrowRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  PulseIcon,
  SparkleIcon,
} from "@javui/ui";
import { defineHero, ex, type Example } from "@/docs/example";
import { ButtonGroupActionsExample } from "./ButtonGroupActionsExample";
import styles from "./ButtonGroup.examples.module.css";
import { ButtonGroupDropdownExample } from "./ButtonGroupDropdownExample";

const currencies = [
  { value: "usd", label: "$" },
  { value: "eur", label: "€" },
  { value: "gbp", label: "£" },
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
    "Orientation",
    `<ButtonGroup aria-label="Quantity" orientation="vertical">
  <Button variant="outline" aria-label="Increase" startIcon={<PlusIcon />} />
  <Button variant="outline" aria-label="Decrease" startIcon={<MinusIcon />} />
</ButtonGroup>`,
    <Stage>
      <ButtonGroup aria-label="Quantity" orientation="vertical" size="sm">
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
    "Set the orientation prop to change the button group layout.",
  ),
  ex(
    "Size",
    `<ButtonGroup aria-label="Small" size="sm">
  <Button variant="outline">Save</Button>
  <Button variant="outline">Preview</Button>
</ButtonGroup>`,
    <Stage>
      <div className={styles.stack}>
        {(["xs", "sm", "md", "lg"] as const).map((size) => (
          <ButtonGroup key={size} aria-label={`${size} actions`} size={size}>
            <Button variant="outline">Save</Button>
            <Button variant="outline">Preview</Button>
            <Button
              variant="outline"
              aria-label="Add"
              startIcon={<PlusIcon />}
            />
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
    "Dropdown menu",
    `<ButtonGroup aria-label="Follow">
  <Button variant="outline">Follow</Button>
  <Menu
    label="More follow options"
    placement="bottom-end"
    trigger={<Button variant="outline" aria-label="More follow options" startIcon={<CaretDownIcon />} />}
    items={[/* ... */]}
  />
</ButtonGroup>`,
    <Stage>
      <ButtonGroupDropdownExample />
    </Stage>,
    "A split button whose secondary action opens a menu with icons.",
  ),
  ex(
    "Input",
    `<ButtonGroup aria-label="Send message">
  <Button variant="outline" aria-label="Add" startIcon={<PlusIcon />} />
  <Input aria-label="Message" placeholder="Send message" endIcon={<PulseIcon />} />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <div className={styles.row}>
          <Button
            pill
            variant="outline"
            aria-label="Add"
            startIcon={<PlusIcon />}
          />
          <Input
            aria-label="Message"
            placeholder="Send message"
            endIcon={<PulseIcon />}
          />
        </div>
      </div>
    </Stage>,
    "The input fills the row and shares one edge with the button. Do not pass a `size` to a child: the group sets it.",
  ),
  ex(
    "Search button",
    `<ButtonGroup aria-label="Search">
  <Input aria-label="Search" placeholder="Search" />
  <Button variant="outline">Search</Button>
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <ButtonGroup aria-label="Search">
          <Input aria-label="Search" placeholder="Type anything" />
          <Button
            variant="outline"
            aria-label="search"
            startIcon={<ArrowRightIcon />}
          ></Button>
        </ButtonGroup>
      </div>
    </Stage>,
  ),
  ex(
    "Select",
    `<ButtonGroup aria-label="Currency">
  <Input aria-label="Amount" placeholder="10.00" inputMode="decimal" />
</ButtonGroup>`,
    <Stage>
      <div className={styles.constrained}>
        <div className={styles.row}>
          <ButtonGroup aria-label="Amount">
            <Select aria-label="Currency" placeholder="$" items={currencies} />
            <Input
              aria-label="Amount"
              placeholder="10.00"
              inputMode="decimal"
            />
          </ButtonGroup>
          <Button
            variant="outline"
            pill
            aria-label="Next currency"
            startIcon={<ArrowRightIcon />}
          />
        </div>
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
