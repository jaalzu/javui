"use client";

import { Button, ButtonGroup, Menu } from "@/ui";

/** Split button: the Menu passes item callbacks, so the example renders on the client. */
export function ButtonGroupSplitExample() {
  return (
    <ButtonGroup aria-label="Deploy">
      <Button>Deploy</Button>
      <Menu
        label="Options"
        variant="primary"
        items={[
          { label: "Deploy to staging", onSelect: () => {} },
          { label: "Deploy to production", onSelect: () => {} },
        ]}
      />
    </ButtonGroup>
  );
}
