import 'server-only';

import type { SkuPriceMatrix } from '@/types';

/**
 * Internal quantity-band price matrix.
 *
 * SERVER ONLY. This module must never be imported from a client component:
 * the `server-only` import above makes the build fail if it is. Dealers only
 * ever see a price on their own quote, after staff have priced the request.
 *
 * Interim: the values live in code until the MongoDB `priceMatrix` collection
 * (staff-readable only) replaces this file.
 */
export const PRICE_MATRIX: Record<string, SkuPriceMatrix> = {
  'ral-rac44-11r225': {
    skuId: 'ral-rac44-11r225',
    baseBands: { '1-3': 345, '4-7': 325, '8-19': 305, '20-49': 288, '50+': 275 },
  },
  'ral-rac44-29580r225': {
    skuId: 'ral-rac44-29580r225',
    baseBands: { '1-3': 385, '4-7': 365, '8-19': 342, '20-49': 320, '50+': 305 },
  },
  'ral-rdc55-11r225': {
    skuId: 'ral-rdc55-11r225',
    baseBands: { '1-3': 375, '4-7': 355, '8-19': 335, '20-49': 315, '50+': 298 },
  },
  'ral-rtc33-38565r225': {
    skuId: 'ral-rtc33-38565r225',
    baseBands: { '1-3': 445, '4-7': 420, '8-19': 398, '20-49': 375, '50+': 355 },
  },
  'bl-bd175-11r225': {
    skuId: 'bl-bd175-11r225',
    baseBands: { '1-3': 360, '4-7': 340, '8-19': 320, '20-49': 300, '50+': 285 },
  },
  'bl-bd175-29580r225': {
    skuId: 'bl-bd175-29580r225',
    baseBands: { '1-3': 395, '4-7': 375, '8-19': 350, '20-49': 330, '50+': 312 },
  },
  'bl-bt165-11r225': {
    skuId: 'bl-bt165-11r225',
    baseBands: { '1-3': 330, '4-7': 310, '8-19': 290, '20-49': 275, '50+': 260 },
  },
  'tri-trs02-11r225': {
    skuId: 'tri-trs02-11r225',
    baseBands: { '1-3': 350, '4-7': 330, '8-19': 310, '20-49': 292, '50+': 278 },
  },
  'tri-trs02-29580r225': {
    skuId: 'tri-trs02-29580r225',
    baseBands: { '1-3': 390, '4-7': 370, '8-19': 345, '20-49': 325, '50+': 308 },
  },
  'tri-tr688-11r225': {
    skuId: 'tri-tr688-11r225',
    baseBands: { '1-3': 365, '4-7': 345, '8-19': 325, '20-49': 305, '50+': 290 },
  },
  'ral-rcu11-27570r225': {
    skuId: 'ral-rcu11-27570r225',
    baseBands: { '1-3': 370, '4-7': 350, '8-19': 330, '20-49': 310, '50+': 295 },
  },
};

const DEFAULT_UNIT_PRICE = 330;

/** Unit price suggested for a SKU at a given quantity, from its quantity band. */
export function suggestUnitPrice(skuId: string, quantity: number): number {
  const matrix = PRICE_MATRIX[skuId];
  if (!matrix) return DEFAULT_UNIT_PRICE;
  const b = matrix.baseBands;
  if (quantity >= 50) return b['50+'];
  if (quantity >= 20) return b['20-49'];
  if (quantity >= 8) return b['8-19'];
  if (quantity >= 4) return b['4-7'];
  return b['1-3'];
}
