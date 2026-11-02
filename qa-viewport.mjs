import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
  { name: '360x800', width: 360, height: 800 },
];

const SECTIONS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['computer-engineering', 'Computer Engineering'],
  ['projects', 'Projects'],
  ['project-wit-barcode', 'WIT Barcode'],
  ['project-shadow-hunter', 'Shadow Hunter'],
  ['project-transport-system', 'Transport System'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['certifications', 'Certifications'],
  ['resume', 'Resume'],
  ['contact', 'Contact'],
];

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load', timeout: 15000 });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );

  const missing = [];
  for (const [id, label] of SECTIONS) {
    const found = await page.$(`#${id}`);
    if (!found) missing.push(id);
  }

  // Open the WIT gallery modal and check it renders
  let galleryOk = null;
  if (vp.name === '1440x900') {
    await page.click('text=View Full Gallery');
    await page.waitForTimeout(800);
    galleryOk = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"], .fixed.inset-0');
      return Boolean(modal);
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  results.push({ viewport: vp.name, overflow, missing, errors: errors.slice(0, 3), galleryOk });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
