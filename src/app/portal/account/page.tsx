'use client';

import React, { useState } from 'react';
import {
  Building2,
  Users,
  Shield,
  Bell,
  CheckCircle2,
  Save,
  MapPin,
  Plus,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AccountPage() {
  const { session } = useApp();
  const [saved, setSaved] = useState(false);

  const [smsQuotes, setSmsQuotes] = useState(true);
  const [smsDispatch, setSmsDispatch] = useState(true);
  const [emailInvoices, setEmailInvoices] = useState(true);

  const teamMembers = [
    { name: 'Dave Miller', email: 'dave@apexfleet.com.au', role: 'Owner', access: 'Full billing, quotes & team' },
    { name: 'Sarah Connor', email: 'sarah@apexfleet.com.au', role: 'Buyer', access: 'Submit RFQs & accept quotes' },
    { name: 'Luke Workshop Tech', email: 'luke@apexfleet.com.au', role: 'Staff', access: 'Search tyre specs & build cart' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-condensed font-black text-3xl text-[#1C1F22] uppercase">
          COMMERCIAL ACCOUNT &amp; TEAM ACCESS
        </h1>
        <p className="text-xs text-[#6C757D] mt-0.5">
          Manage your Queensland depot delivery addresses, team user permissions, and SMS notification settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Business Identity */}
        <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-condensed font-bold text-xl text-[#1C1F22] uppercase flex items-center gap-2 border-b border-[#E9ECEF] pb-2">
            <Building2 className="w-5 h-5 text-[#D50000]" />
            <span>Registered Commercial Entity</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#868E96] uppercase font-bold block text-[10px]">Entity Legal Name:</span>
              <strong className="text-sm text-[#1C1F22] font-mono">
                {session?.dealerName || 'Apex Fleet Logistics Pty Ltd'}
              </strong>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#868E96] uppercase font-bold block text-[10px]">Australian Business Number:</span>
                <span className="font-mono text-[#1C1F22] font-bold">45 123 456 789 (Active)</span>
              </div>
              <div>
                <span className="text-[#868E96] uppercase font-bold block text-[10px]">Assigned Wholesale Tier:</span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
                  Tier {session?.tier || 'A'} Wholesale Discount
                </span>
              </div>
            </div>

            <div>
              <span className="text-[#868E96] uppercase font-bold block text-[10px]">Primary Fulfillment Hub:</span>
              <span className="font-bold text-[#1C1F22]">Rocklea Central HQ (Priority Bay Dispatch)</span>
            </div>

            <div>
              <span className="text-[#868E96] uppercase font-bold block text-[10px]">Standard Delivery Address:</span>
              <span className="text-[#495057]">88 Logistics Blvd, Crestmead QLD 4132</span>
            </div>
          </div>
        </div>

        {/* SMS & Notification Alerts (Blueprint Section 9 & 21) */}
        <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-condensed font-bold text-xl text-[#1C1F22] uppercase flex items-center gap-2 border-b border-[#E9ECEF] pb-2">
            <Bell className="w-5 h-5 text-[#D50000]" />
            <span>Instant Dispatch &amp; Quote Alerts</span>
          </h2>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsQuotes}
                onChange={(e) => setSmsQuotes(e.target.checked)}
                className="mt-0.5 accent-[#D50000] w-4 h-4 rounded"
              />
              <div>
                <strong className="text-[#1C1F22] block">SMS Alert When Quote is Priced</strong>
                <span className="text-[#6C757D]">
                  Sends direct link to authorized buyer mobile with 1-tap accept.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsDispatch}
                onChange={(e) => setSmsDispatch(e.target.checked)}
                className="mt-0.5 accent-[#D50000] w-4 h-4 rounded"
              />
              <div>
                <strong className="text-[#1C1F22] block">SMS Alert When Delivery Leaves Hub</strong>
                <span className="text-[#6C757D]">
                  Provides live driver ETA and delivery van plate details.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailInvoices}
                onChange={(e) => setEmailInvoices(e.target.checked)}
                className="mt-0.5 accent-[#D50000] w-4 h-4 rounded"
              />
              <div>
                <strong className="text-[#1C1F22] block">PDF Invoices to Accounts Email</strong>
                <span className="text-[#6C757D]">
                  Delivered automatically upon warehouse signature confirmation.
                </span>
              </div>
            </label>

            <button
              onClick={() => setSaved(true)}
              className="bg-[#1C1F22] hover:bg-[#343A40] text-white px-4 py-2 rounded-lg font-condensed font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saved ? 'Preferences Saved' : 'Save Notification Preferences'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Team Users & Roles (Blueprint Section 9, Page 21) */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E9ECEF]">
          <h2 className="font-condensed font-bold text-xl text-[#1C1F22] uppercase flex items-center gap-2">
            <Users className="w-5 h-5 text-[#D50000]" />
            <span>Authorized Team Users &amp; Role Permissions</span>
          </h2>
          <span className="text-xs text-[#6C757D] font-mono">3 Active Users</span>
        </div>

        <div className="divide-y divide-[#E9ECEF] text-xs">
          {teamMembers.map((member, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-[#1C1F22] text-sm">{member.name}</div>
                <div className="text-[#6C757D] font-mono">{member.email}</div>
              </div>

              <div className="text-right">
                <span className="bg-[#1C1F22] text-white text-[10px] font-condensed font-bold uppercase px-2.5 py-0.5 rounded">
                  {member.role}
                </span>
                <div className="text-[11px] text-[#868E96] mt-0.5">{member.access}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
