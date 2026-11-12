"use client";

import { Button, ButtonGroup, Menu } from "@javui/ui";
import { ArrowRightIcon, DotsThreeIcon } from "@javui/ui";
import styles from "./ButtonGroup.examples.module.css";

/** Interactive action row used by the server-rendered ButtonGroup examples page. */
export function ButtonGroupActionsExample() {
  return (
    <div className={styles.centeredRow}>
      <Button size="md" variant="outline" aria-label="Next" startIcon={<ArrowRightIcon />} />
      <ButtonGroup aria-label="Preview actions">
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Save actions" className={styles.menuGroup}>
        <Button variant="outline">Save</Button>
        <Menu
          label="More"
          variant="outline"
          trigger={<Button variant="outline" aria-label="More options" startIcon={<DotsThreeIcon />} />}
          items={[
            { label: "Save as template", onSelect: () => {} },
            { label: "Duplicate", onSelect: () => {} },
          ]}
        />
      </ButtonGroup>
    </div>
  );
}
