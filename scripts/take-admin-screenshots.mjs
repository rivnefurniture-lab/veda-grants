import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3001";
const EMAIL = process.env.ADMIN_EMAIL || "admin@weda.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const OUT_DIR = path.resolve("public/admin-guide");

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "uk-UA",
});
const page = await ctx.newPage();

async function shot(name, opts = {}) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: opts.fullPage ?? false });
  console.log("→", file);
}

// 1. login page
await page.goto(`${BASE}/admin`);
await page.waitForLoadState("networkidle");
await shot("01-login");

// 2. login
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', PASSWORD);
await Promise.all([page.waitForLoadState("networkidle"), page.click('button[type="submit"]')]);
await page.waitForTimeout(800);

// 3. dashboard
await shot("02-dashboard");

// 4. grants list (pending)
await page.goto(`${BASE}/admin/granty?status=PENDING`);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(500);
await shot("03-granty-pending", { fullPage: false });

// 5. grants list (approved)
await page.goto(`${BASE}/admin/granty?status=APPROVED`);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(500);
await shot("04-granty-approved", { fullPage: false });

// 6. new grant page
await page.goto(`${BASE}/admin/granty/new`);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(500);
await shot("05-granty-new");

// 7. edit grant page — find a pending grant id via DB
await page.goto(`${BASE}/admin/granty?status=PENDING`);
await page.waitForLoadState("networkidle");
const firstEditHref = await page.getAttribute('a[href*="/edit"]', "href");
if (firstEditHref) {
  await page.goto(`${BASE}${firstEditHref}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await shot("06-granty-edit");
}

// 8. leads page
await page.goto(`${BASE}/admin/leads`);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(500);
await shot("07-leads");

// 9. public granty page
await page.goto(`${BASE}/granty`);
await page.waitForLoadState("networkidle");
await page.waitForTimeout(800);
await shot("08-public-granty", { fullPage: false });

await browser.close();
console.log("Done.");
