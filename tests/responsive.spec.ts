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
  // The section may contain many below-fold lazy images that never load
  // (e.g. a long screenshot gallery). Only wait for images that are in the
  // viewport so a tall section never blocks the suite.
  await page.waitForFunction(
    (sel) => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(`${sel} img`));
      // Only consider images whose top is above the bottom of the viewport.
      const inView = imgs.filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.top < window.innerHeight + 20;
      });
      if (inView.length === 0) return true;
      return inView.every(
        (img) => img.complete || img.naturalWidth === 0 || img.offsetHeight === 0
      );
    },
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
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      // Scope to the open dialog: the desktop nav also contains this link (hidden below lg).
      const aboutLink = page.getByRole('dialog').locator('ul a[href="#about"]').first();
      await aboutLink.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#about')).toBeInViewport();
    } else {
      await expect(menuButton).toBeHidden();
      const links = page.locator('nav ul a');
      expect(await links.count()).toBeGreaterThan(0);
      await page.locator('nav ul a[href="#projects"]').click();
      await expect(page.locator('#projects')).toBeInViewport();
      // Contact lives inside the About dropdown (per the navigation wireframe),
      // so open the dropdown and click Contact from there.
      await page.locator('nav ul button[aria-label="ABOUT submenu"]').click();
      await page.locator('[role="menu"] a[href="#contact"]').click();
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
    const projects = page.locator('#projects');
    const status = projects.locator('[role="status"]');
    await projects.getByRole('button', { name: 'Orders', exact: true }).click();
    await expect(status).toContainText('Showing 2 of 16 projects.');
    await expect(projects.locator('article')).toHaveCount(2);
    await projects.getByRole('button', { name: 'All', exact: true }).click();
    await expect(status).toContainText('Showing 16 of 16 projects.');
    await expect(projects.locator('article')).toHaveCount(16);
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
    await expect(featured.getByRole('heading', { name: 'JDAJNSH' })).toBeVisible();
    await expect(featured.getByRole('heading', { name: 'MARPOL Ocean Adventure' })).toBeVisible();
    await expect(featured.getByRole('link', { name: /JDAJNSH live demo/i })).toHaveAttribute(
      'href',
      'https://toms1010.github.io/JDAJNSH/'
    );
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

  test('transport system case study renders with live demo and navigation', async ({ page }) => {
    await gotoApp(page);
    await settleSection(page, '#project-transport-system');
    const study = page.locator('#project-transport-system');
    await expect(
      study.getByRole('heading', { name: 'Student Transport Management System', exact: true })
    ).toBeVisible();
    await expect(study.getByRole('link', { name: /source code/i }).first()).toHaveAttribute(
      'href',
      'https://github.com/toms1010/Transport_System_Cpp'
    );
    await expect(study.getByRole('link', { name: /Back to Projects/i }).first()).toHaveAttribute(
      'href',
      '#projects'
    );
    await expect(study.getByRole('link', { name: /Previous project/i })).toHaveAttribute(
      'href',
      '#project-jdajnsh'
    );
    await expect(study.getByRole('link', { name: /Next project/i })).toHaveAttribute(
      'href',
      '#project-shadow-hunter'
    );
    // Real screenshots ship with the case study.
    await expect(study.locator('img[alt*="Transport System"]')).not.toHaveCount(0);
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
    await page.waitForTimeout(500);
    // Viewport-only capture: desktops come out landscape (e.g. 1920x1080),
    // phones/tablets keep their natural portrait viewport. Never use
    // fullPage:true here — it stitches the whole page into one giant
    // long-portrait strip (up to ~100k px tall).
    await page.screenshot({
      path: `screenshots/${test.info().project.name}.png`,
      fullPage: false,
    });
  });
});
