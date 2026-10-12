import type { Metadata } from 'next';

/**
 * SEO helpers. Every public page builds its metadata with `pageMetadata()` so the title,
 * description, keywords, canonical URL, Open Graph and Twitter tags stay consistent.
 * Share images (og:image) come from the `opengraph-image.tsx` files next to each page.
 */

/** Live site address. Set NEXT_PUBLIC_SITE_URL on staging so links in shares point there. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ultimatetyres.com.au').replace(/\/$/, '');

export const SITE_NAME = 'Ultimate Tyres';

/** Added to every page's own keywords. */
export const BASE_KEYWORDS = [
  'Ultimate Tyres',
  'truck tyres Brisbane',
  'commercial tyres Queensland',
  'Ralson tyres',
  'Blacklion tyres',
  'Triangle tyres',
];

export const DEFAULT_DESCRIPTION =
  'Ralson, Blacklion and Triangle truck and bus tyres, supplied and fitted across South East Queensland. 24/7 mobile service from Rocklea, Yatala and Bald Hills.';

/** Metadata for a fixed page from its entry in src/data/seo.ts. */
export function seoMetadata(entry: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  absoluteTitle?: boolean;
  noIndex?: boolean;
}): Metadata {
  return pageMetadata(entry);
}

export function pageMetadata({
  title,
  description,
  keywords = [],
  path,
  absoluteTitle = false,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  /** Page path, e.g. "/about-us". Used for the canonical URL and og:url. */
  path: string;
  /** Use the title as-is, without the " | Ultimate Tyres" suffix (home page). */
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...new Set([...keywords, ...BASE_KEYWORDS])],
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_AU',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
