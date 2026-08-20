const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist", "site");

const files = [
  "index.html",
  "styles.css",
  "app.js",
  "portfolio-data.js",
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

removeDir(outDir);
fs.mkdirSync(outDir, { recursive: true });

files.forEach(copyFile);

const referencedAssets = new Set();
for (const relativePath of ["index.html", "styles.css", "app.js", "portfolio-data.js"]) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) continue;
  const content = fs.readFileSync(source, "utf8");
  for (const match of content.matchAll(/assets\/[^"'`)>\s]+/g)) {
    referencedAssets.add(match[0]);
  }
}

for (const asset of referencedAssets) {
  copyFile(asset);
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
