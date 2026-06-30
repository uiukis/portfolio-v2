import puppeteer from "puppeteer";

const URL = process.env.TEST_URL ?? "http://localhost:3000";

async function isVisible(page, selector, index = 0) {
  return page.evaluate(
    ({ selector, index }) => {
      const nodes = document.querySelectorAll(selector);
      const el = nodes[index];
      if (!el) return false;
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return (
        style.opacity !== "0" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0 &&
        (el.textContent?.trim().length ?? 0) > 0
      );
    },
    { selector, index },
  );
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });

await page.evaluateOnNewDocument(() => {
  sessionStorage.setItem("wq-os-loader-seen", "1");
});

await page.goto(URL, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));

const selectors = [
  "#positioning h2",
  "#capabilities h3",
  "#systems h3",
  "#approach h3",
  "#philosophy blockquote p",
  "#hero-heading",
];

async function audit(label) {
  console.log(`\n=== ${label} ===`);
  let missing = 0;
  for (const sel of selectors) {
    const count = await page.$$eval(sel, (els) => els.length);
    for (let i = 0; i < count; i++) {
      const text = await page.$$eval(
        sel,
        (els, idx) => els[idx]?.textContent?.trim() ?? "",
        i,
      );
      const visible = await isVisible(page, sel, i);
      const flag = visible && text ? "OK" : "MISSING";
      if (flag === "MISSING") missing++;
      console.log(`${flag} | ${sel}[${i}] | "${text.slice(0, 70)}"`);
    }
  }
  return missing;
}

const missingEn = await audit("EN (initial)");
await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === "pt");
  btn?.click();
});
await new Promise((r) => setTimeout(r, 2800));
const missingPt = await audit("PT (after switch)");
await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === "en");
  btn?.click();
});
await new Promise((r) => setTimeout(r, 2800));
const missingEn2 = await audit("EN (switch back)");

await page.screenshot({ path: "/tmp/locale-test-final.png", fullPage: true });
console.log(`\nSummary: missing EN=${missingEn} PT=${missingPt} EN2=${missingEn2}`);

await browser.close();
process.exit(missingPt + missingEn2 > 0 ? 1 : 0);
