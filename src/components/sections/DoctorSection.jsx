"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Calendar,
  CheckCircle2,
  Heart,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Clock,
  Sparkles,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LEAD_DOCTOR, HOSPITAL_INFO } from "@/lib/constants";

export default function DoctorSection({ onOpenBooking }) {
  const supportingDoctors = [
    {
      name: "Dr. A. Rahman",
      role: "Senior Laparoscopic & General Surgeon",
      qualification: "MBBS, MS (Gen Surgery), FMAS",
      experience: "12+ Years Experience",
      focus: "Minimally invasive keyhole surgery, gallbladder, appendectomy, hernia",
      image: "/assets/gallery/operation-theater.jpg",
    },
    {
      name: "Dr. K. Srinivas Rao",
      role: "Consultant Physician & Diabetologist",
      qualification: "MBBS, MD (Internal Medicine)",
      experience: "15+ Years Experience",
      focus: "Hypertension, chronic diabetes, infectious fevers, adult medicine",
      image: "/assets/services/internal-medicine.png",
    },
    {
      name: "Dr. S. Fatima",
      role: "Consultant Pediatrician & Neonatologist",
      qualification: "MBBS, DCH, DNB (Pediatrics)",
      experience: "8+ Years Experience",
      focus: "Newborn care, infant vaccination, pediatric respiratory & wellness",
      image: "/assets/services/pediatrics.png",
    },
  ];

  return (
    <section id="doctors" className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge variant="cyan" size="md" dot>
            Best Specialists & Clinical Leadership
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            Meet With Our Specialist Doctor for Your Treatment
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Led by Dr. Parween Saba, our experienced doctors provide personalized care backed by years of clinical mastery, ensuring the best outcomes for every mother, child, and patient.
          </p>
        </div>

        {/* Lead Doctor Hero Feature Card */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10 mb-12 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Doctor Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3.5/4] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-900/40 via-navy-900/60 to-navy-950 border-2 border-brand-400/30 shadow-2xl">
                <Image
                  src={LEAD_DOCTOR.imageNoBg || LEAD_DOCTOR.image}
                  alt={LEAD_DOCTOR.name}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="object-contain object-bottom hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4">
                  <Badge variant="glow" size="sm" dot>
                    Founding Director
                  </Badge>
                </div>

                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-navy-900/90 backdrop-blur-md border border-white/10 text-center">
                  <div className="text-xs font-bold text-brand-300">OPD Consultation</div>
                  <div className="text-xs text-slate-300">Mon – Sat: 9:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>

            {/* Doctor Credentials & Bio Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400">
                    Chief Consultant Gynecologist & Obstetrician
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-semibold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>5.0 Patient Rating</span>
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {LEAD_DOCTOR.name}
                </h3>

                <p className="text-sm sm:text-base font-semibold text-brand-200">
                  {LEAD_DOCTOR.degrees} • {LEAD_DOCTOR.experience}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify">
                {LEAD_DOCTOR.bio}
              </p>

              {/* Clinical Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {LEAD_DOCTOR.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-medium">{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenBooking}
                  icon={Calendar}
                  className="shadow-xl shadow-brand-500/25"
                >
                  Consult Dr. Parween Saba
                </Button>

                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-300" />
                  <span>Call OPD Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Specialists Sub-grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-xl font-bold text-navy-950">
                Multi-Specialty Medical Panel
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Specialized surgeons, physicians, and pediatricians available on schedule
              </p>
            </div>
            <Link
              href="/doctors"
              className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 hidden sm:block"
            >
              View All Doctors →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingDoctors.map((doc, idx) => (
              <Card
                key={idx}
                className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="teal" size="sm">
                      {doc.experience}
                    </Badge>
                    <Stethoscope className="w-4 h-4 text-slate-400" />
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-navy-900">{doc.name}</h5>
                    <p className="text-xs font-semibold text-brand-600 mt-0.5">{doc.role}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.qualification}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{doc.focus}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    Request Appointment →
                  </button>
                  <span className="text-[11px] text-slate-400">OPD By Appointment</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
