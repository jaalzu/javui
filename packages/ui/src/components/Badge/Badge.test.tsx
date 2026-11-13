import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import { ArrowRightIcon, CheckIcon } from "../../icons/icons.generated";

describe("Badge", () => {
  it("renders its text in a span", () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active").tagName).toBe("SPAN");
  });

  it("renders as another element with a render prop", () => {
    render(
      <Badge
        render={(props) => (
          <a {...props} href="/docs">
            {props.children}
          </a>
        )}
      >
        Docs
      </Badge>,
    );
    expect(screen.getByRole("link", { name: "Docs" }).tagName).toBe("A");
  });

  it("renders icon slots", () => {
    const { container } = render(
      <Badge variant="success" startIcon={<CheckIcon />}>Active</Badge>,
    );
    const badge = container.firstElementChild!;
    expect(badge).toHaveAttribute("data-icon", "start");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");

    const { container: both } = render(
      <Badge startIcon={<CheckIcon />} endIcon={<ArrowRightIcon />}>Both</Badge>,
    );
    expect(both.firstElementChild).toHaveAttribute("data-icon", "both");
  });

  it("exposes an icon-only badge as an image", async () => {
    const { container } = render(
      <Badge aria-label="Verified" variant="success" startIcon={<CheckIcon />} />,
    );
    const badge = screen.getByRole("img", { name: "Verified" });
    expect(badge.tagName).toBe("SPAN");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("keeps an explicit role on an icon-only badge", () => {
    render(
      <Badge
        aria-label="Verified"
        role="status"
        variant="success"
        startIcon={<CheckIcon />}
      />,
    );
    expect(screen.getByRole("status", { name: "Verified" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        <Badge>Draft</Badge> <Badge variant="danger">Failed</Badge>
        <Badge aria-label="Verified" variant="success" startIcon={<CheckIcon />} />
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
