import type { Preview } from '@storybook/nextjs-vite'
import '../src/ui/styles/global.css'

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
    (Story, context) => {
      const theme = context.globals.theme as string
      const root = document.documentElement
      if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme)
      else root.removeAttribute('data-theme')
      return <Story />
    },
  ],
  parameters: {
    layout: 'fullscreen',
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
};

export default preview;
