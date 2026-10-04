import type { AxlePosition, ProductSku } from '@/types';

export const POSITION_LABEL: Record<AxlePosition, string> = {
  steer: 'Steer',
  drive: 'Drive',
  trailer: 'Trailer',
  'all-position': 'All position',
};

/** Lower-case, letters and digits only: "295/80R22.5" → "29580r225". */
export function normaliseSize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Does a SKU match free text typed by the user (size, pattern code or SKU id)? */
export function matchesQuery(sku: ProductSku, query: string): boolean {
  const q = normaliseSize(query);
  if (!q) return true;
  return [sku.size, sku.fullSizeCode, sku.patternCode, sku.id].some((v) => normaliseSize(v).includes(q));
}

export function patternHref(sku: Pick<ProductSku, 'brandName' | 'patternCode'>): string {
  return `/tyres/${sku.brandName.toLowerCase()}/${sku.patternCode.toLowerCase()}`;
}
