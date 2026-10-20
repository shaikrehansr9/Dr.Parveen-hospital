"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { PATIENT_TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? PATIENT_TESTIMONIALS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === PATIENT_TESTIMONIALS.length - 1 ? 0 : i + 1));

  return (
    <section id="testimonials" className="relative py-16 lg:py-20 overflow-hidden" ref={ref}
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f0fdfa 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="absolute -left-24 top-1/2 h-[400px] w-[400px] rounded-full bg-primary-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="mb-10 text-center"
        >
          <span className="badge-pill bg-primary-100 text-primary-700 mb-4">
            Patient Testimonials
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span style={{ color: "#0f766e" }}>Families</span>{" "}
            Across Sangareddy
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base text-slate-600 sm:text-lg">
            Real stories of healing, safe childbirth, and successful recoveries.
          </p>
        </motion.div>

        {/* Grid: 3 per row on desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATIENT_TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: idx * 0.07 }}
              className="card-elevated flex flex-col justify-between p-6"
            >
              <div className="space-y-4">
                {/* Stars + quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-highlight text-highlight" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary-100" />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
                  {item.highlight}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #0f766e 0%, #0f172a 100%)" }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="flex items-center gap-1 text-sm font-bold text-dark">
                    {item.name}
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-500" />
                  </h4>
                  <p className="text-xs text-slate-400">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 shadow-sm sm:text-sm">
            <span className="flex items-center gap-1 text-highlight">
              <Star className="h-4 w-4 fill-highlight text-highlight" />
              <strong>4.9 / 5.0 Rating</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span>2,500+ Verified Consultations</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-primary-700">100% Patient Privacy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
