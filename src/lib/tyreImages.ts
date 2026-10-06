import manifest from '@/data/tyreImages.json';

export interface TyreImage {
  src: string;
  kind: 'side' | 'tread' | 'extra' | string;
  width: number;
  height: number;
}

const IMAGES = manifest as Record<string, TyreImage[]>;

/** Photos for a pattern, matched on brand + code (so tyres added in admin pick them up too). */
export function imagesFor(p: { brandId: string; code: string }): TyreImage[] {
  return IMAGES[`${p.brandId}-${p.code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`] ?? [];
}

export const IMAGE_ALT: Record<string, string> = {
  side: 'side view',
  tread: 'tread close-up',
  extra: 'photo',
};
