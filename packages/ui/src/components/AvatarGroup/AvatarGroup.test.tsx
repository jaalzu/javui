import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Avatar } from "../Avatar";
import { AvatarGroup } from "./AvatarGroup";

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Margaret Hamilton"];

describe("AvatarGroup", () => {
  it("collapses extra avatars into an accessible +N item", () => {
    render(
      <AvatarGroup aria-label="Team" max={3}>
        {people.map((name) => <Avatar key={name} name={name} />)}
      </AvatarGroup>,
    );
    expect(screen.getByRole("group", { name: "Team" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "and 2 more" })).toHaveTextContent("+2");
    expect(screen.queryByRole("img", { name: "Margaret Hamilton" })).not.toBeInTheDocument();
  });

  it("defaults to four visible avatars", () => {
    render(
      <AvatarGroup>
        {people.map((name) => <Avatar key={name} name={name} />)}
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "and 1 more" })).toBeInTheDocument();
  });

  it("shares its size with the avatars", () => {
    render(
      <AvatarGroup aria-label="Team" size="lg">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
      </AvatarGroup>,
    );
    for (const avatar of screen.getAllByRole("img")) {
      expect(avatar.className).toContain("lg");
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AvatarGroup aria-label="Team" max={2}>
        {people.map((name) => <Avatar key={name} name={name} />)}
      </AvatarGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
