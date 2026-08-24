import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, ".audit");
mkdirSync(OUT, { recursive: true });

const URL = "https://uiukis.vercel.app/";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const report = { url: URL, issues: [], checks: {} };

await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

await page.screenshot({ path: join(OUT, "hero-desktop.png") });

const iconLinks = await page.evaluate(() =>
  [...document.querySelectorAll('link[rel*="icon"]')].map((el) => ({
    rel: el.getAttribute("rel"),
    href: el.getAttribute("href"),
  })),
);
report.checks.iconLinks = iconLinks;
report.checks.title = await page.title();
report.checks.headerText = await page.getByRole("banner").innerText();

const iconResp = await page.request.get(`${URL}icon.svg`);
report.checks.iconStatus = iconResp.status();
report.checks.iconHasOldTeal = (await iconResp.text()).includes("#00d4aa");

writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

await browser.close();
