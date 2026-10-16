import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { '@': path.join(dirname, 'src') } },
  test: {
    passWithNoTests: true,
    projects: [
      {
        // Fast component tests in jsdom: behavior (Testing Library) + axe rules
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        // Every story rendered in a real browser, including the a11y addon (contrast works here)
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        // Pre-bundle Base UI parts so Vite does not reload the browser mid-run.
        optimizeDeps: {
          include: [
            'button', 'checkbox', 'dialog', 'field', 'fieldset', 'input', 'radio', 'radio-group', 'select', 'switch', 'tabs', 'tooltip', 'popover', 'menu', 'toast', 'avatar', 'accordion', 'progress', 'slider',
          ].map((p) => `@base-ui/react/${p}`),
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              // Optional: point at an existing Chromium (e.g. offline CI). Otherwise Playwright's own is used.
              launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : undefined,
            }),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
