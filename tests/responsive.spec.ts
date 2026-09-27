import { test, expect } from './fixture';
import type { Page } from '@playwright/test';
import { APP_PATH } from '../playwright.config';
import { EMAIL } from '../src/data/portfolio';

const SECTIONS = [
  '#home',
  '#about',
  '#computer-engineering',
  '#projects',
  '#skills',
  '#education',
  '#experience',
  '#certifications',
  '#resume',
  '#contact',
];

function viewportWidth(): number {
  return test.info().project.use.viewport?.width ?? 1440;
}

async function settleSection(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await expect(page.locator(`${selector} .reveal.is-visible`)).toBeVisible();
  // Some external images may never load; give them a short grace period.
  // Scoped to the section under test: below-fold lazy images elsewhere on
  // the page intentionally haven't loaded yet and must not block the suite.
  await page.waitForFunction(
    (sel: string) =>
      Array.from(document.querySelectorAll(`${sel} img`)).every(
        (img) => (img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0
      ),
    selector,
    { timeout: 15000 }
  );
  await page.waitForTimeout(700);
}

async function gotoApp(page: Page): Promise<void> {
  await page.goto(APP_PATH);
  await page.waitForLoadState('domcontentloaded');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await page.waitForTimeout(300);
}

test.describe('Portfolio responsive suite', () => {
  test('page loads with correct title', async ({ page }) => {
    await gotoApp(page);
    await expect(page).toHaveTitle(/Tommy Paolma/i);
  });

  test('has no horizontal overflow', async ({ page }) => {
    await gotoApp(page);
    // Sweep the full page so lazy content renders, then measure.
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    expect(overflow).toBe(false);
  });

  test('all sections render', async ({ page }) => {
    await gotoApp(page);
    for (const selector of SECTIONS) {
      await expect(page.locator(selector), `${selector} should be visible`).toBeVisible();
    }
  });

  test('navigation reaches every section', async ({ page }) => {
    await gotoApp(page);
    const width = viewportWidth();
    const menuButton = page.getByRole('button', { name: /navigation menu/i });

    // The hamburger menu is visible below the Tailwind `lg` breakpoint (1024px).
    if (width < 1024) {
      await expect(menuButton).toBeVisible();
      const hasTouch = await page.evaluate(() => navigator.maxTouchPoints > 0);
      if (hasTouch) {
        await menuButton.tap();
      } else {
        await menuButton.click();
      }
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      // Scope to the open dialog: the desktop nav also contains this link (hidden below lg).
      const aboutLink = page.getByRole('dialog').locator('ul a[href="#about"]');
      await aboutLink.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#about')).toBeInViewport();
    } else {
      await expect(menuButton).toBeHidden();
      const links = page.locator('nav ul a');
      expect(await links.count()).toBeGreaterThan(0);
      await page.locator('nav ul a[href="#projects"]').click();
      await expect(page.locator('#projects')).toBeInViewport();
      await page.locator('nav ul a[href="#contact"]').click();
      await expect(page.locator('#contact')).toBeInViewport();
    }
  });

test('mobile menu toggles closed again', async ({ page }) => {
    await gotoApp(page);
    test.skip(viewportWidth() >= 1024, 'mobile-only behavior');
    const menuButton = page.getByRole('button', { name: /navigation menu/i });
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    // The open menu is a full-screen dialog with its own Close button (it covers the header).
    await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

test('project filtering works', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#projects');
    const status = page.locator('#projects [role="status"]');
    await page.getByRole('button', { name: 'Orders', exact: true }).click();
    await expect(status).toContainText('Showing 2 of 10 projects.');
    await expect(page.locator('#projects article')).toHaveCount(2);
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await expect(status).toContainText('Showing 10 of 10 projects.');
    await expect(page.locator('#projects article')).toHaveCount(10);
  });

  test('CV download points to the real PDF', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#resume');
    const cvLink = page.locator('#resume a[data-download-cv]');
    await expect(cvLink).toBeVisible();
    await expect(cvLink).toHaveAttribute('href', /Tommy-Paolma-CV\.pdf$/);
  });

  test('contact email opens the inbox of the real address', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#contact');
    const emailLink = page.locator('#contact a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', `mailto:${EMAIL}`);
  });

  test('featured projects show real links only', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#projects');
    const featured = page.locator('#projects [aria-label="Featured projects"]');
    await expect(featured.getByRole('heading', { name: 'Windows vs Linux Academy' })).toBeVisible();
    await expect(
      featured.getByRole('link', { name: /Windows vs Linux Academy live demo/i })
    ).toHaveAttribute('href', 'https://windows-linux-academy.vercel.app/');
    await expect(
      featured.getByRole('link', { name: /Windows vs Linux Academy case study/i })
    ).toHaveAttribute('href', '#project-windows-linux-academy');
    // No verified GitHub repo exists for the Academy, so no GitHub button is rendered.
    await expect(
      featured.getByRole('link', { name: /Windows vs Linux Academy source code/i })
    ).toHaveCount(0);
    await expect(featured.getByRole('heading', { name: 'JDAJNSH' })).toBeVisible();
    await expect(featured.getByRole('heading', { name: 'MARPOL Ocean Adventure' })).toBeVisible();
    await expect(
      featured.getByRole('link', { name: /JDAJNSH live demo/i })
    ).toHaveAttribute('href', 'https://toms1010.github.io/JDAJNSH/');
    await expect(
      featured.getByRole('link', { name: /JDAJNSH source code on GitHub/i })
    ).toHaveAttribute('href', 'https://github.com/toms1010/JDAJNSH');
    await expect(
      featured.getByRole('link', { name: /MARPOL Ocean Adventure live demo/i })
    ).toHaveAttribute('href', 'https://marpol-ocean-adventure.vercel.app/');
    // No verified GitHub repo exists for MARPOL, so no GitHub button is rendered.
    await expect(
      featured.getByRole('link', { name: /MARPOL Ocean Adventure source code/i })
    ).toHaveCount(0);
  });

  test('academy case study renders with live demo and navigation', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#project-windows-linux-academy');
    const study = page.locator('#project-windows-linux-academy');
    await expect(
      study.getByRole('heading', { name: 'Windows vs Linux Academy', exact: true })
    ).toBeVisible();
    await expect(
      study.getByRole('link', { name: /live demo/i }).first()
    ).toHaveAttribute('href', 'https://windows-linux-academy.vercel.app');
    await expect(
      study.getByRole('link', { name: /Back to Projects/i }).first()
    ).toHaveAttribute('href', '#projects');
    await expect(
      study.getByRole('link', { name: /Previous project/i })
    ).toHaveAttribute('href', '#project-jdajnsh');
    await expect(study.getByRole('link', { name: /Next project/i })).toHaveAttribute(
      'href',
      '#project-marpol-ocean-adventure'
    );
    // Real screenshots ship with the case study.
    await expect(study.locator('img[alt*="Windows vs Linux Academy"]')).not.toHaveCount(0);
  });

  test('contact form validates input', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#contact');
    const form = page.locator('#contact form');
    await expect(form).toBeVisible();
    // Use JS click to avoid Playwright's stability check issues with layout shift
    await form.locator('#cfName').fill('Juan Dela Cruz');
    await form.locator('#cfEmail').fill('not-an-email');
    await form.locator('#cfMessage').fill('Hello, I have an internship opportunity.');
    await page.evaluate(() => {
      const btn = document.querySelector<HTMLButtonElement>('#contact form button[type="submit"]');
      btn?.click();
    });
    await expect(form.getByText('Please enter your name.')).toBeHidden();
    await expect(form.getByText('Please enter a valid email address.')).toBeVisible();
    await expect(form.getByText('Please write a message of at least 10 characters.')).toBeHidden();
  });

  test('dark/light mode toggle persists', async ({ page }) => {
    await gotoApp(page);
    const toggle = page.getByRole('button', { name: /mode/i });
    await expect(toggle).toBeVisible();
    const html = page.locator('html');
    const initiallyDark = await html.evaluate((el) => el.classList.contains('dark'));
    await toggle.click();
    if (initiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
      expect(await page.evaluate(() => window.localStorage.getItem('tp-theme'))).toBe('light');
    } else {
      await expect(html).toHaveClass(/dark/);
      expect(await page.evaluate(() => window.localStorage.getItem('tp-theme'))).toBe('dark');
    }
    await toggle.click();
    if (initiallyDark) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });

  test('no critical console errors on load', async ({ page }) => {
    await gotoApp(page);
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.waitForTimeout(1500);
    expect(errors).toEqual([]);
  });

  test('captures layout screenshot', async ({ page }) => {
    await gotoApp(page);
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: `screenshots/${test.info().project.name}.png`,
      fullPage: true,
    });
  });
});
