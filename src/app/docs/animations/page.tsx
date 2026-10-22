import type { Metadata } from "next";
import { Heading } from "@/ui";
import { DocPage } from "@/app/docs/_page/DocPage";
import { AnimationsDemo } from "./AnimationsDemo";

export const metadata: Metadata = { title: "Animations" };

export default function Animations() {
  return (
    <DocPage
      href="/docs/animations"
      title="Animations"
      description="Motion tokens for feedback, entrances and transitions. Every duration stays under 300ms."
    >
      <p>
        Motion explains what changed. Use the shortest duration that still
        reads, ease out when something answers the user, and never animate
        anything that is not opacity, transform, color, background or
        box-shadow.
      </p>
      <p>
        These examples use the same tokens as the components. Each section has
        its own <strong>Play again</strong> button.
      </p>

      <AnimationsDemo />

      <Heading as="h2" size={6}>
        Reduced motion
      </Heading>
      <p>
        The global styles drop transforms and keep short fades when
        <code>prefers-reduced-motion</code> is set. Spinners slow down and
        skeletons stay still.
      </p>
    </DocPage>
  );
}
