import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";
import { CheckIcon } from "../../icons/icons.generated";

describe("Avatar", () => {
  it("is one image named after the person", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("shows initials as the fallback, hidden from assistive technology", () => {
    render(<Avatar name="Ada Lovelace" />);
    const initials = screen.getByText("AL");
    expect(initials).toHaveAttribute("aria-hidden", "true");
  });

  it("uses one letter for a single name", () => {
    render(<Avatar name="Prince" />);
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  it("keeps the default DOM to the fallback only", () => {
    const { container } = render(<Avatar name="Ada Lovelace" size="lg" />);
    const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
    expect(avatar.children).toHaveLength(1);
    expect(container.querySelector("[data-avatar-status]")).toBeNull();
    expect(container.querySelector("[data-avatar-badge]")).toBeNull();
  });

  it("appends the status to the accessible name", () => {
    const { container } = render(<Avatar name="Ada Lovelace" status="online" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace, online" })).toBeInTheDocument();
    expect(container.querySelector("[data-avatar-status]")).toHaveAttribute("data-avatar-status", "online");
  });

  it("requires a label for a badge and appends it", () => {
    const { container } = render(
      <Avatar name="Ada Lovelace" badge={<CheckIcon />} badgeLabel="Verified" />,
    );
    expect(screen.getByRole("img", { name: "Ada Lovelace, Verified" })).toBeInTheDocument();
    expect(container.querySelector("[data-avatar-badge]")).toBeInTheDocument();
  });

  it("uses an icon instead of the initials", () => {
    render(<Avatar name="Build bot" icon={<CheckIcon />} />);
    expect(screen.queryByText("BB")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Build bot" }).querySelector("svg")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<div><Avatar name="Ada Lovelace" /><Avatar name="Grace Hopper" src="/none.png" size="lg" /></div>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
