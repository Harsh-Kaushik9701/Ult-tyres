'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X, ChevronDown } from 'lucide-react';
import { NAV, SITE } from '@/data/site';
import { useApp } from '@/context/AppContext';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Ultimate Tyres home">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[13px] font-bold text-white">
        UT
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">Ultimate Tyres</span>
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const { session } = useApp();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Close menus on navigation (pathname is external state from the router).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  const isDealer = !!session?.dealerId;
  const accountHref = isDealer ? '/portal' : '/dealer/login';
  const accountLabel = isDealer ? 'Dealer portal' : 'Login / Join';

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-4 px-5">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              const hasChildren = 'children' in item;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenGroup(item.label)}
                  onMouseLeave={() => hasChildren && setOpenGroup(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] transition ${
                      active ? 'text-ink font-medium' : 'text-ink/75 hover:text-ink'
                    }`}
                    onFocus={() => hasChildren && setOpenGroup(item.label)}
                    aria-expanded={hasChildren ? openGroup === item.label : undefined}
                  >
                    {item.label}
                    {hasChildren && <ChevronDown className="h-3 w-3 opacity-50" aria-hidden />}
                  </Link>
                  {hasChildren && openGroup === item.label && (
                    <div className="absolute left-0 top-full pt-2">
                      <ul className="min-w-[200px] rounded-2xl border border-line/70 bg-white p-2 shadow-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-[14px] text-ink/80 hover:bg-panel hover:text-ink"
                              onBlur={(e) => {
                                if (!e.currentTarget.closest('li.relative')?.contains(e.relatedTarget as Node)) {
                                  setOpenGroup(null);
                                }
                              }}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-ink/75 hover:text-ink sm:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {SITE.phone}
          </a>
          <Link
            href={accountHref}
            className="rounded-full bg-brand px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-brand-dark"
          >
            {accountLabel}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-line/70 bg-white lg:hidden" aria-label="Main">
          <ul className="mx-auto max-w-[1080px] px-5 py-4">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-line/60 last:border-0">
                <Link href={item.href} className="block py-3 text-[20px] font-semibold text-ink">
                  {item.label}
                </Link>
                {'children' in item && (
                  <ul className="-mt-1 grid grid-cols-2 gap-x-4 pb-3">
                    {item.children.slice(1).map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block py-1.5 text-[15px] text-muted">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <a href={SITE.phoneHref} className="flex items-center gap-2 text-[17px] text-ink">
                <Phone className="h-4 w-4" aria-hidden /> Ring us on {SITE.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
