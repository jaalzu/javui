import type { Metadata } from "next";
import { Text } from "@/ui";
import { UtilityGuide } from "@/app/docs/_page/UtilityGuide";
export const metadata: Metadata = { title: "Box" };
export default function BoxPage() { return <UtilityGuide href="/docs/box" title="Box" description="Apply token-based borders, surfaces and inset spacing to a content area." rule="Use Box when a region needs a visual boundary. Use Card for a full content surface with a component API; use ui-box for a small external composition." code={`<div className="ui-box ui-box-sunken ui-box-sm">\n  <Text>Inset content</Text>\n</div>`} example={<div className="ui-box ui-box-sunken ui-box-sm"><Text>Inset content</Text></div>} />; }
