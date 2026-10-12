import type { Metadata } from 'next';
import BecomeDealerForm from '@/components/pages/BecomeDealerForm';
import { SEO } from '@/data/seo';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata(SEO.becomeDealer);

/** Server page; the form itself is a client component (it still renders on the server first). */
export default function Page() {
  return <BecomeDealerForm />;
}
