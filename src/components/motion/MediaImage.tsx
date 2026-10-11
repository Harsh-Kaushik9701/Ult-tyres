'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MediaPhoto } from '@/data/media';

/**
 * Photo that fills its (positioned) parent. If the file fails to load, it removes itself
 * so the tile's own background shows instead of a broken-image icon.
 */
export default function MediaImage({
  photo,
  sizes,
  className = '',
  priority = false,
}: {
  photo: MediaPhoto;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
