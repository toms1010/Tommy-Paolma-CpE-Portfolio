import { defineConfig, devices } from '@playwright/test';

// `vite preview` serves dist at the domain root, which mirrors Vercel
// production exactly. The relative Vite base ('./') lets the same build
// also work under the GitHub Pages project subpath, where every asset
// exists as a real static file (no SPA fallback involved there).
export const APP_PATH = '/';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  workers: 1,

  retries: process.env.CI ? 2 : 0,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    url: `http://127.0.0.1:4173${APP_PATH}`,
    reuseExistingServer: true,
    timeout: 120000,
  },

  projects: [
    {
      name: 'mobile-small',
      use: {
        ...devices['iPhone SE'],
        browserName: 'chromium',
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: 'mobile-360',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
        viewport: { width: 360, height: 800 },
      },
    },
    {
      name: 'mobile-375',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
      },
    },
    {
      name: 'mobile-390',
      use: {
        ...devices['iPhone 14 Pro'],
        browserName: 'chromium',
      },
    },
    {
      name: 'mobile-414',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
      },
    },
    {
      name: 'mobile-430',
      use: {
        ...devices['iPhone 14 Pro Max'],
        browserName: 'chromium',
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 768, height: 1024 },
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'desktop-1024',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'desktop-1280',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'desktop-1440',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-1920',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
