import type { Preview } from '@storybook/nextjs-vite'
import { useLayoutEffect, type ReactNode } from 'react'
import NextLink from 'next/link'
import { LinkProvider } from '../src'

import './globals.css'
import '../src/tokens/tailwind.css'
// The library ships no @font-face: Storybook loads the fonts the tokens reference.
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource/commit-mono/400.css'

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
