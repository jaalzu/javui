"use client";

import { Button, ButtonGroup, Menu } from "@javui/ui";
import { CaretDownIcon, CheckIcon, CopyIcon, StarIcon, TrashIcon } from "@/icons";

export function ButtonGroupDropdownExample() {
  return (
    <ButtonGroup aria-label="Follow">
      <Button variant="outline">Follow</Button>
      <Menu
        label="More follow options"
        placement="bottom-end"
        width="sm"
        trigger={
          <Button
            variant="outline"
            aria-label="More follow options"
            startIcon={<CaretDownIcon />}
          />
        }
        items={[
          {
            label: "Mark as read",
            startIcon: <CheckIcon />,
            onSelect: () => {},
          },
          {
            label: "Share conversation",
            startIcon: <StarIcon />,
            onSelect: () => {},
          },
          {
            label: "Copy conversation",
            startIcon: <CopyIcon />,
            onSelect: () => {},
          },
          { type: "separator" },
          {
            label: "Delete conversation",
            startIcon: <TrashIcon />,
            destructive: true,
            onSelect: () => {},
          },
        ]}
      />
    </ButtonGroup>
  );
}
