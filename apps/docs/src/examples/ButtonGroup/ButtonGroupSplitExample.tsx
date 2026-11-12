"use client";

import { Button, ButtonGroup, Menu } from "@javui/ui";

/** Split button: the Menu passes item callbacks, so the example renders on the client. */
export function ButtonGroupSplitExample() {
  return (
    <ButtonGroup aria-label="Deploy">
      <Button variant="outline">Deploy</Button>
      <Menu
        label="Options"
        variant="outline"
        items={[
          { label: "Deploy to staging", onSelect: () => {} },
          { label: "Deploy to production", onSelect: () => {} },
        ]}
      />
    </ButtonGroup>
  );
}
