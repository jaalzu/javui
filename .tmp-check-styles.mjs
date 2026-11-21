import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.goto("http://localhost:3000/docs/theming", { waitUntil: "networkidle" });
const info = await page.evaluate(() => {
  const ul = document.querySelector("nav[aria-label='Documentation'] ul[id]");
  if (!ul) return null;
  const items = [...ul.children];
  return items.slice(0, 3).map((li) => {
    const s = getComputedStyle(li, "::before");
    const a = getComputedStyle(li, "::after");
    return {
      text: li.textContent,
      before: { left: s.insetInlineStart, top: s.top, height: s.height, width: s.width },
      after: { left: a.insetInlineStart, top: a.top, width: a.width, height: a.height },
    };
  });
});
console.log(JSON.stringify(info, null, 2));
const side = await page.locator("nav[aria-label='Documentation']").boundingBox();
await page.screenshot({ path: "C:/Users/user/AppData/Local/Temp/opencode/sidebar-check.png", clip: { x: side.x - 10, y: side.y, width: side.width + 20, height: 330 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.screenshot({ path: "C:/Users/user/AppData/Local/Temp/opencode/hero-check.png", clip: { x: 400, y: 0, width: 600, height: 500 } });
await browser.close();
