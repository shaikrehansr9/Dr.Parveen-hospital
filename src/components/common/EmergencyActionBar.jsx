"use client";

import React from "react";
import { Phone, MessageCircle, Calendar, MapPin, AlertCircle } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function EmergencyActionBar({ onOpenBooking }) {
  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I would like to book a consultation or ask about emergency services."
  );

  return (
    <div className="emergency-action-bar fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call Emergency */}
        <a
          href={`tel:${HOSPITAL_INFO.rawPhone}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-red-600/90 text-white font-medium text-[11px] active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
            <Phone className="w-3.5 h-3.5 text-white animate-pulse" />
          </div>
          <span>Call 24/7</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-600/90 text-white font-medium text-[11px] active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
            <MessageCircle className="w-3.5 h-3.5 text-white" />
          </div>
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment Modal Trigger */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/30 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Book Visit</span>
        </button>

        {/* Directions */}
        <a
          href={HOSPITAL_INFO.address.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-800 text-slate-200 font-medium text-[11px] active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-brand-300" />
          </div>
          <span>Map</span>
        </a>
      </div>
    </div>
  );
}
