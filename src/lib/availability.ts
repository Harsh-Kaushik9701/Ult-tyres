import type { ProductSku } from '@/types';

export type AvailabilityBand = 'in-stock' | 'low-stock' | 'on-order';

/** At or below this many units across all branches, a SKU shows as "Low stock". */
const LOW_STOCK_THRESHOLD = 8;

export function totalStock(sku: ProductSku): number {
  const b = sku.inStockBranches;
  return b.rocklea + b.yatala + b.baldhills;
}

/**
 * Availability as a band rather than an exact count, so the site never reveals
 * real inventory levels (blueprint section 9).
 */
export function availabilityBand(units: number): AvailabilityBand {
  if (units <= 0) return 'on-order';
  if (units <= LOW_STOCK_THRESHOLD) return 'low-stock';
  return 'in-stock';
}

export const AVAILABILITY_LABEL: Record<AvailabilityBand, string> = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'on-order': 'On order',
};

export const AVAILABILITY_CLASS: Record<AvailabilityBand, string> = {
  'in-stock': 'text-emerald-400',
  'low-stock': 'text-amber-400',
  'on-order': 'text-[#ADB5BD]',
};
