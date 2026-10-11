import manifest from '@/data/tyreImages.json';
import brandImages from '@/data/brandImages.json';

export interface TyreImage {
  src: string;
  kind: 'side' | 'tread' | 'extra' | string;
  width: number;
  height: number;
}

const LOCAL = manifest as Record<string, TyreImage[]>;

/**
 * Official manufacturer photos (remote) for flagship patterns. Sizes are unknown until
 * downloaded, so a square box is used; every place that shows them uses object-contain.
 */
const REMOTE: Record<string, TyreImage[]> = Object.fromEntries(
  Object.entries(brandImages)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => [
      key,
      (value as { images: { src: string; kind: string }[] }).images.map((i) => ({ ...i, width: 1000, height: 1000 })),
    ])
);

/** Photos for a pattern, matched on brand + code (so tyres added in admin pick them up too). Local copies win. */
export function imagesFor(p: { brandId: string; code: string }): TyreImage[] {
  const key = `${p.brandId}-${p.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return LOCAL[key] ?? REMOTE[key] ?? [];
}

export const IMAGE_ALT: Record<string, string> = {
  side: 'side view',
  tread: 'tread close-up',
  extra: 'photo',
};
