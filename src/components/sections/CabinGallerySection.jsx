"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ZoomIn, Camera } from "lucide-react";
import { HOSPITAL_INFRASTRUCTURE } from "@/lib/constants";

const CATEGORIES = ["All", "Surgical Suite", "Facility", "Patient Care", "Emergency", "Diagnostics", "Imaging", "Cabin & Rooms"];

export default function CabinGallerySection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? HOSPITAL_INFRASTRUCTURE
      : HOSPITAL_INFRASTRUCTURE.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative bg-surface py-16 lg:py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="absolute -left-24 bottom-1/4 h-[400px] w-[400px] rounded-full bg-primary-50/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="badge-pill bg-primary-100 text-primary-700 mb-4">
              Hospital Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
              Our Facilities &amp;{" "}
              <span style={{ color: "#0f766e" }}>Infrastructure</span>
            </h2>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              State-of-the-art rooms, modular OT, and patient-first spaces.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-all hover:gap-3"
          >
            <Camera className="h-4 w-4" />
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
              }`}
              style={activeCategory === cat ? { backgroundColor: "#0f766e" } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: idx * 0.05 }}
              className="group card-elevated overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={90}
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-[1.06] ${
                    item.id === "hospital-exterior" ? "object-bottom" : "object-center"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-primary-600/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm border border-white/30">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-dark leading-snug group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-600 px-6 py-3.5 text-sm font-bold text-primary-600 transition-all hover:bg-primary-600 hover:text-white hover:-translate-y-0.5"
          >
            <Camera className="h-4 w-4" />
            View All Photos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
