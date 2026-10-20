"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Plus, Minus, HelpCircle, Phone, MessageCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { HOSPITAL_FAQS, HOSPITAL_INFO, LEAD_DOCTOR } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function FaqSection({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I have a question regarding treatments and appointments."
  );

  return (
    <section id="faqs" className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Heading + Doctor Visual Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge variant="cyan" size="md" dot>
                Got a Question
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Find quick answers about our medical services, treatments, appointments, hospital hours, and patient care for your convenience.
              </p>
            </div>

            {/* Doctor Portrait Visual as on the live site */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-brand-50 to-slate-100 border border-slate-200 aspect-[4/5] max-w-sm">
              <Image
                src="/assets/doctors/dr-parween.png"
                alt={LEAD_DOCTOR.name}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent text-white">
                <div className="text-xs font-bold text-brand-300">Have questions about your health?</div>
                <h4 className="text-lg font-bold text-white mt-0.5">{LEAD_DOCTOR.name}</h4>
                <p className="text-xs text-slate-300">{LEAD_DOCTOR.degrees}</p>
              </div>
            </div>

            {/* Ask More Questions Card */}
            <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-3 max-w-sm">
              <h4 className="text-sm font-bold text-navy-900">Still have questions?</h4>
              <p className="text-xs text-slate-600">
                Call our reception desk or text us on WhatsApp for immediate guidance.
              </p>
              <div className="flex gap-2">
                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-white border border-brand-200 text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-brand-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0">
            {HOSPITAL_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-slate-50/80 border-brand-300 shadow-md shadow-brand-500/5"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-navy-950">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-brand-500 text-white rotate-180" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 mt-1 pl-14">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
