const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist", "site");

const files = [
  "index.html",
  "styles.css",
  "app.js",
  "site-portfolio-data.js",
  "manifest.webmanifest",
  "CNAME",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml"
];

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyFile(relativePath) {
  const from = path.join(root, relativePath);
  const to = path.join(outDir, relativePath);
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDirectory(relativePath) {
  const sourceDir = path.join(root, relativePath);
  if (!fs.existsSync(sourceDir)) return;
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const childPath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) copyDirectory(childPath);
    else copyFile(childPath);
  }
}

removeDir(outDir);
fs.mkdirSync(outDir, { recursive: true });

files.forEach(copyFile);
copyDirectory("cliente/casa58");
copyDirectory("adm");

copyDirectory("tools/dindin");
const referencedAssets = new Set();
for (const relativePath of ["index.html", "styles.css", "site-portfolio-data.js"]) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) continue;
  const content = fs.readFileSync(source, "utf8");
  for (const match of content.matchAll(/assets\/[^"'`)>\s]+/g)) {
    referencedAssets.add(match[0]);
  }
}

const manifestPath = path.join(root, "manifest.webmanifest");
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  for (const icon of manifest.icons || []) {
    if (icon.src) referencedAssets.add(icon.src);
  }
}

const appSource = path.join(root, "app.js");
if (fs.existsSync(appSource)) {
  const content = fs.readFileSync(appSource, "utf8");
  for (const match of content.matchAll(/assets\/dolayout\/editorial\/[^"'`)\s]+/g)) {
    referencedAssets.add(match[0]);
  }
}

for (const asset of referencedAssets) {
  copyFile(asset);
}

const curatedPortfolioDir = path.join(root, "assets", "dolayout", "portfolio", "site");
if (fs.existsSync(curatedPortfolioDir)) {
  for (const entry of fs.readdirSync(curatedPortfolioDir, { withFileTypes: true })) {
    if (entry.isFile()) copyFile(path.join("assets", "dolayout", "portfolio", "site", entry.name));
  }
}

const copiedFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else copiedFiles.push(full);
  }
}
walk(outDir);

console.log(JSON.stringify({
  outDir: outDir.replaceAll("\\", "/"),
  files: copiedFiles.length,
  sizeMb: Math.round(copiedFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0) / 1024 / 1024)
}, null, 2));
