"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Field,
  Input,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@javui/ui";
import { QuestionIcon, SlidersIcon } from "@javui/ui";

export function RenameTagExample() {
  const [open, setOpen] = useState(false);
  return (
    <Stack align="center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger variant="secondary" size="sm">Rename tag</PopoverTrigger>
        <PopoverContent title="Rename tag" description="Choose a short name for this tag.">
          <Stack gap="4">
            <Field label="Tag name">
              <Input defaultValue="Important" />
            </Field>
            <Stack direction="row" gap="2" align="center">
              <PopoverClose variant="ghost" size="xs">Cancel</PopoverClose>
              <Button variant="primary" size="xs" onClick={() => setOpen(false)}>Save</Button>
            </Stack>
          </Stack>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}

export function FiltersExample() {
  return (
    <Stack align="center">
      <Popover>
        <PopoverTrigger size="sm" endIcon={<SlidersIcon />}>Filters</PopoverTrigger>
        <PopoverContent title="Filters" description="Narrow the results by status.">
          <Stack gap="2">
            {['Draft', 'In review', 'Published', 'Archived', 'Needs attention', 'Assigned to me', 'Recently updated', 'Has comments'].map((label) => (
              <Checkbox key={label} label={label} />
            ))}
          </Stack>
          <Stack direction="row" gap="2" align="center">
            <Button variant="ghost" size="xs">Clear</Button>
            <PopoverClose variant="primary" size="xs">Apply</PopoverClose>
          </Stack>
        </PopoverContent>
      </Popover>
    </Stack>
  );
}

export function HelpExample() {
  return (
    <Stack align="center">
      <Popover>
        <PopoverTrigger
          variant="ghost"
          size="sm"
          startIcon={<QuestionIcon />}
          aria-label="How tags work"
        />
        <PopoverContent title="How tags work" description="Tags help you organize related work." />
      </Popover>
    </Stack>
  );
}

