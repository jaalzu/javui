import type { Metadata } from "next";
import { DocPage } from "@/app/docs/_page/DocPage";
import { InstallationCards } from "./InstallationCards";
import { InstallationFromReadme } from "./InstallationFromReadme";

export const metadata: Metadata = { title: { absolute: "Installation · JavUI" } };

export default function Installation() {
  return (
    <DocPage
      href="/docs/installation"
      title="Installation"
      description="Install and configure JavUI for Next.js."
    >
      <InstallationCards />
      <InstallationFromReadme />
    </DocPage>
  );
}
