import type { Branch } from '@/types';
import { mapEmbedUrl } from '@/data/site';

/** What to search on Google Maps for a branch: the listing name for HQ, else the street address. */
export function branchQuery(b: Pick<Branch, 'mapQuery' | 'address' | 'suburb' | 'state' | 'postcode'>): string {
  return b.mapQuery ?? `${b.address}, ${b.suburb} ${b.state} ${b.postcode}`;
}

/**
 * Live Google Map in an iframe (keyless embed, no script). The parent sets the height.
 * Changing `query` re-points the map, so it can follow a selected branch.
 */
export default function GoogleMap({
  query,
  title,
  zoom = 14,
  className = '',
}: {
  query: string;
  title: string;
  zoom?: number;
  className?: string;
}) {
  return (
    <iframe
      key={query}
      src={mapEmbedUrl(query, zoom)}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`block h-full w-full border-0 ${className}`}
    />
  );
}
