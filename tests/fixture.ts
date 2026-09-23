/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, type Page } from '@playwright/test';

export const test = base.extend<{ page: Page }>({
  page: async ({ page: initialPage }, use) => {
    const viewport = initialPage.viewportSize();
    const browser = initialPage.context().browser();
    if (!browser) {
      throw new Error('Browser not found');
    }
    const context = await browser.newContext({
      viewport: viewport ?? { width: 1280, height: 720 },
      isMobile: (viewport?.width ?? 1280) < 768,
      hasTouch: (viewport?.width ?? 1280) < 768,
      storageState: undefined,
    });
    const freshPage = await context.newPage();

    await use(freshPage);

    await context.close();
  },
});

export { expect } from '@playwright/test';