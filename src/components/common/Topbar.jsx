"use client";

import React from "react";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function Topbar() {
  const waUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello, I would like to inquire about an appointment."
  );

  return (
    <div className="hidden sm:block w-full text-white text-xs font-medium" style={{ backgroundColor: "#0f766e" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Left: Address + Hours */}
          <div className="flex items-center gap-4 min-w-0 overflow-hidden">
            <span className="flex items-center gap-1.5 shrink-0 text-primary-100">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">H NO: 3, FRS Road, Sangareddy – 502001</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-primary-100">
              <Clock className="h-3 w-3 shrink-0" />
              Mon–Sat: 9AM–6PM &bull; Sunday: Emergency 24/7
            </span>
          </div>

          {/* Right: Phone + WhatsApp */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOSPITAL_INFO.rawPhone}`}
              className="flex items-center gap-1.5 text-white hover:text-primary-100 transition-colors font-semibold"
            >
              <Phone className="h-3 w-3" />
              {HOSPITAL_INFO.phone}
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-white hover:bg-white/20 transition-colors font-semibold"
            >
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
