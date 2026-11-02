import { chromium } from 'playwright';

const port = 4173;
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', msg => { if (msg.type() === 'error' || msg.type() === 'warning') errors.push(`[${msg.type()}] ${msg.text().slice(0,300)}`); });
page.on('pageerror', e => errors.push(`[pageerror] ${String(e).slice(0,300)}`));

try {
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(3000);
  const html = await page.content();
  console.log('HTML length:', html.length);
  console.log('Has title:', html.includes('<title>'));
  for (const needle of ['Tommy Paolma', 'Student Transport Management System', 'Projects']) {
    console.log(`Contains '${needle}':`, html.includes(needle));
  }
  console.log('--- console/pageerrors ---');
  for (const e of errors) console.log('  ', e);
} catch (ex) {
  console.log('Exception:', ex.message);
}
await browser.close();
