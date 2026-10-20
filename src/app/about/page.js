"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Clock,
  Sparkles,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { HOSPITAL_INFO, LEAD_DOCTOR, TRUST_PILLARS } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export default function AboutPage() {
  const { openBookingModal } = useBooking();

  return (
    <div className="py-10 lg:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md" dot>
            About Dr. Parween&apos;s Hospital
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Compassionate, Ethical & Modern Healthcare in Sangareddy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with the belief that every patient deserves dignified, transparent, and high-quality medical treatment without commercialization.
          </p>
        </div>

        {/* Story & Facility Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full border-4 border-white">
              <Image
                src="/assets/gallery/facility-3.png"
                alt="Dr. Parween's Hospital Building"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-bottom"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-navy-950 text-white p-5 rounded-2xl shadow-xl border border-white/10 hidden sm:block max-w-xs">
              <div className="text-2xl font-bold text-brand-300">10+ Years</div>
              <div className="text-xs text-slate-300">Serving Sangareddy & Telangana Communities</div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Our Journey &amp; Healthcare Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
              Located on FRS Road near Fateh Khan Dargah in Rajampet, Sangareddy, Dr Parween’s Hospital has emerged as a trusted sanctuary for expectant mothers, families, and critical patients across the region.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
              Our founder, Dr. Parween Saba, recognized the critical need for a hospital that provides high-end obstetrics, painless deliveries, and advanced keyhole surgeries while upholding absolute moral transparency. We do not prescribe unnecessary surgeries or tests; we partner with patients to help them make informed, confident healthcare decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <Heart className="w-5 h-5 text-red-500 mb-1" />
                <h4 className="text-xs font-bold text-navy-900">Patient-Centricity</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Warm, empathetic bedside listening.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-teal-600 mb-1" />
                <h4 className="text-xs font-bold text-navy-900">Ethical Billing</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Complete upfront cost transparency.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Doctor In-Depth Profile */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-xs aspect-[3.5/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src={LEAD_DOCTOR.imageNoBg || LEAD_DOCTOR.image}
                  alt={LEAD_DOCTOR.name}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 75vw, 32vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div>
                <Badge variant="glow" size="sm" dot>
                  Medical Leadership
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {LEAD_DOCTOR.name}
                </h3>
                <p className="text-sm font-semibold text-brand-300">
                  {LEAD_DOCTOR.degrees} • {LEAD_DOCTOR.title}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed text-justify">
                {LEAD_DOCTOR.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {LEAD_DOCTOR.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" onClick={openBookingModal} icon={Calendar}>
                  Book Consultation with Dr. Parween Saba
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              Our Core Principles of Care
            </h3>
            <p className="text-sm text-slate-500">
              The foundational pillars that guide every doctor, nurse, and staff member at our hospital
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_PILLARS.map((p, i) => (
              <Card key={i} className="p-6 bg-white border border-slate-200/80 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-1">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
