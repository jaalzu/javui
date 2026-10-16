import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders a paragraph by default", () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText("Hello").tagName).toBe("P");
  });

  it("picks the default element from the variant", () => {
    render(
      <>
        <Text variant="label">Label</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="code">code</Text>
      </>,
    );
    expect(screen.getByText("Label").tagName).toBe("SPAN");
    expect(screen.getByText("Caption").tagName).toBe("SPAN");
    expect(screen.getByText("code").tagName).toBe("CODE");
  });

  it("renders the element given in `as` and accepts its native props", () => {
    render(
      <>
        <Text as="label" htmlFor="email" variant="label">
          Email
        </Text>
        <input id="email" />
      </>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("passes through native attributes, className and ref", () => {
    let node: HTMLElement | null = null;
    render(
      <Text id="x" className="extra" lang="es" ref={(n) => { node = n; }}>
        Hola
      </Text>,
    );
    const el = screen.getByText("Hola");
    expect(el).toHaveAttribute("id", "x");
    expect(el).toHaveAttribute("lang", "es");
    expect(el).toHaveClass("extra");
    expect(node).toBe(el);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <Text>Body</Text>
        <Text tone="muted" variant="caption">Muted</Text>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
