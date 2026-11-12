import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { DescriptionList, DescriptionListDetails, DescriptionListTerm } from "./DescriptionList";

describe("DescriptionList", () => {
  it("renders native description list semantics", () => {
    render(
      <DescriptionList layout="horizontal">
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDetails>Shipped</DescriptionListDetails>
      </DescriptionList>,
    );
    expect(screen.getByRole("term")).toHaveTextContent("Status");
    expect(screen.getByRole("definition")).toHaveTextContent("Shipped");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListTerm>Name</DescriptionListTerm>
        <DescriptionListDetails>Ada</DescriptionListDetails>
      </DescriptionList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
