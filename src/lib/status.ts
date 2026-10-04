import type { OrderStatus, RfqStatus } from '@/types';

type Tone = 'neutral' | 'action' | 'good' | 'muted';

export const QUOTE_STATUS: Record<RfqStatus, { label: string; tone: Tone }> = {
  submitted: { label: 'Waiting for price', tone: 'neutral' },
  quote_ready: { label: 'Price ready', tone: 'action' },
  accepted: { label: 'Accepted', tone: 'good' },
  declined: { label: 'Declined', tone: 'muted' },
  expired: { label: 'Expired', tone: 'muted' },
};

export const ORDER_STATUS: Record<OrderStatus, { label: string; tone: Tone }> = {
  confirmed: { label: 'Confirmed', tone: 'neutral' },
  ready_for_pickup: { label: 'Ready to pick up', tone: 'action' },
  dispatched: { label: 'On its way', tone: 'action' },
  delivered: { label: 'Delivered', tone: 'good' },
  cancelled: { label: 'Cancelled', tone: 'muted' },
};

export const TONE_CLASS: Record<Tone, string> = {
  neutral: 'bg-panel text-ink',
  action: 'bg-brand text-white',
  good: 'bg-[#e3f3e8] text-ok',
  muted: 'bg-panel text-muted',
};

const aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });
export const money = (n: number) => aud.format(n);

export function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** "PO-4471" or "4471" → "PO-4471" / "PO 4471" (never "PO PO-4471"). */
export function poLabel(po: string): string {
  return /^po\b/i.test(po) ? po : `PO ${po}`;
}
