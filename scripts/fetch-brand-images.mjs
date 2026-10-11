#!/usr/bin/env node
/**
 * Download the official manufacturer photos listed in src/data/brandImages.json,
 * save web-sized WebP copies to public/tyres/<brand>/<code>/ and add them to
 * src/data/tyreImages.json. Local copies then replace the remote ones on the site.
 *
 *   npm run brand-images            # skips patterns that already have local photos
 *   npm run brand-images -- --force # re-download everything
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const SOURCE = join(ROOT, 'src/data/brandImages.json');
const MANIFEST = join(ROOT, 'src/data/tyreImages.json');
const MAX_SIDE = 1600;
const force = process.argv.includes('--force');

const brandImages = JSON.parse(readFileSync(SOURCE, 'utf8'));
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));

let saved = 0;
for (const [key, entry] of Object.entries(brandImages)) {
  if (key.startsWith('_')) continue;
  if (manifest[key] && !force) {
    console.log(`skip  ${key} (already has local photos)`);
    continue;
  }
  const [brand, ...rest] = key.split('-');
  const code = rest.join('-');
  const dir = join(ROOT, 'public/tyres', brand, code);
  mkdirSync(dir, { recursive: true });

  const out = [];
  let extra = 0;
  for (const img of entry.images) {
    try {
      const res = await fetch(img.src, { headers: { 'User-Agent': 'Mozilla/5.0 (Ultimate Tyres image import)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const name = img.kind === 'extra' ? `extra-${++extra}` : img.kind;
      const file = join(dir, `${name}.webp`);
      const info = await sharp(buf)
        .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(file);
      out.push({ src: `/tyres/${brand}/${code}/${name}.webp`, kind: img.kind, width: info.width, height: info.height });
      saved++;
      console.log(`saved ${key} ${name} (${info.width}×${info.height})`);
    } catch (err) {
      console.warn(`fail  ${key} ${img.src}: ${err.message}`);
    }
  }
  if (out.length) manifest[key] = out;
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nDone: ${saved} photo(s) saved. Commit public/tyres and src/data/tyreImages.json.`);
