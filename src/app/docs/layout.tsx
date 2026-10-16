import { DocsShell } from "./DocsShell";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return <DocsShell>{children}</DocsShell>;
}
