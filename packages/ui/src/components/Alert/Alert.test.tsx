import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("announces error and warning immediately", () => {
    render(<><Alert tone="error" title="Failed">Try again</Alert><Alert tone="warning" title="Careful" /></>);
    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });

  it("announces neutral, info and success politely", () => {
    render(<><Alert title="Note" /><Alert tone="success" title="Saved" /></>);
    expect(screen.getAllByRole("status")).toHaveLength(2);
  });

  it("shows title and message and hides the icon from assistive technology", () => {
    const { container } = render(<Alert tone="error" title="Payment failed">Check your card.</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Payment failed");
    expect(screen.getByRole("alert")).toHaveTextContent("Check your card.");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Alert title="Info">Message</Alert>
        <Alert tone="success" title="Done" />
        <Alert tone="warning" title="Careful">Message</Alert>
        <Alert tone="error" title="Failed">Message</Alert>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
