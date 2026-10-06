'use client';

import { useApp } from '@/context/AppContext';
import { Spec, Tile } from '@/components/ui';
import { SITE } from '@/data/site';

const ROLE_LABEL: Record<string, string> = {
  owner: 'Owner',
  buyer: 'Buyer',
  staff: 'Workshop staff',
  admin: 'Staff',
};

export default function AccountPage() {
  const { session } = useApp();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-4xl font-semibold">Account</h1>
      <p className="mt-1 text-lg text-muted">Your business and login details.</p>

      <Tile className="mt-8 px-6 py-4">
        <h2 className="pt-2 text-lg font-semibold">Business</h2>
        <dl>
          <Spec label="Name" value={session?.dealerName ?? ''} />
          <Spec label="Home branch" value={session?.branch ?? ''} />
        </dl>
      </Tile>

      <Tile className="mt-4 px-6 py-4">
        <h2 className="pt-2 text-lg font-semibold">You</h2>
        <dl>
          <Spec label="Name" value={session?.name ?? ''} />
          <Spec label="Email" value={session?.email ?? ''} />
          <Spec label="Access" value={ROLE_LABEL[session?.role ?? ''] ?? ''} />
        </dl>
      </Tile>

      <p className="mt-8 text-center text-muted">
        Need to change something or add someone to your account? Ring us on{' '}
        <a href={SITE.phoneHref} className="font-medium text-ink hover:text-brand">
          {SITE.phone}
        </a>
        .
      </p>
    </div>
  );
}
