import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import BranchLocator from '@/components/pages/BranchLocator';
import { SEO } from '@/data/seo';
import { seoMetadata } from '@/lib/seo';

export const metadata: Metadata = seoMetadata(SEO.networkMap);

export default function NetworkMapPage() {
  return (
    <>
      <PageHero title="Find us" subtitle="Three branches across South East Queensland, plus mobile vans on the road." />
      <BranchLocator />
    </>
  );
}
