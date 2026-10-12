import type { Branch } from '@/types';

/** What to search on Google Maps for a branch: the listing name for HQ, else the street address. */
export function branchQuery(b: Pick<Branch, 'mapQuery' | 'address' | 'suburb' | 'state' | 'postcode'>): string {
  return b.mapQuery ?? `${b.address}, ${b.suburb} ${b.state} ${b.postcode}`;
}
