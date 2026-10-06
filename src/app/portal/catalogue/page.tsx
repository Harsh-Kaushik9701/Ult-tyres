'use client';

import { Suspense } from 'react';
import TyreFinder from '@/components/TyreFinder';

export default function PortalCataloguePage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">Tyres</h1>
      <p className="mb-8 mt-1 text-center text-lg text-muted">Add what you need to your cart. We&apos;ll send you the price.</p>
      <Suspense>
        <TyreFinder />
      </Suspense>
    </div>
  );
}
