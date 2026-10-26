"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Phone,
  Star,
  Stethoscope,
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
      focus:
        "Minimally invasive keyhole surgery, gallbladder, appendectomy, hernia",
      image: "/assets/gallery/operation-theater.jpg",
    },
    {
      name: "Dr. K. Srinivas Rao",
      role: "Consultant Physician & Diabetologist",
      qualification: "MBBS, MD (Internal Medicine)",
      experience: "15+ Years Experience",
      focus:
        "Hypertension, chronic diabetes, infectious fevers, adult medicine",
      image: "/assets/services/internal-medicine.png",
    },
    {
      name: "Dr. S. Fatima",
      role: "Consultant Pediatrician & Neonatologist",
      qualification: "MBBS, DCH, DNB (Pediatrics)",
      experience: "8+ Years Experience",
      focus:
        "Newborn care, infant vaccination, pediatric respiratory & wellness",
      image: "/assets/services/pediatrics.png",
    },
  ];

  return (
    <section
      id="doctors"
      className="relative overflow-hidden bg-white py-16 lg:py-20"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <Badge variant="cyan" size="md" dot>
            Best Specialists & Clinical Leadership
          </Badge>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
            Meet With Our Specialist Doctor for Your Treatment
          </h2>

          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            Led by Dr. Parween Saba, our experienced doctors provide
            personalized care backed by years of clinical mastery,
            ensuring the best outcomes for every mother, child, and patient.
          </p>
        </div>

        {/* Lead Doctor Hero Feature Card */}
        <div className="doctor-hero-card relative mb-12 overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-10 lg:p-12">
          {/* Ambient Lighting */}
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Doctor Image Column */}
            <div className="flex min-w-0 justify-center lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="doctor-portrait-frame group relative aspect-[3.5/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-[0_20px_55px_rgba(0,0,0,0.25)] motion-reduce:transform-none"
              >
                {/* Founding Director badge */}
                <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4 ">
                  <span className="about-director-badge inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider shadow-md sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Founding Director
                  </span>
                </div>
                <Image
                  src="/assets/doctors/dr-parween.png"
                  alt={LEAD_DOCTOR.name}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="origin-top object-cover object-top scale-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.1] motion-reduce:transform-none motion-reduce:transition-none"
                />

                {/* Founding Director Badge */}
                <div className="absolute left-4 top-4 z-10">
                  <Badge variant="dark" size="sm" dot>
                    Founding Director
                  </Badge>
                </div>

                {/* OPD Consultation Information */}
                <div className="doctor-opd-box absolute inset-x-4 bottom-4 z-10 rounded-xl p-3 text-center shadow-lg">
                  <div className="doctor-opd-title text-xs font-bold">
                    OPD Consultation
                  </div>

                  <div className="mt-1 text-sm font-semibold text-slate-700">
                    Mon – Sat: 9:00 AM – 6:00 PM
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Doctor Credentials & Bio Column */}
            <div className="min-w-0 space-y-6 lg:col-span-7">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl font-extrabold uppercase tracking-widest text-white">
                    Chief Consultant Gynecologist & Obstetrician
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/50 bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                    <span>5.0 Patient Rating</span>
                  </span>
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {LEAD_DOCTOR.name}
                </h3>

                <p className="text-sm font-semibold text-white/90 sm:text-base">
                  {LEAD_DOCTOR.degrees} • {LEAD_DOCTOR.experience}
                </p>
              </div>

              <p className="text-justify text-sm leading-relaxed text-white/90 sm:text-base">
                {LEAD_DOCTOR.bio}
              </p>

              {/* Clinical Highlights Grid */}
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {LEAD_DOCTOR.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 rounded-xl border border-white/25 bg-white/10 p-3 transition-colors duration-200 hover:bg-white/15"
                  >
                    <CheckCircle2 className="doctor-check-icon mt-0.5 h-4 w-4 shrink-0" />

                    <span className="text-xs font-medium text-white/95">
                      {highlight}
                    </span>
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
                  className="shadow-xl shadow-black/15"
                >
                  Consult Dr. Parween Saba
                </Button>

                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <Phone className="h-4 w-4 text-white" />
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

              <p className="text-xs text-slate-500 sm:text-sm">
                Specialized surgeons, physicians, and pediatricians available
                on schedule
              </p>
            </div>

            <Link
              href="/doctors"
              className="hidden text-xs font-bold text-brand-600 hover:text-brand-700 sm:block sm:text-sm"
            >
              View All Doctors →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportingDoctors.map((doctor, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="teal" size="sm">
                      {doctor.experience}
                    </Badge>

                    <Stethoscope className="h-4 w-4 text-slate-400" />
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-navy-900">
                      {doctor.name}
                    </h5>

                    <p className="mt-0.5 text-xs font-semibold text-brand-600">
                      {doctor.role}
                    </p>

                    <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                      {doctor.qualification}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600">
                    {doctor.focus}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    Request Appointment →
                  </button>

                  <span className="text-[11px] text-slate-400">
                    OPD By Appointment
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
