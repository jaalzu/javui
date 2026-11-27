"use client";

import { Button, ButtonGroup, ButtonGroupSeparator, Menu } from "@javui/ui";
import { CaretDownIcon, CopyIcon } from "@/icons";

const items = [
  { label: "Deploy to staging", startIcon: <CopyIcon />, onSelect: () => {} },
  { label: "Duplicate", startIcon: <CopyIcon />, onSelect: () => {} },
];

/** Split buttons: the Menu receives callbacks, so this renders on the client. */
export function ButtonGroupSplitExample() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        alignItems: "center",
      }}
    >
      {/* Filled: the separator draws the divider. */}
      <ButtonGroup aria-label="Deploy">
        <Button>Deploy</Button>
        <ButtonGroupSeparator />
        <Menu
          label="More deploy options"
          trigger={
            <Button
              aria-label="More deploy options"
              startIcon={<CaretDownIcon />}
            />
          }
          items={items}
        />
      </ButtonGroup>

      {/* Outline: the border already divides, no separator. */}
      <ButtonGroup aria-label="Actions">
        <Button variant="outline">Deploy</Button>
        <Menu label="Options" variant="outline" items={items} />
      </ButtonGroup>
    </div>
  );
}
