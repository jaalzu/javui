import { DocsShell } from "@/app/docs/_layout/DocsShell";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return <DocsShell>{children}</DocsShell>;
}
