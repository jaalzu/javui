import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(800);

const ctrl = page.locator('button[class*="navLink"]:not([aria-current])').first();
await ctrl.scrollIntoViewIfNeeded();
const read = (el) => {
  const cs = getComputedStyle(el);
  return { background: cs.backgroundColor, color: cs.color };
};
const rest = await ctrl.evaluate(read);
await ctrl.hover();
await page.waitForTimeout(200);
const hover = await ctrl.evaluate(read);
const ariaBefore = await ctrl.getAttribute("aria-current");
console.log("non-active navLink rest :", JSON.stringify(rest));
console.log("non-active navLink hover:", JSON.stringify(hover));
console.log("aria-current:", ariaBefore);
await browser.close();
