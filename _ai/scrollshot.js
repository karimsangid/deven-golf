// Simulate a real visitor: load, scroll the whole page slowly so lazy images
// and IntersectionObserver reveals fire, then screenshot full page.
const { chromium } = require("playwright");

(async () => {
  const [, , url, out, w, h] = process.argv;
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({
    viewport: { width: Number(w) || 1280, height: Number(h) || 900 },
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // Scroll down in steps to trigger lazy-load + reveal observers
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(180);
    }
    window.scrollTo(0, 0);
    await sleep(400);
  });
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log("ok", out);
})().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
