"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Heart,
  Building2,
  Clock,
  CheckCircle2,
  ReceiptText,
  ArrowRight,
} from "lucide-react";
import { TRUST_PILLARS } from "@/lib/constants";

const ICON_MAP = {
  Award,
  Heart,
  Building2,
  ReceiptCheck: ReceiptText,
  Clock,
  CheckCircle2,
};

const GRADIENT_ICONS = [
  { bg: "from-primary-600 to-primary-400", text: "text-white" },
  { bg: "from-rose-500 to-rose-400", text: "text-white" },
  { bg: "from-blue-600 to-blue-400", text: "text-white" },
  { bg: "from-amber-500 to-amber-400", text: "text-white" },
  { bg: "from-emerald-600 to-emerald-400", text: "text-white" },
  { bg: "from-purple-600 to-purple-400", text: "text-white" },
];

export default function WhyChooseUsSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="why-us"
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fdfa 50%, #ffffff 100%)" }}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-l from-transparent via-primary-200 to-transparent" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-primary-50/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="mb-10 text-center max-w-3xl mx-auto"
        >
          <span className="badge-pill bg-primary-100 text-primary-700 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Excellence You Can{" "}
            <span style={{ color: "#0f766e" }}>Trust</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
            At Dr. Parween&apos;s Hospital, every aspect of care is designed to put you first — with
            proven expertise, modern infrastructure, and heartfelt compassion.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = ICON_MAP[pillar.icon] || CheckCircle2;
            const gradient = GRADIENT_ICONS[idx % GRADIENT_ICONS.length];

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: idx * 0.08 }}
                className="card-elevated group p-6"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient.bg} shadow-md`}>
                  <Icon className={`h-6 w-6 ${gradient.text}`} />
                </div>
                <h3 className="text-lg font-bold text-dark group-hover:text-primary-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl p-7 sm:p-8 text-white"
          style={{ background: "linear-gradient(135deg, #0f766e 0%, #0f172a 100%)" }}
        >
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Ready to experience exceptional care?
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Book your appointment today — Mon to Sat, 9AM – 6PM.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold transition-all hover:bg-white/90 hover:-translate-y-0.5"
            style={{ color: "#0f766e" }}
          >
            Book Appointment
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
