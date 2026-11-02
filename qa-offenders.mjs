import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1024x768', width: 1024, height: 768 },
];

const browser = await chromium.launch();
const out = {};

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1500);
  const offenders = await page.evaluate(() => {
    const limit = document.documentElement.clientWidth;
    const bad = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > limit + 1 || r.left < -1) {
        const style = getComputedStyle(el);
        bad.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || undefined,
          cls: (el.getAttribute('class') || '').slice(0, 120),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          overflowX: style.overflowX,
        });
      }
    }
    return bad.slice(0, 20);
  });
  out[vp.name] = offenders;
  await page.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
