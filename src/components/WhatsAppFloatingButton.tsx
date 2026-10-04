'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1F22] text-white text-xs px-3 py-1.5 rounded-lg border border-[#343A40] shadow-xl whitespace-nowrap">
        <span className="font-bold text-emerald-400">Need tyre stock or emergency fitting?</span> Chat with us
      </div>

      <a
        href="https://wa.me/61400000000?text=Hi%20Ultimate%20Tyres,%20I'm%20inquiring%20about%20truck%20tyres%20availability"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-white/20"
        aria-label="Chat on WhatsApp"
        id="whatsapp-chat-button"
      >
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>

      <button
        onClick={() => setClosed(true)}
        className="absolute -top-1 -right-1 w-5 h-5 bg-[#25292E] hover:bg-[#343A40] text-[#868E96] hover:text-white rounded-full flex items-center justify-center text-[10px] border border-[#343A40] transition"
        title="Dismiss WhatsApp prompt"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
