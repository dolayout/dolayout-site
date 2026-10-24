const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sourceDir = process.env.PORTFOLIO_SOURCE_DIR
  || "G:/Meu Drive/DOLAYOUT/PORT2026/_PORTFOLIO_MASTER/SITE";
const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "site-portfolio-data.js"), "utf8"),
  context,
  { filename: "site-portfolio-data.js" }
);

const projects = context.window.dolayoutPortfolioProjects || [];
const errors = [];
const registered = new Set();
const key = (filename) => path.basename(filename).replace(/\.[^.]+$/, "").toLowerCase();

for (const project of projects) {
  let previousNumber = -1;
  for (const asset of project.gallery || []) {
    const filename = path.basename(asset);
    const number = Number(filename.match(/-(\d{2})\.[^.]+$/)?.[1]);
    if (!Number.isInteger(number)) errors.push(`${project.id}: unnumbered slide ${filename}`);
    else if (number <= previousNumber) errors.push(`${project.id}: slide out of order ${filename}`);
    previousNumber = number;

    if (registered.has(key(filename))) errors.push(`${project.id}: duplicate slide ${filename}`);
    registered.add(key(filename));
    if (!fs.existsSync(path.join(root, asset))) errors.push(`${project.id}: missing asset ${filename}`);
  }
}

if (fs.existsSync(sourceDir)) {
  for (const filename of fs.readdirSync(sourceDir)) {
    if (!/\.(png|jpe?g|webp|mp4|webm)$/i.test(filename)) continue;
    if (!registered.has(key(filename))) errors.push(`not published: ${filename}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Portfolio verified: ${projects.length} projects, ${registered.size} ordered slides.`);
}
