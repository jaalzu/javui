"use client";

import { Button, ButtonGroup, Menu } from "@javui/ui";
import { ArrowRightIcon, DotsThreeIcon } from "@javui/ui";
import styles from "./ButtonGroup.examples.module.css";

export function ButtonGroupActionsExample() {
  return (
    <div className={styles.centeredRow}>
      <Button
        variant="outline"
        aria-label="Next"
        startIcon={<ArrowRightIcon />}
      />
      <ButtonGroup aria-label="Preview actions">
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Save actions">
        <Button variant="outline">Save</Button>
        <Menu
          label="More options"
          trigger={
            <Button
              variant="outline"
              aria-label="More options"
              startIcon={<DotsThreeIcon />}
            />
          }
          items={[
            { label: "Save as template", onSelect: () => {} },
            { label: "Duplicate", onSelect: () => {} },
          ]}
        />
      </ButtonGroup>
    </div>
  );
}
