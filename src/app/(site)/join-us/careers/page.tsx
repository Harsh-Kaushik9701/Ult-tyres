import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import CareersBoard from '@/components/pages/CareersBoard';
import { SEO } from '@/data/seo';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata(SEO.careers);

export default function CareersPage() {
  return (
    <>
      <PageHero title="Work with us" subtitle="Good people, good gear, and steady work across Brisbane." />
      <CareersBoard />
    </>
  );
}
