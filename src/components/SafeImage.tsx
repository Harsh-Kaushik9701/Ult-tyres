'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * next/image that removes itself if the file can't load (for photos served from other
 * sites), so whatever sits behind it shows instead of a broken-image icon.
 */
export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through in props
  return <Image {...props} onError={() => setFailed(true)} />;
}
