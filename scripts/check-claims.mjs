import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = new URL("..", import.meta.url).pathname;
const banned = [
  /sunbelt/i,
  /wedding/i,
  /certified/i,
  /\biso\b/i,
  /we make places work/i,
  /mailto:/i,
  /tel:/i,
  /krak[oó]w/i,
  /wroc[łl]aw/i,
  /gda[nń]sk/i,
  /pozna[nń]/i,
  /malik montana/i,
  /artur szpilka/i,
  /DYZ-/,
  /(?<![\p{L}])zł(?![\p{L}])/u,
  /\bPLN\b/,
];

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "public") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await files(full)));
    else if (entry.name === "check-claims.mjs") continue;
    else if (/\.(tsx?|mjs|md|css)$/.test(entry.name)) found.push(full);
  }
  return found;
}

const list = await files(root);
let hits = 0;
for (const file of list) {
  const text = await readFile(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) {
      console.error(`${file}: ${pattern}`);
      hits += 1;
    }
  }
}
console.log(`Checked ${list.length} files. ${hits === 0 ? "No banned claims." : hits + " banned claims."}`);
if (hits) process.exit(1);
