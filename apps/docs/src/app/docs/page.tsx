import type { Metadata } from "next";
import { Button, Heading, Stack } from "@javui/ui";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = {
  title: { absolute: "Introduction · JavUI" },
};

export default function Introduction() {
  return (
    <DocPage
      href="/docs"
      title="Introduction"
      description="JavUI is a React component library for Next.js: calm, readable and accessible by default."
    >
      <p>
        JavUI is a set of React components for Next.js. It aims to look good
        without effort: soft surfaces, clear type, careful spacing and motion
        that stays out of the way, in light and dark.
      </p>
      <p>
        Every component works with the keyboard and screen readers. Behavior
        comes from Base UI, so focus and ARIA are already solved, and the visual
        design is what JavUI adds on top.
      </p>
      <p>
        To make it yours, change a few tokens (colors, radius, fonts) and every
        component follows. You install it as a package and update it like any
        dependency, with no component source to maintain.
      </p>

      <Heading as="h2" size={6} id="principles">
        Principles
      </Heading>
      <ul>
        <li>
          <strong>Good defaults.</strong> Components look finished the moment
          you use them.
        </li>
        <li>
          <strong>One theme, a few variables.</strong> Change tokens, not
          components.
        </li>
        <li>
          <strong>Accessible by design.</strong> Required props, like{" "}
          <code>closeLabel</code> on a dialog, prevent the common misses.
        </li>
      </ul>

      <Heading as="h2" size={6} id="status">
        Status
      </Heading>
      <p>
        JavUI is young. It is at version 0.x, built for the Next.js App Router,
        and the API may still change between minor versions. Read the changelog
        before updating.
      </p>

      <Stack direction="row" gap="3">
        <Button href="/docs/installation">Installation</Button>
        <Button href="/docs/components" variant="secondary">
          Components
        </Button>
      </Stack>
    </DocPage>
  );
}
