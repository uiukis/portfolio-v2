import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "docs/cv/wilker-quirino.html");
const outputPath = path.join(root, "docs/cv/Wilker-Quirino-CV.pdf");

const chromePaths = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
];

const chrome = chromePaths.find((candidate) => fs.existsSync(candidate));

if (!chrome) {
  console.error("Chrome/Chromium/Edge não encontrado para gerar o PDF.");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${outputPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: "inherit" },
);

console.log(`PDF gerado: ${outputPath}`);
