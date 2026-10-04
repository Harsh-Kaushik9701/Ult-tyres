'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Zap,
  ShoppingCart,
  FileSpreadsheet,
  Package,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Menu,
  X,
  Shield,
  Phone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, session, switchRole, cart, pricingRequests } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Only signed-in dealer users (owner, buyer, staff) may use the portal.
  const isDealerUser = !!session?.dealerId && session.role !== 'admin';
  useEffect(() => {
    if (hydrated && !isDealerUser) router.replace('/dealer/login');
  }, [hydrated, isDealerUser, router]);

  // Ready quotes needing dealer action
  const pendingQuotes = pricingRequests.filter(
    (r) => r.status === 'quote_ready' && r.dealerId === session?.dealerId
  ).length;

  const isActive = (path: string) => pathname === path || (path !== '/portal' && pathname?.startsWith(path));

  const navItems = [
    { label: 'Dashboard', path: '/portal', icon: LayoutDashboard },
    { label: 'Tyre Catalogue', path: '/portal/catalogue', icon: Search },
    { label: 'SKU Rapid Order', path: '/portal/rapid-order', icon: Zap },
    {
      label: 'RFQ Cart',
      path: '/portal/cart',
      icon: ShoppingCart,
      badge: cart.length > 0 ? cart.reduce((a, b) => a + b.quantity, 0) : undefined,
    },
    {
      label: 'Quotes & Pricing',
      path: '/portal/quotes',
      icon: FileSpreadsheet,
      badge: pendingQuotes > 0 ? `${pendingQuotes} Ready` : undefined,
      badgeColor: 'bg-[#D50000] text-white',
    },
    { label: 'Orders & Dispatch', path: '/portal/orders', icon: Package },
    { label: 'Account & Team', path: '/portal/account', icon: Settings },
  ];

  if (!hydrated || !isDealerUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8] text-[#6C757D] text-sm" role="status">
        {hydrated ? 'Redirecting to dealer login…' : 'Loading your account…'}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6F8] text-[#1C1F22]">
      {/* Charcoal Sidebar (Blueprint Page 12) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1C1F22] text-[#CED4DA] flex flex-col justify-between border-r border-[#2B3036] transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Monogram Badge */}
          <div className="p-5 border-b border-[#2B3036] flex items-center justify-between">
            <Link href="/portal" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#D50000] flex items-center justify-center font-condensed font-black text-xl text-white shadow">
                UT
              </div>
              <div>
                <span className="font-condensed font-black text-lg text-white tracking-wider block leading-tight">
                  ULTIMATE TYRES
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                  Dealer Portal
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-[#868E96] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Account Profile Block */}
          <div className="p-4 bg-[#121416]/60 border-b border-[#25292E]">
            <div className="text-[10px] uppercase font-bold text-[#868E96] font-condensed">
              Active Trade Account
            </div>
            <div className="font-condensed font-bold text-sm text-white truncate mt-0.5">
              {session?.dealerName}
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono">
              <span className="bg-[#25292E] text-amber-400 px-1.5 py-0.5 rounded border border-[#343A40]">
                Tier {session?.tier}
              </span>
              <span className="text-[#868E96]">{session?.branch}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 font-condensed tracking-wide text-sm font-semibold">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition ${
                    active
                      ? 'bg-[#D50000] text-white shadow'
                      : 'text-[#CED4DA] hover:text-white hover:bg-[#25292E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.badgeColor || 'bg-[#25292E] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#25292E] space-y-3">
          <div className="text-xs text-[#868E96]">
            <div>User: <strong className="text-white">{session?.name}</strong></div>
            <div className="capitalize text-[11px]">Role: <span className="text-emerald-400">{session?.role}</span></div>
          </div>

          <div className="pt-2 border-t border-[#25292E] flex items-center justify-between text-xs">
            <Link
              href="/"
              className="text-[#868E96] hover:text-white flex items-center gap-1 font-condensed uppercase font-bold"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={() => {
                switchRole('public');
                router.push('/');
              }}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 font-condensed uppercase font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Clean White / Light for Long Sessions) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Portal Header Bar */}
        <header className="bg-white border-b border-[#DEE2E6] px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#495057] hover:bg-[#F8F9FA] rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono text-[#6C757D] hidden sm:block">
              Ultimate Tyres B2B Engine &bull; Sydney Edge
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct hotline */}
            <a
              href="tel:1300110002"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#1C1F22] hover:text-[#D50000]"
            >
              <Phone className="w-3.5 h-3.5 text-[#D50000]" />
              <span>Priority Trade Line: 1300 110 002</span>
            </a>

            {/* Quote Alert Notification */}
            {pendingQuotes > 0 && (
              <Link
                href="/portal/quotes"
                className="bg-[#D50000]/10 border border-[#D50000]/30 text-[#D50000] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{pendingQuotes} Quote Ready for Approval</span>
              </Link>
            )}

            {/* Quick Cart */}
            <Link
              href="/portal/cart"
              className="bg-[#1C1F22] text-white px-3 py-1.5 rounded-lg text-xs font-condensed font-bold uppercase flex items-center gap-1.5 hover:bg-[#D50000] transition"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Children */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
