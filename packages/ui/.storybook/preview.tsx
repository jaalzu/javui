import type { Preview } from '@storybook/nextjs-vite'
import { useLayoutEffect, type ReactNode } from 'react'
import NextLink from 'next/link'
import { LinkProvider } from '../src/ui'

// Same stylesheet as the app (src/app/layout.tsx): fonts, tokens and global body styles.
// tokens.css is also pulled in by global.css; importing it again keeps this entry explicit.
import '../src/ui/tokens/tokens.css'
import '../src/ui/styles/global.css'
import '../src/ui/tokens/tailwind.css'

/**
 * Mirrors `next-themes` in the app: `light`/`dark` set `data-theme` on <html>, `system`
 * removes it so the OS preference in tokens.css applies. Runs in an effect so the DOM is
 * not mutated during render.
 */
function ThemeDecorator({ theme, children }: { theme: string; children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
  }, [theme])

  return <>{children}</>
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'system' },
  decorators: [
    (Story, context) => (
      <ThemeDecorator theme={context.globals.theme as string}>
        <LinkProvider component={NextLink}>
          <Story />
        </LinkProvider>
      </ThemeDecorator>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    // The page background comes from the app's body styles, not from the backgrounds addon.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' fails the Storybook test run on any axe violation
      test: 'error',
    },
  },
}

export default preview
