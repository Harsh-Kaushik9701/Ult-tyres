'use client';

import { useSyncExternalStore } from 'react';
import { MapPin } from 'lucide-react';
import { directionsUrl, mapEmbedUrl } from '@/data/site';

function subscribe(onChange: () => void) {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
}

/**
 * Live Google Map in an iframe (keyless embed, no script). The parent sets the height.
 * Changing `query` re-points the map, so it can follow a selected branch.
 * With no internet (e.g. testing on localhost offline) it shows the address and a
 * directions link instead of the browser's "can't connect" page.
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
  // Server render and first paint assume online; the browser then reports the real state.
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);

  if (!online) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-panel p-6 text-center ${className}`}>
        <MapPin className="h-8 w-8 text-brand" aria-hidden />
        <p className="max-w-xs text-[15px] text-muted">The map needs an internet connection.</p>
        <p className="max-w-xs font-medium">{query}</p>
        <a href={directionsUrl(query)} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-brand hover:underline">
          Open in Google Maps ›
        </a>
      </div>
    );
  }

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
