#!/usr/bin/env node
/**
 * Import tyre photos from the client's Google Drive export.
 *
 *   npm run tyre-images -- ralson ~/Downloads/RDR95-*.zip ~/Downloads/IMAGES
 *
 * Accepts zip files and/or folders. Each pattern is a folder named after its code
 * (e.g. "RDR95"). Inside, the file names decide the photo type:
 *   - "side" in the name        → side   (main photo)
 *   - "close" or "tread"         → tread  (close-up)
 *   - anything else              → extra-1, extra-2 …
 *
 * Writes web-sized WebP files to public/tyres/<brand>/<code>/ and updates
 * src/data/tyreImages.json, which the site reads.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const MANIFEST = join(ROOT, 'src/data/tyreImages.json');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);
const MAX_SIDE = 1600; // px, longest edge
const KIND_ORDER = { side: 0, tread: 1 };

const [brand, ...inputs] = process.argv.slice(2);
if (!brand || inputs.length === 0) {
  console.error('Usage: npm run tyre-images -- <brand> <zip-or-folder> [more…]');
  process.exit(1);
}

const temp = mkdtempSync(join(tmpdir(), 'tyre-images-'));

/** Collect image files, grouped by the folder (pattern code) they sit in. */
function walk(dir, groups) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === '__MACOSX') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, groups);
    else if (IMAGE_EXT.has(extname(name).toLowerCase())) {
      const code = basename(dir).toUpperCase().replace(/[^A-Z0-9]/g, '');
      (groups[code] ??= []).push(full);
    }
  }
}

const groups = {};
inputs.forEach((input, i) => {
  const path = resolve(input);
  if (!existsSync(path)) return console.warn(`Skipping ${input}: not found`);
  if (path.toLowerCase().endsWith('.zip')) {
    const out = join(temp, String(i));
    mkdirSync(out);
    execFileSync('unzip', ['-q', '-o', path, '-d', out]);
    walk(out, groups);
  } else walk(path, groups);
});

function kindFor(file) {
  const n = basename(file).toLowerCase();
  if (n.includes('side')) return 'side';
  if (n.includes('close') || n.includes('tread')) return 'tread';
  return 'extra';
}

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const brandSlug = brand.toLowerCase();

for (const [code, files] of Object.entries(groups)) {
  if (!code) continue;
  const dir = join(ROOT, 'public/tyres', brandSlug, code.toLowerCase());
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const sorted = files
    .map((f) => ({ f, kind: kindFor(f) }))
    .sort((a, b) => (KIND_ORDER[a.kind] ?? 9) - (KIND_ORDER[b.kind] ?? 9) || a.f.localeCompare(b.f));

  const images = [];
  let extra = 0;
  const used = new Set();
  for (const { f, kind } of sorted) {
    let name = kind === 'extra' ? `extra-${++extra}` : kind;
    if (used.has(name)) name = `extra-${++extra}`;
    used.add(name);

    // Trim plain white/transparent margins, shrink, save as WebP.
    const { data, info } = await sharp(f, { limitInputPixels: false })
      .rotate()
      .trim({ threshold: 40 })
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    writeFileSync(join(dir, `${name}.webp`), data);
    images.push({
      src: `/tyres/${brandSlug}/${code.toLowerCase()}/${name}.webp`,
      kind: kind === 'extra' && name.startsWith('extra') ? 'extra' : name,
      width: info.width,
      height: info.height,
    });
    console.log(`  ${code} ${name}: ${basename(f)} → ${info.width}×${info.height}, ${Math.round(data.length / 1024)} KB`);
  }
  manifest[`${brandSlug}-${code.toLowerCase()}`] = images;
}

const sortedManifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, JSON.stringify(sortedManifest, null, 2) + '\n');
rmSync(temp, { recursive: true, force: true });
console.log(`Done: ${Object.keys(groups).length} pattern(s). Manifest: src/data/tyreImages.json`);
