import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { Button } from "../Button";
import { Menu } from "../Menu";
import { ButtonGroup } from "./ButtonGroup";

describe("debug", () => {
  it("menu", async () => {
    const user = userEvent.setup();
    render(
      <ButtonGroup aria-label="Actions">
        <Menu label="Open" items={[{ label: "One" }]} />
        <Button variant="secondary">Other</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Actions" });
    console.log("BEFORE", Array.from(group.children).map((c) => c.outerHTML));
    await user.click(screen.getByRole("button", { name: "Open" }));
    console.log("AFTER", Array.from(group.children).map((c) => c.outerHTML));
  });
});
