"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, X, ZoomIn, Building, ShieldCheck, Calendar, Bed, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { HOSPITAL_INFRASTRUCTURE } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export default function GalleryPage() {
  const { openBookingModal } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ["All", "Cabin & Rooms", "Surgical Suite", "Diagnostics", "Facility", "Emergency"];

  const filteredItems =
    selectedCategory === "All"
      ? HOSPITAL_INFRASTRUCTURE
      : HOSPITAL_INFRASTRUCTURE.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-10 lg:py-16 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="glow" size="md" dot>
            Hospital Infrastructure &amp; Private Cabins
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Cabin, OT &amp; Healthcare Infrastructure Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore our spacious private air-conditioned patient cabins, state-of-the-art modular operation theater, computerized diagnostics lab, and emergency triage bays in Sangareddy.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative rounded-3xl overflow-hidden bg-navy-950 border border-white/10 cursor-pointer shadow-xl hover:shadow-2xl hover:border-brand-400/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-navy-900/80 backdrop-blur-md text-brand-300 border border-white/10">
                    {item.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-navy-950/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-md scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-brand-400 font-semibold">
                  <span>View High-Res Photo</span>
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inpatient Admission Banner */}
        <div className="p-8 rounded-3xl bg-navy-850 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-300 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <Bed className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Planning Maternity Admission or Elective Surgery?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Pre-book your preferred private cabin with comfortable attendant amenities.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openBookingModal}
            icon={Calendar}
            className="shrink-0 w-full md:w-auto"
          >
            Pre-Book Inpatient Room
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-navy-950 rounded-3xl overflow-hidden border border-white/15 shadow-2xl cursor-default"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.title}
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-navy-900 border-t border-white/10">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest block mb-1">
                {lightboxImage.category}
              </span>
              <h3 className="text-xl font-bold text-white">{lightboxImage.title}</h3>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                {lightboxImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
