'use server';

import { headers } from 'next/headers';
import { checkPreviewAuth } from '@/lib/previewAuth';
import { PRICE_MATRIX, suggestUnitPrice } from '@/server/priceMatrix';
import type { SkuPriceMatrix } from '@/types';

/**
 * Server actions are reachable as public endpoints, so each one re-checks staff
 * credentials itself instead of relying on the /admin proxy alone.
 */
async function assertStaff() {
  const h = await headers();
  if (checkPreviewAuth('admin', h.get('authorization')) !== 'ok') {
    throw new Error('Not authorised');
  }
}

/** Suggested unit price per line, from the quantity-band matrix. */
export async function getSuggestedPrices(
  lines: { skuId: string; quantity: number }[]
): Promise<Record<string, number>> {
  await assertStaff();
  const out: Record<string, number> = {};
  for (const line of lines.slice(0, 200)) {
    if (typeof line?.skuId !== 'string' || !Number.isFinite(line?.quantity)) continue;
    out[line.skuId] = suggestUnitPrice(line.skuId, Math.max(1, Math.floor(line.quantity)));
  }
  return out;
}

/** Full matrix for the admin "Price matrix" tab. */
export async function getPriceMatrix(): Promise<Record<string, SkuPriceMatrix>> {
  await assertStaff();
  return PRICE_MATRIX;
}
