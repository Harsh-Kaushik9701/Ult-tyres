import { ARTICLES } from '@/data/content';
import { BRANDS, FLEET_SERVICES, PATTERNS } from '@/data/mockData';
import { POSITION_LABEL } from '@/lib/tyres';

/**
 * SEO for pages built from data (brands, tyre patterns, services, news). Each returns the
 * meta fields for `pageMetadata()` plus the text for its share image, or null if not found.
 */

type Seo = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  type?: 'website' | 'article';
  og: { eyebrow: string; title: string; subtitle?: string };
};

/** Trim to a meta description length on a word boundary. */
function clip(text: string, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';
}

export function brandSeo(slug: string): Seo | null {
  const b = BRANDS.find((x) => x.slug === slug);
  if (!b) return null;
  const codes = PATTERNS.filter((p) => p.brandId === b.id && p.active !== false)
    .slice(0, 4)
    .map((p) => p.code);
  return {
    path: `/tyres/${b.slug}`,
    title: `${b.name} Truck Tyres Brisbane`,
    description: clip(
      `${b.name} truck and bus tyres for steer, drive and trailer axles${codes.length ? `, including ${codes.join(', ')}` : ''}. In stock and fitted by Ultimate Tyres in Brisbane.`
    ),
    keywords: [`${b.name} tyres`, `${b.name} truck tyres`, `${b.name} tyres Brisbane`, `${b.name} tyres Australia`, ...codes.map((c) => `${b.name} ${c}`)],
    og: {
      eyebrow: b.isAuthorisedDistributor ? 'Authorised distributor' : 'In stock',
      title: `${b.name} truck tyres.`,
      subtitle: b.tagline,
    },
  };
}

export function patternSeo(brandSlug: string, code: string): Seo | null {
  const p = PATTERNS.find((x) => x.brandId === brandSlug.toLowerCase() && x.code.toLowerCase() === code.toLowerCase());
  if (!p) return null;
  const positions = p.positions.map((x) => POSITION_LABEL[x]).join(' / ');
  const kind = p.category === 'bus' ? 'bus' : 'truck';
  const name = `${p.brandName} ${p.code}`;
  const sizes = [...new Set(p.skus.map((s) => s.size))].slice(0, 3);
  return {
    path: `/tyres/${p.brandId}/${p.code.toLowerCase()}`,
    title: `${name} ${positions} ${kind === 'bus' ? 'Bus' : 'Truck'} Tyre`,
    description: clip(
      p.description
        ? `${name}: ${p.description} Supplied and fitted by Ultimate Tyres, Brisbane.`
        : `${name} ${positions.toLowerCase()} ${kind} tyre. Supplied and fitted by Ultimate Tyres in Rocklea, Yatala and Bald Hills.`
    ),
    keywords: [
      name,
      `${p.code} tyre`,
      `${name} price`,
      `${p.brandName} ${positions.toLowerCase()} tyre`,
      `${positions.toLowerCase()} ${kind} tyres`,
      ...sizes.map((s) => `${s} ${p.brandName}`),
    ],
    og: { eyebrow: `${p.brandName} · ${positions}`, title: `${p.brandName} ${p.code}`, subtitle: `${positions} ${kind} tyre, fitted in Brisbane.` },
  };
}

export function serviceSeo(slug: string): Seo | null {
  const s = FLEET_SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    path: `/fleet-services/${s.slug}`,
    title: `${s.name} Brisbane`,
    description: clip(`${s.shortDesc} ${s.name} for trucks and fleets at Rocklea, Yatala and Bald Hills, or at your depot.`),
    keywords: [`${s.name.toLowerCase()} Brisbane`, `truck ${s.name.toLowerCase()}`, `fleet ${s.name.toLowerCase()}`, 'truck maintenance Brisbane'],
    og: { eyebrow: 'Fleet services', title: `${s.name}.`, subtitle: s.shortDesc },
  };
}

export function articleSeo(slug: string): Seo | null {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return null;
  // Keywords from the title, minus small words.
  const stop = new Set(['the', 'a', 'an', 'and', 'or', 'to', 'of', 'for', 'in', 'on', 'we', 're', 'now', 'vs', 'your', 'our', 'with']);
  const words = a.title
    .toLowerCase()
    .replace(/[’']/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !stop.has(w));
  return {
    path: `/news/${a.slug}`,
    title: a.title,
    description: clip(`${a.summary} Practical truck tyre advice from Ultimate Tyres, Brisbane.`),
    keywords: [a.category.toLowerCase(), ...words, 'truck tyre advice', 'fleet tyres'],
    type: 'article',
    og: { eyebrow: a.category, title: a.title, subtitle: a.summary },
  };
}
