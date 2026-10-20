"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, Heart, ShieldCheck, Stethoscope, Award, ArrowRight, Clock, Building2 } from "lucide-react";
import { HOSPITAL_INFO, LEAD_DOCTOR } from "@/lib/constants";

const PILLARS = [
  {
    icon: Heart,
    title: "Maternity & Women's Care",
    desc: "Safe, natural delivery care with 24/7 labor monitoring and expert obstetric support.",
    color: "text-rose-600",
    bg: "bg-rose-50",
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
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Modular OT, high-resolution ultrasound, and clean private cabins.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const QUICK_STATS = [
  { value: "5000+", label: "Safe Deliveries" },
  { value: "10+", label: "Years Experience" },
  { value: "7", label: "Specialties" },
  { value: "24/7", label: "Emergency" },
];

export default function AboutSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative bg-white py-16 lg:py-20 overflow-hidden" ref={ref}>
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary-50/50 blur-3xl -translate-y-1/4 translate-x-1/4" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: Image Composite */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {/* Main hospital image */}
            <div className="relative aspect-[4/3] w-4/5 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white">
              <Image
                src="/assets/gallery/facility-3.png"
                alt="Dr. Parween's Hospital Exterior"
                fill
                quality={90}
                sizes="(max-width:1024px) 80vw, 40vw"
                className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlapping secondary image */}
            <div className="absolute -bottom-8 -right-2 sm:-right-6 aspect-[4/3] w-3/5 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl z-10">
              <Image
                src="/assets/gallery/reception.png"
                alt="Hospital Reception"
                fill
                quality={90}
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 24vw"
                className="object-cover"
              />
            </div>

            {/* Experience badge */}
            <div
              className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 z-20 rounded-[1.5rem] border-2 border-white/20 p-5 sm:p-6 text-center shadow-2xl max-w-[160px]"
              style={{ background: "linear-gradient(135deg, #0f766e 0%, #0f172a 100%)" }}
            >
              <div className="text-4xl font-extrabold text-white leading-none">10+</div>
              <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-primary-200">
                Years of Medical Excellence
              </div>
            </div>

            {/* Stats row */}
            <div className="absolute -bottom-14 left-0 right-0 grid grid-cols-4 gap-2 pt-4 hidden lg:grid">
              {QUICK_STATS.map(({ value, label }) => (
                <div key={label} className="rounded-xl bg-white border border-slate-100 shadow-sm p-2.5 text-center">
                  <div className="text-lg font-extrabold text-primary-600 leading-none">{value}</div>
                  <div className="mt-1 text-[10px] font-semibold text-slate-500 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="space-y-6 lg:pt-10"
          >
            <div>
              <span className="badge-pill bg-primary-100 text-primary-700 mb-4">
                Welcome to Dr. Parween&apos;s Hospital
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl leading-tight">
                Pioneering{" "}
                <span style={{ color: "#0f766e" }}>Ethical &amp; Compassionate</span>{" "}
                Healthcare
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Dr. Parween&apos;s Hospital is a state-of-the-art healthcare facility in Sangareddy, Telangana.
              Our mission is to provide ethical, transparent, and compassionate care to every patient, prioritizing
              natural healing and clear medical counseling.
            </p>

            {/* Quality pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PILLARS.map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg} mt-0.5`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-dark">{title}</h4>
                    <p className="mt-0.5 text-xs text-slate-600 leading-5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timings badge */}
            <div className="flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50/60 px-4 py-3">
              <Clock className="h-5 w-5 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-bold text-primary-800">OPD Hours</p>
                <p className="text-xs text-slate-600">{HOSPITAL_INFO.timings.opdDays}: {HOSPITAL_INFO.timings.opdHours} &bull; Sunday: Emergency 24/7</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "#0f766e" }}
              >
                Schedule Appointment
              </button>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-dark hover:text-primary-600 transition-colors group"
              >
                Read Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-primary-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
