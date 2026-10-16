import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import type { AnchorHTMLAttributes } from "react";
import { ButtonLink } from "./ButtonLink";
import { LinkProvider } from "../Link";

describe("ButtonLink", () => {
  it("renders a native anchor styled as a button", () => {
    render(<ButtonLink href="/docs">Docs</ButtonLink>);
    const el = screen.getByRole("link", { name: "Docs" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/docs");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders with the component given to LinkProvider", () => {
    const Custom = (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a data-custom="yes" {...props}>{props.children}</a>;
    render(
      <LinkProvider component={Custom}>
        <ButtonLink href="/docs" variant="secondary">Docs</ButtonLink>
      </LinkProvider>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("data-custom", "yes");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<main><ButtonLink href="/a">One</ButtonLink> <ButtonLink href="/b" variant="ghost">Two</ButtonLink></main>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
