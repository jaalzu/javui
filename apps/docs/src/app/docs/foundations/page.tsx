import type { Metadata } from "next";
import { Heading, Link, Text } from "@javui/ui";
import { DocPage } from "@/app/docs/_page/DocPage";

export const metadata: Metadata = { title: "Foundations" };

export default function Foundations() {
  return (
    <DocPage
      href="/docs/foundations"
      title="Foundations"
      description="The visual language shared by every surface and component in ui-lib."
    >
      <p>Foundations define the decisions that should remain consistent across an application. They are not components and they do not impose a page layout.</p>

      <Heading as="h2" size={6}>What belongs here</Heading>
      <ul>
        <li><Link href="/docs/colors">Colors</Link>: semantic foregrounds, surfaces, borders and states.</li>
        <li><Link href="/docs/surfaces">Surfaces</Link>: page, card, sunken, highlight and modal depth.</li>
        <li><Link href="/docs/typography">Typography</Link>: text styles, heading hierarchy and readable content.</li>
        <li><Link href="/docs/theming">Theming</Link>: CSS custom properties and light/dark themes.</li>
        <li><Link href="/docs/animations">Motion</Link>: durations, easing and reduced-motion behavior.</li>
      </ul>

      <Heading as="h2" size={6}>The rule</Heading>
      <Text>Components consume foundation tokens. Application code can customize documented styling hooks, but should not bypass the semantic layer with hardcoded colors, spacing, type or motion values.</Text>
    </DocPage>
  );
}
