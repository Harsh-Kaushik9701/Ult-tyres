'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, UserCheck, Shield, ChevronDown, Check, X, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function TopUtilityRibbon() {
  const { session, switchRole, recentNotification, clearNotification, cart, pricingRequests } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Check pending actions for dealers
  const readyQuotesCount = pricingRequests.filter(
    (r) => r.status === 'quote_ready' && r.dealerId === session?.dealerId
  ).length;

  return (
    <>
      {/* Toast Notification Bar */}
      {recentNotification && (
        <div className="bg-[#D50000] text-white px-4 py-2 text-sm font-medium flex items-center justify-between shadow-md transition-all z-50">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="w-4 h-4 animate-bounce" />
              {recentNotification}
            </span>
            <button
              onClick={clearNotification}
              className="p-1 hover:bg-white/20 rounded transition text-xs flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Top Utility Ribbon */}
      <div className="bg-[#121416] text-[#CED4DA] border-b border-[#25292E] text-xs py-2 px-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Contact Equity & Distributorship Claim */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:1300110002"
              className="flex items-center gap-1.5 font-semibold text-white hover:text-[#D50000] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#D50000]" />
              <span>1300 110 002</span>
              <span className="text-[#6C757D] font-normal hidden sm:inline">(Toll-Free AU)</span>
            </a>

            <span className="text-[#343A40] hidden sm:inline">|</span>

            <a
              href="https://wa.me/61400000000?text=Hi%20Ultimate%20Tyres,%20I%20need%20a%20quote%20on%20commercial%20truck%20tyres"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <span className="text-[#343A40] hidden md:inline">|</span>

            <span className="hidden md:inline-flex items-center gap-1 text-[#ADB5BD]">
              <Shield className="w-3 h-3 text-[#D50000]" />
              <span>Authorised Distributor: <strong className="text-white">Ralson Commercial Tyres</strong></span>
            </span>
          </div>

          {/* Right: Demo Role Switcher & Dealer Access */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Interactive Role Switcher for Seamless Assessment */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 bg-[#25292E] hover:bg-[#343A40] text-white px-2.5 py-1 rounded border border-[#343A40] transition text-[11px]"
                title="Switch persona for testing"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Demo View:</span>
                <strong className="text-amber-400 capitalize">
                  {session ? `${session.role} (${session.name.split(' ')[0]})` : 'Public Visitor'}
                </strong>
                <ChevronDown className="w-3 h-3 text-[#6C757D]" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-1 w-64 bg-[#1C1F22] border border-[#343A40] rounded shadow-xl py-2 z-50 text-xs"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#6C757D] font-bold border-b border-[#25292E] mb-1">
                    Select Evaluation Persona
                  </div>
                  <button
                    onClick={() => switchRole('owner')}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#25292E] flex items-center justify-between text-white"
                  >
                    <div>
                      <div className="font-semibold">Dealer Owner</div>
                      <div className="text-[10px] text-[#6C757D]">Apex Fleet (Tier A) - Full Access</div>
                    </div>
                    {session?.role === 'owner' && <Check className="w-4 h-4 text-[#D50000]" />}
                  </button>
                  <button
                    onClick={() => switchRole('staff')}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#25292E] flex items-center justify-between text-white"
                  >
                    <div>
                      <div className="font-semibold">Workshop Staff</div>
                      <div className="text-[10px] text-[#6C757D]">Can build cart, cannot submit RFQ</div>
                    </div>
                    {session?.role === 'staff' && <Check className="w-4 h-4 text-[#D50000]" />}
                  </button>
                  <button
                    onClick={() => switchRole('admin')}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#25292E] flex items-center justify-between text-white"
                  >
                    <div>
                      <div className="font-semibold">Ultimate Tyres Staff / Admin</div>
                      <div className="text-[10px] text-[#6C757D]">Price matrix, RFQ queue, approve dealers</div>
                    </div>
                    {session?.role === 'admin' && <Check className="w-4 h-4 text-[#D50000]" />}
                  </button>
                  <button
                    onClick={() => switchRole('public')}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#25292E] flex items-center justify-between text-white"
                  >
                    <div>
                      <div className="font-semibold">Public Visitor</div>
                      <div className="text-[10px] text-[#6C757D]">Catalog & specs only, zero prices</div>
                    </div>
                    {!session && <Check className="w-4 h-4 text-[#D50000]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dealer Portal Links */}
            {session && session.role !== 'admin' ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/portal"
                  className="flex items-center gap-1.5 bg-[#D50000] hover:bg-[#B30000] text-white px-3 py-1 rounded font-semibold transition"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Dealer Portal</span>
                  {readyQuotesCount > 0 && (
                    <span className="bg-amber-400 text-black text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {readyQuotesCount} Quote
                    </span>
                  )}
                </Link>
                {cart.length > 0 && (
                  <Link
                    href="/portal/cart"
                    className="bg-[#25292E] text-white hover:text-[#D50000] px-2 py-1 rounded transition text-xs flex items-center gap-1 border border-[#343A40]"
                  >
                    <span>Cart:</span>
                    <strong className="text-amber-400">{cart.reduce((a, b) => a + b.quantity, 0)}</strong>
                  </Link>
                )}
              </div>
            ) : session?.role === 'admin' ? (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-black px-3 py-1 rounded font-bold transition"
              >
                <span>Staff Admin Desk</span>
              </Link>
            ) : (
              <Link
                href="/dealer/login"
                className="flex items-center gap-1.5 bg-[#D50000] hover:bg-[#B30000] text-white px-3 py-1 rounded font-semibold transition"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Dealer Login / Join</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
