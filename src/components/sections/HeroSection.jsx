"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Baby,
  Stethoscope,
  Award,
  CheckCircle2,
} from "lucide-react";
import { HOSPITAL_INFO, LEAD_DOCTOR } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const STATS = [
  { value: "5000+", label: "Safe Deliveries", icon: Baby },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "24/7", label: "Emergency Care", icon: ShieldCheck },
  { value: "4.9★", label: "Patient Rating", icon: Star },
];

export default function HeroSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeUp;

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I would like to book a consultation."
  );

  return (
    <section className="relative overflow-hidden hero-bg flex items-center" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full border border-primary-100/70" />
        <div className="absolute -right-20 top-32 h-72 w-72 rounded-full border border-primary-100/60" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT: Text Content */}
          <div className="relative z-10">
            <motion.div
              custom={0}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-primary-900 shadow-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50">
                <Stethoscope className="h-3 w-3 text-primary-800" />
              </span>
              Best Hospital in Sangareddy · Since 2014
            </motion.div>

            <motion.h1
              custom={0.1}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-navy-950 sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
            >
              Expert Care for{" "}
              <span className="relative inline-block">
                <span className="text-primary-800">
                  Every Woman
                </span>
              </span>
              {" "}&amp; Family
            </motion.h1>

            <motion.p
              custom={0.2}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mt-5 max-w-xl text-base leading-[1.8] text-slate-700 sm:text-lg"
            >
              Dr. Parween&apos;s Hospital offers world-class obstetrics, gynecology, laparoscopic surgery, internal
              medicine, pediatrics, and diagnostics — all under one compassionate roof.
            </motion.p>

            <motion.blockquote
              custom={0.25}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mt-5 border-l-4 border-primary-500 pl-4 text-base font-semibold leading-relaxed text-primary-950 sm:text-lg"
            >
              “Your health deserves time, respect, and a clear plan.”
            </motion.blockquote>

            <motion.div
              custom={0.3}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={onOpenBooking}
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-primary-800 px-6 py-3.5 text-base font-bold text-white shadow-md transition-colors duration-200 hover:bg-primary-900 focus-visible:outline-offset-4"
              >
                Book an Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-base font-bold text-navy-950 transition-colors duration-200 hover:border-primary-700 hover:text-primary-900"
              >
                <Phone className="h-4 w-4" />
                Call {HOSPITAL_INFO.phone}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-emerald-700/30 bg-emerald-50 px-5 py-3.5 text-base font-bold text-emerald-900 transition-colors duration-200 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </motion.div>

            <motion.div
              custom={0.4}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {[
                { icon: ShieldCheck, label: "Ethical & Transparent Care" },
                { icon: Clock3, label: "24/7 Emergency Support" },
                { icon: MapPin, label: "Sangareddy, Telangana" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Icon className="h-4 w-4 text-primary-800" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={0.5}
              variants={variants}
              initial="hidden"
              animate={inView ? "visible" : prefersReducedMotion ? "visible" : "hidden"}
              className="mt-9 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary-200">
                <Image
                  src={LEAD_DOCTOR.imageNoBg || LEAD_DOCTOR.image}
                  alt={LEAD_DOCTOR.name}
                  fill
                  quality={90}
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-navy-950">{LEAD_DOCTOR.name}</p>
                <p className="text-xs text-slate-600">{LEAD_DOCTOR.degrees}</p>
                <p className="mt-0.5 text-xs font-semibold text-primary-900">Chief Consultant Gynecologist &amp; Obstetrician</p>
              </div>
              <Link
                href="/doctors"
                className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary-900 transition-colors hover:text-primary-700"
              >
                View Profile <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Visual Panel */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <div className="hero-image-frame relative aspect-[4/4.5] overflow-hidden rounded-[2rem] border border-white shadow-xl sm:rounded-[2.5rem]">
              <Image
                src="/assets/hero/doctor.webp"
                alt="A physician ready to provide compassionate care"
                fill
                quality={90}
                priority
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
                  Dr. Parween&apos;s Hospital · Sangareddy
                </p>
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Care for every chapter of life.
                </h2>
                <a
                  href={HOSPITAL_INFO.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-white underline decoration-white/70 underline-offset-4 transition-colors hover:text-primary-100"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-2 flex max-w-[220px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:-left-8"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emergency-light text-emergency">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emergency">
                  Emergency · 24/7
                </p>
                <a href={`tel:${HOSPITAL_INFO.rawPhone}`} className="mt-0.5 block text-sm font-bold text-dark">
                  {HOSPITAL_INFO.phone}
                </a>
              </div>
            </div>

            <div
              className="absolute right-2 top-5 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-lg sm:-right-6 sm:top-8"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-700">WhatsApp</p>
                <p className="text-xs font-medium text-slate-700">Chat with us</p>
              </div>
            </div>

            <div
              className="absolute right-2 top-24 rounded-xl bg-primary-900 px-3 py-2 text-center shadow-lg sm:-right-4 sm:top-28"
            >
              <p className="text-xs font-bold text-white">7 Specialties</p>
              <p className="text-xs font-extrabold text-white">Under One Roof</p>
            </div>
          </motion.div>
        </div>

        {/* STATS BAR */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-4"
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-white px-4 py-5 text-center sm:py-6">
              <Icon className="mb-1 h-5 w-5 text-primary-800" />
              <span className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">{value}</span>
              <span className="text-xs font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
