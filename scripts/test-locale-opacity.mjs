import puppeteer from "puppeteer";

const URL = process.env.TEST_URL ?? "http://localhost:3002";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem("wq-os-loader-seen", "1");
  localStorage.setItem("wq-os-locale", "pt");
});

await page.goto(URL, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1000));

await page.evaluate(() => {
  document.querySelector("#capabilities")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1200));

async function cardOpacity() {
  return page.evaluate(() => {
    return [...document.querySelectorAll("#capabilities .glow-card")].map((card, i) => {
      const el = card.parentElement ?? card;
      const style = window.getComputedStyle(el);
      return {
        i,
        title: card.querySelector("h3")?.textContent?.trim().slice(0, 35),
        opacity: style.opacity,
      };
    });
  });
}

async function switchLocale(code) {
  await page.evaluate((code) => {
    [...document.querySelectorAll("button")]
      .find((b) => b.textContent?.trim().toLowerCase().startsWith(code))
      ?.click();
  }, code);
  await new Promise((r) => setTimeout(r, 500));
}

const before = await cardOpacity();
console.log("PT visible (scrolled):", before);

await switchLocale("en");
await new Promise((r) => setTimeout(r, 800));

const after = await cardOpacity();
console.log("EN after switch:", after);

const broken = after.filter((c) => parseFloat(c.opacity) < 0.9);
console.log("\nBUG reproduced:", broken.length > 0);
console.log("Broken cards:", broken);

await page.screenshot({ path: "/tmp/locale-bug-after-switch.png" });
await browser.close();
process.exit(broken.length > 0 ? 1 : 0);
