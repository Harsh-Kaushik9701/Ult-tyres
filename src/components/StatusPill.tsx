import type { OrderStatus, RfqStatus } from '@/types';
import { ORDER_STATUS, QUOTE_STATUS, TONE_CLASS } from '@/lib/status';

export function QuoteStatusPill({ status }: { status: RfqStatus }) {
  const s = QUOTE_STATUS[status];
  return <span className={`inline-block rounded-full px-3 py-1 text-[13px] font-medium ${TONE_CLASS[s.tone]}`}>{s.label}</span>;
}

export function OrderStatusPill({ status }: { status: OrderStatus }) {
  const s = ORDER_STATUS[status];
  return <span className={`inline-block rounded-full px-3 py-1 text-[13px] font-medium ${TONE_CLASS[s.tone]}`}>{s.label}</span>;
}
