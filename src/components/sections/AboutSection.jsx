"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  Clock,
  Building2,
  X,
  CheckCircle2,
  Sparkles,
  Calendar,
} from "lucide-react";
import { HOSPITAL_INFO, LEAD_DOCTOR, TRUST_PILLARS } from "@/lib/constants";
import Button from "@/components/ui/Button";

const PILLARS = [
  {
    icon: Heart,
    title: "Maternity & Women's Care",
    desc: "Safe, natural delivery care with 24/7 labor monitoring and expert obstetric support.",
    color: "text-secondary",
    bg: "bg-secondary-light",
  },
  {
    icon: Stethoscope,
    title: "Expert Specialists",
    desc: "Consultant physicians, surgeons, pediatricians and physiotherapists on staff.",
    color: "text-primary-600",
    bg: "bg-primary-50",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Costs",
    desc: "Fair, transparent billing with detailed pre-treatment estimates and clear policies.",
    color: "text-primary-600",
    bg: "bg-primary-50",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Modular OT, high-resolution ultrasound, and clean private cabins.",
    color: "text-secondary",
    bg: "bg-secondary-light",
  },
];

const QUICK_STATS = [
  { value: "5000+", label: "Safe Deliveries" },
  { value: "10+", label: "Years Experience" },
  { value: "7", label: "Specialties" },
  { value: "24/7", label: "Emergency" },
];

const ease = [0.22, 1, 0.36, 1];

export default function AboutSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Close story modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowStoryModal(false);
    };
    if (showStoryModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showStoryModal]);

  return (
    <section
      id="about"
      ref={ref}
      className="about-section relative isolate overflow-hidden py-16 lg:py-20"
    >
      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="about-bg-blob-1 absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full blur-3xl" />
        <div className="about-bg-blob-2 absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Doctor photo composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.7, ease }}
            className="relative mx-auto w-full max-w-lg pb-8 lg:max-w-none lg:pb-0"
          >
            {/* Main doctor portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.97 }
              }
              transition={{ duration: 0.8, delay: 0.12, ease }}
              whileHover={{ y: -3 }}
              className="group relative ml-[5%] aspect-[4/5] w-[80%] overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl shadow-navy-500/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-secondary/10 motion-reduce:transform-none"
            >
              <Image
                src="/assets/doctors/dr-parween.png"
                alt={LEAD_DOCTOR.name}
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 75vw, 35vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
              />

              {/* Founding Director badge */}
              <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                <span className="about-director-badge inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider shadow-md sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Founding Director
                </span>
              </div>

              {/* Doctor name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-4 pb-5 pt-20 text-white sm:px-5 sm:pb-6">
                <div className="about-accent-bar mb-2 h-1 w-9 rounded-full" />

                <h3 className="font-heading text-lg font-extrabold sm:text-xl">
                  {LEAD_DOCTOR.name}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-white/85 sm:text-sm">
                  {LEAD_DOCTOR.degrees}
                </p>
              </div>
            </motion.div>

            {/* Supporting reception photo */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.25, ease }}
              whileHover={{ y: -4 }}
              className="group absolute bottom-[9%] right-0 z-20 aspect-[4/3] w-[53%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:right-1 sm:rounded-3xl"
            > */}
              {/* <Image
                src="/assets/gallery/reception.png"
                alt="Hospital Reception"
                fill
                quality={90}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 22vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              /> */}

              {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
                <p className="text-xs font-bold text-white sm:text-sm">
                  Patient-Friendly Care
                </p>
              </div>
            </motion.div> */}

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, x: -12, scale: 0.94 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -12, scale: 0.94 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="about-experience-badge absolute left-0 top-[40%] z-30 max-w-[130px] rounded-2xl p-3.5 text-center shadow-xl sm:max-w-[155px] sm:p-5"
            >
              <div className="text-3xl font-extrabold leading-none sm:text-4xl">
                10+
              </div>

              <div className="mt-2 text-[10px] font-bold uppercase leading-relaxed tracking-wider text-white/90 sm:text-xs">
                Years of Medical Excellence
              </div>
            </motion.div>

            {/* Quick statistics */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:absolute lg:-bottom-14 lg:left-0 lg:right-0 lg:mt-0 lg:grid-cols-4 lg:pt-4">
              {QUICK_STATS.map(({ value, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + index * 0.07,
                    ease,
                  }}
                  className="about-stat-card rounded-xl p-3 text-center shadow-sm motion-reduce:transform-none"
                >
                  <div className="about-stat-val text-lg font-extrabold leading-none sm:text-xl">
                    {value}
                  </div>

                  <div className="about-stat-label mt-2 text-[10px] font-semibold leading-tight sm:text-xs">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: About content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="min-w-0 space-y-6 lg:pt-10"
          >
            <div>
              <span className="about-tag mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Welcome to Dr. Parween&apos;s Hospital
              </span>

              <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-dark sm:text-4xl lg:text-5xl">
                Pioneering{" "}
                <span className="about-headline-accent">
                  Ethical &amp; Compassionate
                </span>{" "}
                Healthcare
              </h2>

              <div className="about-accent-bar mt-5 h-1 w-16 rounded-full" />
            </div>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Dr. Parween&apos;s Hospital is a premier multi-specialty healthcare facility located
              on FRS Road near Fateh Khan Dargah in Rajampet, Sangareddy. Founded by Dr. Parween Saba
              (MBBS, DGO AMU), our hospital provides high-touch maternity care, painless deliveries,
              and advanced keyhole surgeries with complete moral and financial transparency.
            </p>

            {/* Quality pillars */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, desc, color, bg }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 14 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: 0.2 + index * 0.07,
                    ease,
                  }}
                  whileHover={{ y: -3 }}
                  className="about-pillar-card group flex min-w-0 items-start gap-3 rounded-xl p-4 shadow-sm motion-reduce:transform-none"
                >
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-bold leading-snug text-dark">
                      {title}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* OPD timings */}
            <div className="about-timing-box flex items-start gap-3 rounded-xl px-4 py-3 shadow-sm">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />

              <div className="min-w-0">
                <p className="text-xs font-bold text-dark">
                  OPD Consultation Hours
                </p>

                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {HOSPITAL_INFO.timings.opdDays}:{" "}
                  {HOSPITAL_INFO.timings.opdHours} &bull; Sunday: Emergency 24/7
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.button
                type="button"
                onClick={onOpenBooking}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="about-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 motion-reduce:transform-none"
              >
                Schedule Appointment
              </motion.button>

              <button
                type="button"
                onClick={() => setShowStoryModal(true)}
                className="group inline-flex items-center gap-2 text-sm font-bold text-dark transition-colors duration-200 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
              >
                Read Our Story
                <ArrowRight className="h-4 w-4 text-primary-600 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* In-Depth Story & Principles Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white text-slate-800 shadow-2xl flex flex-col max-h-[90vh] border border-slate-200"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white shrink-0">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-navy-950"
                  aria-label="Close story"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-300 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>The Founding Mission</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Our Healthcare Journey in Sangareddy
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Founded with the core belief that every patient deserves dignified, transparent, and high-quality medical treatment without commercialization.
                </p>
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-slate-600 leading-relaxed text-sm sm:text-base">
                <div>
                  <h4 className="text-base font-bold text-navy-950 mb-2">
                    Roots in Sangareddy &amp; Telangana
                  </h4>
                  <p>
                    Located on FRS Road near Fateh Khan Dargah in Rajampet, Sangareddy, Dr Parween’s Hospital has emerged as a trusted sanctuary for expectant mothers, families, and critical patients across the region.
                  </p>
                  <p className="mt-3">
                    Our founder, Dr. Parween Saba (MBBS, DGO AMU), recognized the critical need for a hospital that provides high-end obstetrics, painless deliveries, and advanced keyhole surgeries while upholding absolute moral transparency. We do not prescribe unnecessary surgeries or tests; we partner with patients to help them make informed, confident healthcare decisions.
                  </p>
                </div>

                {/* Lead Doctor Credentials Highlight */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      PS
                    </div>
                    <div>
                      <h5 className="text-base font-bold text-navy-950">{LEAD_DOCTOR.name}</h5>
                      <p className="text-xs font-semibold text-brand-blue">
                        {LEAD_DOCTOR.degrees} • {LEAD_DOCTOR.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {LEAD_DOCTOR.bio}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {LEAD_DOCTOR.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Principles */}
                <div>
                  <h4 className="text-base font-bold text-navy-950 mb-3">
                    Our Unbreakable Principles of Care
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRUST_PILLARS.slice(0, 4).map((pillar, i) => (
                      <div key={i} className="rounded-xl border border-slate-200 p-3.5 bg-white shadow-sm">
                        <h5 className="text-xs font-bold text-navy-950 mb-1">{pillar.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{pillar.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowStoryModal(false);
                    onOpenBooking?.();
                  }}
                  icon={Calendar}
                >
                  Schedule Appointment
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
