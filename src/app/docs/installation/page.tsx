import type { Metadata } from "next";
import { Alert, CodeBlock, Heading, Link } from "@/ui";
import styles from "../../site.module.css";
import { DocPage } from "../DocPage";

export const metadata: Metadata = { title: "Installation" };

const providers = `"use client";

import { ThemeProvider } from "next-themes";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { LinkProvider, ToastProvider, TooltipProvider } from "@/ui";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LinkProvider component={NextLink}>
        <TooltipProvider>
          <ToastProvider>{children}</ToastProvider>
        </TooltipProvider>
      </LinkProvider>
    </ThemeProvider>
  );
}`;

const layout = `import "@/ui/styles/global.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}`;

const first = `import { Button, Heading, Stack, Text } from "@/ui";

export default function Page() {
  return (
    <Stack gap="4">
      <Heading as="h1">Hello</Heading>
      <Text>Your first screen.</Text>
      <Button>Save</Button>
    </Stack>
  );
}`;

const prompt = `Read https://your-site.com/llms.txt (and /llms-full.txt for details), or AGENT_GUIDE.md if you have the repository.

Then add ui-lib to this Next.js project:
1. Copy src/ui from the ui-lib repository into src/ui here.
2. Install: @base-ui/react next-themes @fontsource-variable/inter @fontsource-variable/newsreader @fontsource/commit-mono
3. Create the providers from /docs/installation (ThemeProvider, LinkProvider with next/link, TooltipProvider, ToastProvider).
4. Import "@/ui/styles/global.css" in the root layout.

Build the screen I ask for using only components from "@/ui" and semantic tokens. Follow get_guidelines / llms.txt rules.`;

const tailwind = `@import "tailwindcss";
@import "@/ui/styles/global.css";
@import "@/ui/tokens/tailwind.css";`;

function installCommands(pkgs: string) {
  return [
    { label: "bun", code: `bun add ${pkgs}` },
    { label: "pnpm", code: `pnpm add ${pkgs}` },
    { label: "npm", code: `npm install ${pkgs}` },
    { label: "yarn", code: `yarn add ${pkgs}` },
  ];
}

export default function Installation() {
  return (
    <DocPage
      href="/docs/installation"
      title="Installation"
      description="How to add ui-lib to your app and wire it up. It is not on npm yet, so you copy the folder."
    >
      <Alert tone="info" title="Requirements">
        Works with React 18+ in Next.js, Vite, Astro, React Router and TanStack
        Start.
      </Alert>
      <p>Choose the setup that matches how you work.</p>
      <ul className={styles.chooser}>
        <li>
          <Link
            href="#copy-the-folder"
            tone="inherit"
            className={styles.chooseLink}
          >
            <span className={styles.chooseTitle}>Copy the folder</span>
            <span className={styles.chooseText}>
              Add ui-lib to your app yourself, step by step.
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="#use-an-agent"
            tone="inherit"
            className={styles.chooseLink}
          >
            <span className={styles.chooseTitle}>Use an agent</span>
            <span className={styles.chooseText}>
              Paste a prompt into Claude Code, Cursor or any coding agent.
            </span>
          </Link>
        </li>
      </ul>

      <Heading as="h2" size="h2" id="copy-the-folder">
        Copy the folder
      </Heading>
      <Heading as="h3" size="h4">
        1. Copy the library
      </Heading>
      <p>
        Copy the whole <code>src/ui</code> folder from the ui-lib repository
        into <code>src/ui</code> in your app. It has the components, the tokens
        (<code>tokens.css</code> is already generated) and the global styles.
        Your <code>tsconfig.json</code> needs the alias <code>@/*</code>{" "}
        pointing to <code>./src/*</code>, which is the Next.js default.
      </p>

      <Heading as="h3" size="h4">
        2. Install the dependencies
      </Heading>
      <CodeBlock
        language="bash"
        label="Install dependencies"
        tabs={installCommands(
          "@base-ui/react next-themes @fontsource-variable/inter @fontsource-variable/newsreader @fontsource/commit-mono",
        )}
      />

      <Heading as="h3" size="h4">
        3. Add the providers
      </Heading>
      <p>
        Create <code>src/app/providers.tsx</code>. It sets the theme, makes
        every link use <code>next/link</code>, and enables tooltips and toasts.
      </p>
      <CodeBlock language="tsx" label="providers.tsx" code={providers} />

      <Heading as="h3" size="h4">
        4. Load the styles
      </Heading>
      <p>
        Import the global styles and the providers in your root layout. Keep{" "}
        <code>suppressHydrationWarning</code> on <code>html</code>: next-themes
        sets <code>data-theme</code> before React hydrates.
      </p>
      <CodeBlock language="tsx" label="layout.tsx" code={layout} />

      <Heading as="h3" size="h4">
        5. Use a component
      </Heading>
      <CodeBlock language="tsx" label="page.tsx" code={first} />

      <Heading as="h2" size="h2" id="use-an-agent">
        Use an agent
      </Heading>
      <p>
        Agents do not need to know ui-lib in advance: they read it. Deploy the
        site (or open the repository) and paste a prompt like this into Claude
        Code, Cursor or any coding agent. Replace the address with yours.
      </p>
      <CodeBlock language="text" label="Prompt for an agent" code={prompt} />
      <p>
        If you add the MCP server, the agent can ask for guidelines, components
        and tokens instead of reading files. See{" "}
        <Link href="/docs/agents">For agents</Link>.
      </p>

      <Heading as="h2" size="h2" id="tailwind">
        Tailwind (optional)
      </Heading>
      <p>
        ui-lib does not need Tailwind. If your app uses Tailwind v4, the tokens
        are also available as utilities such as <code>bg-bg</code>,{" "}
        <code>text-fg</code> and <code>border-border</code>. Import the
        generated bridge after Tailwind and the global styles, and keep{" "}
        <code>tokens.css</code> out of any <code>@layer</code>.
      </p>
      <CodeBlock language="css" label="Tailwind setup" code={tailwind} />

      <Heading as="h2" size="h2" id="rebuild-tokens">
        Rebuild tokens and agent docs
      </Heading>
      <p>
        Only needed if you change tokens or add components. Copy the{" "}
        <code>scripts</code> folder too and install{" "}
        <code>style-dictionary</code>, <code>culori</code> and{" "}
        <code>react-docgen-typescript</code> as dev dependencies.{" "}
        <code>bun run dev</code> rebuilds the CSS when you save a token file;{" "}
        <code>bun run build</code> rebuilds the CSS and the agent files.
      </p>
    </DocPage>
  );
}
