import { SEO } from '@/data/seo';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

/** Home page share image; also the default for any public page without its own. */
export const alt = 'Ultimate Tyres: truck and bus tyres, Brisbane';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage(SEO.home.og);
}
