'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SITE } from '@/data/site';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, session, switchRole, cart, pricingRequests } = useApp();

  // Only signed-in dealer users (owner, buyer, staff) may use the portal.
  const isDealerUser = !!session?.dealerId && session.role !== 'admin';
  useEffect(() => {
    if (hydrated && !isDealerUser) router.replace('/dealer/login');
  }, [hydrated, isDealerUser, router]);

  if (!hydrated || !isDealerUser) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[15px] text-muted" role="status">
        {hydrated ? 'Taking you to the login page…' : 'Loading your account…'}
      </div>
    );
  }

  const readyQuotes = pricingRequests.filter((r) => r.status === 'quote_ready' && r.dealerId === session?.dealerId).length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const tabs = [
    { label: 'Home', href: '/portal' },
    { label: 'Tyres', href: '/portal/catalogue' },
    { label: 'Quick order', href: '/portal/rapid-order' },
    { label: 'Cart', href: '/portal/cart', badge: cartCount || undefined },
    { label: 'Quotes', href: '/portal/quotes', badge: readyQuotes || undefined, alert: readyQuotes > 0 },
    { label: 'Orders', href: '/portal/orders' },
    { label: 'Account', href: '/portal/account' },
  ];
  const isActive = (href: string) => pathname === href || (href !== '/portal' && pathname.startsWith(href));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-4 px-5">
          <Link href="/portal" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[13px] font-bold text-white">UT</span>
            <span className="text-[15px] font-semibold tracking-tight">Dealer portal</span>
          </Link>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="hidden text-muted sm:inline">{session?.dealerName}</span>
            <button
              type="button"
              onClick={() => {
                switchRole('public');
                router.push('/');
              }}
              className="text-ink/75 hover:text-ink"
            >
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-[1080px] overflow-x-auto px-3" aria-label="Portal">
          <ul className="flex gap-1 pb-2">
            {tabs.map((t) => {
              const active = isActive(t.href);
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] transition ${
                      active ? 'bg-ink text-white' : 'text-ink/75 hover:bg-panel hover:text-ink'
                    }`}
                  >
                    {t.label}
                    {t.badge !== undefined && (
                      <span
                        className={`min-w-5 rounded-full px-1.5 text-center text-[11px] font-semibold leading-5 ${
                          t.alert ? 'bg-brand text-white' : active ? 'bg-white/20' : 'bg-panel'
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1080px] flex-1 px-5 py-10">{children}</main>

      <footer className="border-t border-line/70 py-6 text-center text-[13px] text-muted">
        Need a hand?{' '}
        <a href={SITE.phoneHref} className="inline-flex items-center gap-1 text-ink hover:underline">
          <Phone className="h-3.5 w-3.5" aria-hidden /> {SITE.phone}
        </a>
        {' · '}
        <Link href="/" className="hover:text-ink hover:underline">
          Main website
        </Link>
      </footer>
    </div>
  );
}
